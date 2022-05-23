<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function request()
    {
        $response = $client->post('/api/login', [
            'form_params' => [
                'email' => 'sajid@test.com',
                'password' => 'my_password'
            ],
        ]);
        $arr_result = json_decode((string) $response->getBody(), true);
    }
}
