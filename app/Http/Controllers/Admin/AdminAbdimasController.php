<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Abdimas\AbdimasRegistrant;
use App\Models\Abdimas\AbdimasRecipient;
use App\Models\Abdimas\MahasiswaRegistrant;
use App\Models\Mahasiswa;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAbdimasController extends Controller
{
    public function index(){
        $abdimasRegistrantsCount = AbdimasRegistrant::count();
        $abdimasRecipientsCount = MahasiswaRegistrant::where('accepted', true)->count();

        $user = auth()->user();
        $prodi = Prodi::all();

        $pendaftar = MahasiswaRegistrant::with(['abdimasRegistrant.abdimasInformation.dosen', 'mahasiswa.prodi'])->get();

        $penerima = MahasiswaRegistrant::where('accepted', true)->with(['abdimasRegistrant.abdimasInformation.dosen', 'mahasiswa.prodi'])->get();

        $abdimasDaftar = [];

        foreach($prodi as $p){
            $abdimasDaftar[$p->nama_prodi] = MahasiswaRegistrant::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->count();
        }

        $prodi = Prodi::all();
        $angkatan = Mahasiswa::distinct('angkatan')->pluck('angkatan');
        $funding = [
            'Hibah Instansi Pemerintah',
            'Hibah Instansi Swasta',
            'Mandiri'
        ];

        return Inertia::render('Admin/Laporan/LaporanAbdimas', [
            'abdimasRegistrantsCount' => $abdimasRegistrantsCount,
            'abdimasRecipientsCount' => $abdimasRecipientsCount,
            'user' => $user,
            'pendaftar' => $pendaftar,
            'penerima' => $penerima,
            'pendaftarAbdimas' => $abdimasDaftar,
            'prodi' => $prodi,
            'angkatan' => $angkatan,
            'funding' => $funding
        ]);
    }
}