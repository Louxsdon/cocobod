import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { DataTable } from "../../../Components/ui/DataTable";
import { columns } from "./partials/TableColumns";
import { Link } from "@inertiajs/react";

export default function Users({ appraisals = [] }) {
    console.log(appraisals);
    return (
        <>
            <div className="my-12 container mx-auto">
                <div className="">
                    <div className="table-section bg-white drop-shadow-sm m-auto px-4 py-5 mt-20  border rounded-md">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-xl text-slate-600">
                                My Appraisals
                            </h3>
                            <Link
                                href={route("staff.appraisals.create")}
                                className="btn btn-primary flex items-center"
                            >
                                <FaPlus className="mr-2 inline-block" />
                                Fill Appraisal
                            </Link>
                        </div>

                        <DataTable columns={columns} data={appraisals} />
                    </div>
                </div>
            </div>
        </>
    );
}
