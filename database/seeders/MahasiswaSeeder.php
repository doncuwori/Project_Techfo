<?php

namespace Database\Seeders;

use App\Models\Mahasiswa;
use App\Models\Prodi;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Hash;

class MahasiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $angkatan = [
            '2020',
            '2021',
            '2022',
            '2023',
        ];


        foreach ($angkatan as $key => $value) {
            $call = new Client();

            $response = $call->request('POST', Env::get('UPNVJ_API') . '/list_mahasiswa', [
                    'headers'=>[
                        'API_KEY_NAME' => Env::get('API_KEY_NAME'),
                        'API_KEY_SECRET' => Env::get('API_KEY_SECRET'),
                    ],
                    'auth' => [Env::get('UPNVJ_API_USER'), Env::get('UPNVJ_API_PASS')],
                    'form_params' => [
                        'angkatan' => $value
                    ],
                ]);

            $stream = $response->getbody();
            $content = '';
            while (!$stream->eof()) {
                $content .= $stream->read(1024);
            }
            
            $result = json_decode($content, true)['data'];

            foreach ($result as $key => $value) {
                if (
                    $value['kode_program_studi'] == 501 ||
                    $value['kode_program_studi'] == 512 ||
                    $value['kode_program_studi'] == 511
                ) {

                    $prodi = Prodi::where('kode_prodi', (int) $value['kode_program_studi'])->first();

                    $user = User::create([
                        'name' => $value['nama_mahasiswa'],
                        'username' => $value['nim'],
                        'password' => Hash::make($value['nim']),
                        'role' => 'mahasiswa',
                    ]);

                    Mahasiswa::create([
                        'id_user' => $user->id,
                        'id_prodi' => $prodi->id,
                        'nim' => $value['nim'],
                        'nama' => $value['nama_mahasiswa'],
                        'email' => $value['nim'] . '@mahasiswa.upnvj.ac.id',
                        'gender' => $value['jenis_kelamin'],
                        'angkatan' => $value['tahun_angkatan']
                    ]);
                }
            }
        }
    }
}
