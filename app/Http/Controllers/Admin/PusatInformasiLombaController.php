<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Competitions\CompetitionInformation;
use Inertia\Inertia;

class PusatInformasiLombaController extends Controller
{
    public function index(){
        $user = auth()->user();

        $data = CompetitionInformation::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/PusatInformasi/PusatLomba', [
            'user' => $user,
            'data' => $data
        ]);
    }
}