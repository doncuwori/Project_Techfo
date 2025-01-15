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
                'nim' => '2110512004',
                'instansi' => 'KSM Robotika'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110512104',
                'instansi' => 'KSM Cyber Security'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2310512059',
                'instansi' => 'KSM Android'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110511015',
                'instansi' => 'KSM Multimedia'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110511138',
                'instansi' => 'BEM FIK'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110512059',
                'instansi' => 'HIMA S1 SI'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110511015',
                'instansi' => 'HIMA D3 SI'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2210501035',
                'instansi' => 'HIMA D3 SI'
            ],
            [
                'nama_akses' => 'ormawa',
                'nim' => '2110511065',
                'instansi' => 'HIMA S1 IF'
            ]
        ];

        foreach ($access as $key => $value) {
            MahasiswaAccess::create([
                'nama_akses' => $value['nama_akses'],
                'id_mahasiswa' => Mahasiswa::where('nim', $value['nim'])->first()->id,
                'instansi' => $value['instansi']
            ]);
        }
    }
}
