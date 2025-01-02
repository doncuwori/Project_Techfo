<?php

namespace Database\Seeders;

use App\Models\Dosen;
use App\Models\DosenAccess;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DosenAccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $access = [
            [
                'nama_akses' => 'wadek',
                'nidn' => '0308097401'
            ],
            [
                'nama_akses' => 'wadek',
                'nidn' => '0321027401'
            ],
            [
                'nama_akses' => 'wadek',
                'nidn' => '0107077801'
            ],
            [
                'nama_akses' => 'kaprodi',
                'nidn' => '0321057001'
            ],
            [
                'nama_akses' => 'kaprodi',
                'nidn' => '0420018601'
            ],
            [
                'nama_akses' => 'kaprodi',
                'nidn' => '0218107101'
            ],
            [
                'nama_akses' => 'kaprodi',
                'nidn' => '0015039301'
            ],
        ];

        foreach ($access as $key => $value) {
            DosenAccess::create([
                'nama_akses' => $value['nama_akses'],
                'id_dosen' => Dosen::where('nidn', $value['nidn'])->first()->id
            ]);
        }
    }
}
