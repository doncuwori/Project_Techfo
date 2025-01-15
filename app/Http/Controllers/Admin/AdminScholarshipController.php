<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Mahasiswa;
use App\Models\Prodi;
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

        $dataPendaftar = ScholarshipRegistrant::with(['mahasiswa.prodi', 'country'])->orderBy('created_at', 'desc')->get();

        $dataPenerima = ScholarshipRecipient::with(['mahasiswa.prodi', 'country'])->orderBy('created_at', 'desc')->get();

        $prodi = Prodi::all();
        $angkatan = Mahasiswa::distinct('angkatan')->pluck('angkatan');

        return Inertia::render('Admin/Laporan/LaporanBeasiswa', [
            'scholarshipRegistrantsCount' => $scholarshipRegistrantsCount,
            'scholarshipRecipientsCount' => $scholarshipRecipientsCount,
            'user' => $user,
            'dataPendaftar' => $dataPendaftar,
            'dataPenerima' => $dataPenerima,
            'prodi' => $prodi,
            'angkatan' => $angkatan
        ]);
    }

    public function validate(string $id)
    {
        $scholarshipRegistrant = ScholarshipRecipient::find($id);
        $scholarshipRegistrant->update([
            'is_validated' => true
        ]);
        return redirect()->back();
    }
}