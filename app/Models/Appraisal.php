<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appraisal extends Model
{
    use HasFactory;

    protected $fillable = [
        "question1",
        "question1_answer",
        "question2",
        "question2_answer",
        "question3",
        "question3_answer",
        "question4",
        "question4_answer",
        "question5",
        "question5_answer",
        "question6",
        "question6_answer",
        "question7",
        "question7_answer",
        "question8",
        "question8_answer",
        "question9",
        "question9_answer",
        "question10",
        "question10_answer",
        "user_id",
        "status",
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
