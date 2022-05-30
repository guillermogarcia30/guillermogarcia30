<?php

namespace App\Http\Controllers;

use DB;
use Auth;
use Http;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class AppController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $apps = DB::table('oauth_clients')->where('user_id','=',Auth::user()->id)->get();
        return view('app.index',['apps' => $apps]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('app.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $id = Str::uuid()->toString();
        $secret = Str::random(40);
        $user_id = Auth::user()->id;
        $name = $request->name;
        $redirect = strtolower(trim($request->redirect));

        $app =  DB::table('oauth_clients')->insert([
            'id' => $id,	
            'user_id' => $user_id,
            'name' => $name,
            'secret' => $secret,
            'provider' => null,
            'redirect' => $redirect,
            'personal_access_client' => 0,
            'password_client' => 0,
            'revoked' => 0,
        ]);
        return redirect()->route('app.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $app = DB::table('oauth_clients')->where('id','=',$id)->first();
        return view('app.edit',['app' => $app]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $name = $request->name;
        $redirect = strtolower(trim($request->redirect));

        $app =  DB::table('oauth_clients')->where('id','=',$id)->update([
            'name' => $name,
            'redirect' => $redirect,
        ]);
        return redirect()->route('app.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $app =  DB::table('oauth_clients')->where('id','=',$id)->delete();
        return redirect()->route('app.index');
    }
}
