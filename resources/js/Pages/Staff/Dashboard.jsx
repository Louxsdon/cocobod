import React from "react";

// components

// import CardLineChart from "@/Components/Cards/CardLineChart.jsx";
// import CardBarChart from "@/Components/Cards/CardBarChart.jsx";
import CardPageLeaves from "@/Components/Cards/CardPageVisits.jsx";
import CardAppointments from "@/Components/Cards/CardSocialTraffic.jsx";
import HeaderStats from "@/Components/Headers/HeaderStats";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { cn } from "@/lib/utils";

export default function Dashboard({ user }) {
    console.log(user);
    return (
        <div className="max-w-6xl mx-auto p-5 space-y-5 bg-whit">
            <div className=" mb-5 ">
                <h3 className="text-3xl capitalize text-slate-500">
                    Welcome to your dashboard area
                </h3>
            </div>
            <div className="">
                <p className="text-xl font-semibold">Employee Bio Data</p>
                <hr className="my-2 mb-4" />
                {/* Form section */}
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <BioInfo title="Name" value={user.name} />
                    <BioInfo title="Email" value={user.email} />
                    <BioInfo title="Phone" value={user.phone} />
                    <BioInfo title="Gender" value={user.employee.gender} />
                    <BioInfo
                        title="Date of Birth"
                        value={user.employee.date_of_birth}
                    />

                    <BioInfo
                        title="Bio"
                        className="col-span-2"
                        value={user.employee.bio}
                    />
                </div>
            </div>
            <div className="">
                <p className="text-xl font-semibold">Job Information</p>
                <hr className="my-2 mb-4" />
                <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-4">
                    <BioInfo
                        title="Job Title"
                        value={user.employee.job_title}
                    />
                    <BioInfo
                        title="Date Hired"
                        value={user.employee.hired_on}
                    />
                    <BioInfo
                        title="Bio"
                        className="col-span-2"
                        value={user.employee.bio}
                    />
                    <BioInfo
                        title="Department"
                        value={user.employee.department?.name}
                    />
                </div>
            </div>
        </div>
    );
}

function BioInfo({ title, value, className }) {
    return (
        <div className={cn(!value && "hidden", className)}>
            <h3 className="font-thin text-xl text-slate-700">{title}</h3>
            <p className="text-lg font-thin text-slate-500">{value}</p>
        </div>
    );
}
