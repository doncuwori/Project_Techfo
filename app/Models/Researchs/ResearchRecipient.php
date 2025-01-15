<?php

namespace App\Models\Researchs;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchRecipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'telephone',
        'organizer',
        'khs',
        'cv',
        'portofolio',
        'foto',
        'created_by',
    ];

    /**
     * Relasi dengan tabel users melalui tabel pivot user_research_recipients.
     */
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_research_recipients');
    }
}
