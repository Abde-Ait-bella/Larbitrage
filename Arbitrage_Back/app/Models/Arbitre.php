<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arbitre extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'ville_id',
        'type'
    ];

    public function ville(){
        return $this->belongsTo(ville::class);
    }
}
