import { useState, useEffect } from "react";
import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import Input from "@/Components/Input";
import { useForm, router } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import TextareaInput from "@/Components/TextareaInput";

export default function EditUser({
    auth,
    employee = {},
    roles = [],
    permissions = [],
    departments = [],
}) {
    const { put, errors, data, reset, setData } = useForm({
        gender: "",
        date_of_birth: "",
        job_title: "",
        address: "",
        hired_on: "",
        bio: "",
    });

    console.log(employee);

    function handleSubmit(e) {
        e.preventDefault();
        put(route("admin.employees.update", { role: employee.id }), {
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
        put(route("admin.employees.update", { employee: employee.id }), {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    useEffect(() => {
        setData(employee);
        console.log(employee);
    }, []);

    return (
        <>
            <div className="p-5 dark bg-white w-full md:w-3/4 lg:w-2/4 mx-auto mt-16 shadow-sm rounded-lg">
                <p className="text-xl font-semibold">Update Employee Info</p>
                <hr className="my-2" />
                {/* Form section */}
                <form>
                    <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                        <SelectInput
                            name="user_id"
                            label="User"
                            error={errors}
                            onChange={onChange}
                        >
                            <option value={employee.user.id}>
                                {employee.user.name}
                            </option>
                        </SelectInput>
                        <SelectInput
                            name="gender"
                            defaultValue={employee.gender}
                            label="Gender"
                            error={errors}
                            onChange={onChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </SelectInput>
                        <Input
                            label="Date of Birth"
                            name="date_of_birth"
                            type="date"
                            error={errors}
                            onChange={onChange}
                            defaultValue={employee.date_of_birth}
                        />
                        <Input
                            label="Job Title"
                            name="job_title"
                            placeholder="Enter Job Title"
                            error={errors}
                            onChange={onChange}
                            defaultValue={employee.job_title}
                        />
                        <Input
                            label="Address"
                            name="address"
                            placeholder="Enter address"
                            error={errors}
                            onChange={onChange}
                            defaultValue={employee.address}
                        />
                        <Input
                            label="Date Hired"
                            name="hired_on"
                            type="date"
                            error={errors}
                            onChange={onChange}
                            defaultValue={employee.hired_on}
                        />
                        <TextareaInput
                            label="Employee Bio"
                            name="bio"
                            error={errors}
                            onChange={onChange}
                            placeholder="Write a bio"
                            defaultValue={employee.bio}
                        />
                        <SelectInput
                            name="department_id"
                            defaultValue={employee.user.department_id}
                            label="Department"
                            error={errors}
                            onChange={onChange}
                        >
                            <option value="" disabled>
                                ---- Select Department ----
                            </option>
                            {departments?.map((user, i) => (
                                <option key={i} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </SelectInput>
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
            <div className="p-5 dark bg-white w-full md:w-3/4 lg:w-2/4 mx-auto mt-5 shadow-sm rounded-lg">
                <Tabs defaultValue="account" className="">
                    <TabsList>
                        <TabsTrigger value="account">Roles</TabsTrigger>
                        <TabsTrigger value="password">Permissions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        {/* Roles and User Roles */}
                        <Roles user={employee.user} roles={roles} />
                    </TabsContent>
                    <TabsContent value="password">
                        {/* ================ Permissions ============*/}
                        <Permissions
                            user={employee.user}
                            permissions={permissions}
                        />
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
