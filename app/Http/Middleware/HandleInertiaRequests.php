<?php

namespace App\Http\Middleware;

use App\Models\Dosen;
use App\Models\Mahasiswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'mahasiswa' => $request->user() ? Mahasiswa::where('id_user', $request->user()->id)->with(['prodi', 'mahasiswaAccess'])->first() : null,
                'dosen' => $request->user() ? Dosen::where('id_user', $request->user()->id)->with(['prodi', 'dosenAccess'])->first() : null,
                'wadek' => Gate::check('wadek'),
                'kaprodi' => Gate::check('kaprodi'),
                'ormawa' => Gate::check('ormawa'),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
