<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tourguide extends Model
{
    use HasFactory;
    protected $table = 'tourguide';

    protected $fillable = [

        'name',
        'father_name',
        'image',
        'password',
        'id_card',
        'location',
        'bio',
        'phone',
        'status'

    ];

}
