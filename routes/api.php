<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\ApiAuthMiddleware;
use App\Http\Controllers\{
    UserController,
    ContactController
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/users',[UserController::class,'register']);
Route::post('/users/login',[UserController::class,'login']);
Route::middleware(ApiAuthMiddleware::class)->group(function () {
    Route::get('/users/current',[UserController::class,'get']);
    Route::patch('/users/current',[UserController::class,'update']);
    Route::delete('/users/logout',[UserController::class,'logout']);

    Route::post('/contacts',[ContactController::class,'create']);
    Route::get('/contacts',[ContactController::class,'search']);
    Route::get('/contacts/{id}',[ContactController::class,'get'])->where('id','[0-9]+');
    Route::put('/contacts/{id}',[ContactController::class,'update'])->where('id','[0-9]+');
    Route::delete('/contacts/{id}',[ContactController::class,'delete'])->where('id','[0-9]+');
});