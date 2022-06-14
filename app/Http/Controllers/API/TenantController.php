<?php

namespace App\Http\Controllers\API;

use DB;
use App\Models\Tenant;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TenantController extends Controller
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
        
        $tenant_count = Tenant::count();
        if($tenant_count == 0){
            return response([
                'error' => true,
                'description' => 'Not Found Resource'
            ],404);
        }else{
            $campos = array(
                "id AS id",
                "domain AS domain",
                "name AS name",
                "image AS image",
                "status AS status",
            );
            $tenants = Tenant::orderBy('name','ASC')->select($campos)->get();
            return response([
                'error' => false,
                'data' => $tenants
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
        if (!isset($decode->domain)) {
            array_push($error_array,"Parameter domain required");
        }
        if (!isset($decode->name)) {
            array_push($error_array,"Parameter name required");
        }

        if (count($error_array) > 0) {
            $response = [
                'error' => true,
                'errors' => $error_array,
            ];
            return response($response,500);
        }

        $id = Str::uuid()->toString();
        $domain = $decode->domain;
        $name = $decode->name;
        $image = "";
        $status = 1; //Estatus 1 (Activo por defecto)

        try {
            $exists = Tenant::where('domain','=',$domain)->exists();
            if($exists == 1){
                return response([
                    'error' => true,
                    'description' => 'There is already a tenant with the domain '.$domain,
                ],500);
            }else{
                $tenant = new Tenant;
                $tenant->id = $id;
                $tenant->domain = $domain;
                $tenant->name = $name;
                $tenant->image = $image;
                $tenant->status = $status; //Estatus 1 (Activo por defecto)
                $tenant->save();

                $campos = array(
                    "id AS id",
                    "domain AS domain",
                    "name AS name",
                    "image AS image",
                    "status AS status",
                );
                $tenants = Tenant::orderBy('created_at','ASC')->select($campos)->get();

                return response([
                    'error' => false,
                    'data' => $tenants,
                ],200);
            }
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
        
        $tenant_count = Tenant::where('id','=',$id)->count();
        if($tenant_count == 0){
            return response([
                'error' => true,
                'description' => 'Not Found Resource'
            ],404);
        }else{
            $campos = array(
                "id AS id",
                "domain AS domain",
                "name AS name",
                "image AS image",
                "status AS status",
            );
            $tenants = Tenant::where('id','=',$id)->select($campos)->first();
            return response([
                'error' => false,
                'data' => $tenants
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
        if (!isset($decode->domain)) {
            array_push($error_array,"Parameter domain required");
        }
        if (!isset($decode->name)) {
            array_push($error_array,"Parameter name required");
        }

        if (count($error_array) > 0) {
            $response = [
                'error' => true,
                'errors' => $error_array,
            ];
            return response($response,500);
        }

        $exists = Tenant::where('id','=',$id)->count();
        if($exists == 0){
            return response([
                'error' => true,
                'description' => 'Not Found Resource'
            ],404);
        }

        $name = $decode->name;
        $domain = $decode->domain;

        $exists_domain = Tenant::where([['domain','=',$domain],['id','!=',$id]])->count();
        if($exists_domain > 0){
            return response([
                'error' => true,
                'description' => 'There is already a tenant with the domain '.$domain,
            ],500);
        }

        try {
            $tenant = Tenant::where('id','=',$id)->update([
                'name' => $name,
                'domain' => $domain,
                'updated_at' => DB::raw("NOW()")
            ]);

            $campos = array(
                "id AS id",
                "domain AS domain",
                "name AS name",
                "image AS image",
                "status AS status",
            );
            $tenants = Tenant::orderBy('name','ASC')->select($campos)->get();

            return response([
                'error' => false,
                'data' => $tenants,
            ],200);
        } catch (\Exception $e) {
            return response([
                'error' => true,
                'description' => $e->getMessage(),
            ],500);
        }
    }

    public function image(Request $request,$id)
    {
        set_time_limit(0);
        header('Content-Type: application/json; charset=utf-8');
        header('Accept: application/json');

        try{
            $tenant_count = Tenant::where('id','=',$id)->count();
            if($tenant_count == 0){
                return response([
                    'error' => true,
                    'description' => 'Not Found Resource'
                ],404);
            }else{
                $image = $request->file('image');
                $format = $image->getClientOriginalExtension();
                $path = env('APP_URL').'/images-tenants/'.$id.'.'.$format;
                $folder = public_path('/images-tenants/');
                $image->move($folder, $path);
    
                $tenant = Tenant::where('id','=',$id)->update([
                    'image' => $path,
                ]);

                $tenants = Tenant::orderBy('created_at','DESC')->get();
    
                return response([
                    'error' => false,
                    'data' => $tenants,
                ],200);
            }
        }catch(\Execption $e){
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

        $tenant_count = Tenant::where('id','=',$id)->count();
        if($tenant_count == 0){
            return response([
                'error' => true,
                'description' => 'Not Found Resource'
            ],404);
        }

        try {
            $tenant = Tenant::where('id','=',$id)->delete();
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
