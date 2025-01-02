<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Abdimas\AbdimasRegistrant;
use App\Models\Abdimas\AbdimasRecipient;
use App\Models\Abdimas\MahasiswaRegistrant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAbdimasController extends Controller
{
    public function index(){
        $abdimasRegistrantsCount = AbdimasRegistrant::count();
        $abdimasRecipientsCount = MahasiswaRegistrant::where('accepted', true)->count();

        $user = auth()->user();

        $pendaftar = MahasiswaRegistrant::where('accepted', false)->with(['abdimasRegistrant.abdimasInformation', 'mahasiswa.prodi'])->get();

        $penerima = MahasiswaRegistrant::where('accepted', true)->with(['abdimasRegistrant.abdimasInformation', 'mahasiswa.prodi'])->get();

        return Inertia::render('Admin/Laporan/LaporanAbdimas', [
            'abdimasRegistrantsCount' => $abdimasRegistrantsCount,
            'abdimasRecipientsCount' => $abdimasRecipientsCount,
            'user' => $user,
            'pendaftar' => $pendaftar,
            'penerima' => $penerima
        ]);
    }
}