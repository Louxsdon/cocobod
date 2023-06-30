<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qualification extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "institution",
        "completion_date",
        "start_date",
        "user_id",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
