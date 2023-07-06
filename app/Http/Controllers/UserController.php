<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return inertia("Admin/users/index", compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $roles = Role::all();
        return inertia("Admin/users/create", compact("roles"));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|max:255",
            "email" => 'required|string|email|max:255|unique:users',
            "phone" => "required|digits:10",
            'password' => ['required', 'confirmed', Password::defaults()],
            'role' => 'required|string|exists:roles,name',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'


        ]);

        // create new user
        DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
            ]);

            $user->assignRole($request->role);

            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $file_name = time() . '-' . $photo->getClientOriginalName();

                $user->photo = $file_name;
                $photo->move(public_path('photos'), $file_name);
                $user->save();
            }

            event(new Registered($user));
        });

        return to_route("admin.users.index")->with('message', ["text" => "User added successfully!"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $user->load(["department", "qualifications", "employee.department", "roles"]);
        return inertia("Admin/users/show", compact("user"));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {

        $permissions = Permission::all();
        $roles = Role::all();
        $user->permissions;
        $user->roles;
        $user->load(["permissions", 'roles']);

        // dd($user);
        return inertia(
            "Admin/users/edit",
            ["user" => $user, "roles" => $roles, "permissions" => $permissions]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            "name" => "required|max:255",
            "email" => 'required|string|email|max:255',
            "phone" => "required|digits:10",
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048'
        ]);


        DB::transaction(function () use ($request, $user) {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
            ]);

            if ($request->hasFile('photo')) {
                $photo = $request->file('photo');
                $file_name = time() . '-' . $photo->getClientOriginalName();

                $user->photo = $file_name;
                $photo->move(public_path('photos'), $file_name);
                $user->save();
            }

            event(new Registered($user));
        });



        return to_route("admin.users.index")->with('message', ["text" => "User updated successfully!"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->back()->with('message', ["text" => "User deleted successfully!"]);
    }

    public function syncRoles(Request $request, User $user)
    {
        $validate = $request->validate([
            'roles' => 'array',
        ]);
        $user->syncRoles($validate);

        return redirect()->back()->with('message', ["text" => "User role updated successfully!"]);
    }

    public function syncPermissions(Request $request, User $user)
    {
        $validate = $request->validate([
            'permissions' => 'array',
        ]);
        $user->syncPermissions($validate);

        return redirect()->back()->with('message', ["text" => "User permissions updated successfully!"]);
    }
}
