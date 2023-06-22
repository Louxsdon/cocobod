import React from "react";

// components

// import CardLineChart from "@/Components/Cards/CardLineChart.jsx";
// import CardBarChart from "@/Components/Cards/CardBarChart.jsx";
import CardPageVisits from "@/Components/Cards/CardPageVisits.jsx";
import CardSocialTraffic from "@/Components/Cards/CardSocialTraffic.jsx";
import HeaderStats from "@/Components/Headers/HeaderStats";

export default function Dashboard() {
    return (
        <>
            <HeaderStats />
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
                    <CardPageVisits />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                    <CardSocialTraffic />
                </div>
            </div>
        </>
    );
}
