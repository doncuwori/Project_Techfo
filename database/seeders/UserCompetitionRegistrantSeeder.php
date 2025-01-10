<?php

namespace Database\Seeders;

use App\Models\Pivot\UserCompetitionRegistrants;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserCompetitionRegistrantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserCompetitionRegistrants::create([
            'competition_registrant_id' => 1,
            'user_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        UserCompetitionRegistrants::create([
            'competition_registrant_id' => 1,
            'user_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}