<?php

namespace Database\Seeders;

use App\Models\Prodi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Http;

class ProdiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prodi = Http::withHeaders([
            'API_KEY_NAME' => Env::get('API_KEY_NAME'),
            'API_KEY_SECRET' => Env::get('API_KEY_SECRET'),
        ])
        ->withBasicAuth(Env::get('UPNVJ_API_USER'), Env::get('UPNVJ_API_PASS'))
        ->post(Env::get('UPNVJ_API') . '/ref_program_studi');

        $result = json_decode($prodi->getBody()->getContents())->data;

        array_filter($result, function ($item) {
            if($item->kode_program_studi == 501) {
                Prodi::create([
                    'kode_prodi' => $item->kode_program_studi,
                    'nama_prodi' => $item->nama_program_studi
                ]);
            }elseif($item->kode_program_studi == 512) {
                Prodi::create([
                    'kode_prodi' => $item->kode_program_studi,
                    'nama_prodi' => $item->nama_program_studi
                ]);
            }elseif($item->kode_program_studi == 511) {
                Prodi::create([
                    'kode_prodi' => $item->kode_program_studi,
                    'nama_prodi' => $item->nama_program_studi
                ]);
            }elseif($item->kode_program_studi == 514) {
                Prodi::create([
                    'kode_prodi' => $item->kode_program_studi,
                    'nama_prodi' => $item->nama_program_studi
                ]);
            }
        });
    }
}
