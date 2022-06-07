<?php

namespace App\Http\Controllers\API;

use Auth;
use DB;
use Carbon\Carbon;
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

        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addWeeks(1);

        $tenant_id = Str::uuid()->toString();
        //$tokenResult->accessToken = $tokenResult->accessToken."&&".$tenant_id;
        $token->save();

        return response()->json([
            'access_token' => $tokenResult->accessToken,
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
            "users.tenant_id AS tenant_id",
            "users.name AS name",
            "users.email AS email",
            "users.birth_date AS birth_date",
            "users.phone AS phone",
            "users.address AS address",
            "users.city AS city",
            "users.position AS position",
            "users.profile_image AS profile_image",
            "countries.id AS country_id",
            "countries.country_code AS country_code",
            "countries.country_name AS country_name",
            DB::raw("CONCAT('+',countries.phone_code) AS phone_code"),
        );
        $user = DB::table('users')
                    ->leftJoin('countries','countries.id','=','users.country_id')
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
                    'error' => true,
                    'description' => 'Field profile_image is required',
                ],500);
            }else{
                $image = $request->file('profile_image');
                $format = $image->getClientOriginalExtension();
                $path = env('APP_URL').'/images-profile/'.$id.'.'.$format;
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
        if (!isset($decode->country_id)) {
            array_push($error_array,"Parameter country_id required");
        }
        if (!isset($decode->name)) {
            array_push($error_array,"Parameter name required");
        }
        if (!isset($decode->email)) {
            array_push($error_array,"Parameter email required");
        }
        if (!isset($decode->birth_date)) {
            array_push($error_array,"Parameter birth_date required");
        }
        if (!isset($decode->address)) {
            array_push($error_array,"Parameter address required");
        }
        if (!isset($decode->city)) {
            array_push($error_array,"Parameter city required");
        }
        if (!isset($decode->phone)) {
            array_push($error_array,"Parameter phone required");
        }
        if (!isset($decode->position)) {
            array_push($error_array,"Parameter position required");
        }

        if (count($error_array) > 0) {
            $response = [
                'error' => true,
                'errors' => $error_array,
            ];
            return response($response,500);
        }

        $id = $request->user()->id;

        $country_id = $decode->country_id;
        $name = $decode->name;
        $email = $decode->email;
        $birth_date = $decode->birth_date;
        $address = $decode->address;
        $city = $decode->city;
        $phone = $decode->phone;
        $position = $decode->position;

        try {
            $exists = User::where([['email','=',$email],['id','!=',$id]])->count();
            if ($exists == 1) {
                $response = [
                    'error' => true,
                    'description' => "There is already another user with email ".$email.", try another",
                ];
                return response($response,500);
            } else {
                $user = User::where('id','=',$id)->first();
                $user->country_id = $country_id;
                $user->name = ucwords(strtolower($name));
                $user->email = trim(strtolower($email));
                $user->birth_date = $decode->birth_date;
                $user->address = ucwords(strtolower($address));
                $user->city = ucwords(strtolower($city));
                $user->phone = $phone;
                $user->position = ucwords(strtolower($position));
                $user->update();

                return response([
                    'error' => false,
                    'data' => $id,
                ],200);
            }
        } catch (\Exception $e) {
            return response([
                'error' => true,
                'description' => $e->getMessage(),
            ],500);
        }

    }
}
