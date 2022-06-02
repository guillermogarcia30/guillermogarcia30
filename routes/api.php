<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//APIS DE REGISTRO E INICIO DE SESION
Route::post('/signup', [App\Http\Controllers\API\UserController::class,'signup']);
Route::post('/signin', [App\Http\Controllers\API\UserController::class,'signin']);
//FIN

Route::group(['middleware' => 'auth:api'], function() {

    //APIS DE PERFIL Y CERRAR SESION
    Route::get('/user/me', [App\Http\Controllers\API\UserController::class,'user_me']);
    Route::post('/signout', [App\Http\Controllers\API\UserController::class,'signout']);
    Route::get('/validate/token', [App\Http\Controllers\API\UserController::class,'validate_token']);
    //FIN

    //APIS DE APLICACIONES
    Route::resource('/apps',App\Http\Controllers\API\AppController::class);
    Route::post('/apps/image/{id}', [App\Http\Controllers\API\AppController::class,'image']);
    //FIN    
});

//APIS DE CLIENT_ID Y SECRET
Route::get('/generator/client-id', [App\Http\Controllers\API\GeneratorController::class,'client_id']);
Route::get('/generator/secret', [App\Http\Controllers\API\GeneratorController::class,'secret']);
//FIN
