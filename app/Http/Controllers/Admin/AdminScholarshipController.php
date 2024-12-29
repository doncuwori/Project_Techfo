<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Scholarships\ScholarshipRecipient;
use App\Models\Scholarships\ScholarshipRegistrant;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminScholarshipController extends Controller
{
    public function index(){
        $scholarshipRegistrantsCount = ScholarshipRegistrant::count();
        $scholarshipRecipientsCount = ScholarshipRecipient::count();

        $user = auth()->user();

        $dataPendaftar = ScholarshipRegistrant::with('mahasiswa.prodi')->orderBy('created_at', 'desc')->get();

        $dataPenerima = ScholarshipRecipient::with('mahasiswa.prodi')->orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Laporan/LaporanBeasiswa', [
            'scholarshipRegistrantsCount' => $scholarshipRegistrantsCount,
            'scholarshipRecipientsCount' => $scholarshipRecipientsCount,
            'user' => $user,
            'dataPendaftar' => $dataPendaftar,
            'dataPenerima' => $dataPenerima
        ]);
    }
}