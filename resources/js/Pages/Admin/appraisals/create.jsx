import AuthLayout from "@/Layouts/AuthLayout";
import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Input from "@/Components/Input";
import { generateSlug } from "@/lib/utils";
import SelectInput from "@/Components/SelectInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TextareaInput from "@/Components/TextareaInput";
import dayjs from "dayjs";

export default function create() {
    const { post, data, errors, setData, reset } = useForm({
        question1: "Do you have an up-to-date job description?",
        question1_answer: "",
        question2: "Do you have an up-to-date action plan? ",
        question2_answer: "",
        question3: "Do you understand all the requirements of your job?	",
        question3_answer: "",
        question4:
            "Do you have regular opportunities to discuss your work, and action plans? ",
        question4_answer: "",
        question5:
            "Have you carried out the improvements agreed with your manager which were made at the last appropriate meeting? ",
        question5_answer: "",
        question6: "What parts of your job, do you do best? ",
        question6_answer: "",
        question7: "What parts of your job, do you do less well? ",
        question7_answer: "",
        question8:
            "What parts of your job, do you do less well? fail to enjoy?  ",
        question8_answer: "",
        question9:
            "Can you suggest training which would help to improve your performance or development?",
        question9_answer: "",
        question10: "Additional remarks, notes, questions, or suggestions",
        question10_answer: "",
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
        post("/admin/appraisals", {
            onSuccess: () => reset(),
            onError: () => console.log(errors),
        });
    }

    return (
        <div className={`flex justify-center items-center h-full `}>
            <div className={`dark bg-white w-[70%] p-4 rounded-lg`}>
                <fieldset className="border p-4">
                    <legend className="text-xl px-4 font-bold">{`Submit Appraisal for ${dayjs().format(
                        "MMMM YYYY"
                    )}`}</legend>

                    <form autoComplete="on">
                        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                            <MutiChoise
                                question={data.question1}
                                question_name={"question1_answer"}
                                onChange={onChange}
                            />
                            <MutiChoise
                                question={data.question2}
                                question_name={"question2_answer"}
                                onChange={onChange}
                            />
                            <MutiChoise
                                question={data.question3}
                                question_name={"question3_answer"}
                                onChange={onChange}
                            />
                            <MutiChoise
                                question={data.question4}
                                question_name={"question4_answer"}
                                onChange={onChange}
                            />
                            <MutiChoise
                                question={data.question5}
                                question_name={"question5_answer"}
                                onChange={onChange}
                            />
                            <Input
                                label={data.question6}
                                name={"question6_answer"}
                                error={errors}
                                onChange={onChange}
                            />
                            <Input
                                label={data.question7}
                                name={"question7_answer"}
                                error={errors}
                                onChange={onChange}
                            />
                            <Input
                                label={data.question8}
                                name={"question8_answer"}
                                error={errors}
                                onChange={onChange}
                            />
                            <Input
                                label={data.question9}
                                name={"question9_answer"}
                                error={errors}
                                onChange={onChange}
                            />
                            <TextareaInput
                                label={data.question10}
                                name={"question10_answer"}
                                error={errors}
                                onChange={onChange}
                            />
                            {/* <SelectInput
                        name="type"
                        label="Type"
                        error={errors}
                        onChange={onChange}
                        defaultValue={data.type}
                    >
                        <option value="Paid">Paid</option>
                        <option value="Non-Paid">Non Paid</option>
                    </SelectInput> */}
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="btn btn-success mt-3 text-green-100 bg-green-600 fluid"
                        >
                            Submit Appraisal
                        </button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}

function MutiChoise({ question, question_name, onChange }) {
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
                        className="radio rounded mr-2"
                    />
                    <label>Yes</label>
                </article>
                <article>
                    <input
                        name={question_name}
                        type="radio"
                        value="no"
                        onChange={onChange}
                        className="radio rounded mr-2"
                    />
                    <label>No</label>
                </article>
            </div>
        </div>
    );
}
