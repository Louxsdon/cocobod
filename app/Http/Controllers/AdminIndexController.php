<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Leave;
use App\Models\User;
use Illuminate\Http\Request;

class AdminIndexController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::count();
        $employees = User::with("roles")->whereHas("roles", function ($query) {
            return $query->where("name", "employee");
        })->count();

        $leaves = Leave::with("user")->where("status", "pending")->get();
        $leaves_count = $leaves->count();

        $appointments = Appointment::with("user")->where("status", "submitted")->get();
        $appointments_count = $appointments->count();


        return inertia('Admin/Dashboard', compact('users', 'employees', "leaves", "leaves_count",  "appointments", "appointments_count"));
    }
}
