<?php

namespace App\Http\Controllers\Staff;

use App\Models\Qualification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class QualificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $qualifications = Qualification::where("user_id", auth()->user()->id)->orderBy("created_at", "desc")->get();
        return inertia("Staff/qualifications/index", compact("qualifications"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Staff/qualifications/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated_data = $request->validate([
            "name" => "required|string|max:150",
            "institution" => "required|string|max:255",
            "completion_date" => "required|date",
            "start_date" => "required|date",
        ]);

        Qualification::create([
            "name" => $request->name,
            "institution" => $request->institution,
            "completion_date" => $request->completion_date,
            "start_date" => $request->start_date,
            "user_id" => request()->user()->id
        ]);

        return to_route("staff.qualifications.index")->with('message', ["text" => "Qualification added successfully!"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Qualification $qualification)
    {
        return inertia("Staff/leaves/show", compact("qualification"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Qualification $qualification)
    {
        return inertia("Staff/qualifications/edit", compact("qualification"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Qualification $qualification)
    {
        $validated_data = $request->validate([
            "name" => "required|string|max:150",
            "institution" => "required|string|max:255",
            "completion_date" => "required|date",
            "start_date" => "required|date",
        ]);

        $qualification->update([
            "name" => $request->name,
            "institution" => $request->institution,
            "completion_date" => $request->completion_date,
            "start_date" => $request->start_date,
        ]);

        return to_route("staff.qualifications.index")->with('message', ["text" => "Qualification updated successfully!"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Qualification $qualification)
    {
        $qualification->delete();
        return redirect()->back()->with('message', ["text" => "Qualification deleted successfully!"]);
    }
}
