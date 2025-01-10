<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Scholarships\ScholarshipInformation;
use Inertia\Inertia;

class PusatInformasiBeasiswaController extends Controller
{
    public function index(){
        $user = auth()->user();

        $data = ScholarshipInformation::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/PusatInformasi/PusatBeasiswa', [
            'user' => $user,
            'data' => $data
        ]);
    }
}