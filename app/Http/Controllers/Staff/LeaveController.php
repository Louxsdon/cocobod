<?php

namespace App\Http\Controllers\Staff;

use App\Models\Leave;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LeaveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = request()->user();
        $leaves = $user->leaves()->orderBy("created_at", "desc")->get();
        return inertia("Staff/leaves/index", compact('leaves'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Staff/leaves/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated_data = $request->validate([
            "heading" => "required|string|max:150",
            "reason" => "required|string|max:255",
            "from" => "required|date",
            "to" => "required|date",
            "type" => "required|in:Paid,Non-Paid",
        ]);

        Leave::create([
            "heading" => $request->heading,
            "reason" => $request->reason,
            "from" => $request->from,
            "to" => $request->to,
            "type" => $request->type,
            "user_id" => request()->user()->id
        ]);

        return to_route("staff.leaves.index")->with('message', ["text" => "Leave request submitted!"]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Leave $leaf)
    {
        $leaf->user;
        return inertia("Staff/leaves/show", compact("leaf"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Leave $leaf)
    {
        return inertia("Staff/leaves/edit", compact("leaf"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Leave $leaf)
    {
        $validated_data = $request->validate([
            "heading" => "required|string|max:150",
            "reason" => "required|string|max:255",
            "from" => "required|date",
            "to" => "required|date",
            "type" => "required|in:Paid,Non-Paid",
        ]);

        $leaf->update([
            "heading" => $request->heading,
            "reason" => $request->reason,
            "from" => $request->from,
            "to" => $request->to,
            "type" => $request->type,
            "user_id" => request()->user()->id
        ]);

        return to_route("staff.leaves.index")->with('message', ["text" => "Leave request updated!"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Leave $leaf)
    {
        $leaf->delete();
        return redirect()->back()->with('message', ["text" => "Leave request deleted!"]);
    }

    /**
     * Reject leave request.
     */
    public function reject(Leave $leave)
    {
        $leave->status = "rejected";
        $leave->save();
        return to_route("staff.leaves.index")->with('message', ["text" => "Leave request rejected!", "status" => "info"]);
    }
    /**
     * Approve leave request.
     */
    public function approve(Leave $leave)
    {
        $leave->status = "approved";
        $leave->save();
        return to_route("staff.leaves.index")->with('message', ["text" => "Leave request approved!", "status" => "info"]);
    }
}
