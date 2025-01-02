<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Researchs\MahasiswaRegistrant;
use App\Models\Researchs\ResearchRegistrant;
use App\Models\Researchs\ResearchRecipient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminResearchController extends Controller
{
    public function index(){
        $researchRegistrantsCount = MahasiswaRegistrant::where('accepted', false)->count();
        $researchRecipientsCount = MahasiswaRegistrant::where('accepted', true)->count();

        $user = auth()->user();

        $pendaftar = MahasiswaRegistrant::where('accepted', false)->with(['researchRegistrant.researchInformation', 'mahasiswa.prodi'])->get();

        $penerima = MahasiswaRegistrant::where('accepted', true)->with(['researchRegistrant.researchInformation', 'mahasiswa.prodi'])->get();

        return Inertia::render('Admin/Laporan/LaporanPenelitian', [
            'researchRegistrantsCount' => $researchRegistrantsCount,
            'researchRecipientsCount' => $researchRecipientsCount,
            'user' => $user,
            'pendaftar' => $pendaftar,
            'penerima' => $penerima
        ]);
    }
}