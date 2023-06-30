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
        $appraisals = Appraisal::where("user_id", auth()->user()->id)->orderBy("created_at", "desc")->get();
        return inertia("Staff/appraisals/index", compact("appraisals"));
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Appraisal $appraisal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appraisal $appraisal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appraisal $appraisal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appraisal $appraisal)
    {
        //
    }
}
