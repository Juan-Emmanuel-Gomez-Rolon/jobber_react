<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfferController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return response()->json(['message' => 'Hello World!']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/me', [AuthController::class, 'update_account']);
    Route::put('/me/password', [AuthController::class, 'update_password']);


    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/profile/{user}', [AuthController::class, 'profile']);

    Route::get('/offers', [OfferController::class, 'index']);
    Route::get('/my_offers', [OfferController::class, 'my_offers']);
    Route::get('/offers/category/{category}', [OfferController::class, 'index_by_category']);
    Route::post('/offers', [OfferController::class, 'store']);
    Route::get('/offers/{offer}', [OfferController::class, 'show']);
    Route::post('/offers/{offer}/apply', [OfferController::class, 'apply']);
    Route::put('/offers/{offer}', [OfferController::class, 'update']);
    Route::delete('/offers/{offer}', [OfferController::class, 'destroy']);

    Route::get('/applications', [ApplicationController::class, 'index']);
    // Route::post('/applications/{offer}', [ApplicationController::class, 'apply']);
    Route::get('/applications/{application}', [ApplicationController::class, 'show']);
    // Route::put('/applications/{application}', [ApplicationController::class, 'update']);
    Route::delete('/applications/{application}', [ApplicationController::class, 'destroy']);
    Route::post('/applications/{application}/accept', [ApplicationController::class, 'accept']);
    Route::post('/applications/{application}/reject', [ApplicationController::class, 'reject']);
});
