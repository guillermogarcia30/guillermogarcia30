<?php

namespace App\Http\Controllers\API;

use Validator;
use Auth;
use DB;
use Carbon\Carbon;
use App\Models\Country;
use App\Models\User;
use App\Models\Role;
use App\Models\RoleUser;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function validate_token(){
        return ['data' => 'Token is valid'];
    }

    //validar fecha en formato yyyy-mm-dd
    public function validate_date($date)
    {
        if (preg_match("/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/",$date))
        {
            return 1;
        }else{
            return 0;
        }
    }
    //fin

    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string'
        ]);

        $id = Str::uuid()->toString();

        $user = new User;
        $user->id = $id;
        $user->tenant_id = '';
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->status = 1; // Valor 1 significa status Activo
        $user->save();

        $role_user_id = Str::uuid()->toString();
        $role_user = new RoleUser;
        $role_user->id = $role_user_id;
        $role_user->role_id = Role::where('name','=','admin')->first()->id;
        $role_user->user_id = $id;
        $role_user->save();

        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    /**
     * Inicio de sesión y creación de token
     */
    public function signin(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials)){
            return response()->json(['message' => 'Access denied, check your email and password'], 401);
        }

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $accessToken = $tokenResult->accessToken;
        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addWeeks(1);

        $tenant_id = Str::uuid()->toString();

        /*
        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addWeeks(1);

        $tokenResult->accessToken = $tokenResult->accessToken."&&".$tenant_id;
        $token->save();
        */

        return response()->json([
            'access_token' => $accessToken,
            'tenant_id' => $tenant_id,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString()
        ]);
    }

    /**
     * Cierre de sesión (anular el token)
     */
    public function signout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Obtener el objeto User como json
     */
    public function user_me(Request $request)
    {
        $auth = $request->user();

        $campos_user = array(
            "users.id AS id",
            "users.name AS name",
            "users.email AS email",
            "users.birth_date AS birth_date",
            "users.phone AS phone",
            "users.address AS address",
            "users.state AS state",
            "users.city AS city",
            "users.position AS position",
            "users.profile_image AS profile_image",
            "countries.id AS country_id",
            "countries.country_code AS country_code",
            "countries.country_name AS country_name",
            DB::raw("CONCAT('+',countries.phone_code) AS phone_code"),
            "tenants.id AS tenant_id",
            "tenants.domain AS tenant_domain",
            "tenants.name AS tenant_name",
            "tenants.image AS tenant_image",
        );
        $user = DB::table('users')
                    ->leftJoin('countries','countries.id','=','users.country_id')
                    ->leftJoin('tenants','tenants.id','=','users.tenant_id')
                    ->where('users.id','=',$auth->id)
                    ->select($campos_user)
                    ->first();

        $campos_role = array(
            "roles.id AS id",
            "roles.name AS name",
            "roles.description AS description",
        );
        $role = DB::table('role_user')
                    ->leftJoin('users','users.id','=','role_user.user_id')
                    ->leftJoin('roles','roles.id','=','role_user.role_id')
                    ->where('users.id','=',$auth->id)
                    ->select($campos_role)
                    ->first();
        
        $campos = array(
            DB::raw("
                DISTINCT
                oauth_access_tokens.client_id AS id,
                oauth_clients.name AS name,
                '' AS extra
            ")
        );
        
        $authorized_apps = DB::table('oauth_access_tokens')
                             ->join('oauth_clients','oauth_clients.id','=','oauth_access_tokens.client_id')
                             ->where('oauth_access_tokens.user_id','=',$user->id)
                             ->select($campos)
                             ->orderBy('oauth_clients.name','ASC')
                             ->get();


        $extra = [];
        foreach ($authorized_apps as $key => $row) {
            $campos_extra = array(
                DB::raw("
                    DISTINCT
                    oauth_clients.image AS image,
                    oauth_clients.maker AS maker,
                    oauth_clients.website AS website,
                    oauth_clients.secret AS secret,
                    oauth_clients.redirect AS redirect,
                    oauth_clients.revoked AS status
                ")
            );

            $row->extra = DB::table('oauth_access_tokens')
                            ->join('oauth_clients','oauth_clients.id','=','oauth_access_tokens.client_id')
                            ->where('oauth_clients.id','=',$row->id)
                            ->select($campos_extra)
                            ->first();
        }

        $data = [
            'user' => $user,
            'role' => $role,
            'authorized_apps' => $authorized_apps
        ];

        return response()->json($data);
    }

    public function image(Request $request)
    {
        set_time_limit(0);
        header('Content-Type: application/json; charset=utf-8');
        header('Accept: application/json');

        try {
            $user = auth()->user();
            $id = $user->id;

            if (empty($request->file('profile_image'))) {
                return response([
                    'type' => 'image_required',
                    'error' => true,
                    'description' => 'Field profile_image is required',
                ],500);
            }else{

                $validator = Validator::make($request->all(), [
                    'profile_image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:1024',
                ]);

                if ($validator->fails()) {
                    return response([
                        'error' => true,
                        'description' => "La imagen de perfil debe tener formato jpeg,png,jpg,gif o svg con peso máximo de 1MB",
                    ],500);
                }

                $image = $request->file('profile_image');
                $format = $image->getClientOriginalExtension();
                $path = env('APP_URL').'/images-profile/'.$id.'_'.Str::random(6).'.'.$format;
                $folder = public_path('/images-profile/');
                $image->move($folder, $path);
    
                $user =  User::where('id','=',$id)->update([
                    'profile_image' => $path,
                ]);
    
                return response([
                    'error' => false,
                    'id' => $id,
                    'image' => $path,
                ],200);
            }
        } catch (\Exception $e) {
            return response([
                'type' => 'server_error',
                'error' => true,
                'description' => $e->getMessage(),
            ],500);
        }

    }

    public function update(Request $request)
    {
        set_time_limit(0);
        header('Content-Type: application/json; charset=utf-8');
        header('Accept: application/json');

        //verificamos si el json fue enviado o si tiene errores de tipeo
        if ($request->json()->all()=="" || !$request->json()->all()) {
            $response = array(
                "error" => true,
                "message" => "The JSON was not sent or has transcription errors"
            );
            return response($response,500);
        }
        //fin

        //recibimos el json
        $json = $request->json()->all();
        //fin

        //Codificamos a json a string
        $string = json_encode($json);
        //fin

        //descodificamos el json a un objeto PHP
        $decode = json_decode($string);
        //fin

        $error_array = array();
        if (!isset($decode->email)) {
            array_push($error_array,"El Correo electrónico es requerido");
        }

        if (isset($decode->name)) {
            if (strlen($decode->name) > 255) {
                array_push($error_array,"El Nombre debe ser de un máximo de 255 caracteres");
            }
        }

        if (isset($decode->email)) {
            if (strlen($decode->email) > 255) {
                array_push($error_array,"El Correo electrónico debe ser de un máximo de 255 caracteres");
            }
            if (!filter_var($decode->email, FILTER_VALIDATE_EMAIL)) {
                array_push($error_array,"El Correo electrónico debe tener el siguiente formato: example@example.com");
            }
        }

        if (isset($decode->address)) {
            if (strlen($decode->address) > 100) {
                array_push($error_array,"La Dirección debe ser de un máximo de 100 caracteres");
            }
        }
        
        if(isset($decode->birth_date)){
            if($this->validate_date($decode->birth_date)==0){
                array_push($error_array,"La Fecha debe tener formato AAAA-MM-DD");
            }
        }

        if (isset($decode->state)) {
            if (strlen($decode->state) > 20) {
                array_push($error_array,"El Estado máximo de 20 caracteres");
            }
        }

        if (isset($decode->city)) {
            if (strlen($decode->city) > 20) {
                array_push($error_array,"La Ciudad debe ser de un máximo de 20 caracteres");
            }
        }

        if (isset($decode->phone)) {
            if (strlen($decode->phone) > 15) {
                array_push($error_array,"El Teléfono debe ser de un máximo de 15 caracteres");
            }
        }

        if (isset($decode->position)) {
            if (strlen($decode->position) > 30) {
                array_push($error_array,"El Cargo debe ser de un máximo de 30 caracteres");
            }
        }

        if (count($error_array) > 0) {
            $response = [
                'error' => true,
                'errors' => $error_array,
            ];
            return response($response,500);
        }

        $id = $request->user()->id;

        $email = $decode->email;

        try {

            //$country = Country::where([['id','=',$country_id],['id','!=','']])->count();
            
            $exists = User::where([['email','=',$email],['id','!=',$id]])->count();
            
            /*
            if ($country == 0) {
                $response = [
                    'error' => true,
                    'description' => "No country found with id ".$country_id,
                ];
                return response($response,500);
            }
            */

            if ($exists == 1) {
                $response = [
                    'type' => 'already_email',
                    'error' => true,
                    'description' => "Ya existe un usuario con el email ".$email.", intente con otro",
                ];
                return response($response,500);
            } else {
                $user = User::where('id','=',$id)->first();
                if (isset($decode->country_id)) {
                    $user->country_id = $decode->country_id;
                }

                $user->email = trim(strtolower($email));

                if (isset($decode->birth_date)) {
                    $user->birth_date = $decode->birth_date;
                }
                if (isset($decode->address)) {
                    $user->address = ucwords(strtolower($decode->address));
                }
                if (isset($decode->state)) {
                    $user->state = ucwords(strtolower($decode->state));
                }
                if (isset($decode->city)) {
                    $user->city = ucwords(strtolower($decode->city));
                }
                if (isset($decode->phone)) {
                    $user->phone = $decode->phone;
                }
                if (isset($decode->position)) {
                    $user->position = ucwords(strtolower($decode->position));
                }
                $user->update();

                $campos_user = array(
                    "users.id AS id",
                    "users.name AS name",
                    "users.email AS email",
                    "users.birth_date AS birth_date",
                    "users.phone AS phone",
                    "users.address AS address",
                    "users.state AS state",
                    "users.city AS city",
                    "users.position AS position",
                    "users.profile_image AS profile_image",
                    "countries.id AS country_id",
                    "countries.country_code AS country_code",
                    "countries.country_name AS country_name",
                    DB::raw("CONCAT('+',countries.phone_code) AS phone_code"),
                    "tenants.id AS tenant_id",
                    "tenants.domain AS tenant_domain",
                    "tenants.name AS tenant_name",
                    "tenants.image AS tenant_image",
                );
                $userUpdated = DB::table('users')
                                ->leftJoin('countries','countries.id','=','users.country_id')
                                ->leftJoin('tenants','tenants.id','=','users.tenant_id')
                                ->where('users.id','=',$id)
                                ->select($campos_user)
                                ->first();

                return response([
                    'error' => false,
                    'data' => $userUpdated,
                    //'data' => $id,
                ],200);
            }
        } catch (\Exception $e) {
            return response([
                'type' => 'server_error',
                'error' => true,
                'description' => $e->getMessage(),
            ],500);
        }

    }
}
