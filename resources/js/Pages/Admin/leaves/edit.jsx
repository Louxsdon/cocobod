import { useState, useEffect } from "react";
import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import Input from "@/Components/Input";
import { useForm, router } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";

export default function EditUser({
    auth,
    user = {},
    roles = [],
    permissions = [],
}) {
    const { put, errors, data, reset, setData } = useForm({
        name: "",
        phone: "",
        email: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route("admin.roles.update", { role: user.id }), {
            onSuccess: () => {
                reset();
            },
        });
        console.log("Data: ", data);
    }

    function onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const newData = { ...data, [name]: value };

        if (name === "name" || name === "slug") {
            const newSlug = generateSlug(value);
            newData.slug = newSlug;
        }

        setData(newData);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        put(route("admin.users.update", { user: user.id }), {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    useEffect(() => {
        setData(user);
        console.log(user);
    }, []);

    return (
        <>
            <div className="p-5 dark bg-white w-2/4 mx-auto mt-24 shadow-sm rounded-lg">
                <p className="text-xl font-semibold">Update User Account</p>
                <hr className="my-2" />
                {/* Form section */}
                <form>
                    <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                        <Input
                            label="Name"
                            name="name"
                            placeholder="Enter your name"
                            error={errors}
                            onChange={onChange}
                            defaultValue={user.name}
                        />
                        <Input
                            label="Phone Number"
                            name="phone"
                            placeholder="Enter your number"
                            error={errors}
                            onChange={onChange}
                            defaultValue={user.phone}
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            placeholder="Enter your email"
                            error={errors}
                            onChange={onChange}
                            defaultValue={user.email}
                        />
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handleSubmit}
                            className="btn !px-8 bg-orange-400 text-orange-100"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>

            {/* Roles and User Roles */}
            <Roles user={user} roles={roles} />

            {/* ================ Permissions ============*/}
            <Permissions user={user} permissions={permissions} />
        </>
    );
}

// Roles Section Component

export function Roles({ user = {}, roles: all_roles = [], user_roles = [] }) {
    const { put, errors, data, reset, setData } = useForm({
        name: "",
    });
    const [roles, setRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [removedRoles, setRemovedRoles] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        put(route("admin.roles.update", { role: user.id }), {
            onSuccess: () => {
                reset();
            },
        });
        console.log("Data: ", data);
    }

    function onAddPermissionChange(e) {
        const val = Array.from(e.target.selectedOptions, (v) => v.value);
        setSelectedRoles([...val]);
    }

    function addRolePermissions() {
        setUserRoles([...userRoles, ...selectedRoles]);
        setSelectedRoles([]);
    }

    function onRemovePermissionChange(e) {
        const val = Array.from(e.target.selectedOptions, (v) => v.value);
        setRemovedRoles([...removedRoles, ...val]);
    }

    function removeRolePermissions() {
        setUserRoles(
            userRoles.filter((permission) => !removedRoles.includes(permission))
        );
        setRemovedRoles([]);
    }

    function saveUserRoles() {
        router.post(
            route("admin.users.roles", user.id),
            { roles: userRoles },
            {
                onSuccess: (res) => console.log(res),
                onError: (err) => console.log(err),
            }
        );
        console.log("RolePermissions: ", userRoles);
        console.log("selectedRolePermissions: ", selectedRoles);
        console.log("removedRolePermissions: ", removedRoles);
    }

    useEffect(() => {
        setRoles(all_roles);
        setUserRoles(user.roles.map((r) => r.name));
    }, [all_roles]);

    return (
        //  ================ Roles ============*
        <div className="p-5 dark bg-white w-2/4 mx-auto mt-4 shadow-sm rounded-lg">
            <p className="text-lg font-semibold">Assign User Roles</p>

            <hr className=" my-2" />
            {/* Form section */}
            <form onSubmit={(e) => e.preventDefault()}>
                <section className="flex space-x-2">
                    <div className="w-full">
                        <SelectInput
                            name="roles"
                            label="Roles"
                            error={errors}
                            placeholder="Enter role name"
                            containerClassName="!w-full"
                            // value={data}
                            multiple={true}
                            onChange={onAddPermissionChange}
                        >
                            {roles.map((role, i) => {
                                const roleExist = userRoles.some(
                                    (r) => r === role.name
                                );

                                if (!roleExist) {
                                    return (
                                        <option key={i} value={role.name}>
                                            {role.name}
                                        </option>
                                    );
                                }
                            })}
                        </SelectInput>
                        <button
                            onClick={addRolePermissions}
                            className="bg-base-100 w-full"
                        >
                            Add
                        </button>
                    </div>
                    <div className="w-full">
                        <SelectInput
                            onChange={onRemovePermissionChange}
                            name="name"
                            label="Assigned Roles"
                            error={errors}
                            multiple={true}
                        >
                            {userRoles.map((perm, i) => (
                                <option key={i} value={perm}>
                                    {perm}
                                </option>
                            ))}
                        </SelectInput>
                        <button
                            onClick={removeRolePermissions}
                            className="bg-base-100 w-full"
                        >
                            Remove
                        </button>
                    </div>
                </section>
                <div className="mt-4">
                    <button
                        onClick={saveUserRoles}
                        className="btn !px-8 bg-green-500 text-green-100"
                    >
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
}

export function Permissions({ user = {}, permissions: all_permissions = [] }) {
    const { put, errors, data, reset, setData } = useForm({
        name: "",
    });
    const [permissions, setPermissions] = useState([]);
    const [userPermissions, setUserPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [removedPermissions, setRemovedPermissions] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        put(route("admin.roles.update", { role: user.id }), {
            onSuccess: () => {
                reset();
            },
        });
        console.log("Data: ", data);
    }

    function onAddPermissionChange(e) {
        const val = Array.from(e.target.selectedOptions, (v) => v.value);
        setSelectedPermissions([...val]);
    }

    function addUserPermissions() {
        setUserPermissions([...userPermissions, ...selectedPermissions]);
        setSelectedPermissions([]);
    }

    function onRemovePermissionChange(e) {
        const val = Array.from(e.target.selectedOptions, (v) => v.value);
        setRemovedPermissions([...removedPermissions, ...val]);
    }

    function removeUserPermissions() {
        setUserPermissions(
            userPermissions.filter(
                (permission) => !removedPermissions.includes(permission)
            )
        );
        setRemovedPermissions([]);
    }

    function saveUserPermissions() {
        router.post(
            route("admin.users.permissions", user.id),
            { permissions: userPermissions },
            {
                onSuccess: (res) => console.log(res),
                onError: (err) => console.log(err),
            }
        );
        console.log("RolePermissions: ", userPermissions);
        console.log("selectedRolePermissions: ", selectedPermissions);
        console.log("removedRolePermissions: ", removedPermissions);
    }

    useEffect(() => {
        setPermissions(all_permissions);
        setUserPermissions(user.permissions.map((p) => p.name));
    }, [all_permissions]);

    return (
        //  ================ Roles ============*
        <div className="p-5 dark bg-white w-2/4 mx-auto mt-4 shadow-sm rounded-lg">
            <p className="text-lg font-semibold">Assign User Permissions</p>

            <hr className=" my-2" />
            {/* Form section */}
            <form onSubmit={(e) => e.preventDefault()}>
                <section className="flex space-x-2">
                    <div className="w-full">
                        <SelectInput
                            label="Permissions"
                            error={errors}
                            placeholder="Enter permission name"
                            containerClassName="!w-full"
                            multiple={true}
                            onChange={onAddPermissionChange}
                        >
                            {permissions.map((permision, i) => {
                                const permissionExist = userPermissions.some(
                                    (p) => p === permision.name
                                );

                                if (!permissionExist) {
                                    return (
                                        <option key={i} value={permision.name}>
                                            {permision.name}
                                        </option>
                                    );
                                }
                            })}
                        </SelectInput>
                        <button
                            onClick={addUserPermissions}
                            className="bg-base-100 w-full"
                        >
                            Add
                        </button>
                    </div>
                    <div className="w-full">
                        <SelectInput
                            onChange={onRemovePermissionChange}
                            label="Assigned Permissions"
                            error={errors}
                            multiple={true}
                        >
                            {userPermissions.map((perm, i) => (
                                <option key={i} value={perm}>
                                    {perm}
                                </option>
                            ))}
                        </SelectInput>
                        <button
                            onClick={removeUserPermissions}
                            className="bg-base-100 w-full"
                        >
                            Remove
                        </button>
                    </div>
                </section>
                <div className="mt-4">
                    <button
                        onClick={saveUserPermissions}
                        className="btn !px-8 bg-green-500 text-green-100"
                    >
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
}
