<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Illuminate\Validation\Rules\Password;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::with(["department", "user"])->get();
        return inertia("Admin/employees/index", compact('employees'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles = Role::all();
        // $roles->permissions;
        $permissions = Permission::all();
        $users = User::whereNotIn("id",  function ($query) {
            $query->select('id')->from('employees');
        })->get();
        $departments = Department::all();

        return inertia("Admin/employees/create", compact("departments", "users", "roles", "permissions"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "gender" => "required|in:male,female",
            "date_of_birth" => "nullable|date",
            "job_title" => 'required|string|max:100',
            "address" => 'nullable|string|max:255',
            "hired_on" => "required|date",
            "bio" => 'nullable|string|max:255',
            "user_id" => 'required|string|exists:users,id',
            "role" => 'required|string|exists:roles,id',
            "department_id" => 'required|string|exists:departments,id',

        ]);

        // create new user
        $user = Employee::create($validated);

        return to_route("admin.employees.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        $permissions = Permission::all();
        $roles = Role::all();
        $employee->load(["user.permissions", 'user.roles', 'department']);
        $departments = Department::all();

        return inertia(
            "Admin/employees/show",
            compact("employee", "departments", "roles", "permissions")
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        $permissions = Permission::all();
        $roles = Role::all();
        $employee->load(["user.permissions", 'user.roles']);
        $departments = Department::all();


        return inertia(
            "Admin/employees/edit",
            compact("employee", "departments", "roles", "permissions")
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            "gender" => "required|in:male,female",
            "date_of_birth" => "nullable|date",
            "job_title" => 'required|string|max:100',
            "address" => 'nullable|string|max:255',
            "hired_on" => "required|date",
            "bio" => 'nullable|string|max:255',
            "user_id" => 'required|integer|exists:users,id',
            "department_id" => 'required|integer|exists:departments,id',

        ]);

        // create new user
        $user = $employee->update($validated);
        return to_route('admin.employees.index')->with("message", ["text" => "Employee Updated!"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return redirect()->back()->with("message", ["text" => "Employee deleted!"]);
    }
}
