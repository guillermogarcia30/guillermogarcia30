<?php

namespace App\Http\Controllers\API;

use DB;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AppController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        set_time_limit(0);
        header('Content-Type: application/json; charset=utf-8');
        header('Accept: application/json');
        
        $apps_count = DB::table('oauth_clients')->count();
        if($apps_count == 0){
            return response([
                'error' => true,
                'description' => 'Not Found Resource'
            ],404);
        }else{
            $apps = DB::table('oauth_clients')->get();
            return response([
                'error' => false,
                'data' => $apps
            ],200);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
        if (!isset($decode->name)) {
            array_push($error_array,"Parameter name required");
        }
        if (!isset($decode->redirect)) {
            array_push($error_array,"Parameter redirect required");
        }

        if (count($error_array) > 0) {
            $response = [
                'error' => true,
                'errors' => $error_array,
            ];
            return response($response,500);
        }

        $id = Str::uuid()->toString();
        $user_id = auth()->user()->id;
        $secret = Str::random(40);
        $name = $request->name;
        $redirect = strtolower(trim($request->redirect));

        try {
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
            return response([
                'error' => false,
                'id' => $id,
            ],200);
        } catch (\Exception $e) {
            return response([
                'error' => true,
                'description' => $e->getMessage(),
            ],500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        set_time_limit(0);
        header('Content-Type: application/json; charset=utf-8');
        header('Accept: application/json');

        $apps_count = DB::table('oauth_clients')->where('id','=',$id)->count();
        if($apps_count == 0){
            return response([
                'error' => true,
                'description' => 'Not Found Resource'
            ],404);
        }else{
            $apps = DB::table('oauth_clients')->where('id','=',$id)->first();
            return response([
                'error' => false,
                'data' => $apps
            ],200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        if (!isset($decode->name)) {
            array_push($error_array,"Parameter name required");
        }
        if (!isset($decode->redirect)) {
            array_push($error_array,"Parameter redirect required");
        }

        if (count($error_array) > 0) {
            $response = [
                'error' => true,
                'errors' => $error_array,
            ];
            return response($response,500);
        }

        $apps_count = DB::table('oauth_clients')->where('id','=',$id)->count();
        if($apps_count == 0){
            return response([
                'error' => true,
                'description' => 'Not Found Resource'
            ],404);
        }

        $name = $request->name;
        $redirect = strtolower(trim($request->redirect));

        try {
            $app =  DB::table('oauth_clients')->where('id','=',$id)->update([
                'name' => $name,
                'redirect' => $redirect,
            ]);
            return response([
                'error' => false,
                'id' => $id,
            ],200);
        } catch (\Exception $e) {
            return response([
                'error' => true,
                'description' => $e->getMessage(),
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        set_time_limit(0);
        header('Content-Type: application/json; charset=utf-8');
        header('Accept: application/json');

        $apps_count = DB::table('oauth_clients')->where('id','=',$id)->count();
        if($apps_count == 0){
            return response([
                'error' => true,
                'description' => 'Not Found Resource'
            ],404);
        }

        try {
            $app =  DB::table('oauth_clients')->where('id','=',$id)->delete();
            return response([
                'error' => false,
                'id' => $id,
            ],200);
        } catch (\Exception $e) {
            return response([
                'error' => true,
                'description' => $e->getMessage(),
            ],500);
        }
    }
}
