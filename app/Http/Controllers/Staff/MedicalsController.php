<?php

namespace App\Http\Controllers\Staff;

use App\Models\Medicals;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MedicalsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medicals = Medicals::where("user_id", auth()->user()->id)->orderBy("created_at", "desc")->get();
        return inertia("Staff/medicals/index", compact("medicals"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Staff/medicals/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated_data = $request->validate([
            "condition" => "required|string|max:150",
            "medication" => "nullable|string|max:255",
            "diagnosis_date" => "required|date",
            "provider" => "required|string|max:255",
            "notes" => "nullable|string|max:255",
            "attachment" => "nullable|string|max:255",
            "next_check_up" => "nullable|date",
        ]);

        Medicals::create([
            "condition" => $request->condition,
            "medication" => $request->medication,
            "diagnosis_date" => $request->diagnosis_date,
            "provider" => $request->provider,
            "notes" => $request->notes,
            "attachment" => $request->attachment,
            "next_check_up" => $request->next_check_up,
            "user_id" => request()->user()->id
        ]);

        return to_route("staff.medicals.index")->with('message', ["text" => "Medicals added successfully!"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Medicals $medicals)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Medicals $medical)
    {
        return inertia("Staff/medicals/edit", compact("medical"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Medicals $medical)
    {
        $validated_data = $request->validate([
            "condition" => "required|string|max:150",
            "medication" => "nullable|string|max:255",
            "diagnosis_date" => "required|date",
            "provider" => "required|string|max:255",
            "notes" => "nullable|string|max:255",
            "next_check_up" => "nullable|date",
            "attachment" => "nullable|string|max:255",
        ]);

        $medical->update([
            "condition" => $request->condition,
            "medication" => $request->medication,
            "diagnosis_date" => $request->diagnosis_date,
            "provider" => $request->provider,
            "notes" => $request->notes,
            "next_check_up" => $request->next_check_up,
            "attachment" => $request->attachment,
        ]);

        return to_route("staff.medicals.index")->with('message', ["text" => "Medicals updated successfully!"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Medicals $medical)
    {
        $medical->delete();
        return redirect()->back()->with('message', ["text" => "Record deleted successfully!"]);
    }
}
