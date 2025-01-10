<?php

namespace App\Http\Controllers;

use App\Models\Competitions\CompetitionInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;
use Inertia\Inertia;

class CompetitionInformationController extends Controller
{
    public function index()
    {
        // return view('competition-information');
        $user = auth()->user();

        return Inertia::render('Admin/PusatInformasi/TambahInfoLomba', [
            'user' => $user,
        ]);
    }

    public function edit(string $id)
    {
        $user = auth()->user();

        $data = CompetitionInformation::where('id', $id)->first();

        return Inertia::render('Admin/PusatInformasi/EditInfoLomba', [
            'user' => $user,
            'data' => $data
        ]);
    }

    public function update(string $id, Request $request)
    {
        $competition = CompetitionInformation::where('id', $id)->first();
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
        $competition->update([
            'name' => $request->name,
            'organizer' => $request->organizer,
            'event_time_start' => $request->event_time_start,
            'event_time_end' => $request->event_time_end,
            'description' => $request->description,
            'poster_url' => $filename??$competition->poster_url,
            'activity_link' => $request->activity_link,
            'guidebook_link' => $request->guidebook_link,
            'updated_at' => now(),
        ]);

        // Return a response
        return redirect()->route('pusatLomba')->with('success', 'Informasi lomba berhasil diubah');
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
        $competition = CompetitionInformation::create([
            'name' => $request->name,
            'organizer' => $request->organizer,
            'event_time_start' => $request->event_time_start,
            'event_time_end' => $request->event_time_end,
            'description' => $request->description,
            'poster_url' => $filename,
            'activity_link' => $request->activity_link,
            'guidebook_link' => $request->guidebook_link,
            'created_by' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->route('pusatLomba')->with('success', 'Informasi lomba berhasil ditambahkan');
    }

    public function show(CompetitionInformation $postId)
    {
        $postId->load('user');
        return Inertia::render('User/Lomba/DetailLomba', [
            'data' => $postId
        ]);
    }

    public function destroy(string $id)
    {
        $competition = CompetitionInformation::where('id', $id)->first();
        $competition->delete();
        return redirect()->route('pusatLomba')->with('success', 'Informasi lomba berhasil dihapus');
    }
}
