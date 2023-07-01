import AuthLayout from "@/Layouts/AuthLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import { generateSlug } from "@/lib/utils";
import SelectInput from "@/Components/SelectInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import FileInput from "@/Components/FileInput";

export default function create({ roles }) {
    const { post, data, errors, setData, reset } = useForm({
        name: "",
        phone: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "",
        photo: null,
    });

    function onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const newData = { ...data, [name]: value };

        setData(newData);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(data);
        post("/admin/users", {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    return (
        <DashboardLayout title="Add New User">
            <form autoComplete="on">
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <Input
                        label="Name"
                        name="name"
                        placeholder="Enter your name"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.name}
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
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        error={errors}
                        onChange={onChange}
                    />
                    <Input
                        label="Confirm Password"
                        name="password_confirmation"
                        type="password"
                        placeholder="Password"
                        error={errors}
                        onChange={onChange}
                    />
                    <FileInput
                        label="Profile Photo"
                        name="photo"
                        type="file"
                        error={errors}
                        onChange={(e) => {
                            setData({
                                ...data,
                                [e.target.name]: e.target.files[0],
                            });
                        }}
                    />
                    <SelectInput
                        name="role"
                        label="Role"
                        error={errors}
                        onChange={onChange}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            ---- Select User Role ----
                        </option>
                        {roles?.map((role, i) => (
                            <option key={i} value={role.name}>
                                {role.name.toUpperCase()}
                            </option>
                        ))}
                    </SelectInput>
                </div>

                <button
                    onClick={handleSubmit}
                    className="btn btn-success mt-3 text-green-100 bg-green-600 fluid"
                >
                    Add User
                </button>
            </form>
        </DashboardLayout>
    );
}
