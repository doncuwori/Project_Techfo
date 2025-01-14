<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_user',
        'id_prodi',
        'nim',
        'nama',
        'email',
        'phone',
        'gender',
        'angkatan',
    ];

    public function getSemesterAttribute()
    {
        // Pastikan field 'angkatan' diisi
        if (!$this->angkatan) {
            return null;
        }

        // Ambil tahun sekarang dan bulan sekarang
        $currentYear = Carbon::now()->year;
        $currentMonth = Carbon::now()->month;

        // Hitung selisih tahun antara tahun sekarang dan angkatan
        $yearsDifference = $currentYear - $this->angkatan;

        // Total semester berdasarkan selisih tahun (1 tahun = 2 semester)
        $totalSemesters = $yearsDifference * 2;

        // Tambahkan 1 jika sekarang termasuk semester ganjil (Agustus - Januari)
        if ($currentMonth >= 8 || $currentMonth <= 1) {
            $totalSemesters += 1;
        }

        return $totalSemesters;
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function prodi()
    {
        return $this->belongsTo(Prodi::class, 'id_prodi');
    }
    
    public function mahasiswaAccess()
    {
        return $this->hasOne(MahasiswaAccess::class, 'id_mahasiswa');
    }
}
