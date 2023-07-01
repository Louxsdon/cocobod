import { useState, useEffect } from "react";
import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import Input from "@/Components/Input";
import { useForm, router, Link } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import FileInput from "@/Components/FileInput";

export default function EditUser({ user = {}, roles = [], permissions = [] }) {
    const { post, put, errors, data, reset, setData } = useForm({
        name: user.name,
        phone: user.phone,
        email: user.email,
        photo: null,
        _method: "put",
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

        setData(newData);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        post(route("admin.users.update", user.id), {
            onSuccess: () => reset(),
            onError: (err) => console.log(err),
        });
    }

    return (
        <>
            <div className="p-5 dark bg-white w-2/4 mx-auto mt-16 shadow-sm rounded-lg">
                <p className="text-xl font-semibold">Update User Account</p>
                <hr className="my-2" />
                {/* Form section */}
                <form>
                    <div className="mb-4 flex items-center overflow-hidden border hover:scale-105 transition-all duration-150 bg-slate-200 rounded-md w-[150px] h-[150px]">
                        <img
                            src={"/photos/" + user?.photo}
                            alt={`${user.name} - Photo`}
                        />
                    </div>
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
                        <div className="">
                            <FileInput
                                label="Profile Photo"
                                name="photo"
                                type="file"
                                error={errors}
                                onChange={(e) => {
                                    console.log({ data, user });
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.files[0],
                                    });
                                }}
                            />
                            {user?.photo && (
                                <a
                                    target="_"
                                    className="text-blue-700"
                                    href={`/photos/${user.photo}`}
                                >{`Photo: ${user.photo}`}</a>
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={handleSubmit}
                            className="btn btn-warning !px-8 bg-orange-400 text-orange-100"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
            <div className="p-5 dark bg-white w-2/4 mx-auto mt-5 shadow-sm rounded-lg">
                <Tabs defaultValue="account" className="">
                    <TabsList>
                        <TabsTrigger value="account">Roles</TabsTrigger>
                        <TabsTrigger value="password">Permissions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        {/* Roles and User Roles */}
                        <Roles user={user} roles={roles} />
                    </TabsContent>
                    <TabsContent value="password">
                        {/* ================ Permissions ============*/}
                        <Permissions user={user} permissions={permissions} />
                    </TabsContent>
                </Tabs>
            </div>
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
        <div className="p-5 dark bg-white w-full mt-4 shadow-sm rounded-lg">
            <p className="text-lg font-semibold">Assign User Roles</p>

            <hr className=" my-2" />
            {/* Form section */}
            <form onSubmit={(e) => e.preventDefault()}>
                <section className="flex justify-between space-x-2">
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
        <div className="p-5 dark bg-white mx-auto mt-4 shadow-sm rounded-lg">
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
                            className="!w-full min-h-96"
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
