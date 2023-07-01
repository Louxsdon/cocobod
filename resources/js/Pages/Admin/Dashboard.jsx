import React from "react";

// components

// import CardLineChart from "@/Components/Cards/CardLineChart.jsx";
// import CardBarChart from "@/Components/Cards/CardBarChart.jsx";
import CardPageLeaves from "@/Components/Cards/CardPageVisits.jsx";
import CardAppointments from "@/Components/Cards/CardSocialTraffic.jsx";
import HeaderStats from "@/Components/Headers/HeaderStats";
import CardStats from "@/Components/Cards/CardStats";

export default function Dashboard({
    users,
    employees,
    leaves,
    leaves_count,
    appointments,
    appointments_count,
}) {
    console.log(users);
    return (
        <>
            <div className="relative bg-indigo-400 md:pt-20 pb-20 pt-12">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="USERS"
                                    statTitle={users}
                                    statPercentColor="text-orange-500"
                                    statDescripiron="Since yesterday"
                                    statIconName="fas fa-users"
                                    statIconColor="bg-pink-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="EMPLOYEES"
                                    statTitle={employees}
                                    statArrow="up"
                                    statPercent="3.48"
                                    statPercentColor="text-emerald-500"
                                    statDescripiron="Since last month"
                                    statIconName="far fa-chart-bar"
                                    statIconColor="bg-red-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="ACTIVE LEAVES"
                                    statTitle={leaves_count}
                                    statPercentColor="text-red-500"
                                    statIconName="fas fa-chart-pie"
                                    statIconColor="bg-orange-500"
                                />
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                                <CardStats
                                    statSubtitle="APPOINTMENTS"
                                    statTitle={appointments_count}
                                    statArrow="up"
                                    statPercent="12"
                                    statPercentColor="text-emerald-500"
                                    statDescripiron="Since last month"
                                    statIconName="fas fa-percent"
                                    statIconColor="bg-lightBlue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap">
                {/* <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <CardLineChart />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardBarChart />
                </div> */}
            </div>
            <div className="flex flex-wrap mt-4">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                    <CardPageLeaves leaves={leaves} />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardAppointments appointments={appointments} />
                </div>
            </div>
        </>
    );
}
