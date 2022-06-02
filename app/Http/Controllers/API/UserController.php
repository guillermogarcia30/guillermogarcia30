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
            return response()->json(['message' => 'Unauthorized'], 401);
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
                oauth_clients.id AS id,
                oauth_clients.image AS image,
                oauth_clients.maker AS maker,
                oauth_clients.website AS website,
                oauth_clients.name AS name,
                oauth_clients.secret AS secret,
                oauth_clients.redirect AS redirect,
                oauth_clients.revoked AS status
            ")
        );
        
        $authorized_apps = DB::table('oauth_access_tokens')
                             ->join('oauth_clients','oauth_clients.id','=','oauth_access_tokens.client_id')
                             ->where('oauth_access_tokens.user_id','=',$user->id)
                             ->select($campos)
                             ->orderBy('oauth_clients.name','ASC')
                             ->get();

        $data = [
            'user' => $user,
            'authorized_apps' => $authorized_apps
        ];

        return response()->json($data);
    }
}
