<?php

namespace App\Http\Controllers;

use App\Models\Scholarships\ScholarshipInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ScholarshipInformationController extends Controller
{
    public function index()
    {
        // return view('scholarship-information');
        $user = auth()->user();

        return Inertia::render('Admin/PusatInformasi/TambahInfoBeasiswa', [
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if ($request->hasFile('poster_url')) {
            $file = $request->file('poster_url');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/'), $filename);
            $filename = '/images/' . $filename;
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'organizer' => 'required|string|max:255',
            'event_time_start' => 'required|date',
            'event_time_end' => 'required|date',
            'description' => 'required|string',
            'activity_link' => 'required|url',
            'guidebook_link' => 'required|url',
        ]);

        // Create a new scholarship information record
        $scholarship = ScholarshipInformation::create([
            'name' => $request->name,
            'organizer' => $request->organizer,
            'event_time_start' => $request->event_time_start,
            'event_time_end' => $request->event_time_end,
            'description' => $request->description,
            'activity_link' => $request->activity_link,
            'guidebook_link' => $request->guidebook_link,
            'poster_url' => $filename,
            'created_by' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Return a response
        return redirect()->route('tambahInfoBeasiswa')->with('success', 'Informasi beasiswa berhasil ditambahkan');
    }

    public function show(ScholarshipInformation $postId)
    {
        return Inertia::render('User/Beasiswa/DetailBeasiswa', [
            'data' => $postId
        ]);
    }
}
