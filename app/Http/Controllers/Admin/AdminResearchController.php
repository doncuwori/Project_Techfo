<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mahasiswa;
use App\Models\Prodi;
use App\Models\Researchs\MahasiswaRegistrant;
use App\Models\Researchs\ResearchRegistrant;
use App\Models\Researchs\ResearchRecipient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminResearchController extends Controller
{
    public function index(){
        $researchRegistrantsCount = ResearchRegistrant::count();
        $researchRecipientsCount = MahasiswaRegistrant::where('accepted', true)->count();

        $user = auth()->user();

        $pendaftar = MahasiswaRegistrant::with(['researchRegistrant.researchInformation.dosen', 'mahasiswa.prodi'])->get();

        $penerima = MahasiswaRegistrant::where('accepted', true)->with(['researchRegistrant.researchInformation.dosen', 'mahasiswa.prodi'])->get();

        $prodi = Prodi::all();
        $angkatan = Mahasiswa::distinct('angkatan')->pluck('angkatan');
        $funding = [
            'Hibah Instansi Pemerintah',
            'Hibah Instansi Swasta',
            'Mandiri'
        ];

        return Inertia::render('Admin/Laporan/LaporanPenelitian', [
            'researchRegistrantsCount' => $researchRegistrantsCount,
            'researchRecipientsCount' => $researchRecipientsCount,
            'user' => $user,
            'pendaftar' => $pendaftar,
            'penerima' => $penerima,
            'prodi' => $prodi,
            'angkatan' => $angkatan,
            'funding' => $funding
        ]);
    }
}