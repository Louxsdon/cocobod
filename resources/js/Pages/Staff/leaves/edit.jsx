import AuthLayout from "@/Layouts/AuthLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import { generateSlug } from "@/lib/utils";
import SelectInput from "@/Components/SelectInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TextareaInput from "@/Components/TextareaInput";

export default function create({ leaf }) {
    const { put, errors, data, reset, setData } = useForm({
        heading: "",
        reason: "",
        from: "",
        to: "",
        type: "Paid",
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
        put(route("staff.leaves.update", leaf.id), {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    useEffect(() => {
        setData(leaf);
    }, []);

    return (
        <DashboardLayout title="New Leave Request">
            <form autoComplete="on">
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <Input
                        label="Heading"
                        name="heading"
                        placeholder="Leave Heading"
                        error={errors}
                        onChange={onChange}
                        defaultValue={leaf.heading}
                    />
                    <TextareaInput
                        label="Reason"
                        name="reason"
                        placeholder="Leave description"
                        error={errors}
                        onChange={onChange}
                        defaultValue={leaf.reason}
                    />
                    <Input
                        label="From"
                        name="from"
                        type="date"
                        error={errors}
                        onChange={onChange}
                        defaultValue={leaf.from}
                    />
                    <Input
                        label="To"
                        name="to"
                        type="date"
                        error={errors}
                        onChange={onChange}
                        defaultValue={leaf.to}
                    />
                    <SelectInput
                        name="type"
                        label="Type"
                        error={errors}
                        onChange={onChange}
                        defaultValue={leaf.type}
                    >
                        <option value="Paid">Paid</option>
                        <option value="Non-Paid">Non Paid</option>
                    </SelectInput>
                </div>

                <button
                    onClick={handleSubmit}
                    className="btn mt-4 !px-8 bg-orange-400 text-orange-100"
                >
                    Update Request
                </button>
            </form>
        </DashboardLayout>
    );
}
