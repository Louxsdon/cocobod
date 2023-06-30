<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave extends Model
{
    use HasFactory;

    protected $fillable = [
        "heading",
        "reason",
        "from",
        "to",
        "type",
        "user_id",
        "status"
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
