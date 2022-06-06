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

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::resource('/app',App\Http\Controllers\AppController::class);

//Route::get('/artisan/migrate',[App\Http\Controllers\ArtisanController::class,'migrate']);
//Route::get('/artisan/passport',[App\Http\Controllers\ArtisanController::class,'passport']);
