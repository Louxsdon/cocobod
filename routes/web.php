<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\AuthorizationController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\Staff\AppointmentController;
use App\Http\Controllers\Staff\AppraisalController;
use App\Http\Controllers\Staff\IndexController;
use App\Http\Controllers\Staff\LeaveController as StaffLeaveController;
use App\Http\Controllers\Staff\MedicalsController;
use App\Http\Controllers\Staff\QualificationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('/auth')->group(function () {
    Route::get('/login', function () {
        return inertia("auth/Login");
    });
    Route::get('/register', function () {
        return inertia("auth/Register");
    });
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified', 'role:admin|super-admin'])->prefix('/admin')->name('admin.')->group(function () {
    Route::resource('users', UserController::class);
    Route::post('users/{user}/roles', [UserController::class, 'syncRoles'])->name('users.roles');
    Route::post('users/{user}/permissions', [UserController::class, 'syncPermissions'])
        ->name('users.permissions');
    Route::get('dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    });


    Route::resource('departments', DepartmentController::class);

    Route::resource('employees', EmployeeController::class);

    Route::resource('leaves', LeaveController::class)->parameter("leaf", "leave");
    Route::post('leaves/{leave}/reject', [LeaveController::class, "reject"])->name("leaves.reject");
    Route::post('leaves/{leave}/approve', [LeaveController::class, "approve"])->name("leaves.approve");

    Route::resource('appraisals', LeaveController::class);

    // roles and permissions
    Route::resource('roles', RoleController::class);
    Route::post('roles/{role}', [RoleController::class, 'addPermissions'])
        ->name('roles.permissions');
    Route::resource('permissions', PermissionController::class);

    Route::get('authorizations', [AuthorizationController::class, 'index'])
        ->name('authorizations.index');
});

Route::middleware(['auth', 'verified', 'role:staff|employee'])->prefix('/staff')->name('staff.')->group(function () {
    Route::get('dashboard', [IndexController::class, "index"])->name("dashboard");

    Route::resource('leaves', StaffLeaveController::class)->parameter("leaf", "leave");

    Route::resource('appraisals', AppraisalController::class);
    Route::resource('qualifications', QualificationController::class);
    Route::resource('medicals', MedicalsController::class);
    Route::resource('appointments', AppointmentController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
