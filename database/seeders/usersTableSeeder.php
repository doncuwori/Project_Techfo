<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class usersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Kurnia Kharisma',
            'nim' => '2110511068',
            'prodi' => 'Teknik Informatika',
            'angkatan' => '2019',
            'email' => 'admin@example.com',
            'role' => 'admin',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Khaliza Fania',
            'nim' => '2110511069',
            'prodi' => 'Teknik Informatika',
            'angkatan' => '2019',
            'email' => 'user@example.com',
            'role' => 'user',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Andi Johnson',
            'nim' => '2210511070',
            'prodi' => 'Sistem Informasi',
            'angkatan' => '2020',
            'email' => 'andi@example.com',
            'role' => 'user',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Elmira White',
            'nim' => '2310511071',
            'prodi' => 'Teknik Komputer',
            'angkatan' => '2021',
            'email' => 'elmira@example.com',
            'role' => 'user',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Alice Johnson',
            'nim' => '3344556677',
            'prodi' => 'Teknik Elektro',
            'angkatan' => '2022',
            'email' => 'alice@example.com',
            'role' => 'user',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Bob Brown',
            'nim' => '4455667788',
            'prodi' => 'Teknik Mesin',
            'angkatan' => '2023',
            'email' => 'bob@example.com',
            'role' => 'user',
            'password' => Hash::make('password'),
        ]);
    }
}