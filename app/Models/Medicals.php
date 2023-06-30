<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicals extends Model
{
    use HasFactory;

    protected $fillable = [
        "condition", "diagnosis_date", "medication", "provider",
        "next_check_up", "notes", "attachment", "user_id",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
