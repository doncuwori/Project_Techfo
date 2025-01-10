<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function Pest\Laravel\call;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserNewSeeder::class);

        $this->call(CountrySeeder::class);

        $this->call(ProdiSeeder::class);
        $this->call(MahasiswaSeeder::class);
        $this->call(DosenSeeder::class);

        $this->call(MahasiswaAccessSeeder::class);
        $this->call(DosenAccessSeeder::class);


        // $this->call(CompetitionSeeder::class);    
        // $this->call(UserCompetitionRegistrantSeeder::class);
        // $this->call(InformationSeeder::class);
    }
}