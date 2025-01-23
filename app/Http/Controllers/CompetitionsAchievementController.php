<?php

namespace App\Http\Controllers;

use App\Models\Competitions\CompetitionAchievement;
use App\Models\Competitions\CompetitionRegistrant;
use App\Models\Competitions\MahasiswaAchievement;
use App\Models\Competitions\MahasiswaRegistrant;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CompetitionsAchievementController extends Controller
{
    public function store(Request $request)
    {
        try {
            $user = Auth::user();
            $idMahasiswa = Mahasiswa::where('id_user', $user->id)->first()->id;

            $proof_scan_url = null;
            if ($request->hasFile('proof_scan_url')) {
                $file = $request->file('proof_scan_url');
                $proof_scan_url = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/'), $proof_scan_url);
            }

            $event_photo_url = null;
            if ($request->hasFile('event_photo_url')) {
                $file = $request->file('event_photo_url');
                $event_photo_url = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/'), $event_photo_url);
            }

            $report_url = null;
            if ($request->hasFile('report_url')) {
                $file = $request->file('report_url');
                $report_url = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/'), $report_url);
            }

            $competition = CompetitionAchievement::create(
                [
                    'id_dosen' => $request->id_dosen,
                    'id_country' => $request->id_country,
                    'ormawa_delegation' => $request->ormawa_delegation,
                    'activity_name' => $request->activity_name,
                    'field' => $request->field,
                    'type' => $request->type,
                    'scope' => $request->scope,
                    'organizer' => $request->organizer,
                    'location' => $request->location,
                    'activity_date_start' => $request->activity_date_start,
                    'activity_date_end' => $request->activity_date_end,
                    'description' => $request->description,
                    'degree' => $request->degree,
                    'proof_scan_url' => $proof_scan_url,
                    'event_photo_url' => $event_photo_url,
                    'report_url' => $report_url,
                    'phone' => $request->phone,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );

            $registrant = CompetitionRegistrant::create(
                [
                    'id_dosen' => $request->id_dosen,
                    'id_country' => $request->id_country,
                    'ormawa_delegation' => $request->ormawa_delegation,
                    'activity_name' => $request->activity_name,
                    'scope' => $request->scope,
                    'field' => $request->field,
                    'type' => $request->type,
                    'organizer' => $request->organizer,
                    'location' => $request->location,
                    'activity_date_start' => $request->activity_date_start,
                    'activity_date_end' => $request->activity_date_end,
                    'description' => $request->description,
                    'poster_url' => $event_photo_url,
                    'phone' => $request->phone,
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
                    if ($memberData == null) {
                        continue;
                    };
                    MahasiswaAchievement::create([
                        'id_competition_achievement' => $competition->id,
                        'id_mahasiswa' => $memberData,
                        'is_leader' => false
                    ]);
                }
            }

            MahasiswaRegistrant::create([
                'id_competition_registrant' => $registrant->id,
                'id_mahasiswa' => $idMahasiswa,
                'is_leader' => true
            ]);

            if ($request->is_group == true) {

                $members = $request->members;

                foreach ($members as $memberData) {
                    if ($memberData == null) {
                        continue;
                    };
                    MahasiswaRegistrant::create([
                        'id_competition_registrant' => $registrant->id,
                        'id_mahasiswa' => $memberData,
                        'is_leader' => false
                    ]);
                }
            }

            return redirect()->route('pendataanLomba')->with('success', 'Pendataan pemenang lomba berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Pendataan pemenang lomba gagal ditambahkan!');
        }
    }

    public function fillCreate(string $id)
    {
        $data = CompetitionRegistrant::with(['dosen', 'mahasiswa', 'country'])->where('id', $id)->first();

        return Inertia::render('User/Pendataan/PendataanLombaFill', [
            'data' => $data
        ]);
    }

    public function fillStore(Request $request)
    {
        try {
            $data = CompetitionRegistrant::find($request->id_competition_registrant);

            $proof_scan_url = null;
            if ($request->hasFile('proof_scan_url')) {
                $file = $request->file('proof_scan_url');
                $proof_scan_url = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/'), $proof_scan_url);
            }

            $event_photo_url = null;
            if ($request->hasFile('event_photo_url')) {
                $file = $request->file('event_photo_url');
                $event_photo_url = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/'), $event_photo_url);
            }

            $report_url = null;
            if ($request->hasFile('report_url')) {
                $file = $request->file('report_url');
                $report_url = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/'), $report_url);
            }

            $competition = CompetitionAchievement::create(
                [
                    'id_dosen' => $data->id_dosen,
                    'id_country' => $data->id_country,
                    'ormawa_delegation' => $data->ormawa_delegation,
                    'activity_name' => $data->activity_name,
                    'field' => $data->field,
                    'type' => $data->type,
                    'scope' => $data->scope,
                    'organizer' => $data->organizer,
                    'location' => $data->location,
                    'activity_date_start' => $data->activity_date_start,
                    'activity_date_end' => $data->activity_date_end,
                    'description' => $data->description,
                    'degree' => $request->degree,
                    'proof_scan_url' => $proof_scan_url,
                    'event_photo_url' => $event_photo_url,
                    'report_url' => $report_url,
                    'phone' => $data->phone,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );

            $participant = $data->participants;

            foreach ($participant as $participantData) {
                MahasiswaAchievement::create([
                    'id_competition_achievement' => $competition->id,
                    'id_mahasiswa' => $participantData->id_mahasiswa,
                    'is_leader' => $participantData->is_leader
                ]);
            }

            return redirect()->route('profile')->with('success', 'Prestasi berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Pendataan pemenang lomba gagal ditambahkan!');
        }
    }
}
