<?php

namespace App\Http\Controllers;

use App\Models\Researchs\DosenResearch;
use App\Models\Researchs\ResearchInformation;
use App\Models\Dosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResearchInformationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $user = auth()->user();
        $dosen = Dosen::all();

        return Inertia::render('Admin/PusatInformasi/TambahInfoPenelitian', [
            'user' => $user,
            'dosen' => $dosen
        ]);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'event_time_start' => 'required|date',
            'event_time_end' => 'required|date',
            'location' => 'required|string|max:255',
            'total_students_required' => 'required|integer',
            'description' => 'required|string'
        ]);


        $research = ResearchInformation::create([
            'name' => $request->name,
            'event_time_start' => $request->event_time_start,
            'event_time_end' => $request->event_time_end,
            'location' => $request->location,
            'total_students_required' => $request->total_students_required,
            'created_by' => $user->id,
            'description' => $request->description,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        foreach($request->dosens as  $index => $d) {
            if($d!= null){
                DosenResearch::create([
                    'id_dosen' => $d,
                    'id_research_information' => $research->id,
                    'is_leader' => $index == 0 ? true : false
                ]);
            }
        }

        return redirect()->route('pusatPenelitian')->with('success', 'Informasi penelitian berhasil ditambahkan');
    }

    public function show(string $postId) {

        $postId = ResearchInformation::with('dosen')->where('id', $postId)->first();

        return Inertia::render('User/Penelitian/DetailPenelitian', [
            'data' => $postId
        ]);
    }
}
