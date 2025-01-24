<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManajemenUserController extends Controller
{
    public function index(){
        $user = auth()->user();

        return Inertia::render('Admin/ManajemenUser', [
            'user' => $user,
        ]);
    }
}
