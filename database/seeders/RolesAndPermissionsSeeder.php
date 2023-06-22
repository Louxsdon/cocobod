<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permission_tags = [
            "view", "create", "edit", "delete", "force-delete", "restore"
        ];
        $models = [
            "users", "employees", "departments", 'leaves', "roles", "permissions", "authorizations",
        ];

        // roles
        $RoleNames = ['super-admin', 'admin', 'staff', 'applicant', 'user'];

        $permisionNameArray = [];

        // generate permissions names
        foreach ($models as $model) {
            foreach ($permission_tags as $perm) {
                array_push($permisionNameArray, $model . '.' . $perm);
            }
        }

        // generate permissions
        $permissions = collect($permisionNameArray)->map(function ($permission) {
            return ['name' => $permission, 'guard_name' => 'web'];
        });

        // insert permissions
        Permission::insert($permissions->toArray());


        // generte roles
        $roles = collect($RoleNames)->map(function ($role) {
            return ['name' => $role, 'guard_name' => 'web'];
        });

        // insert roles
        Role::insert($roles->toArray());
        // $role[]
    }
}
