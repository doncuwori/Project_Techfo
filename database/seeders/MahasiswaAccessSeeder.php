<?php

namespace Database\Seeders;

use App\Models\Mahasiswa;
use App\Models\MahasiswaAccess;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MahasiswaAccessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $access = [
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110512004'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110512104'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2310512059'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110511015'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110511138'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110512059'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110511015'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110511015'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2210501035'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110511065'
            ]
        ];

        foreach ($access as $key => $value) {
            MahasiswaAccess::create([
                'nama_akses' => $value['nama_akses'],
                'id_mahasiswa' => Mahasiswa::where('nim', $value['nim'])->first()->id
            ]);
        }
    }
}
