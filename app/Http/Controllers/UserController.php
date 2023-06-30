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
        return inertia("Admin/users/create");
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
            "phone" => "required|string|max:13",
            'password' => ['required', 'confirmed', Password::defaults()],

        ]);

        // create new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);


        event(new Registered($user));

        return to_route("admin.users.index");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
            "phone" => "required|string|max:13",
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);

        return to_route("admin.users.index");
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
        return redirect()->back();
    }

    public function syncRoles(Request $request, User $user)
    {
        $validate = $request->validate([
            'roles' => 'array',
        ]);
        $user->syncRoles($validate);

        return redirect()->back();
    }

    public function syncPermissions(Request $request, User $user)
    {
        $validate = $request->validate([
            'permissions' => 'array',
        ]);
        $user->syncPermissions($validate);

        return redirect()->back();
    }
}
