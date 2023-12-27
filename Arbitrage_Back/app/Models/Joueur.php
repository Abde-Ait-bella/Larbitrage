<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Joueur extends Model
{
    use HasFactory;
    protected $fillable = [
        'nom',
        'joueur_numero_licence',
        'joueur_numero'
    ];
}
