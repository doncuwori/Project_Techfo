<?php

use App\Http\Controllers\Api\CompetitionController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/user', [UserController::class, 'index'])->name('api.user');




