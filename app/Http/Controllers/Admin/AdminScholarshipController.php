<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use App\Models\Mahasiswa;
use App\Models\MasterScholarship;
use App\Models\Prodi;
use App\Models\Scholarships\MahasiswaRecipient;
use App\Models\Scholarships\MahasiswaRegistrant;
use App\Models\Scholarships\ScholarshipRecipient;
use App\Models\Scholarships\ScholarshipRegistrant;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminScholarshipController extends Controller
{
    public function index(){
        $scholarshipRegistrantsCount = ScholarshipRegistrant::count();
        $scholarshipRecipientsCount = ScholarshipRecipient::count();

        $user = auth()->user();

        $dataPendaftar = ScholarshipRegistrant::with(['mahasiswa.prodi', 'country'])->orderBy('created_at', 'desc')->get();

        $dataPenerima = ScholarshipRecipient::with(['mahasiswa.prodi', 'country'])->orderBy('created_at', 'desc')->get();

        $prodi = Prodi::all();

        $angkatan = Mahasiswa::distinct('angkatan')->pluck('angkatan');

        $jenis = MasterScholarship::pluck('name');

        return Inertia::render('Admin/Laporan/LaporanBeasiswa', [
            'scholarshipRegistrantsCount' => $scholarshipRegistrantsCount,
            'scholarshipRecipientsCount' => $scholarshipRecipientsCount,
            'user' => $user,
            'dataPendaftar' => $dataPendaftar,
            'dataPenerima' => $dataPenerima,
            'prodi' => $prodi,
            'angkatan' => $angkatan,
            'jenis' => $jenis,
        ]);
    }

    public function validate(string $id)
    {
        $scholarshipRegistrant = ScholarshipRecipient::find($id);
        $scholarshipRegistrant->update([
            'is_validated' => true
        ]);
        return redirect()->back();
    }

    public function createRegistrant(Request $request){
        $mahasiswa = Mahasiswa::all();
        $country = Country::all();
        $jenisBeasiswa = MasterScholarship::all();
        $user = auth()->user();

        return Inertia::render('Admin/Laporan/TambahPendaftar', [
            'mahasiswa' => $mahasiswa,
            'country' => $country,
            'jenisBeasiswa' => $jenisBeasiswa,
            'user' => $user
        ]);
    }

    public function storeRegistrant(Request $request)
    {
         try {
            $user = Auth::user();

            $idMahasiswa = $request->id_mahasiswa;

            $filename = null;
            if ($request->hasFile('poster_url')) {
                $file = $request->file('poster_url');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/'), $filename);
            }

            $scholarship = ScholarshipRegistrant::create([
                'id_country' => $request->id_country,
                'name' => $request->name,
                'type' => $request->type,
                'organizer' => $request->organizer,
                'event_date_start' => $request->event_date_start,
                'event_date_end' => $request->event_date_end,
                'description' => $request->description,
                'poster_url' => $filename,
                'phone' => $request->phone,
                'created_at' => now(),
                'updated_at' => now(),
                'amount' => $request->amount
            ]);

            MahasiswaRegistrant::create([
                'id_scholarship_registrant' => $scholarship->id,
                'id_mahasiswa' => $idMahasiswa,
            ]);

            return redirect()->route('laporanBeasiswa')->with('success', 'Pendataan pendaftar beasiswa berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Pendataan pendaftar beasiswa gagal ditambahkan!');
        }
    }

    public function createRecipient(Request $request){
        $mahasiswa = Mahasiswa::all();
        $country = Country::all();
        $jenisBeasiswa = MasterScholarship::all();
        $user = auth()->user();

        return Inertia::render('Admin/Laporan/TambahPenerima', [
            'mahasiswa' => $mahasiswa,
            'country' => $country,
            'jenisBeasiswa' => $jenisBeasiswa,
            'user' => $user
        ]);
    }

    public function storeRecipient(Request $request)
    {
         try {
            $user = Auth::user();

            $idMahasiswa = $request->id_mahasiswa;

            $proof_scan_url = null;
            if ($request->hasFile('proof_scan_url')) {
                $file = $request->file('proof_scan_url');
                $proof_scan_url = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/'), $proof_scan_url);
            }

            $poster_url = null;
            if ($request->hasFile('poster_url')) {
                $file = $request->file('poster_url');
                $poster_url = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/'), $poster_url);
            }

            $scholarship = ScholarshipRecipient::create([
                'id_country' => $request->id_country,
                'name' => $request->name,
                'type' => $request->type,
                'organizer' => $request->organizer,
                'event_date_start' => $request->event_date_start,
                'event_date_end' => $request->event_date_end,
                'description' => $request->description,
                'proof_scan_url' => $proof_scan_url,
                'poster_url' => $poster_url,
                'phone' => $request->phone,
                'amount' => $request->amount,
                'is_validated' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            MahasiswaRecipient::create([
                'id_scholarship_recipient' => $scholarship->id,
                'id_mahasiswa' => $idMahasiswa,
            ]);

            $registrant = ScholarshipRegistrant::create([
                'id_country' => $request->id_country,
                'name' => $request->name,
                'type' => $request->type,
                'organizer' => $request->organizer,
                'event_date_start' => $request->event_date_start,
                'event_date_end' => $request->event_date_end,
                'description' => $request->description,
                'phone' => $request->phone,
                'poster_url' => $poster_url,
                'amount' => $request->amount,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            MahasiswaRegistrant::create([
                'id_scholarship_registrant' => $registrant->id,
                'id_mahasiswa' => $idMahasiswa,
            ]);

            return redirect()->route('laporanBeasiswa')->with('success', 'Pendataan penerima beasiswa berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Pendataan penerima beasiswa gagal ditambahkan!');
        }
    }
}