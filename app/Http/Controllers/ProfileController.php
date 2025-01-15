<?php

namespace App\Http\Controllers;

use App\Models\Competitions\CompetitionRegistrant;
use App\Models\Competitions\CompetitionAchievement;
use App\Models\Scholarships\ScholarshipRecipient;
use App\Models\Scholarships\ScholarshipRegistrant;
use App\Models\Abdimas\MahasiswaRegistrant;
use App\Models\Researchs\MahasiswaRegistrant as ResearchsMahasiswaRegistrant;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Competitions\MahasiswaAchievement;
use App\Models\Mahasiswa;
use App\Models\Scholarships\MahasiswaRegistrant as ScholarshipsMahasiswaRegistrant;
use App\Models\Competitions\MahasiswaRegistrant as CompetitionMahasiswaRegistrant;
use App\Models\Scholarships\MahasiswaRecipient;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function index(){
        $idMahasiswa = Mahasiswa::where('id_user', Auth::user()->id)->first()->id;

        $competitionRegistrantsCount = CompetitionMahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->count();
        $competitionAchievementsCount = MahasiswaAchievement::where('id_mahasiswa', $idMahasiswa)->count();
        $scholarshipRegistrantsCount = ScholarshipsMahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->count();
        $scholarshipRecipientsCount = MahasiswaRecipient::where('id_mahasiswa', $idMahasiswa)->count();

        $abdimasRegistrantsCount = MahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->count();
        $abdimasRecipientsCount = MahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->where('accepted', true)->count();

        $researchRegistrantsCount = ResearchsMahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->count();
        $researchRecipientsCount = ResearchsMahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->where('accepted', true)->count();

        return Inertia::render('User/Profile', [
            'competitionRegistrantsCount' => $competitionRegistrantsCount,
            'competitionAchievementsCount' => $competitionAchievementsCount,
            'scholarshipRegistrantsCount' => $scholarshipRegistrantsCount,
            'scholarshipRecipientsCount' => $scholarshipRecipientsCount,
            'abdimasRegistrantsCount' => $abdimasRegistrantsCount,
            'abdimasRecipientsCount' => $abdimasRecipientsCount,
            'researchRegistrantsCount' => $researchRegistrantsCount,
            'researchRecipientsCount' => $researchRecipientsCount,
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/login');
    }
}