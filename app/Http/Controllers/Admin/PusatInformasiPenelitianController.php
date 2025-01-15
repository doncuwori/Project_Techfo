<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Researchs\MahasiswaRegistrant;
use App\Models\Researchs\ResearchInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PusatInformasiPenelitianController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $data = ResearchInformation::orderBy('created_at', 'desc')->with(['researchRegistrant.mahasiswa', 'user.mahasiswa.mahasiswaAccess'])->get();

        if (Gate::check('dosen') && !Gate::check('wadek')) {
            $data = $data->filter(function ($query) use ($user) {
                return $query->leader->id_dosen == $user->dosen->id;
            });
        }

        return Inertia::render('Admin/PusatInformasi/PusatPenelitian', [
            'user' => $user,
            'data' => $data
        ]);
    }

    public function show(string $id)
    {
        $user = Auth::user();
        $data = ResearchInformation::with(['dosen', 'researchRegistrant.mahasiswa'])->where('id', $id)->first();

        return Inertia::render('Admin/PusatInformasi/PusatInformasiPenelitian', [
            'research' => $data,
            'user' => $user
        ]);
    }

    public function register(Request $request)
    {
        $selected = $request->id_research_registrant ?? [];

        foreach ($selected as $id) {
            if ($id['value'] == null) {
                continue;
            }

            if ($id['value'] == 'accepted') {
                MahasiswaRegistrant::where('id_research_registrant', $id)->update([
                    'accepted' => true
                ]);
            } elseif ($id['value'] == 'rejected') {
                MahasiswaRegistrant::where('id_research_registrant', $id)->update([
                    'rejected' => true
                ]);
            }
        }

        return redirect()->route('pusatPenelitian')->with('success', 'Penerimaan berhasil');
    }

    public function uploadSurat(Request $request)
    {
        if ($request->hasFile('surat_tugas')) {
            $file = $request->file('surat_tugas');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('surat/'), $filename);

            ResearchInformation::where('id', $request->id)->update([
                'surat_tugas' => $filename
            ]);

            return redirect()->route('pusatPenelitian')->with('success', 'Surat tugas berhasil diupload');
        } else {
            return redirect()->route('pusatPenelitian')->with('error', 'Surat tugas gagal diupload');
        }
    }
}
