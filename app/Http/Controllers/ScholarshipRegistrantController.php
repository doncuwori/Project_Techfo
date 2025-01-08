<?php

namespace App\Http\Controllers;

use App\Models\Scholarships\MahasiswaRegistrant;
use App\Models\Scholarships\ScholarshipRegistrant;
use App\Models\Mahasiswa;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ScholarshipRegistrantController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();

        $idMahasiswa = Mahasiswa::where('id_user', $user->id)->first()->id;

        $filename = null;
        if ($request->hasFile('poster_url')) {
            $file = $request->file('poster_url');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/'), $filename);
        }

        $scholarship = ScholarshipRegistrant::create([
            'id_country' => $request->id_country,
            'name' => $request->name,
            'type' => $request->type,
            'organizer' => $request->organizer,
            'event_date_start' => $request->event_date_start,
            'event_date_end' => $request->event_date_end,
            'description' => $request->description,
            'poster_url' => $filename,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        MahasiswaRegistrant::create([
            'id_scholarship_registrant' => $scholarship->id,
            'id_mahasiswa' => $idMahasiswa,
        ]);

        return redirect()->route('profile')->with('success', 'Beasiswa berhasil ditambahkan');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $scholarship = ScholarshipRegistrant::all();
        return response()->json($scholarship, 201);
    }
}
