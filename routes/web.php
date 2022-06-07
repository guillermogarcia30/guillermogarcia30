<?php
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    //return view('welcome');
    return redirect()->route('login');
});

Auth::routes();
Route::get('/registered', [App\Http\Controllers\Auth\RegisterController::class, 'created'])->name('registered');
Route::get('/password-recovered', [App\Http\Controllers\Auth\RegisterController::class, 'password_recovered'])->name('password_recovered');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::resource('/app',App\Http\Controllers\AppController::class);
Route::get('/profile', [App\Http\Controllers\HomeController::class, 'profile'])->name('profile');

Route::get('/artisan/migrate',[App\Http\Controllers\ArtisanController::class,'migrate']);
Route::get('/artisan/passport',[App\Http\Controllers\ArtisanController::class,'passport']);
