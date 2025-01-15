<?php

namespace Database\Seeders;

use App\Models\Competitions\CompetitionRegistrant;
use App\Models\Competitions\CompetitionAchievement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompetitionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CompetitionRegistrant::create(attributes: [
            'ormawa_delegation' => 'HIMTI',
            'mentor_name' => 'Dr. Alice Pembimbing',
            'activity_name' => 'Hackathon 2023',
            'field' => 'Pemrograman',
            'scope' => 'Nasional',
            'organizer' => 'Komunitas Teknologi',
            'host_country' => 'Indonesia',
            'location' => 'Jakarta',
            'activity_date_start' => '2023-11-01',
            'activity_date_end' => '2023-11-03',
            'description' => 'Sebuah acara hackathon tingkat nasional.',
            'poster_url' => 'http://example.com/posters/hackathon2023.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        CompetitionRegistrant::create(attributes:
        [
            'ormawa_delegation' => 'HIMTI',
            'mentor_name' => 'Prof. Bob Pembimbing',
            'activity_name' => 'Simposium AI',
            'field' => 'Kecerdasan Buatan',
            'scope' => 'Nasional',
            'organizer' => 'Institut AI',
            'host_country' => 'Singapura',
            'location' => 'Kota Singapura',
            'activity_date_start' => '2024-01-15',
            'activity_date_end' => '2024-01-17',
            'description' => 'Simposium internasional tentang kemajuan AI.',
            'poster_url' => 'http://example.com/posters/simposium_ai2024.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        CompetitionRegistrant::create(attributes:[
            'ormawa_delegation' => 'HIMSI',
            'mentor_name' => 'Dr. Jane Pembimbing',
            'activity_name' => 'Workshop Data Science',
            'field' => 'Data Science',
            'scope' => 'Internasional',
            'organizer' => 'Big Data Co.',
            'host_country' => 'Amerika Serikat',
            'location' => 'San Francisco',
            'activity_date_start' => '2023-12-10',
            'activity_date_end' => '2023-12-12',
            'description' => 'Workshop praktis untuk penggemar data science.',
            'poster_url' => 'http://example.com/posters/data_science2023.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        CompetitionRegistrant::create(attributes:[
            'ormawa_delegation' => 'HIMTEK',
            'mentor_name' => 'Prof. Steve Pembimbing',
            'activity_name' => 'Kompetisi Robotika',
            'field' => 'Robotika',
            'scope' => 'Internasional',
            'organizer' => 'Organisasi Robotika Global',
            'host_country' => 'Jepang',
            'location' => 'Tokyo',
            'activity_date_start' => '2024-02-20',
            'activity_date_end' => '2024-02-22',
            'description' => 'Kompetisi robotika tingkat internasional.',
            'poster_url' => 'http://example.com/posters/robotika2024.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        CompetitionRegistrant::create(attributes:[
            'ormawa_delegation' => 'HIMTE',
            'mentor_name' => 'Dr. Mark Pembimbing',
            'activity_name' => 'Pameran Teknik Elektro',
            'field' => 'Teknik Elektro',
            'scope' => 'Nasional',
            'organizer' => 'Masyarakat Teknik Elektro',
            'host_country' => 'Jerman',
            'location' => 'Berlin',
            'activity_date_start' => '2024-03-10',
            'activity_date_end' => '2024-03-12',
            'description' => 'Pameran inovasi dalam bidang teknik elektro.',
            'poster_url' => 'http://example.com/posters/teknik_elektro2024.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        CompetitionRegistrant::create(attributes:[
            'ormawa_delegation' => 'HMM',
            'mentor_name' => 'Prof. Anne Pembimbing',
            'activity_name' => 'Expo Desain Mekanik',
            'field' => 'Teknik Mesin',
            'scope' => 'Nasional',
            'organizer' => 'Masyarakat Desain Teknik',
            'host_country' => 'Kanada',
            'location' => 'Toronto',
            'activity_date_start' => '2024-04-05',
            'activity_date_end' => '2024-04-07',
            'description' => 'Expo yang menampilkan proyek desain mekanik.',
            'poster_url' => 'http://example.com/posters/desain_mekanik2024.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        CompetitionAchievement::create([
            'is_group' => false,
            'leader_nim' => '9988776655', // Alice Green
            'ormawa_delegation' => 'HIMTI',
            'mentor_name' => 'Dr. John Smith',
            'activity_name' => 'Kompetisi Pemrograman Nasional',
            'field' => 'Ilmiah/Penalaran/Akademik',
            'degree' => 'Juara I',
            'scope' => 'Nasional',
            'organizer' => 'Asosiasi Pemrograman Indonesia',
            'host_country' => 'Indonesia',
            'location' => 'Jakarta',
            'activity_date_start' => '2024-03-10',
            'activity_date_end' => '2024-03-12',
            'description' => 'Kompetisi yang menguji kemampuan pemrograman tingkat nasional.',
            'proof_scan_url' => 'http://example.com/posters/kompetisi_pemrograman2024.png',
            'event_photo_url' => 'http://example.com/posters/kompetisi_pemrograman2024.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        CompetitionAchievement::create([
            'is_group' => true,
            'leader_nim' => '5566778899', // Charlie Black
            'ormawa_delegation' => 'ROBOTICS',
            'mentor_name' => 'Dr. Jane Robotics',
            'activity_name' => 'International Robotics Challenge',
            'field' => 'Robotika',
            'degree' => 'Juara III',
            'scope' => 'International',
            'organizer' => 'World Robotics Organization',
            'host_country' => 'USA',
            'location' => 'San Francisco',
            'activity_date_start' => '2024-06-15',
            'activity_date_end' => '2024-06-20',
            'description' => 'Kompetisi robotika yang melibatkan peserta dari seluruh dunia.',
            'proof_scan_url' => 'http://example.com/posters/robotics_challenge2024.png',
            'event_photo_url' => 'http://example.com/posters/robotics_challenge2024.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        CompetitionAchievement::create([
            'is_group' => false,
            'leader_nim' => '1122334455', // David White
            'ormawa_delegation' => 'KSM Multimedia',
            'mentor_name' => 'Ms. Laura Visual',
            'activity_name' => 'Festival Film Mahasiswa',
            'field' => 'Multimedia',
            'degree' => 'Juara I',
            'scope' => 'Regional',
            'organizer' => 'Komunitas Film Mahasiswa',
            'host_country' => 'Indonesia',
            'location' => 'Yogyakarta',
            'activity_date_start' => '2024-05-20',
            'activity_date_end' => '2024-05-22',
            'description' => 'Festival yang menampilkan karya film pendek mahasiswa.',
            'proof_scan_url' => 'http://example.com/posters/festival_film2024.png',
            'event_photo_url' => 'http://example.com/posters/festival_film2024.png',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}