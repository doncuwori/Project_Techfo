<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Competitions\CompetitionRegistrant;
use App\Models\Competitions\CompetitionAchievement;
use App\Models\Competitions\MahasiswaAchievement;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCompetitionController extends Controller
{
    public function index(){
        $competitionRegistrantsCount = CompetitionRegistrant::count();
        $competitionAchievementsCount = CompetitionAchievement::count();

        $user = auth()->user();

        $registrant = CompetitionRegistrant::with('mahasiswa')->orderBy('created_at', 'desc')->get();

        $kategoriJuara = [
            'Juara Harapan I',
            'Juara Harapan II',
            'Juara Harapan III',
            'Juara I',
            'Juara II',
            'Juara III',
            'Medali Emas',
            'Medali Perak',
            'Medali Perunggu',
            'Penerima Hibah',
            'Terbaik',
        ];

        $prodi = Prodi::all();

        $arrayJuara = [];

        foreach($kategoriJuara as $k){
            foreach($prodi as $p){
                $arrayJuara[$k][$p->nama_prodi] = MahasiswaAchievement::whereHas('mahasiswa', function ($query) use ($p) {
                    $query->whereHas('prodi', function ($query) use ($p) {
                        $query->where('id', $p->id);
                    });
                })->whereHas('competitionAchievement', function ($query) use ($k) {
                    $query->where('degree', $k);
                })->count();
            }
        }

        return Inertia::render('Admin/Laporan/LaporanLomba', [
            'competitionRegistrantsCount' => $competitionRegistrantsCount,
            'competitionAchievementsCount' => $competitionAchievementsCount,
            'user' => $user,
            'registrant' => $registrant,
            'rekapJuara' => $arrayJuara
        ]);
    }
}