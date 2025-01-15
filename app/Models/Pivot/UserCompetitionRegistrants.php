<?php

namespace App\Models\Pivot;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserCompetitionRegistrants extends Pivot
{
    use HasFactory;

    protected $table = 'user_competition_registrants';
    

}
