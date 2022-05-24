<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function signin(Request $request){

        $data = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);

        if (!auth()->attempt($data)) {
            return response(
                ['error_message' => 'Incorrect Details. Please try again']
            );
        }

        $token = auth()->user()->createToken('API Token')->accessToken;

        return response(['user' => auth()->user(), 'token' => $token]);
    }

    public function signup(Request $request)
    {
        $user = new User;
        $user->id = Str::uuid()->toString();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();

        $token = $user->createToken('API Token')->accessToken;

        return response([ 'user' => $user, 'token' => $token]);
    }

    public function users()
    {
        try {
            $users = User::get();
            return response()->json($users);
        } catch (\Exception $e) {
            return "sdsdsd";
        }
    }
}
