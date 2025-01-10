<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index () {
        if (Auth::check()) {
            $user = Auth::user();

            return $user->role === 'admin'
                ? redirect()->route('dashboardAdmin')
                : redirect()->route('dashboardUser');
        }

        return redirect()->route('login');

    }
}