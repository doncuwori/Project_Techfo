<?php

namespace App\Http\Controllers;

use App\Models\Competitions\CompetitionAchievement;
use App\Models\Competitions\MahasiswaAchievement;
use App\Models\Mahasiswa;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompetitionsAchievementController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        $idMahasiswa = Mahasiswa::where('id_user', $user->id)->first()->id;

        $poster_url = null;
        if($request->hasFile('poster_url')) {
            $file = $request->file('poster_url');
            $poster_url = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/'), $poster_url);
        }

        $scan_evidence_url = null;
        if($request->hasFile('scan_evidence_url')) {
            $file = $request->file('scan_evidence_url');
            $scan_evidence_url = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/'), $scan_evidence_url);
        }

        $photo_activity_url = null;
        if($request->hasFile('photo_activity_url')) {
            $file = $request->file('photo_activity_url');
            $photo_activity_url = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/'), $photo_activity_url);
        }

        $competition = CompetitionAchievement::create(
            [
                'id_dosen' => $request->id_dosen,
                'id_country' => $request->id_country,
                'ormawa_delegation' => $request->ormawa_delegation,
                'activity_name' => $request->activity_name,
                'field' => $request->field,
                'organizer' => $request->organizer,
                'location' => $request->location,
                'activity_date_start' => $request->activity_date_start,
                'activity_date_end' => $request->activity_date_end,
                'description' => $request->description,
                'poster_url' => $poster_url,
                'achievement_level' => $request->achievement_level,
                'scan_evidence_url' => $scan_evidence_url,
                'photo_activity_url' => $photo_activity_url,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        MahasiswaAchievement::create([
            'id_competition_achievement' => $competition->id,
            'id_mahasiswa' => $idMahasiswa,
            'is_leader' => true
        ]);

        if ($request->is_group == true) {

            $members = $request->members;

            foreach ($members as $memberData) {
                if($memberData == null) {
                    continue;
                };
                MahasiswaAchievement::create([
                    'id_competition_achievement' => $competition->id,
                    'id_mahasiswa' => $memberData,
                    'is_leader' => false
                ]);
            }
        }

        return redirect()->route('pendataanLomba')->with('success', 'Partisipasi berhasil ditambahkan');
    }
}
