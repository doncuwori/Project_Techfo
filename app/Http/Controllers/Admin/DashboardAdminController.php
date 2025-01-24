<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Abdimas\AbdimasInformation;
use App\Models\Abdimas\MahasiswaRegistrant;
use App\Models\Competitions\CompetitionRegistrant;
use App\Models\Competitions\CompetitionAchievement;
use App\Models\Competitions\MahasiswaAchievement;
use App\Models\Competitions\MahasiswaRegistrant as CompetitionsMahasiswaRegistrant;
use App\Models\Prodi;
use App\Models\Researchs\MahasiswaRegistrant as ResearchsMahasiswaRegistrant;
use App\Models\Researchs\ResearchInformation;
use App\Models\Scholarships\MahasiswaRecipient;
use App\Models\Scholarships\ScholarshipRecipient;
use App\Models\Scholarships\ScholarshipRegistrant;
use Inertia\Inertia;

class DashboardAdminController extends Controller
{
    public function index()
    {
        $competitionRegistrantsCount = \App\Models\Competitions\MahasiswaRegistrant::count();
        $competitionAchievementsCount = MahasiswaAchievement::whereHas('competitionAchievement', function($query){
            $query->where('is_validated', true);
        })->count();
        $scholarshipRegistrantsCount = ScholarshipRegistrant::count();
        $scholarshipRecipientsCount = ScholarshipRecipient::where('is_validated', true)->count();

        $abdimasRegistrantsCount = MahasiswaRegistrant::count();
        $abdimasRecipientsCount = MahasiswaRegistrant::where('accepted', true)->count();

        $researchRegistrantsCount = ResearchsMahasiswaRegistrant::count();
        $researchRecipientsCount = ResearchsMahasiswaRegistrant::where('accepted', true)->count();

        $bidang = [
            'UI/UX Design',
            'Front-End Development',
            'Back-End Development',
            'Business Plan',
            'Cybersecurity',
            'Data Science & Machine Learning',
            'Mobile App Development',
            'Game Development',
            'Internet of Things (IoT)',
            'Hackathon',
            'Software Engineering',
            'Cloud Computing',
            'Robotics and Automation',
            'Augmented Reality (AR) / Virtual Reality (VR)',
            'Blockchain Development',
            'Digital Marketing',
            'Artificial Intelligence (AI)',
            'Big Data Analytics',
            'DevOps',
            'Virtual Assistant Management',
            'Web Development',
            'Digital Animation',
            'Full-Stack Development',
            'Lainnya'
        ];

        $bidangPeserta = [];
        $bidangPemenang = [];
        foreach($bidang as $b){
            $bidangPeserta[$b] = CompetitionsMahasiswaRegistrant::whereHas('competitionRegistrant', function ($query) use ($b) {
                $query->where('type', $b);
            })->count();
            $bidangPemenang[$b] = MahasiswaAchievement::whereHas('competitionAchievement', function ($query) use ($b) {
                $query->where('type', $b)->where('is_validated', true);
            })->count();
        }

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

        foreach($kategoriJuara as $k){
            foreach($prodi as $p){
                $arrayJuara[$k][$p->nama_prodi] = MahasiswaAchievement::whereHas('mahasiswa', function ($query) use ($p) {
                    $query->whereHas('prodi', function ($query) use ($p) {
                        $query->where('id', $p->id);
                    });
                })->whereHas('competitionAchievement', function ($query) use ($k) {
                    $query->where('degree', $k)->where('is_validated', true);
                })->count();
            }
        }

        $arrayLomba = [];

        foreach($prodi as $p){
            $arrayLomba[$p->nama_prodi] = MahasiswaAchievement::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->whereHas('competitionAchievement', function ($query) use ($k) {
                $query->where('is_validated', true);
            })->count();
        }

        $arrayBeasiswa = [];

        foreach($prodi as $p){
            $arrayBeasiswa[$p->nama_prodi] = MahasiswaRecipient::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->whereHas('scholarshipRecipient', function ($query) use ($k) {
                $query->where('is_validated', true);
            })->count();
        }

        $arrayAbdimas = [];

        foreach($prodi as $p){
            $arrayAbdimas[$p->nama_prodi] = MahasiswaRegistrant::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->count();
        }

        $abdimasLolos = [];

        foreach($prodi as $p){
            $abdimasLolos[$p->nama_prodi] = MahasiswaRegistrant::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->where('accepted', true)->count();
        }

        $arrayResearch = [];

        foreach($prodi as $p){
            $arrayResearch[$p->nama_prodi] = ResearchsMahasiswaRegistrant::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->count();
        }

        $researchLolos = [];

        foreach($prodi as $p){
            $researchLolos[$p->nama_prodi] = ResearchsMahasiswaRegistrant::whereHas('mahasiswa', function ($query) use ($p) {
                $query->whereHas('prodi', function ($query) use ($p) {
                    $query->where('id', $p->id);
                });
            })->where('accepted', true)->count();
        }

        $funding = [
            'Hibah Instansi Pemerintah',
            'Hibah Instansi Swasta',
            'Mandiri'
        ];

        $arrayFundingAbdimas = [];

        foreach($funding as $f){
            $arrayFundingAbdimas[$f] = AbdimasInformation::where('funding', $f)->count();
        }

        $arrayFundingPenelitian = [];

        foreach($funding as $f){
            $arrayFundingPenelitian[$f] = ResearchInformation::where('funding', $f)->count();
        }

        return Inertia::render('Admin/DashboardAdmin', [
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
            'arrayFundingAbdimas' => $arrayFundingAbdimas,
            'arrayFundingPenelitian' => $arrayFundingPenelitian,
            'bidangPeserta' => $bidangPeserta,
            'bidangPemenang' => $bidangPemenang
        ]);
    }
}