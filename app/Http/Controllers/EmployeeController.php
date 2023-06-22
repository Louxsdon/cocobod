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
        $employees = Employee::with(["department"])->get();
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
        $users = User::all();
        $departments = Department::all();

        return inertia("Admin/employees/create", compact("departments", "users", "roles", "permissions"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "first_name" => "required|max:255",
            "last_name" => "required|max:255",
            "email" => 'required|string|email|max:255|unique:users',
            "user_id" => 'required|string|exists:users,id',
            "department_id" => 'required|string|exists:departments,id',
            "phone" => "required|string|max:13",

        ]);

        // create new user
        $user = Employee::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'department_id' => $request->department_id,
            'user_id' => $request->user_id,
        ]);

        return to_route("admin.employees.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        $roles = Role::all();
        // $roles->permissions;
        $permissions = Permission::all();
        return inertia("Admin/employees/show", compact("employee", "roles", "permissions"));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(employee $employee)
    {
        //
    }
}
