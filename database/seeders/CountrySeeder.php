<?php

namespace Database\Seeders;

use App\Models\Country;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Symfony\Component\Translation\Loader\CsvFileLoader;

class CountrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csv = fopen(public_path('csv/country_data.csv'), 'r');

        $data = fgetcsv($csv, 1000, ',');

        while ($data = fgetcsv($csv, 1000, ',')) {
            $country = new Country();
            $country->country_name = $data[1];
            $country->save();
        }
    }
}
