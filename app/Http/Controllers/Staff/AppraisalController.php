<?php

namespace App\Http\Controllers\Staff;

use App\Models\Appraisal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AppraisalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $appraisals = Appraisal::where("user_id", auth()->user()->id)->with("user")->orderBy("created_at", "desc")->get();
        return inertia("Staff/appraisals/index", compact("appraisals"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Staff/appraisals/create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "question1" => "nullable|string|max:255",
            "question1_answer" => "nullable|string|max:255",
            "question2" => "nullable|string|max:255",
            "question2_answer" => "nullable|string|max:255",
            "question3" => "nullable|string|max:255",
            "question3_answer" => "nullable|string|max:255",
            "question4" => "nullable|string|max:255",
            "question4_answer" => "nullable|string|max:255",
            "question5" => "nullable|string|max:255",
            "question5_answer" => "nullable|string|max:255",
            "question6" => "nullable|string|max:255",
            "question6_answer" => "nullable|string|max:255",
            "question7" => "nullable|string|max:255",
            "question7_answer" => "nullable|string|max:255",
            "question8" => "nullable|string|max:255",
            "question8_answer" => "nullable|string|max:255",
            "question9" => "nullable|string|max:255",
            "question9_answer" => "nullable|string|max:255",
            "question10" => "nullable|string|max:255",
            "question10_answer" => "nullable|string|max:255",
        ]);

        $validated["user_id"] = request()->user()->id;

        Appraisal::create($validated);

        return to_route("staff.appraisals.index")
            ->with('message', ['text' => 'Appraisal submitted successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Appraisal $appraisal)
    {
        return inertia("Staff/appraisals/show", compact("appraisal"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appraisal $appraisal)
    {
        return inertia("Staff/appraisals/edit", compact("appraisal"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appraisal $appraisal)
    {
        $validated = $request->validate([
            "question1" => "nullable|string|max:255",
            "question1_answer" => "nullable|string|max:255",
            "question2" => "nullable|string|max:255",
            "question2_answer" => "nullable|string|max:255",
            "question3" => "nullable|string|max:255",
            "question3_answer" => "nullable|string|max:255",
            "question4" => "nullable|string|max:255",
            "question4_answer" => "nullable|string|max:255",
            "question5" => "nullable|string|max:255",
            "question5_answer" => "nullable|string|max:255",
            "question6" => "nullable|string|max:255",
            "question6_answer" => "nullable|string|max:255",
            "question7" => "nullable|string|max:255",
            "question7_answer" => "nullable|string|max:255",
            "question8" => "nullable|string|max:255",
            "question8_answer" => "nullable|string|max:255",
            "question9" => "nullable|string|max:255",
            "question9_answer" => "nullable|string|max:255",
            "question10" => "nullable|string|max:255",
            "question10_answer" => "nullable|string|max:255",
        ]);


        $appraisal->update($validated);

        return to_route("staff.appraisals.index")
            ->with('message', ['text' => 'Appraisal updated successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appraisal $appraisal)
    {
        //
    }
}
