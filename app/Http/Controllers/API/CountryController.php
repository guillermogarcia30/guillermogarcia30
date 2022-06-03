<?php

namespace App\Http\Controllers\API;

use DB;
use App\Models\Country;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CountryController extends Controller
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

        $country_count = Country::count();
        if($country_count == 0){
            return response([
                'error' => true,
                'description' => 'Not Found Resource'
            ],404);
        }else{
            $campos = array(
                "id AS id",
                DB::raw("CONCAT('+',phone_code) AS phone_code"),
                "country_name AS name",
            );
            $country = Country::orderBy('country_name','ASC')->select($campos)->get();
            return response([
                'error' => false,
                'data' => $country
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
        //
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

        $country_count = Country::where('id','=',$id)->count();
        if($country_count == 0){
            return response([
                'error' => true,
                'description' => 'Not Found Resource'
            ],404);
        }else{
            $campos = array(
                "id AS id",
                DB::raw("CONCAT('+',phone_code) AS phone_code"),
                "country_name AS name",
            );
            $country = Country::where('id','=',$id)->select($campos)->first();
            return response([
                'error' => false,
                'data' => $country
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
