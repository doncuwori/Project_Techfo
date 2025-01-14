<?php

namespace App\Http\Controllers;

use App\Models\Abdimas\AbdimasInformation;
use App\Models\Abdimas\DosenAbdimas;
use App\Models\Dosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AbdimasInformationController extends Controller
{
    public function index()
    {

        $user = auth()->user();
        $dosen = Dosen::all();

        return Inertia::render('Admin/PusatInformasi/TambahInfoAbdimas', [
            'user' => $user,
            'dosen' => $dosen
        ]);
    }

    public function edit(string $id)
    {

        $user = auth()->user();
        $dosen = Dosen::all();
        $data = AbdimasInformation::with('dosen')->where('id', $id)->first();

        return Inertia::render('Admin/PusatInformasi/EditInfoAbdimas', [
            'user' => $user,
            'dosen' => $dosen,
            'data' => $data
        ]);
    }

    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            $request->validate([
                'name' => 'required|string|max:255',
                'event_time_start' => 'required|date',
                'event_time_end' => 'required|date',
                'location' => 'required|string|max:255',
                'total_students_required' => 'required|integer',
                'description' => 'required|string'
            ]);


            $abdimas = AbdimasInformation::create([
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

            foreach ($request->dosens as  $index => $d) {
                if ($d != null) {
                    DosenAbdimas::create([
                        'id_dosen' => $d,
                        'id_abdimas_information' => $abdimas->id,
                        'is_leader' => $index == 0 ? true : false
                    ]);
                }
            }

            return redirect()->route('pusatAbdimas')->with('success', 'Informasi pengabdian Masyarakat berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Informasi pengabdian Masyarakat gagal ditambahkan :'. $e->getMessage());
        }
    }

    public function update(string $id, Request $request)
    {
        try{
            $abdimas = AbdimasInformation::where('id', $id)->first();
            $user = Auth::user();
    
            $request->validate([
                'name' => 'required|string|max:255',
                'event_time_start' => 'required|date',
                'event_time_end' => 'required|date',
                'location' => 'required|string|max:255',
                'total_students_required' => 'required|integer',
                'description' => 'required|string'
            ]);
    
    
            $abdimas->update([
                'name' => $request->name,
                'event_time_start' => $request->event_time_start,
                'event_time_end' => $request->event_time_end,
                'location' => $request->location,
                'total_students_required' => $request->total_students_required,
                'funding' => $request->funding,
                'description' => $request->description,
            ]);
    
            $current = DosenAbdimas::where('id_abdimas_information', $abdimas->id)->get();
            $requested = $request->dosens;
    
            foreach ($current as $c) {
                if (!in_array($c->id_dosen, $requested)) {
                    DosenAbdimas::where('id_dosen', $c->id_dosen)->where('id_abdimas_information', $abdimas->id)->delete();
                }
            }
    
            foreach ($request->dosens as  $index => $d) {
    
                $exist = DosenAbdimas::where('id_dosen', $d)->where('id_abdimas_information', $abdimas->id)->first();
    
                if ($exist) {
                    continue;
                }
    
                if ($d != null) {
                    DosenAbdimas::create([
                        'id_dosen' => $d,
                        'id_abdimas_information' => $abdimas->id,
                        'is_leader' => $index == 0 ? true : false
                    ]);
                }
            }
    
            return redirect()->route('pusatAbdimas')->with('success', 'Informasi pengabdian Masyarakat berhasil diubah');
        }catch (\Exception $e){
            return redirect()->back()->with('error', 'Informasi pengabdian Masyarakat gagal diubah :'. $e->getMessage());
        }
        
    }

    public function show(string $postId)
    {

        $postId = AbdimasInformation::with(['dosen', 'user'])->where('id', $postId)->first();

        return Inertia::render('User/Abdimas/DetailAbdimas', [
            'data' => $postId
        ]);
    }


    public function destroy(string $id)
    {
        $abdimas = AbdimasInformation::where('id', $id)->first();
        DosenAbdimas::where('id_abdimas_information', $abdimas->id)->delete();
        $abdimas->delete();
        return redirect()->route('pusatAbdimas')->with('success', 'Informasi pengabdian Masyarakat berhasil dihapus');
    }
}
