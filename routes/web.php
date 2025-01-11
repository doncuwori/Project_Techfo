<?php

use App\Http\Controllers\AbdimasInformationController;
use App\Http\Controllers\AbdimasRegistrantController;
use App\Http\Controllers\Admin\AdminCompetitionController;
use App\Http\Controllers\Admin\AdminScholarshipController;
use App\Http\Controllers\Admin\AdminAbdimasController;
use App\Http\Controllers\Admin\AdminResearchController;
use App\Http\Controllers\Admin\DashboardAdminController;
use App\Http\Controllers\Admin\PusatInformasiLombaController;
use App\Http\Controllers\Admin\PusatInformasiBeasiswaController;
use App\Http\Controllers\Admin\PusatInformasiAbdimasController;
use App\Http\Controllers\Admin\PusatInformasiPenelitianController;
use App\Http\Controllers\LandingPage\LandingPageController;
use App\Http\Controllers\CompetitionInformationController;
use App\Http\Controllers\CompetitionRegistrantController;
use App\Http\Controllers\CompetitionsAchievementController;
use App\Http\Controllers\DashboardUserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginPageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResearchInformationController;
use App\Http\Controllers\ResearchRegistrantController;
use App\Http\Controllers\ScholarshipInformationController;
use App\Http\Controllers\ScholarshipRecipientController;
use App\Http\Controllers\ScholarshipRegistrantController;
use App\Models\Abdimas\AbdimasInformation;
use App\Models\Abdimas\AbdimasRegistrant;
use App\Models\Abdimas\MahasiswaRegistrant as AbdimasMahasiswaRegistrant;
use App\Models\Competitions\CompetitionAchievement;
use App\Models\Competitions\CompetitionInformation;
use App\Models\Competitions\CompetitionRegistrant;
use App\Models\Competitions\MahasiswaAchievement;
use App\Models\Competitions\MahasiswaRegistrant;
use App\Models\Country;
use App\Models\Dosen;
use App\Models\Mahasiswa;
use App\Models\Researchs\ResearchInformation;
use App\Models\Researchs\MahasiswaRegistrant as ResearchMahasiswaRegistrant;
use App\Models\Scholarships\MahasiswaRecipient;
use App\Models\Scholarships\MahasiswaRegistrant as ScholarshipsMahasiswaRegistrant;
use App\Models\Scholarships\ScholarshipInformation;
use App\Models\Scholarships\ScholarshipRegistrant;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Landing Page
Route::get('/landingPage', [LandingPageController::class, 'index'])->name(name: 'landingPage');


// Login
Route::get('/login', [LoginPageController::class, 'index'])->name('login');


// Frequently Asked Question
Route::get('/faq', function () {
    return Inertia::render('User/FAQ');
})->name('faq');


Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('competitions', CompetitionRegistrantController::class)->except('index');
    Route::resource('competitionsAchievement', CompetitionsAchievementController::class)->except('index');
});


// GROUPS ROUTES (USER & ADMIN)
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboardUser', [DashboardUserController::class, 'index'])->name('dashboardUser');
    Route::get('/lomba/{postId}', [CompetitionInformationController::class, 'show'])->name('competition.show');
    Route::get('/beasiswa/{postId}', [ScholarshipInformationController::class, 'show'])->name('scholarship.show');
    Route::get('/abdimas/{postId}', [AbdimasInformationController::class, 'show'])->name('abdimas.show');
    Route::get('/penelitian/{postId}', [ResearchInformationController::class, 'show'])->name('research.show');

    Route::get('/prestasi-lomba/{id}', [CompetitionsAchievementController::class, 'fillCreate'])->name('competition-achievement.fill-create');
    Route::post('/prestasi-lomba', [CompetitionsAchievementController::class, 'fillStore'])->name('competition-achievement.fill-store');

    Route::get('/penerima-beasiswa/{id}', [ScholarshipRecipientController::class, 'fillCreate'])->name('scholarship-recipient.fill-create');
    Route::post('/penerima-beasiswa', [ScholarshipRecipientController::class, 'fillStore'])->name('scholarship-recipient.fill-store');


    // Profile
    Route::get('/profile', function () {

        $idMahasiswa = Mahasiswa::where('id_user', Auth::user()->id)->first()->id;

        $partisipasiLomba = MahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->with('competitionRegistrant')->get();
        $prestasiLomba = MahasiswaAchievement::where('id_mahasiswa', $idMahasiswa)->with('competitionAchievement')->get();
        $pendaftarBeasiswa = ScholarshipsMahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->with('scholarshipRegistrant')->get();
        $penerimaBeasiswa = MahasiswaRecipient::where('id_mahasiswa', $idMahasiswa)->with('scholarshipRecipient')->get();

        $pendaftarAbdimas = AbdimasMahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->with('abdimasRegistrant.abdimasInformation')->get();
        $diterimaAbdimas = AbdimasMahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->with('abdimasRegistrant.abdimasInformation')->where('accepted', true)->get();


        $pendaftarPenelitian = ResearchMahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->with('researchRegistrant.researchInformation')->get();
        $diterimaPenelitian = ResearchMahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->with('researchRegistrant.researchInformation')->where('accepted', true)->get();

        $abdimas = AbdimasMahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->with('abdimasRegistrant.abdimasInformation')->get();
        $penelitian = ResearchMahasiswaRegistrant::where('id_mahasiswa', $idMahasiswa)->with('researchRegistrant.researchInformation')->get();

        return Inertia::render('User/Profile',[
            'partisipasiLomba' => $partisipasiLomba,
            'prestasiLomba' => $prestasiLomba,
            'pendaftarBeasiswa' => $pendaftarBeasiswa,
            'penerimaBeasiswa' => $penerimaBeasiswa,
            'pendaftarAbdimas' => $pendaftarAbdimas,
            'diterimaAbdimas' => $diterimaAbdimas,
            'pendaftarPenelitian' => $pendaftarPenelitian,
            'diterimaPenelitian' => $diterimaPenelitian,
            'abdimas' => $abdimas,
            'penelitian' => $penelitian
        ]);
    })->name('profile');


    // Lomba 
    Route::get('/lomba', function () {

        $data = CompetitionInformation::orderBy('created_at', 'desc')->where('is_valid', '1')->with('user')->get();

        return Inertia::render('User/Lomba/Lomba', [
            'data' => $data
        ]);
    })->name('lomba');

    Route::get('/detailLomba', function () {
        return Inertia::render(component: 'User/Lomba/DetailLomba');
    })->name('detailLomba');

    Route::get('/pendataanLomba', function () {

        $mahasiswa = Mahasiswa::all();
        $dosen = Dosen::all();
        $country = Country::all();

        $dosen->filter(function ($dosen) {
            return $dosen->max_dosen_competition < 3;
        });

        return Inertia::render('User/Pendataan/PendataanLomba', [
            'mahasiswa' => $mahasiswa,
            'dosen' => $dosen,
            'country' => $country
        ]);
    })->name('pendataanLomba');

    Route::post('/pendataanDaftarLomba', [CompetitionRegistrantController::class, 'store'])
        ->name('competition.store');

    Route::post('/pendataanPemenangLomba', [CompetitionsAchievementController::class, 'store'])
        ->name('competitionAchievement.store');


    // Beasiswa
    Route::get('/beasiswa', function () {

        $data = ScholarshipInformation::orderBy('created_at', 'desc')->where('is_valid', '1')->with('user')->get();

        return Inertia::render('User/Beasiswa/Beasiswa', [
            'data' => $data
        ]);
    })->name('beasiswa');

    Route::get('/detailBeasiswa', function () {
        return Inertia::render(component: 'User/Beasiswa/DetailBeasiswa');
    })->name('detailBeasiswa');

    Route::get('/pendataanBeasiswa', function () {
        
        $country = Country::all();

        return Inertia::render('User/Pendataan/PendataanBeasiswa', [
            'country' => $country
        ]);
    })->name('pendataanBeasiswa');

    Route::post('/pendataanDaftarBeasiswa', [ScholarshipRegistrantController::class, 'store'])
        ->name("scholarshipRegistrant.store");

    Route::post('/pendataanLolosBeasiswa', [ScholarshipRecipientController::class, 'store'])
        ->name("scholarshipRecipient.store");


    // Abdimas
    Route::get('/abdimas', function () {
        $data = AbdimasInformation::orderBy('created_at', 'desc')
        ->whereDate('event_time_end', '>=', date('Y-m-d'))
        ->get();

        return Inertia::render('User/Abdimas/Abdimas', [
            'data' => $data
        ]);
    })->name('abdimas');

    Route::get('/detailAbdimas', function () {
        return Inertia::render(component: 'User/Abdimas/DetailAbdimas');
    })->name('detailAbdimas');

    Route::get('/daftarAbdimas/{id}', function (string $id) {
        $data = AbdimasInformation::with('dosen')->where('id', $id)->first();
        return Inertia::render('User/Abdimas/DaftarAbdimas', [
            'information' => $data
        ]);
    })->name('daftarAbdimas');


    // Penelitian
    Route::get('/penelitian', function () {
        $data = ResearchInformation::orderBy('created_at', 'desc')
        ->whereDate('event_time_end', '>=', date('Y-m-d'))
        ->get();

        return Inertia::render('User/Penelitian/Penelitian', [
            'data' => $data
        ]);
    })->name('penelitian');

    Route::get('/detailPenelitian', function () {
        return Inertia::render(component: 'User/Penelitian/DetailPenelitian');
    })->name('detailPenelitian');

    Route::get('/daftarPenelitian/{id}', function (string $id) {
        $data = ResearchInformation::with('dosen')->where('id', $id)->first();
        return Inertia::render('User/Penelitian/DaftarPenelitian', [
            'information' => $data
        ]);
    })->name('daftarPenelitian');

    Route::resource('abdimas-registrant', AbdimasRegistrantController::class);
    Route::resource('research-registrant', ResearchRegistrantController::class);
});

Route::middleware(['auth', 'verified', 'role:admin|dosen'])->group(function () {
    // Dashboard
    Route::get('/dashboardAdmin', [DashboardAdminController::class, 'index'])->name('dashboardAdmin');

    Route::post('/pusatInformasi/tambahInfoLomba', [CompetitionInformationController::class, 'store'])
        ->name('competitionInformation.store');
    Route::get('/pusatInformasi/lomba/validate/{id}', [CompetitionInformationController::class, 'validate'])->name('lombaValidate');

    Route::post('/pusatInformasi/tambahInfoLomba/{id}', [CompetitionInformationController::class, 'update'])
        ->name('competitionInformation.update');

    Route::post('/pusatInformasi/tambahInfoBeasiswa', [ScholarshipInformationController::class, 'store'])
        ->name('scholarshipInformation.store');
    Route::get('/pusatInformasi/beasiswa/validate/{id}', [ScholarshipInformationController::class, 'validate'])->name('beasiswaValidate');

    Route::post('/pusatInformasi/tambahInfoBeasiswa/{id}', [ScholarshipInformationController::class, 'update'])
        ->name('scholarshipInformation.update');

    Route::post('/pusatInformasi/tambahInfoAbdimas', [AbdimasInformationController::class, 'store'])
        ->name('abdimasInformation.store');

    Route::post('/pusatInformasi/tambahInfoAbdimas/{id}', [AbdimasInformationController::class, 'update'])
        ->name('abdimasInformation.update');

    Route::post('/pusatInformasi/tambahInfoPenelitian', [ResearchInformationController::class, 'store'])
        ->name('researchInformation.store');

    Route::post('/pusatInformasi/tambahInfoPenelitian/{id}', [ResearchInformationController::class, 'update'])
        ->name('researchInformation.update');

    Route::get('/laporanLomba', [AdminCompetitionController::class, 'index'])->name('laporanLomba');
    Route::get('/laporanLomba/validate/{id}', [AdminCompetitionController::class, 'validate'])->name('laporanLomba.validate');

    Route::get('/laporanBeasiswa', [AdminScholarshipController::class, 'index'])->name('laporanBeasiswa');
    Route::get('/laporanBeasiswa/validate/{id}', [AdminScholarshipController::class, 'validate'])->name('laporanBeasiswa.validate');

    Route::get('/laporanAbdimas', [AdminAbdimasController::class, 'index'])->name('laporanAbdimas');

    Route::get('/laporanPenelitian', [AdminResearchController::class, 'index'])->name('laporanPenelitian');

    Route::get('/pusatInformasi/tambahInfoLomba', [CompetitionInformationController::class, 'index'])->name('tambahInfoLomba');
    Route::get('/pusatInformasi/editInfoLomba/{id}', [CompetitionInformationController::class, 'edit'])->name('editInfoLomba');
    Route::get('/pusatInformasi/deleteInfoLomba/{id}', [CompetitionInformationController::class, 'destroy'])->name('hapusInfoLomba');

    Route::get('/pusatInformasi/tambahInfoBeasiswa', [ScholarshipInformationController::class, 'index'])->name('tambahInfoBeasiswa');
    Route::get('/pusatInformasi/editInfoBeasiswa/{id}', [ScholarshipInformationController::class, 'edit'])->name('editInfoBeasiswa');
    Route::get('/pusatInformasi/deleteInfoBeasiswa/{id}', [ScholarshipInformationController::class, 'destroy'])->name('hapusInfoBeasiswa');

    Route::get('/pusatInformasi/tambahInfoAbdimas', [AbdimasInformationController::class, 'index'])->name('tambahInfoAbdimas');
    Route::get('/pusatInformasi/editInfoAbdimas/{id}', [AbdimasInformationController::class, 'edit'])->name('editInfoAbdimas');
    Route::get('/pusatInformasi/deleteInfoAbdimas/{id}', [AbdimasInformationController::class, 'destroy'])->name('hapusInfoAbdimas');

    Route::get('/pusatInformasi/tambahInfoPenelitian', [ResearchInformationController::class, 'index'])->name('tambahInfoPenelitian');
    Route::get('/pusatInformasi/editInfoPenelitian/{id}', [ResearchInformationController::class, 'edit'])->name('editInfoPenelitian');
    Route::get('/pusatInformasi/deleteInfoPenelitian/{id}', [ResearchInformationController::class, 'destroy'])->name('hapusInfoPenelitian');

    Route::get('/pusatLomba', [PusatInformasiLombaController::class, 'index'])->name('pusatLomba');

    Route::get('/pusatBeasiswa', [PusatInformasiBeasiswaController::class, 'index'])->name('pusatBeasiswa');

    Route::get('/pusatAbdimas', [PusatInformasiAbdimasController::class, 'index'])->name('pusatAbdimas');
    Route::get('/pusatAbdimas/{id}', [PusatInformasiAbdimasController::class, 'show'])->name('pusatAbdimas.show');
    Route::post('/pusatAbdimas/register', [PusatInformasiAbdimasController::class, 'register'])->name('pusatAbdimas.register');
    Route::post('/pusatAbdimas/uploadSurat', [PusatInformasiAbdimasController::class, 'uploadSurat'])->name('pusatAbdimas.uploadSurat');

    Route::get('/pusatPenelitian', [PusatInformasiPenelitianController::class, 'index'])->name('pusatPenelitian');
    Route::get('/pusatPenelitian/{id}', [PusatInformasiPenelitianController::class, 'show'])->name('pusatPenelitian.show');
    Route::post('/pusatPenelitian/register', [PusatInformasiPenelitianController::class, 'register'])->name('pusatPenelitian.register');
    Route::post('/pusatPenelitian/uploadSurat', [PusatInformasiPenelitianController::class, 'uploadSurat'])->name('pusatPenelitian.uploadSurat');

    Route::get('/loginAdmin', function () {
        return Inertia::render('Admin/LoginAdmin');
    });
});




require __DIR__ . '/auth.php';
