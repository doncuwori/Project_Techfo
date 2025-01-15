<?php

namespace App\Http\Controllers;

use App\Models\Abdimas\AbdimasRecipient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AbdimasRecipientController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // Validasi data request
        $request->validate([
            'name' => 'required|string',
            'telephone' => 'required|string|max:15',
            'organizer' => 'required|string',
            'khs' => 'required|file',
            'cv' => 'required|file',
            'portofolio' => 'required|file',
            'foto' => 'required|file',
        ]);

        // Simpan data abdimas registrant
        $abdimas = AbdimasRecipient::create([
            'name' => $request->name,
            'telephone' => $request->telephone,
            'organizer' => $request->organizer,
            'khs' => $request->khs->store('khs'),
            'cv' => $request->cv->store('cv'),
            'portofolio' => $request->portofolio->store('portofolio'),
            'foto' => $request->foto->store('foto'),
            'created_by' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Hubungkan abdimas registrant dengan user yang membuatnya
        $abdimas->users()->attach($user->id);

        return redirect()->route('daftarAbdimas')->with('success', 'Abdimas berhasil didaftarkan.');
    }
}
