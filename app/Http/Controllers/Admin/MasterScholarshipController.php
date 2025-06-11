<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MasterScholarship;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterScholarshipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();

        $data = MasterScholarship::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Master/MasterScholarship', [
            'user' => $user,
            'data' => $data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        return Inertia::render('Admin/Master/TambahMasterScholarship', [
            'user' => $user
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $user = Auth::user();

            MasterScholarship::create([
                'name' => $request->name
            ]);
    
            // Return a response
            return redirect()->route('master-scholarship.index')->with('success', 'Jenis beasiswa berhasil ditambahkan');
        }catch(\Exception $e){
            return redirect()->back()->with('error', 'Jenis beasiswa gagal ditambahkan :');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(MasterScholarship $masterScholarship)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MasterScholarship $masterScholarship)
    {
        $user = auth()->user();
        return Inertia::render('Admin/Master/EditMasterScholarship', [
            'data' => $masterScholarship,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $user = Auth::user();

            $data = MasterScholarship::find($id);

            $data->update([
                'name' => $request->name
            ]);
    
            // Return a response
            return redirect()->route('master-scholarship.index')->with('success', 'Jenis beasiswa berhasil diubah');
        }catch(\Exception $e){
            return redirect()->back()->with('error', 'Jenis beasiswa gagal diubah :');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = MasterScholarship::where('id', $id)->first();
        $data->delete();
        return redirect()->route('master-scholarship.index')->with('success', ' Jenis Beasiswa berhasil dihapus');
    }
}
