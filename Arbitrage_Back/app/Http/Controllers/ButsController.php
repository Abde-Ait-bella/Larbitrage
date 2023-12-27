<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\But;
use App\Models\Joueur;
use Illuminate\Http\Request;

class ButsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $buts = But::all();

        return $buts;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $buts = $request->all();

        foreach ($buts as $but) {
            But::create($but);
        }

        $joueur = Joueur::where('joueur_numero_licence', $request->joueur_numero_licence)->get()->all();
        if (!$joueur) {
            $j = new Joueur();
            $j->joueur_nom = $request->joueur_nom;
            $j->joueur_pre = $request->joueur_pre;
            $j->joueur_numero_licence = $request->joueur_numero_licence;
            $j->joueur_numero = $request->joueur_numero;
            $j->save();
        }

        return [
            "status" => true,
            "data" => $but,
            "joueur" => $joueur,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $but = But::find($id);
        $but->update($request->all());
        return [
            "status" => true,
            "data" => $but
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $but = But::find($id);
        $but->delete();
        return [
            "status" => true
        ];
    }
}
