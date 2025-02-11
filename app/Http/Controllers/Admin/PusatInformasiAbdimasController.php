<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Abdimas\AbdimasInformation;
use App\Models\Abdimas\AbdimasRegistrant;
use App\Models\Abdimas\MahasiswaRegistrant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class PusatInformasiAbdimasController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $data = AbdimasInformation::orderBy('created_at', direction: 'desc')
            ->with(['abdimasRegistrant.mahasiswa', 'user.mahasiswa.mahasiswaAccess'])
            ->get();


        if (Gate::check('dosen') && !Gate::check('wadek')) {
            $data = $data->filter(function ($query) use ($user) {
                return $query->leader->id_dosen == $user->dosen->id;
            });
        }

        return Inertia::render('Admin/PusatInformasi/PusatAbdimas', [
            'user' => $user,
            'data' => $data
        ]);
    }

    public function show(string $id)
    {
        $user = Auth::user();
        $data = AbdimasInformation::with(['dosen', 'abdimasRegistrant.mahasiswa'])->where('id', $id)->first();

        return Inertia::render('Admin/PusatInformasi/PusatInformasiAbdimas', [
            'abdimas' => $data,
            'user' => $user
        ]);
    }

    public function register(Request $request)
    {
        $selected = $request->id_abdimas_registrant ?? [];

        foreach ($selected as $id) {
            if ($id['value'] == null) {
                continue;
            }

            if ($id['value'] == 'accepted') {
                MahasiswaRegistrant::where('id_abdimas_registrant', $id)->update([
                    'accepted' => true
                ]);
            } elseif ($id['value'] == 'rejected') {
                MahasiswaRegistrant::where('id_abdimas_registrant', $id)->update([
                    'rejected' => true
                ]);
            }
        }

        return redirect()->route('pusatAbdimas')->with('success', 'Penerimaan berhasil');
    }

    public function uploadSurat(Request $request)
    {
        if ($request->hasFile('surat_tugas')) {
            $file = $request->file('surat_tugas');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('surat/'), $filename);

            AbdimasInformation::where('id', $request->id)->update([
                'surat_tugas' => $filename
            ]);

            return redirect()->route('pusatAbdimas')->with('success', 'Surat tugas berhasil diupload');
        } else {
            return redirect()->route('pusatAbdimas')->with('error', 'Surat tugas gagal diupload');
        }
    }

    public function rejectProposal($id)
    {
        $info = AbdimasInformation::where('id', $id)->first();

        foreach ($info->abdimasRegistrant as $registrant) {
            $reg = AbdimasRegistrant::where('id_abdimas_information', $id)->first();
            $mhs = MahasiswaRegistrant::where('id_abdimas_registrant', $reg->id)->first();

            $mhs->update([
                'rejected' => true,
                'accepted' => false
            ]);
        }

        $info->update([
            'proposal_rejected' => true
        ]);

        return redirect()->route('pusatAbdimas')->with('success', 'Berhasil Menolak Proposal');
    }
}
