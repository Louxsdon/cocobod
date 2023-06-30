<?php

namespace App\Http\Controllers\Staff;

use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Department;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appointments = Appointment::where("user_id", auth()->user()->id)->with("department")->orderBy("created_at", "desc")->get();
        return inertia("Staff/appointments/index", compact("appointments"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = Department::all();
        return inertia("Staff/appointments/create", compact("departments"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "date" => "required|date",
            "time" => "required|string:max:10",
            "department" => "required|exists:departments,id",
            "comments" => "nullable|string|max:255",
        ]);

        Appointment::create([
            "date" => $request->date,
            "time" => $request->time,
            "department_id" => $request->department,
            "comments" => $request->comments,
            "user_id" => request()->user()->id
        ]);

        return to_route("staff.appointments.index")->with('message', ["text" => "Appointment booked successfully!"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Appointment $appointment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appointment $appointment)
    {
        $departments = Department::all();
        return inertia("Staff/appointments/edit", compact("appointment", "departments"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $appointment)
    {
        $request->validate([
            "date" => "required|date",
            "time" => "required|string:max:10",
            "department" => "required|exists:departments,id",
            "comments" => "nullable|string|max:255",
        ]);

        $appointment->update([
            "date" => $request->date,
            "time" => $request->time,
            "department_id" => $request->department,
            "comments" => $request->comments,
        ]);

        return to_route("staff.appointments.index")->with('message', ["text" => "Appointment re-scheduled successfully!"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return redirect()->back()->with('message', ["text" => "Appointment deleted successfully!"]);
    }
}
