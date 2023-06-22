import dayjs from "dayjs";
import React, { useState } from "react";
import {
    Bar,
    ComposedChart,
    Legend,
    Line,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import localeData from "dayjs/plugin/localeData";
import isBetween from "dayjs/plugin/isBetween";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { currencyCode, toCurrency } from "@/lib/utils";

dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

dayjs.extend(localeData);
dayjs.extend(isBetween);

dayjs().localeData();

function getStartEndOf(time, unit, value = 1) {
    const startOf = dayjs().startOf(time);
    const endOf = dayjs().endOf(time);

    const intervals = [];
    let currentDate = startOf;

    while (currentDate <= endOf) {
        intervals.push(currentDate);
        currentDate = currentDate.add(value, unit);
    }

    return intervals;
}

function CustomTooltip({ active, payload, label }) {
    if (active) {
        const data = payload[0].payload;
        return (
            <div className="chart-tooltip border border-slate-400 rounded-lg px-3  py-1.5 bg-opacity-2 backdrop-blur">
                <div>{dayjs(data.date).format("dddd D MMM, YYYY")}</div>
                <div>
                    {/* <h4>Sales Amounts GHS</h4> */}
                    <p>Total Amount = &#x20B5;{data.amount.toFixed(2)}</p>
                    <p>Transactions = {data.transactions}</p>
                </div>
            </div>
        );
    }
}

const CustomYAxisTick = (props) => {
    const payload = props.payload;
    return (
        <g className={props.className}>
            <text
                orientation="left"
                width={props.width}
                height={props.height}
                x={props.x}
                y={props.y}
                stroke="none"
                className="chart-axis recharts-text recharts-cartesian-axis-tick-value"
                text-anchor="end"
            >
                <tspan x="57" dy="0.355em">
                    {payload.value}
                </tspan>
            </text>
        </g>
    );
};

const CustomXAxisTick = (props) => {
    const payload = props.payload;
    return (
        <g className={props.className}>
            <text
                orientation={props.orientation}
                width={props.width}
                height={props.height}
                x={props.x}
                y={props.y}
                stroke="none"
                className="chart-axis"
                text-anchor="middle"
            >
                <tspan x={props.x} dy="0.80em">
                    {props.tickFormatter
                        ? props.tickFormatter(payload.value)
                        : payload.value.toString()}
                </tspan>
            </text>
        </g>
    );
};

export default function TransactionAnalytics({ data }) {
    const [viewType, setViewType] = useState("daily");

    const tickFormatter = (tick) => {
        const d = dayjs(tick);
        let format = "daily";
        switch (viewType) {
            case "daily":
                format = d.format("ddd");
                break;
            case "weekly":
                const startOfMonth = d.startOf("month");
                const currentWeek = d.week() - startOfMonth.week() + 1;
                format = "week " + currentWeek;
                break;
            case "monthly":
                format = d.format("MMM");
                break;
            case "yearly":
                format = d.format("YYYY");
                break;

            default:
                break;
        }
        return format;
    };

    function onViewChange(view) {
        setViewType(view);
    }

    const daysOfWeek = getStartEndOf("week", "day");
    const chartData = daysOfWeek.map((day) => {
        const dataEntry = data.find((entry) => dayjs(day).isSame(entry.date));
        return {
            date: new Date(day),
            amount: dataEntry ? parseFloat(dataEntry.amount) : 0,
            transactions: dataEntry ? parseFloat(dataEntry.transactions) : 0,
        };
    });

    const viewChartData = (viewby = viewType) => {
        const viewData = {
            daily: chartData,
            weekly: weeklyData(data),
            monthly: monthlyData(data),
            yearly: YearlyData(data),
        };

        return viewData[viewby];
    };
    return (
        <section className="dark border p-4 ">
            <div className="flex justify-between items-center">
                <div className="">Purchases Analysis</div>
                <div className="space--1">
                    <button
                        onClick={() => onViewChange("daily")}
                        className="bg-base-200 px-4 py-1"
                    >
                        Daily
                    </button>
                    <button
                        onClick={() => onViewChange("weekly")}
                        className="bg-base-200 px-2 py-1"
                    >
                        Week
                    </button>
                    <button
                        onClick={() => onViewChange("monthly")}
                        className="bg-base-200 px-2 py-1"
                    >
                        Month
                    </button>
                    <button
                        onClick={() => onViewChange("yearly")}
                        className="bg-base-200 px-2 py-1"
                    >
                        Year
                    </button>
                </div>
            </div>
            <div className="flex w-full h-full justify-between items-center">
                {/* <ResponsiveContainer width={"100%"} height="80%"> */}

                <ComposedChart width={500} height={200} data={viewChartData()}>
                    <XAxis
                        axisLine={false}
                        tickLine={false}
                        dataKey="date"
                        tickFormatter={tickFormatter}
                        tick={CustomXAxisTick}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={CustomYAxisTick}
                    />
                    <Tooltip content={CustomTooltip} />
                    <Legend />
                    <Bar dataKey="amount" barSize={20} fill="#413ea0" />
                    <Line
                        type="monotone"
                        dataKey="transactions"
                        stroke="#ff7300"
                    />
                </ComposedChart>
                {/* </ResponsiveContainer> */}
            </div>
        </section>
    );
}

function weeklyData(data) {
    const weeksInMonth = getStartEndOf("month", "week");

    const chartData = weeksInMonth.map((weekDate) => {
        const dataEntries = data.filter((item) => {
            let d = dayjs(item.date);
            return (
                d.isSame(weekDate) ||
                d.isBetween(weekDate, weekDate.add(1, "week"))
            );
        });

        let amount = 0.0;
        let transactions = 0.0;

        for (const item of dataEntries) {
            amount += parseFloat(item.amount);
            transactions += parseFloat(item.transactions);
        }

        return {
            date: new Date(weekDate),
            amount: amount,
            transactions: transactions,
        };
    });

    return chartData;
}

function monthlyData(data) {
    const weeksInMonth = getStartEndOf("year", "month");

    const chartData = weeksInMonth.map((weekDate) => {
        const dataEntries = data.filter((item) => {
            let d = dayjs(item.date);
            return (
                d.isSame(weekDate) ||
                d.isBetween(weekDate, weekDate.add(1, "month"))
            );
        });

        let amount = 0.0;
        let transactions = 0.0;

        for (const item of dataEntries) {
            amount += parseFloat(item.amount);
            transactions += parseFloat(item.transactions);
        }

        return {
            date: new Date(weekDate),
            amount: amount,
            transactions: transactions,
        };
    });

    return chartData;
}

function YearlyData(data) {
    const startOf = dayjs("2021");
    const endOf = dayjs();

    const intervals = [];
    let currentDate = startOf;

    while (currentDate <= endOf) {
        intervals.push(currentDate);
        currentDate = currentDate.add(1, "year");
    }

    const chartData = intervals.map((weekDate) => {
        const dataEntries = data.filter((item) => {
            let d = dayjs(item.date);
            return d.year() === weekDate.year();
        });

        let amount = 0.0;
        let transactions = 0.0;

        for (const item of dataEntries) {
            amount += parseFloat(item.amount);
            transactions += parseFloat(item.transactions);
        }

        return {
            date: new Date(weekDate),
            amount: amount,
            transactions: transactions,
        };
    });

    return chartData;
}
