// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { DeleteButton, EditButton, ViewButton } from "@/Components/Buttons";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";
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
        accessorKey: "heading",
        header: "Heading",
    },
    {
        accessorKey: "reason",
        header: "Reason",
    },
    {
        accessorKey: "from",
        header: "From",
    },
    {
        accessorKey: "to",
        header: "To",
    },
    {
        accessorKey: "type",
        header: "Type",
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
                                    route("staff.leaves.destroy", data.id)
                                );
                        }}
                    />
                    <EditButton href={route("staff.leaves.edit", data.id)} />
                    <ViewButton href={route("staff.leaves.show", data.id)} />
                </div>
            );
        },
    },
];
