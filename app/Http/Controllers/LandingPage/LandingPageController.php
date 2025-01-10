<?php

namespace App\Http\Controllers\LandingPage;

use App\Http\Controllers\Controller;
use App\Models\Abdimas\MahasiswaRegistrant;
use App\Models\Competitions\CompetitionRegistrant;
use App\Models\Competitions\CompetitionAchievement;
use App\Models\Competitions\MahasiswaAchievement;
use App\Models\Prodi;
use App\Models\Researchs\MahasiswaRegistrant as ResearchsMahasiswaRegistrant;
use App\Models\Scholarships\MahasiswaRecipient;
use App\Models\Scholarships\ScholarshipRecipient;
use App\Models\Scholarships\ScholarshipRegistrant;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index()
    {
        $competitionRegistrantsCount = \App\Models\Competitions\MahasiswaRegistrant::count();
        $competitionAchievementsCount = MahasiswaAchievement::count();
        $scholarshipRegistrantsCount = ScholarshipRegistrant::count();
        $scholarshipRecipientsCount = ScholarshipRecipient::count();

        $abdimasRegistrantsCount = MahasiswaRegistrant::count();
        $abdimasRecipientsCount = MahasiswaRegistrant::where('accepted', true)->count();

        $researchRegistrantsCount = ResearchsMahasiswaRegistrant::count();
        $researchRecipientsCount = ResearchsMahasiswaRegistrant::where('accepted', true)->count();


        $user = auth()->user();

        $kategoriJuara = [
            'Juara I',
            'Juara II',
            'Juara III',
            'Juara Harapan I',
            'Juara Harapan II',
            'Juara Harapan III',
            'Medali Emas',
            'Medali Perak',
            'Medali Perunggu',
            'Penerima Hibah',
            'Terbaik',
        ];

        $prodi = Prodi::all();

        $arrayJuara = [];

        foreach ($kategoriJuara as $k) {
            foreach ($prodi as $p) {
                $arrayJuara[$k][$p->nama_prodi] = MahasiswaAchievement::whereHas('mahasiswa', function ($query) use ($p) {
                    $query->whereHas('prodi', function ($query) use ($p) {
                        $query->where('id', $p->id);
                    });
                })->whereHas('competitionAchievement', function ($query) use ($k) {
                    $query->where('degree', $k);
                })->count();
            }
        }

        $arrayLomba = [];

        foreach ($prodi as $p) {
            $arrayLomba[$p->nama_prodi] = MahasiswaAchievement::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->count();
        }

        $arrayBeasiswa = [];

        foreach ($prodi as $p) {
            $arrayBeasiswa[$p->nama_prodi] = MahasiswaRecipient::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->count();
        }

        $arrayAbdimas = [];

        foreach ($prodi as $p) {
            $arrayAbdimas[$p->nama_prodi] = MahasiswaRegistrant::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->count();
        }

        $abdimasLolos = [];

        foreach ($prodi as $p) {
            $abdimasLolos[$p->nama_prodi] = MahasiswaRegistrant::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->where('accepted', true)->count();
        }

        $arrayResearch = [];

        foreach ($prodi as $p) {
            $arrayResearch[$p->nama_prodi] = ResearchsMahasiswaRegistrant::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->count();
        }

        $researchLolos = [];

        foreach ($prodi as $p) {
            $researchLolos[$p->nama_prodi] = ResearchsMahasiswaRegistrant::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->where('accepted', true)->count();
        }

        return Inertia::render('LandingPage', [
            'competitionRegistrantsCount' => $competitionRegistrantsCount,
            'competitionAchievementsCount' => $competitionAchievementsCount,
            'scholarshipRegistrantsCount' => $scholarshipRegistrantsCount,
            'scholarshipRecipientsCount' => $scholarshipRecipientsCount,
            'abdimasRegistrantsCount' => $abdimasRegistrantsCount,
            'abdimasRecipientsCount' => $abdimasRecipientsCount,
            'researchRegistrantsCount' => $researchRegistrantsCount,
            'researchRecipientsCount' => $researchRecipientsCount,
            'user' => $user,
            'rekapJuara' => $arrayJuara,
            'rekapLomba' => $arrayLomba,
            'rekapBeasiswa' => $arrayBeasiswa,
            'rekapAbdimas' => $arrayAbdimas,
            'rekapResearch' => $arrayResearch,
            'rekapAbdimasLolos' => $abdimasLolos,
            'rekapResearchLolos' => $researchLolos,
        ]);
    }
}
