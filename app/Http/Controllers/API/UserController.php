<?php

namespace App\Http\Controllers\API;

use Auth;
use DB;
use Carbon\Carbon;
use App\Models\User;
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

        $user = new User;
        $user->id = Str::uuid()->toString();
        $user->tenant_id = '';
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

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
        $token->expires_at = Carbon::now()->addDays(1);

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
        $user = $request->user();
        
        $campos = array(
            DB::raw("
                DISTINCT
                oauth_clients.name AS name
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
            'authorized_apps' => $authorized_apps
        ];

        return response()->json($data);
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
