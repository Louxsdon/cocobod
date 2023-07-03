<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments = Department::all();
        return inertia('Admin/departments/index', compact('departments'));
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
        $validated_data = $request->validate([
            "name" => "required|string|max:100|unique:departments,name",
        ]);

        Department::create($validated_data);

        return to_route("admin.departments.index")
            ->with('message', ['text' => 'Department created successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        $employees = $department->employees;
        return inertia("Admin/departments/edit", compact("department", "employees"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(department $department)
    {
        $employees = $department->load("employees.user");
        return inertia("Admin/departments/edit", compact("department", "employees"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        $validated_data = $request->validate([
            "name" => "required|string|max:100|unique:departments,name",
        ]);

        $department->update([
            "name" => request("name"),
        ]);

        return to_route("admin.departments.index")
            ->with('message', ['text' => 'Department updated successfully!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();
        return redirect()->back()->with('message', ['text' => 'Department deleted successfully!']);
    }
}
