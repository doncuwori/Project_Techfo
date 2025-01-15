<?php

namespace Database\Seeders;

use App\Models\Competitions\CompetitionInformation;
use App\Models\Scholarships\ScholarshipInformation;
use App\Models\Abdimas\AbdimasInformation;
use App\Models\Researchs\ResearchInformation;
use Illuminate\Database\Seeder;

class InformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $competitionsData = [
            [
                'name' => 'Hackathon Inovasi Digital Nasional',
                'organizer' => 'Kementerian Komunikasi dan Informatika',
                'event_time_start' => now()->addMonths(2),
                'event_time_end' => now()->addMonths(2),
                'description' => 'Kompetisi pengembangan solusi teknologi digital untuk permasalahan nasional.',
                'activity_link' => 'https://www.kabarlomba.com/2024/12/gratis-kompetisi-menulis-nasional-forum.html',
                'guidebook_link' => 'https://drive.google.com/file/d/14rXaED2I8mNRPgkWslb8Bq9hY8wkJOwy/view',
                'poster_url' => 'competitions/hackathon-digital.jpg',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Kompetisi Desain Arsitektur Berkelanjutan',
                'organizer' => 'Ikatan Arsitek Indonesia',
                'event_time_start' => now()->addMonths(3),
                'event_time_end' => now()->addMonths(4),
                'description' => 'Kompetisi desain arsitektur dengan konsep ramah lingkungan dan berkelanjutan.',
                'activity_link' => 'https://example.com/kompetisi-arsitektur',
                'guidebook_link' => 'https://example.com/guidebook-arsitektur',
                'poster_url' => 'competitions/kompetisi-arsitektur.jpg',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Lomba Karya Tulis Ilmiah Nasional',
                'organizer' => 'Asosiasi Perguruan Tinggi',
                'event_time_start' => now()->addMonths(2),
                'event_time_end' => now()->addMonths(5),
                'description' => 'Kompetisi penulisan karya ilmiah untuk mahasiswa se-Indonesia.',
                'activity_link' => 'https://example.com/lomba-karya-tulis',
                'guidebook_link' => 'https://example.com/guidebook-karya-tulis',
                'poster_url' => 'competitions/lomba-karya-tulis.jpg',
                'created_by' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Kompetisi Kewirausahaan Sosial',
                'organizer' => 'Yayasan Pengembangan Wirausaha',
                'event_time_start' => now()->addMonths(2),
                'event_time_end' => now()->addMonths(3),
                'description' => 'Ajang kompetisi untuk mahasiswa dengan ide bisnis sosial yang inovatif.',
                'activity_link' => 'https://example.com/kompetisi-wirausaha',
                'guidebook_link' => 'https://example.com/guidebook-wirausaha',
                'poster_url' => 'competitions/kompetisi-wirausaha.jpg',
                'created_by' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Lomba Robotic dan Kecerdasan Buatan',
                'organizer' => 'Asosiasi Robotik Indonesia',
                'event_time_start' => now()->addMonths(1),
                'event_time_end' => now()->addMonths(2),
                'description' => 'Kompetisi pengembangan robot dan aplikasi kecerdasan buatan.',
                'activity_link' => 'https://example.com/lomba-robotik',
                'guidebook_link' => 'https://example.com/guidebook-robotik',
                'poster_url' => 'competitions/lomba-robotik.jpg',
                'created_by' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Kompetisi Film Dokumenter Lingkungan',
                'organizer' => 'Dewan Kesenian Lingkungan',
                'event_time_start' => now()->addMonths(2),
                'event_time_end' => now()->addMonths(3),
                'description' => 'Kompetisi pembuatan film dokumenter bertema pelestarian lingkungan.',
                'activity_link' => 'https://example.com/kompetisi-film',
                'guidebook_link' => 'https://example.com/guidebook-film',
                'poster_url' => 'competitions/kompetisi-film.jpg',
                'created_by' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Olimpiade Sains Nasional',
                'organizer' => 'Kementerian Pendidikan',
                'event_time_start' => now()->addMonths(2),
                'event_time_end' => now()->addMonths(4),
                'description' => 'Kompetisi sains tingkat nasional untuk mahasiswa dari berbagai bidang ilmu.',
                'activity_link' => 'https://example.com/olimpiade-sains',
                'guidebook_link' => 'https://example.com/guidebook-sains',
                'poster_url' => 'competitions/olimpiade-sains.jpg',
                'created_by' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Kompetisi Desain Produk Inovatif',
                'organizer' => 'Kementerian Perindustrian',
                'event_time_start' => now()->addMonths(2),
                'event_time_end' => now()->addMonths(5),
                'description' => 'Kompetisi desain produk dengan fokus inovasi dan kebermanfaatan.',
                'activity_link' => 'https://example.com/kompetisi-desain',
                'guidebook_link' => 'https://example.com/guidebook-desain',
                'poster_url' => 'competitions/kompetisi-desain.jpg',
                'created_by' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        $scholarshipsData = [
            [
                'name' => 'Beasiswa Prestasi Akademik Nasional',
                'organizer' => 'Kementerian Pendidikan dan Kebudayaan',
                'event_time_start' => now()->addMonths(2),
                'event_time_end' => now()->addMonths(3),
                'description' => 'Beasiswa untuk mahasiswa berprestasi dengan kriteria akademik tinggi dan berasal dari keluarga kurang mampu.',
                'poster_url' => 'scholarships/beasiswa-prestasi.jpg',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Beasiswa Riset Inovasi Teknologi',
                'organizer' => 'Kementerian Riset dan Teknologi',
                'event_time_start' => now()->addMonths(3),
                'event_time_end' => now()->addMonths(4),
                'description' => 'Program beasiswa untuk mahasiswa yang memiliki inovasi teknologi dan penelitian berkualitas.',
                'poster_url' => 'scholarships/beasiswa-riset.jpg',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Beasiswa Kepemimpinan Muda',
                'organizer' => 'Yayasan Pemuda Inspiratif',
                'event_time_start' => now()->addMonths(4),
                'event_time_end' => now()->addMonths(5),
                'description' => 'Beasiswa untuk mahasiswa yang memiliki potensi kepemimpinan dan kontribusi sosial.',
                'poster_url' => 'scholarships/beasiswa-kepemimpinan.jpg',
                'created_by' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Beasiswa Wirausaha Muda',
                'organizer' => 'Kementerian Koperasi dan UKM',
                'event_time_start' => now()->addMonths(5),
                'event_time_end' => now()->addMonths(6),
                'description' => 'Dukungan beasiswa untuk mahasiswa yang memiliki ide bisnis inovatif dan potensi kewirausahaan.',
                'poster_url' => 'scholarships/beasiswa-wirausaha.jpg',
                'created_by' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Beasiswa Internasional ASEAN',
                'organizer' => 'Sekretariat ASEAN',
                'event_time_start' => now()->addMonths(6),
                'event_time_end' => now()->addMonths(7),
                'description' => 'Program beasiswa pertukaran untuk mahasiswa dari negara-negara anggota ASEAN.',
                'poster_url' => 'scholarships/beasiswa-asean.jpg',
                'created_by' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Beasiswa Peduli Lingkungan',
                'organizer' => 'Kementerian Lingkungan Hidup',
                'event_time_start' => now()->addMonths(7),
                'event_time_end' => now()->addMonths(8),
                'description' => 'Beasiswa untuk mahasiswa yang memiliki kontribusi nyata dalam pelestarian lingkungan.',
                'poster_url' => 'scholarships/beasiswa-lingkungan.jpg',
                'created_by' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Beasiswa Penelitian Kesehatan',
                'organizer' => 'Kementerian Kesehatan',
                'event_time_start' => now()->addMonths(8),
                'event_time_end' => now()->addMonths(9),
                'description' => 'Program beasiswa untuk mahasiswa kedokteran dan kesehatan yang berprestasi.',
                'poster_url' => 'scholarships/beasiswa-kesehatan.jpg',
                'created_by' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Beasiswa Pengembangan Seni dan Budaya',
                'organizer' => 'Kementerian Pendidikan Kebudayaan',
                'event_time_start' => now()->addMonths(9),
                'event_time_end' => now()->addMonths(10),
                'description' => 'Beasiswa untuk mahasiswa yang memiliki talenta di bidang seni dan pelestarian budaya.',
                'poster_url' => 'scholarships/beasiswa-seni.jpg',
                'created_by' => 4,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        $abdimasData = [
            [
                'name' => 'Pelatihan Digital Marketing untuk UMKM',
                'location' => 'Aula Lantai 2 Gedung Bisnis',
                'event_time_start' => '2024-11-20',
                'event_time_end' => '2024-12-01',
                'total_students_required' => 50,
                'lecturer_1' => 'Dr. Ahmad Fauzan',
                'lecturer_2' => 'Prof. Bella Kartika',
                'lecturer_3' => 'Dr. Clara Sutanto',
                'lecturer_4' => 'Prof. David Hartono',
                'lecturer_5' => 'Dr. Erwin Aditya',
                'description' => 'Pelatihan ini bertujuan untuk membantu UMKM dalam memahami strategi pemasaran digital.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Penyuluhan Kesehatan di Desa Tertinggal',
                'location' => 'Balai Desa Sukamaju',
                'event_time_start' => '2024-11-25',
                'event_time_end' => '2024-12-05',
                'total_students_required' => 30,
                'lecturer_1' => 'Dr. Fauzan Malik',
                'lecturer_2' => 'Prof. Gita Aryani',
                'lecturer_3' => 'Dr. Hana Surya',
                'lecturer_4' => 'Prof. Irfan Maulana',
                'lecturer_5' => 'Dr. Jelita Ramadhani',
                'description' => 'Penyuluhan kesehatan kepada masyarakat terkait gizi dan kebersihan lingkungan.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Workshop Pembuatan Website untuk Pemuda Desa',
                'location' => 'Lab Komputer Desa Mekarsari',
                'event_time_start' => '2024-12-01',
                'event_time_end' => '2024-12-10',
                'total_students_required' => 40,
                'lecturer_1' => 'Dr. Kelvin Santoso',
                'lecturer_2' => 'Prof. Lestari Dewi',
                'lecturer_3' => 'Dr. Muhammad Arif',
                'lecturer_4' => 'Prof. Nadya Ismail',
                'lecturer_5' => 'Dr. Olivia Kartini',
                'description' => 'Workshop ini mengajarkan dasar-dasar pembuatan website untuk meningkatkan potensi desa.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Pelatihan Keterampilan Kriya untuk Ibu Rumah Tangga',
                'location' => 'Gedung Serbaguna Kecamatan Sukamaju',
                'event_time_start' => '2024-11-15',
                'event_time_end' => '2024-11-25',
                'total_students_required' => 25,
                'lecturer_1' => 'Dr. Umar Hidayat',
                'lecturer_2' => 'Prof. Vera Wulandari',
                'lecturer_3' => 'Dr. Wahyu Anggara',
                'lecturer_4' => 'Prof. Yuli Astuti',
                'lecturer_5' => 'Dr. Zaki Fadillah',
                'description' => 'Pelatihan keterampilan kriya seperti menjahit, merajut, dan membuat kerajinan tangan.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Sosialisasi Pengelolaan Sampah di Sekolah',
                'location' => 'SD Negeri 1 Sukamaju',
                'event_time_start' => '2024-12-05',
                'event_time_end' => '2024-12-15',
                'total_students_required' => 20,
                'lecturer_1' => 'Dr. Putra Pratama',
                'lecturer_2' => 'Prof. Qistina Hana',
                'lecturer_3' => 'Dr. Rahmat Satria',
                'lecturer_4' => 'Prof. Siti Nurhaliza',
                'lecturer_5' => 'Dr. Taufik Wijaya',
                'description' => 'Sosialisasi kepada siswa tentang pentingnya pengelolaan sampah dan daur ulang.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Pelatihan Keamanan Cyber untuk Guru Sekolah',
                'location' => 'Lab Komputer SMA Negeri 1 Sukamaju',
                'event_time_start' => '2024-12-10',
                'event_time_end' => '2024-12-20',
                'total_students_required' => 20,
                'lecturer_1' => 'Dr. Andi Satria',
                'lecturer_2' => 'Prof. Dina Lestari',
                'lecturer_3' => 'Dr. Edwin Permana',
                'lecturer_4' => 'Prof. Farah Anindya',
                'lecturer_5' => 'Dr. Gunawan Pratama',
                'description' => 'Pelatihan ini bertujuan memberikan wawasan kepada guru tentang keamanan informasi digital.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Peningkatan Literasi Digital untuk Komunitas Perempuan',
                'location' => 'Balai Desa Karangjati',
                'event_time_start' => '2024-11-30',
                'event_time_end' => '2024-12-10',
                'total_students_required' => 35,
                'lecturer_1' => 'Dr. Hana Purnamasari',
                'lecturer_2' => 'Prof. Indra Wijaya',
                'lecturer_3' => 'Dr. Jessica Kartika',
                'lecturer_4' => 'Prof. Khalid Maulana',
                'lecturer_5' => 'Dr. Laras Wibisono',
                'description' => 'Kegiatan untuk meningkatkan keterampilan digital dalam menggunakan teknologi untuk pengembangan usaha.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];        

        $researchData = [
            [
                'name' => 'Penelitian Pengaruh Pupuk Organik terhadap Tanaman Padi',
                'location' => 'Laboratorium Pertanian Gedung B',
                'event_time_start' => '2024-12-01',
                'event_time_end' => '2024-12-10',
                'total_students_required' => 15,
                'lecturer_1' => 'Prof. Ahmad Yusran',
                'lecturer_2' => 'Dr. Budi Hermansyah',
                'lecturer_3' => 'Dr. Citra Anindya',
                'lecturer_4' => 'Prof. Diana Kartika',
                'lecturer_5' => 'Dr. Eka Purnama',
                'description' => 'Penelitian ini menguji efektivitas pupuk organik pada hasil panen padi.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Studi Pemanfaatan Energi Surya untuk Rumah Tangga',
                'location' => 'Lab Energi Terbarukan Gedung Teknik',
                'event_time_start' => '2024-11-20',
                'event_time_end' => '2024-12-01',
                'total_students_required' => 20,
                'lecturer_1' => 'Dr. Faisal Anwar',
                'lecturer_2' => 'Prof. Gita Harman',
                'lecturer_3' => 'Dr. Hendra Setiawan',
                'lecturer_4' => 'Prof. Iman Nurhadi',
                'lecturer_5' => 'Dr. Joko Prasetyo',
                'description' => 'Penelitian tentang penggunaan panel surya untuk kebutuhan listrik rumah tangga.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Pengembangan Aplikasi Mobile untuk Diagnosa Kesehatan',
                'location' => 'Lab Komputer AI Gedung Informatika',
                'event_time_start' => '2024-12-05',
                'event_time_end' => '2024-12-15',
                'total_students_required' => 25,
                'lecturer_1' => 'Dr. Kelvin Santoso',
                'lecturer_2' => 'Prof. Lestari Dewi',
                'lecturer_3' => 'Dr. Muhammad Arif',
                'lecturer_4' => 'Prof. Nadya Ismail',
                'lecturer_5' => 'Dr. Olivia Kartini',
                'description' => 'Penelitian untuk mengembangkan aplikasi diagnosa kesehatan berbasis AI.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Analisis Pengaruh Teknologi IoT terhadap Efisiensi Pertanian',
                'location' => 'Laboratorium IoT Gedung Teknik',
                'event_time_start' => '2024-12-01',
                'event_time_end' => '2024-12-10',
                'total_students_required' => 30,
                'lecturer_1' => 'Dr. Umar Hidayat',
                'lecturer_2' => 'Prof. Vera Wulandari',
                'lecturer_3' => 'Dr. Wahyu Anggara',
                'lecturer_4' => 'Prof. Yuli Astuti',
                'lecturer_5' => 'Dr. Zaki Fadillah',
                'description' => 'Penelitian ini mengevaluasi pengaruh teknologi IoT pada peningkatan hasil pertanian.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Kajian Dampak Smart City terhadap Infrastruktur Perkotaan',
                'location' => 'Auditorium Gedung Pemerintahan',
                'event_time_start' => '2024-12-10',
                'event_time_end' => '2024-12-20',
                'total_students_required' => 50,
                'lecturer_1' => 'Dr. Putra Pratama',
                'lecturer_2' => 'Prof. Qistina Hana',
                'lecturer_3' => 'Dr. Rahmat Satria',
                'lecturer_4' => 'Prof. Siti Nurhaliza',
                'lecturer_5' => 'Dr. Taufik Wijaya',
                'description' => 'Kajian dampak penerapan konsep Smart City terhadap pengelolaan infrastruktur perkotaan.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Pengaruh Algoritma AI pada Sistem Rekomendasi E-commerce',
                'location' => 'Lab AI dan Data Science Gedung Informatika',
                'event_time_start' => '2024-12-15',
                'event_time_end' => '2024-12-25',
                'total_students_required' => 30,
                'lecturer_1' => 'Prof. Budi Santoso',
                'lecturer_2' => 'Dr. Clara Dewi',
                'lecturer_3' => 'Dr. Erwin Saputra',
                'lecturer_4' => 'Prof. Fitria Sasmita',
                'lecturer_5' => 'Dr. Gita Pratami',
                'description' => 'Penelitian tentang efektivitas algoritma AI dalam meningkatkan pengalaman pengguna di platform e-commerce.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Studi Dampak Perubahan Iklim terhadap Keanekaragaman Hayati',
                'location' => 'Hutan Lindung Taman Nasional Merapi',
                'event_time_start' => '2024-12-05',
                'event_time_end' => '2024-12-15',
                'total_students_required' => 25,
                'lecturer_1' => 'Dr. Hasan Basri',
                'lecturer_2' => 'Prof. Ida Kusuma',
                'lecturer_3' => 'Dr. Jaka Wijaya',
                'lecturer_4' => 'Prof. Lina Prasetyo',
                'lecturer_5' => 'Dr. Mulyadi Surya',
                'description' => 'Penelitian ini bertujuan untuk mengidentifikasi dampak perubahan iklim terhadap flora dan fauna lokal.',
                'created_by' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];        


        // Insert data to database
        CompetitionInformation::insert($competitionsData);
        ScholarshipInformation::insert($scholarshipsData);
        AbdimasInformation::insert($abdimasData);
        ResearchInformation::insert($researchData);
    }
}
