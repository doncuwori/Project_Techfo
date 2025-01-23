<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Competitions\CompetitionRegistrant;
use App\Models\Competitions\MahasiswaRegistrant;
use App\Models\Mahasiswa;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CompetitionRegistrantController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            $idMahasiswa = Mahasiswa::where('id_user', $user->id)->first()->id;

            $filename = null;
            if ($request->hasFile('poster_url')) {
                $file = $request->file('poster_url');
                $filename = time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('images/'), $filename);
            }

            $competition = CompetitionRegistrant::create(
                [
                    'id_dosen' => $request->id_dosen,
                    'id_country' => $request->id_country,
                    'ormawa_delegation' => $request->ormawa_delegation,
                    'activity_name' => $request->activity_name,
                    'scope' => $request->scope,
                    'field' => $request->field,
                    'type' => $request->type,
                    'organizer' => $request->organizer,
                    'location' => $request->location,
                    'activity_date_start' => $request->activity_date_start,
                    'activity_date_end' => $request->activity_date_end,
                    'description' => $request->description,
                    'poster_url' => $filename,
                    'phone' => $request->phone,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            );

            MahasiswaRegistrant::create([
                'id_competition_registrant' => $competition->id,
                'id_mahasiswa' => $idMahasiswa,
                'is_leader' => true
            ]);

            if ($request->is_group == true) {

                $members = $request->members;

                foreach ($members as $memberData) {
                    if ($memberData == null) {
                        continue;
                    };
                    MahasiswaRegistrant::create([
                        'id_competition_registrant' => $competition->id,
                        'id_mahasiswa' => $memberData,
                        'is_leader' => false
                    ]);
                }
            }

            return redirect()->route('profile')->with('success', value: 'Pendataan partisipasi lomba berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Pendataan partisipasi lomba gagal ditambahkan!');
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $competitions = CompetitionRegistrant::all();
        return response()->json($competitions, 201);
    }
}
