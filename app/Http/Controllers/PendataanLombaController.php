<?php

namespace App\Http\Controllers;

use App\Models\Competition;
use App\Models\Competitions\CompetitionRegistrant;
use Illuminate\Http\Request;

class PendataanLombaController extends Controller
{
    public function index()
    {
        $competitions = CompetitionRegistrant::all();
        return response()->json($competitions);
    }

    public function store(Request $request)
    {
        
    // $competition = CompetitionRegistrantcreate($request->all());
        return response()->json($request->all(), 201);
    }
}