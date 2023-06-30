import AuthLayout from "@/Layouts/AuthLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import { generateSlug } from "@/lib/utils";
import SelectInput from "@/Components/SelectInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TextareaInput from "@/Components/TextareaInput";

export default function create({ qualification }) {
    const { put, errors, data, reset, setData } = useForm({
        name: "",
        institution: "",
        start_date: "",
        completion_date: "",
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
        put(route("staff.qualifications.update", qualification.id), {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    useEffect(() => {
        setData(qualification);
    }, []);

    return (
        <DashboardLayout title="Update Qualification">
            <form autoComplete="on">
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <Input
                        label="Qualification Name"
                        name="name"
                        placeholder="Name of the qualification"
                        error={errors}
                        onChange={onChange}
                        defaultValue={qualification.name}
                    />
                    <TextareaInput
                        label="Name of Institution"
                        name="institution"
                        placeholder="Institution name"
                        error={errors}
                        onChange={onChange}
                        defaultValue={qualification.institution}
                    />
                    <Input
                        label="Date of Start"
                        name="start_date"
                        type="date"
                        error={errors}
                        onChange={onChange}
                        defaultValue={qualification.start_date}
                    />
                    <Input
                        label="Date of Completion"
                        name="completion_date"
                        type="date"
                        error={errors}
                        onChange={onChange}
                        defaultValue={qualification.completion_date}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="btn mt-4 !px-8 bg-orange-400 text-orange-100"
                >
                    Update Qualification
                </button>
            </form>
        </DashboardLayout>
    );
}
