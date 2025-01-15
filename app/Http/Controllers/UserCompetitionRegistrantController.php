<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserCompetitionRegistrantRequest;
use App\Http\Requests\UpdateUserCompetitionRegistrantRequest;
use App\Models\UserCompetitionRegistrant;
use App\Models\Pivot\UserCompetitionRegistrants;
use Illuminate\Http\Request;

class UserCompetitionRegistrantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UserCompetitionRegistrants $competitionUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserCompetitionRegistrants $competitionUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserCompetitionRegistrants $competitionUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserCompetitionRegistrants $competitionUser)
    {
        //
    }
}