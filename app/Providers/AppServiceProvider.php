<?php

namespace App\Providers;

use App\Models\DosenAccess;
use App\Models\MahasiswaAccess;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Gate::define('admin', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('mahasiswa', function ($user) {
            return $user->role === 'mahasiswa';
        });
        
        Gate::define('dosen', function ($user) {
            return $user->role === 'dosen';
        });
        
        Gate::define('wadek', function ($user) {
            $dosen = $user->dosen ?? null;

            if(!$dosen) {
                return false;
            }else{
                return DosenAccess::where('id_dosen', $dosen->id)->where('nama_akses', 'wadek')->exists();
            }
        });

        Gate::define('kaprodi', function ($user) {
            $dosen = $user->dosen ?? null;

            if(!$dosen) {
                return false;
            }else{
                return DosenAccess::where('id_dosen', $dosen->id)->where('nama_akses', 'kaprodi')->exists();
            }
        });

        Gate::define('ormawa', function ($user) {
            $mahasiswa = $user->mahasiswa ?? null;

            if(!$mahasiswa) {
                return false;
            }else{
                return MahasiswaAccess::where('id_mahasiswa', $mahasiswa->id)->where('nama_akses', 'ormawa')->exists();
            }
        });
    }
}
