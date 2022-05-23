<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login(){ 
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            $success['token'] = $user->createToken('MyApp')-> accessToken; 
            return response()->json(['success' => $success], 200); 
        }else{ 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    }

    public function users()
    {
        $users = User::get();
        return response()->json($users);
    }
}
