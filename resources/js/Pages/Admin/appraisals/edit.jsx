import { useState, useEffect } from "react";
import React from "react";
import AuthLayout from "@/Layouts/AuthLayout";
import Input from "@/Components/Input";
import { useForm, router } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import dayjs from "dayjs";
import TextareaInput from "@/Components/TextareaInput";

export default function EditUser({ appraisal = {} }) {
    const { put, errors, data, reset, setData } = useForm({
        question1: "",
        question1_answer: "",
        question2: "",
        question2_answer: "",
        question3: "",
        question3_answer: "",
        question4: "",
        question4_answer: "",
        question5: "",
        question5_answer: "",
        question6: "",
        question6_answer: "",
        question7: "",
        question7_answer: "",
        question8: "",
        question8_answer: "",
        question9: "",
        question9_answer: "",
        question10: "",
        question10_answer: "",
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
        put(route("admin.appraisals.update", { appraisal: appraisal.id }), {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    useEffect(() => {
        setData(appraisal);
        console.log(appraisal);
    }, []);

    return (
        <div className={`flex justify-center items-center h-full `}>
            <div className={`dark bg-white w-[70%] p-4 rounded-lg`}>
                <fieldset className="border p-4">
                    <legend className="text-xl px-4 font-bold">{`Update Appraisal for ${dayjs(
                        appraisal.created_at
                    ).format("MMMM YYYY")}`}</legend>

                    <form autoComplete="on">
                        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                            <MutiChoise
                                question={data.question1}
                                question_name={"question1_answer"}
                                onChange={onChange}
                                defaultValue={data.question1_answer}
                            />
                            <MutiChoise
                                question={data.question2}
                                question_name={"question2_answer"}
                                onChange={onChange}
                                defaultValue={data.question2_answer}
                            />
                            <MutiChoise
                                question={data.question3}
                                question_name={"question3_answer"}
                                onChange={onChange}
                                defaultValue={data.question3_answer}
                            />
                            <MutiChoise
                                question={data.question4}
                                question_name={"question4_answer"}
                                onChange={onChange}
                                defaultValue={data.question4_answer}
                            />
                            <MutiChoise
                                question={data.question5}
                                question_name={"question5_answer"}
                                onChange={onChange}
                                defaultValue={data.question5_answer}
                            />
                            <Input
                                label={data.question6}
                                name={"question6_answer"}
                                error={errors}
                                onChange={onChange}
                                defaultValue={appraisal.question6_answer}
                            />
                            <Input
                                label={data.question7}
                                name={"question7_answer"}
                                error={errors}
                                onChange={onChange}
                                defaultValue={appraisal.question7_answer}
                            />
                            <Input
                                label={data.question8}
                                name={"question8_answer"}
                                error={errors}
                                onChange={onChange}
                                defaultValue={appraisal.question8_answer}
                            />
                            <Input
                                label={data.question9}
                                name={"question9_answer"}
                                error={errors}
                                onChange={onChange}
                                defaultValue={appraisal.question9_answer}
                            />
                            <TextareaInput
                                label={data.question10}
                                name={"question10_answer"}
                                error={errors}
                                onChange={onChange}
                                defaultValue={appraisal.question10_answer}
                            />
                            {/* <SelectInput
                        name="type"
                        label="Type"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.question1_answer}
                        defaultValue={data.type}
                    >
                        <option value="Paid">Paid</option>
                        <option value="Non-Paid">Non Paid</option>
                    </SelectInput> */}
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="btn btn-warning mt-3 fluid"
                        >
                            Update Appraisal
                        </button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}

function MutiChoise({ question, question_name, onChange, defaultValue }) {
    return (
        <div>
            <p>{question}</p>
            <div className="flex space-x-12">
                <article>
                    <input
                        name={question_name}
                        type="radio"
                        value="yes"
                        onChange={onChange}
                        className="radio radio-accent rounded mr-2"
                        checked={defaultValue === "yes"}
                    />
                    <label>Yes</label>
                </article>
                <article>
                    <input
                        name={question_name}
                        type="radio"
                        value="no"
                        onChange={onChange}
                        className="radio radio-accent rounded mr-2"
                        checked={defaultValue === "no"}
                    />
                    <label>No</label>
                </article>
            </div>
        </div>
    );
}
