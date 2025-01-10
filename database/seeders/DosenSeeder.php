<?php

namespace Database\Seeders;

use App\Models\Dosen;
use App\Models\Prodi;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class DosenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $idProdi = [];
        $idPeriode = [];

        $prodi = Http::withHeaders([
            'API_KEY_NAME' => Env::get('API_KEY_NAME'),
            'API_KEY_SECRET' => Env::get('API_KEY_SECRET'),
        ])
            ->withBasicAuth(Env::get('UPNVJ_API_USER'), Env::get('UPNVJ_API_PASS'))
            ->post(Env::get('UPNVJ_API') . '/ref_program_studi');

        $result = json_decode($prodi->getBody()->getContents())->data;

        $periode = Http::withHeaders([
            'API_KEY_NAME' => Env::get('API_KEY_NAME'),
            'API_KEY_SECRET' => Env::get('API_KEY_SECRET'),
        ])
            ->withBasicAuth(Env::get('UPNVJ_API_USER'), Env::get('UPNVJ_API_PASS'))
            ->post(Env::get('UPNVJ_API') . '/ref_periode');

        $response = json_decode($periode->getBody()->getContents())->data;

        foreach ($response as $item) {
            if ($item->tahun_periode == 2020) {
                array_push($idPeriode, $item->id_periode);
            } elseif ($item->tahun_periode == 2021) {
                array_push($idPeriode, $item->id_periode);
            } elseif ($item->tahun_periode == 2022) {
                array_push($idPeriode, $item->id_periode);
            } elseif ($item->tahun_periode == 2023) {
                array_push($idPeriode, $item->id_periode);
            }
        };

        foreach ($result as $item) {
            if ($item->kode_program_studi == 501) {
                $idProdi[501] = $item->id_program_studi;
            } elseif ($item->kode_program_studi == 512) {
                $idProdi[512] = $item->id_program_studi;
            } elseif ($item->kode_program_studi == 511) {
                $idProdi[511] = $item->id_program_studi;
            }elseif ($item->kode_program_studi == 514) {
                $idProdi[514] = $item->id_program_studi;
            }
        };

        foreach ($idProdi as $item) {
            foreach ($idPeriode as $periode) {
                $call = new Client();

                $response = $call->request('POST', Env::get('UPNVJ_API') . '/list_dosen_pengajar', [
                    'headers' => [
                        'API_KEY_NAME' => Env::get('API_KEY_NAME'),
                        'API_KEY_SECRET' => Env::get('API_KEY_SECRET'),
                    ],
                    'auth' => [Env::get('UPNVJ_API_USER'), Env::get('UPNVJ_API_PASS')],
                    'form_params' => [
                        'id_program_studi' => $item,
                        'id_periode' => $periode
                    ],
                ]);

                $stream = $response->getbody();
                $content = '';
                while (!$stream->eof()) {
                    $content .= $stream->read(1024);
                }

                $res = json_decode($content, true)['data'];

                


                foreach ($res as $key => $value) {

                    $exist = User::where('username', $value['nidn_dosen'])->first();

                    foreach($idProdi as $k => $i){
                        if($i == $item){
                            $prodi = Prodi::where('kode_prodi', $k)->first();
                        }
                    }

                    if ($exist) {
                        continue;
                    }

                    if(!$value['nidn_dosen']) {
                        continue;
                    }

                    $user = User::create([
                        'name' => $value['nama_dosen'],
                        'username' => $value['nidn_dosen'],
                        'password' => Hash::make($value['nidn_dosen']),
                        'role' => 'dosen'
                    ]);
    
                    Dosen::create([
                        'id_user' => $user->id,
                        'nidn' => $value['nidn_dosen'],
                        'nama' => $value['nama_dosen']
                    ]);
                }
            }
        }
    }
}
