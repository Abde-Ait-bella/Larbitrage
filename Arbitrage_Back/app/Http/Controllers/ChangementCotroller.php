<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Avertissement;
use App\Models\Changement;
// use App\Models\joueur;
use Illuminate\Http\Request;

class ChangementCotroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $changements = Changement::all();
        return $changements;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $changements = Changement::create($request->all());

        $changements = $request->all();

        foreach ($changements as $chang){
            Changement::create($chang);
        }

        return [
            "satus" => true,
            "data" => $changements
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $changement = Changement::find($id);
        $changement->update($request->all());

        return [
            "status" => true,
            "data" => $changement
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $changement = Changement::find($id);
        $changement->delete();


        return [
            "status" => true
        ];
    }
}
