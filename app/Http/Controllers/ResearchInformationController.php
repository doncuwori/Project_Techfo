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

    public function edit(string $id)
    {
        
        $user = auth()->user();
        $dosen = Dosen::all();
        $data = ResearchInformation::with('dosen')->where('id', $id)->first();

        return Inertia::render('Admin/PusatInformasi/EditInfoPenelitian', [
            'user' => $user,
            'dosen' => $dosen,
            'data' => $data
        ]);
    }

    public function store(Request $request)
    {
        try{
            
            $dosenFilter = array_filter($request->dosens, function($val) {
                return $val != null;
            });

            $dosenFilter = array_values($dosenFilter);

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
                'funding' => $request->funding,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
    
            foreach($dosenFilter as  $index => $d) {
                if($d!= null){
                    DosenResearch::create([
                        'id_dosen' => $d,
                        'id_research_information' => $research->id,
                        'is_leader' => $index == 0 ? true : false
                    ]);
                }
            }
    
            return redirect()->route('pusatPenelitian')->with('success', 'Informasi penelitian berhasil ditambahkan');
        }catch(\Exception $e){
            return redirect()->back()->with('error', 'Informasi penelitian gagal ditambahkan : ');
        }
        
    }

    public function update(string $id, Request $request){
        try{
            $research = ResearchInformation::where('id', $id)->first();
            $user = Auth::user();
    
            $request->validate([
                'name' => 'required|string|max:255',
                'event_time_start' => 'required|date',
                'event_time_end' => 'required|date',
                'location' => 'required|string|max:255',
                'total_students_required' => 'required|integer',
                'description' => 'required|string'
            ]);

            
            $dosenFilter = array_filter($request->dosens, function($val) {
                return $val != null;
            });

            $dosenFilter = array_values($dosenFilter);
            
            $research->update([
                'name' => $request->name,
                'event_time_start' => $request->event_time_start,
                'event_time_end' => $request->event_time_end,
                'location' => $request->location,
                'total_students_required' => $request->total_students_required,
                'funding' => $request->funding,
                'description' => $request->description,
            ]);
    
            $current = DosenResearch::where('id_research_information', $research->id)->get();
            $requested = $dosenFilter;
    
            foreach($current as $c){
                if(!in_array($c->id_dosen, $requested)){
                    DosenResearch::where('id_dosen', $c->id_dosen)->where('id_research_information', $research->id)->delete();
                }
            }
    
            foreach($dosenFilter as  $index => $d) {
                
                $exist = DosenResearch::where('id_dosen', $d)->where('id_research_information', $research->id)->first();
    
                if($exist){
                    continue;
                }
    
                if($d!= null){
                    DosenResearch::create([
                        'id_dosen' => $d,
                        'id_research_information' => $research->id,
                        'is_leader' => $index == 0 ? true : false
                    ]);
                }
            }
    
            return redirect()->route('pusatPenelitian')->with('success', 'Informasi penelitian berhasil diubah');
        }catch(\Exception $e){
            return redirect()->back()->with('error', 'Informasi penelitian gagal diubah : ');
        }
        
    }

    public function show(string $postId) {

        $postId = ResearchInformation::with(['dosen', 'user'])->where('id', $postId)->first();

        return Inertia::render('User/Penelitian/DetailPenelitian', [
            'data' => $postId
        ]);
    }

    
    public function destroy(string $id) {
        $research = ResearchInformation::where('id', $id)->first();
        DosenResearch::where('id_research_information', $research->id)->delete();
        $research->delete();

        return redirect()->route('pusatPenelitian')->with('success', 'Informasi penelitian berhasil dihapus');
    }
}
