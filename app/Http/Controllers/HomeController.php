<?php

namespace App\Http\Controllers;

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

    public function createToken($user)
    {
        $user = auth()->user();
        $this->createToken($user);  
    }
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = auth()->user();
        $this->createToken($user);

        return view('home');
    }

    public function profile()
    {
        /*
        $user = auth()->user();
        $this->createToken($user);
        */
        return view('profile');
    }
}
