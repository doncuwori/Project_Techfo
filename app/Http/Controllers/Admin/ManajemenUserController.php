<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use App\Models\DosenAccess;
use App\Models\Mahasiswa;
use App\Models\MahasiswaAccess;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManajemenUserController extends Controller
{
    public function index(){
        $user = auth()->user();

        $access = [

        ];

        $dosen = DosenAccess::all();

        foreach($dosen as $d){
            $access[$d->nama_akses]['username'] = $d->dosen->nidn;
            $access[$d->nama_akses]['name'] = $d->dosen->nama;
            $access[$d->nama_akses]['access'] = $d->nama_akses;
            $access[$d->nama_akses]['id'] = $d->id;
            $access[$d->nama_akses]['type'] = 'dosen';
        }

        $mahasiswa = MahasiswaAccess::all();

        foreach($mahasiswa as $m){
            $access[$m->instansi]['username'] = $m->mahasiswa->nim;
            $access[$m->instansi]['name'] = $m->mahasiswa->nama;
            $access[$m->instansi]['access'] = $m->instansi;
            $access[$m->instansi]['id'] = $m->id;
            $access[$m->instansi]['type'] = 'mahasiswa';
        }

        $dosen = Dosen::all();
        $mahasiswa = Mahasiswa::all();

        return Inertia::render('Admin/ManajemenUser', [
            'user' => $user,
            'access' => $access,
            'dosen' => $dosen,
            'mahasiswa' => $mahasiswa
        ]);
    }

    public function update(Request $request){

        if($request->type == 'dosen'){
            DosenAccess::where('id', $request->id_access)->update([
                'id_dosen' => $request->id_dosen
            ]);
        } else {
            MahasiswaAccess::where('id', $request->id_access)->update([
                'id_mahasiswa' => $request->id_mahasiswa
            ]);
        }    

        return redirect()->back()->with('success', 'Role berhasil diubah');
    }
}
