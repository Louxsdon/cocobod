import AuthLayout from "@/Layouts/AuthLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import { generateSlug } from "@/lib/utils";
import SelectInput from "@/Components/SelectInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TextareaInput from "@/Components/TextareaInput";

export default function create({ appointment, departments }) {
    const { put, errors, data, reset, setData } = useForm({
        date: "",
        time: "",
        department: "",
        comments: "",
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
        put(route("staff.appointments.update", appointment.id), {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    useEffect(() => {
        setData(appointment);
    }, []);

    return (
        <DashboardLayout title="Update Qualification">
            <form autoComplete="on">
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <Input
                        label="Appointment Date *"
                        name="date"
                        type="date"
                        error={errors}
                        onChange={onChange}
                        defaultValue={appointment.date}
                    />
                    <Input
                        label="Appointment Time *"
                        name="time"
                        type="time"
                        error={errors}
                        onChange={onChange}
                        defaultValue={appointment.time}
                    />
                    <SelectInput
                        label="Department *"
                        name="department"
                        defaultValue={appointment.department_id}
                        error={errors}
                        onChange={onChange}
                    >
                        <option value="" disabled={true}>
                            -- Department --
                        </option>
                        {departments.map((dep, i) => (
                            <option value={dep.id} key={i}>
                                {dep.name}
                            </option>
                        ))}
                    </SelectInput>
                    <TextareaInput
                        label="Comments"
                        name="comments"
                        placeholder="Leave a comment"
                        error={errors}
                        onChange={onChange}
                        defaultValue={appointment.comments}
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="btn mt-4 !px-8 bg-green-600 text-green-100"
                >
                    Re-schedule Appointment
                </button>
            </form>
        </DashboardLayout>
    );
}
