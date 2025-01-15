<?php

namespace App\Http\Controllers;

use App\Models\Abdimas\AbdimasRegistrant;
use App\Models\Abdimas\MahasiswaRegistrant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AbdimasRegistrantController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        try {
            DB::beginTransaction();

            if ($request->hasFile('khs') && $request->hasFile('cv') && $request->hasFile('portofolio') && $request->hasFile('foto') && $request->hasFile('surat_pernyataan')) {
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

                $fileSuratPernyataan = $request->file('surat_pernyataan');
                $filenameSuratPernyataan = time() . '.' . $fileSuratPernyataan->getClientOriginalExtension();
                $fileSuratPernyataan->move(public_path('images/'), $filenameSuratPernyataan);
            }

            $registrant = AbdimasRegistrant::create([
                'id_abdimas_information' => $request->id_abdimas_information,
                'telephone' => $request->telephone,
                'khs' => $filenameKhs,
                'cv' => $filenameCv,
                'portofolio' => $filenamePortofolio,
                'foto' => $filenameFoto,
                'surat_pernyataan' => $filenameSuratPernyataan,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            MahasiswaRegistrant::create([
                'id_abdimas_registrant' => $registrant->id,
                'id_mahasiswa' => $user->mahasiswa->id,
            ]);


            DB::commit();
            return redirect()->route('profile')->with('success', 'Abdimas berhasil didaftarkan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('daftarAbdimas', $request->id_abdimas_information)->with('error', 'Abdimas gagal didaftarkan!'. $e->getMessage());
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $abdimasRegistrants = AbdimasRegistrant::all();
        return response()->json($abdimasRegistrants, 200);
    }
}
