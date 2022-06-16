<?php

namespace App\Http\Controllers;

use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        if(Auth::user()->roles()->first()->name != "super_admin"){
            return redirect()->route('profile');
        }
        return view('home');
    }

    public function profile()
    {
        $user = auth()->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $access_token = $tokenResult->accessToken;
        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addWeeks(1);

        setcookie("access_token", $access_token);   

        return view('profile');
    }

    public function profile_configuration()
    {
        $user = auth()->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $access_token = $tokenResult->accessToken;
        $token = $tokenResult->token;
        $token->expires_at = Carbon::now()->addWeeks(1);

        setcookie("access_token", $access_token);   

        return view('profile');
    }
}
