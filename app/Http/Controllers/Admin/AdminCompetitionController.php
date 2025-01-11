<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Competitions\CompetitionRegistrant;
use App\Models\Competitions\CompetitionAchievement;
use App\Models\Competitions\MahasiswaAchievement;
use App\Models\Competitions\MahasiswaRegistrant;
use App\Models\Mahasiswa;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCompetitionController extends Controller
{
    public function index(){
        $competitionRegistrantsCount = MahasiswaRegistrant::count();
        $competitionAchievementsCount = MahasiswaAchievement::count();
        $totalMahasiswa = Mahasiswa::count();

        $user = auth()->user();

        // $registrant = CompetitionRegistrant::with('mahasiswa')->orderBy('created_at', 'desc')->get();

        // $kategoriJuara = [
        //     'Juara I',
        //     'Juara II',
        //     'Juara III',
        //     'Juara Harapan I',
        //     'Juara Harapan II',
        //     'Juara Harapan III',
        //     'Medali Emas',
        //     'Medali Perak',
        //     'Medali Perunggu',
        //     'Penerima Hibah',
        //     'Terbaik',
        // ];

        // $prodi = Prodi::all();

        // $arrayJuara = [];

        // foreach($kategoriJuara as $k){
        //     foreach($prodi as $p){
        //         $arrayJuara[$k][$p->nama_prodi] = MahasiswaAchievement::whereHas('mahasiswa', function ($query) use ($p) {
        //             $query->whereHas('prodi', function ($query) use ($p) {
        //                 $query->where('id', $p->id);
        //             });
        //         })->whereHas('competitionAchievement', function ($query) use ($k) {
        //             $query->where('degree', $k);
        //         })->count();
        //     }
        // }

        $dataPendaftar = MahasiswaRegistrant::with(['mahasiswa.prodi', 'competitionRegistrant.dosen', 'competitionRegistrant.country'])->orderBy('created_at', 'desc')->get();

        $dataPemenang = MahasiswaAchievement::with(['mahasiswa.prodi', 'competitionAchievement.dosen', 'competitionAchievement.country'])->orderBy('created_at', 'desc')->get();

        $prodi = Prodi::all();
        $angkatan = Mahasiswa::distinct('angkatan')->pluck('angkatan');
        $tingkat = [
            'International',
            'Nasional',
            'Regional',
            'Wilayah',
            'Daerah/Provinsi',
            'Kabupaten/Kota',
            'Kecamatan',
            'UPN "Veteran" Jakarta',
        ];

        return Inertia::render('Admin/Laporan/LaporanLomba', [
            'competitionRegistrantsCount' => $competitionRegistrantsCount,
            'competitionAchievementsCount' => $competitionAchievementsCount,
            'user' => $user,
            // 'registrant' => $registrant,
            // 'rekapJuara' => $arrayJuara,
            'totalMahasiswa' => $totalMahasiswa,
            'dataPendaftar' => $dataPendaftar,
            'dataPemenang' => $dataPemenang,
            'prodi' => $prodi,
            'angkatan' => $angkatan,
            'tingkat' => $tingkat,
        ]);
    }

    public function validate(string $id)
    {
        $competitionRegistrant = CompetitionAchievement::find($id);
        $competitionRegistrant->update([
            'is_validated' => true
        ]);
        return redirect()->back();
    }
}