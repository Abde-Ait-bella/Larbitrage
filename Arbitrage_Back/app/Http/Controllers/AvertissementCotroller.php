<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Avertissement;
use App\Models\Joueur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AvertissementCotroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $avertissement = Avertissement::all();
        return $avertissement;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $avertissement = $request->all();
        foreach ($avertissement as $avert) {
            Avertissement::create($avert);
        }

        $joueur = Joueur::where('joueur_numero_licence', $request->joueur_numero_licence)->get()->all();
        if (!$joueur) {
            $j = new Joueur();
            $j->nom = $request->nom;
            $j->joueur_numero_licence = $request->joueur_numero_licence;
            $j->joueur_numero = $request->joueur_numero;
            $j->save();
        }

        return [
            "status" => true,
            // "data" => $avertissement,
            "joueur" => $joueur,
            // "request" => $requestJoueur
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $avertissement = Avertissement::find($id);
        $avertissement->update($request->all());
        return [
            "status" => true,
            "data" => $avertissement
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $avertissement = Avertissement::find($id);
        $avertissement->delete();
        return [
            "status" => true
        ];
    }
}
