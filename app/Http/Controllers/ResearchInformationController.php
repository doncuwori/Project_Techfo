<?php

namespace App\Http\Controllers;

use App\Models\Researchs\DosenResearch;
use App\Models\Researchs\ResearchInformation;
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
        // return view('competition-information');
        $user = auth()->user();

        return Inertia::render('Admin/PusatInformasi/TambahInfoPenelitian', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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
            // 'assignment_letter_url' => 'required|url',
        ]);


        $abdimas = ResearchInformation::create([
            'name' => $request->name,
            'event_time_start' => $request->event_time_start,
            'event_time_end' => $request->event_time_end,
            'location' => $request->location,
            'total_students_required' => $request->total_students_required,
            'created_by' => $user->id,
            'description' => $request->description,
            // 'assignment_letter_url' => "https://www.google.com",
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        foreach($request->dosens as  $index => $d) {
            if($d!= null){
                DosenResearch::create([
                    'id_dosen' => $d,
                    'id_research_information' => $abdimas->id,
                    'is_leader' => $index == 0 ? true : false
                ]);
            }
        }

        return redirect()->route('pusatPenelitian')->with('success', 'Informasi penelitian berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(ResearchInformation $postId)
    {
        return Inertia::render('User/Penelitian/DetailPenelitian', [
            'data' => $postId
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ResearchInformation $researchInformation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ResearchInformation $researchInformation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ResearchInformation $researchInformation)
    {
        //
    }
}
