<?php

namespace App\Http\Controllers;

use App\Models\Mahasiswa;
use App\Models\Scholarships\MahasiswaRecipient;
use App\Models\Scholarships\ScholarshipRecipient;
use App\Models\Scholarships\ScholarshipRegistrant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScholarshipRecipientController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        $idMahasiswa = Mahasiswa::where('id_user', $user->id)->first()->id;

        $proof_scan_url = null;
        if ($request->hasFile('proof_scan_url')) {
            $file = $request->file('proof_scan_url');
            $proof_scan_url = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/'), $proof_scan_url);
        }

        $poster_url = null;
        if ($request->hasFile('poster_url')) {
            $file = $request->file('poster_url');
            $poster_url = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/'), $poster_url);
        }

        $scholarship = ScholarshipRecipient::create([
            'id_country' => $request->id_country,
            'name' => $request->name,
            'type' => $request->type,
            'organizer' => $request->organizer,
            'event_date_start' => $request->event_date_start,
            'event_date_end' => $request->event_date_end,
            'description' => $request->description,
            'proof_scan_url' => $proof_scan_url,
            'poster_url' => $poster_url,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        MahasiswaRecipient::create([
            'id_scholarship_recipient' => $scholarship->id,
            'id_mahasiswa' => $idMahasiswa,
        ]);

        return redirect()->route('pendataanBeasiswa')->with('success', 'Beasiswa berhasil ditambahkan');
    }

    public function fillCreate(string $id)
    {
        $data = ScholarshipRegistrant::with(['mahasiswa', 'country'])->where('id', $id)->first();

        return Inertia::render('User/Pendataan/PendataanBeasiswaFill', [
            'data' => $data
        ]);
    }

    public function fillStore(Request $request)
    {
        $data = ScholarshipRegistrant::find($request->id_scholarship_registrant);

        $proof_scan_url = null;
        if ($request->hasFile('proof_scan_url')) {
            $file = $request->file('proof_scan_url');
            $proof_scan_url = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/'), $proof_scan_url);
        }

        $poster_url = null;
        if ($request->hasFile('poster_url')) {
            $file = $request->file('poster_url');
            $poster_url = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/'), $poster_url);
        }

        $scholarship = ScholarshipRecipient::create(
            [
                'id_country' => $data->id_country,
                'name' => $data->name,
                'type' => $data->type,
                'organizer' => $data->organizer,
                'event_date_start' => $data->event_date_start,
                'event_date_end' => $data->event_date_end,
                'description' => $data->description,
                'proof_scan_url' => $proof_scan_url,
                'poster_url' => $poster_url,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        $participant = $data->participants;

        foreach ($participant as $participantData) {
            MahasiswaRecipient::create([
                'id_scholarship_recipient' => $scholarship->id,
                'id_mahasiswa' => $participantData->id_mahasiswa,
            ]);
        }

        return redirect()->route('profile')->with('success', 'Prestasi berhasil ditambahkan');
    }
}
