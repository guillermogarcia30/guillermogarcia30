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


Route::post('/signup', [App\Http\Controllers\UserController::class,'signup'])->name('signup');
Route::post('/signin', [App\Http\Controllers\UserController::class,'signin'])->name('signin');

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('/user/me', [App\Http\Controllers\UserController::class,'user_me'])->name('user.me');
    Route::post('/signout', [App\Http\Controllers\UserController::class,'signout'])->name('signout');
    Route::get('/validate/token', [App\Http\Controllers\UserController::class,'validate_token'])->name('validate.token');

    Route::resource('/apps',App\Http\Controllers\API\AppController::class);
});
