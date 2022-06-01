<?php

namespace App\Http\Controllers\API;

use DB;
use Mail;
use Response;
use Auth;
use Http;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GeneratorController extends Controller
{
    public function client_id()
    {   
        set_time_limit(0);
        header('Content-Type: application/json; charset=utf-8');
        header('Accept: application/json');
        try {
            $client_id = Str::uuid()->toString();
            $data = [
                'error' => false,
                'data' => $client_id
            ];
            return response($data,200);
        } catch (\Exception $e) {
            $data = [
                'error' => true,
                'description' => $e->getMessage() 
            ];
            return response($data,500);
        }
    }

    public function secret()
    {
        set_time_limit(0);
        header('Content-Type: application/json; charset=utf-8');
        header('Accept: application/json');
        try {
            $secret = Str::random(40);
            $data = [
                'error' => false,
                'data' => $secret
            ];
            return response($data,200);
        } catch (\Exception $e) {
            $data = [
                'error' => true,
                'description' => $e->getMessage() 
            ];
            return response($data,500);
        }
    }
}
