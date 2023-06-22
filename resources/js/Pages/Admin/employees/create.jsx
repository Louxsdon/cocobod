import AuthLayout from "@/Layouts/AuthLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import { generateSlug } from "@/lib/utils";
import SelectInput from "@/Components/SelectInput";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function create({ users, permissions, roles, departments }) {
    const { post, data, errors, setData, reset } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        department_id: "",
        user_id: "",
    });

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
        post("/admin/employees", {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    return (
        <DashboardLayout title="Add New Employee">
            <form autoComplete="on">
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <SelectInput
                        name="user_id"
                        defaultValue=""
                        label="User"
                        error={errors}
                        onChange={onChange}
                    >
                        <option value="" disabled>
                            ---- Select User ----
                        </option>
                        {users.map((user, i) => (
                            <option value={user.id}>{user.name}</option>
                        ))}
                    </SelectInput>

                    <Input
                        label="First Name"
                        name="first_name"
                        placeholder="Enter first name"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.first_name}
                    />
                    <Input
                        label="Last Name"
                        name="last_name"
                        placeholder="Enter last name"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.last_name}
                    />
                    <Input
                        label="Phone Number"
                        name="phone"
                        placeholder="Enter your number"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.phone}
                    />
                    <Input
                        label="Email Address"
                        name="email"
                        placeholder="Enter your email"
                        error={errors}
                        onChange={onChange}
                    />
                    <SelectInput
                        name="department_id"
                        defaultValue=""
                        label="Department"
                        error={errors}
                        onChange={onChange}
                    >
                        <option value="" disabled>
                            ---- Select Department ----
                        </option>
                        {departments?.map((user, i) => (
                            <option value={user.id}>{user.name}</option>
                        ))}
                    </SelectInput>

                    <SelectInput
                        name="role"
                        defaultValue="4"
                        label="Role"
                        error={errors}
                        onChange={onChange}
                    >
                        <option value="" disabled>
                            ---- Select User Role ----
                        </option>
                        {roles?.map((user, i) => (
                            <option value={user.id}>
                                {user.name.toUpperCase()}
                            </option>
                        ))}
                    </SelectInput>
                </div>

                <button
                    onClick={handleSubmit}
                    className="btn mt-3 text-green-100 bg-green-600 fluid"
                >
                    Add Employee
                </button>
            </form>
        </DashboardLayout>
    );
}
