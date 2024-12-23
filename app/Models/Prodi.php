<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prodi extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_prodi',
        'nama_prodi'
    ];

    public function dosen()
    {
        return $this->hasMany(Dosen::class, 'id_program_studi');
    }

    public function mahasiswa()
    {
        return $this->hasMany(Mahasiswa::class, 'id_program_studi');
    }
}
