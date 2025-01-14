<?php

namespace App\Http\Controllers;

use App\Models\Researchs\MahasiswaRegistrant;
use App\Models\Researchs\ResearchRegistrant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ResearchRegistrantController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        try{
            DB::beginTransaction();

            if($request->hasFile('khs') && $request->hasFile('cv') && $request->hasFile('portofolio') && $request->hasFile('foto')){
                $fileKhs = $request->file('khs');
                $filenameKhs = time() . '.' . $fileKhs->getClientOriginalExtension();
                $fileKhs->move(public_path('images/'), $filenameKhs);

                $fileCv = $request->file('cv');
                $filenameCv = time() . '.' . $fileCv->getClientOriginalExtension();
                $fileCv->move(public_path('images/'), $filenameCv);

                $filePortofolio = $request->file('portofolio'); 
                $filenamePortofolio = time() . '.' . $filePortofolio->getClientOriginalExtension();
                $filePortofolio->move(public_path('images/'), $filenamePortofolio);

                $fileFoto = $request->file('foto');
                $filenameFoto = time() . '.' . $fileFoto->getClientOriginalExtension();
                $fileFoto->move(public_path('images/'), $filenameFoto);
            }

            $registrant = ResearchRegistrant::create([
                'id_research_information' => $request->id_research_information,
                'telephone' => $request->telephone,
                'khs' => $filenameKhs,
                'cv' => $filenameCv,
                'portofolio' => $filenamePortofolio,
                'foto' => $filenameFoto,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            MahasiswaRegistrant::create([
                'id_research_registrant' => $registrant->id,
                'id_mahasiswa' => $user->mahasiswa->id,
            ]);


            DB::commit();
            return redirect()->route('profile')->with('success', 'Penelitian berhasil didaftarkan.');
        }catch(\Exception $e){
            DB::rollBack();
            return redirect()->route('daftarPenelitian', $request->id_research_information)->with('error', 'Penelitian gagal didaftarkan!');

        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $researchRegistrants = ResearchRegistrant::all();
        return response()->json($researchRegistrants, 200);
    }
}
