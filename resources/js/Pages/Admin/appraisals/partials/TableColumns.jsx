// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { DeleteButton, EditButton, ViewButton } from "@/Components/Buttons";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";
import { BiCheckCircle } from "react-icons/bi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdCancel, MdOutlinePending, MdPending } from "react-icons/md";
import { TbArrowsUpDown } from "react-icons/tb";

export const columns = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "created_at",
        header: "Appraisal for",
        cell: ({ cell }) => {
            const data = cell.row.original;
            return (
                <div className="flex items-center space-x-2 w-2/3">
                    {dayjs(data.created_at).format("MMMM YYYY")}
                </div>
            );
        },
    },
    {
        accessorKey: "user.name",
        header: "Submitted By",
        cell: ({ cell }) => {
            const data = cell.row.original;
            return (
                <div className="flex items-center space-x-2 w-2/3">
                    {data.user.name}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ cell }) => {
            const data = cell.row.original;
            return (
                <div title={data.status} className="">
                    {data.status === "approved" ? (
                        <div className="flex items-center capitalize space-x-2">
                            <BiCheckCircle className="text-xl text-green-500" />
                            <span className=" text-green-500">
                                {data.status}
                            </span>
                        </div>
                    ) : data.status === "rejected" ? (
                        <div className="flex items-center capitalize space-x-2">
                            <IoCloseCircleOutline className="text-xl text-red-500" />
                            <span className=" text-red-500">{data.status}</span>
                        </div>
                    ) : (
                        <div className="flex items-center capitalize space-x-2">
                            <MdOutlinePending className="text-xl text-blue-500" />
                            <span className=" text-blue-500">
                                {data.status}
                            </span>
                        </div>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ cell }) => {
            const data = cell.row.original;
            return (
                <div className="flex items-center space-x-2 w-2/3">
                    <DeleteButton
                        onClick={() => {
                            confirm(
                                "Are you sure you want to delete this item?"
                            ) &&
                                router.delete(
                                    route("admin.appraisals.destroy", data.id)
                                );
                        }}
                    />
                    <EditButton
                        href={route("admin.appraisals.edit", data.id)}
                    />
                    <ViewButton
                        href={route("admin.appraisals.show", data.id)}
                    />
                </div>
            );
        },
    },
];
