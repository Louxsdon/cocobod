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
        accessorKey: "user.name",
        header: "Request By",
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
                <div
                    title={data.status}
                    className="text-2xl flex justify-center items-center"
                >
                    {data.status === "approved" ? (
                        <BiCheckCircle className="text-green-400" />
                    ) : data.status === "rejected" ? (
                        <IoCloseCircleOutline className="text-red-400" />
                    ) : (
                        <MdOutlinePending className="text-blue-400" />
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
                                    route("admin.leaves.destroy", data.id)
                                );
                        }}
                    />
                    <EditButton href={route("admin.leaves.edit", data.id)} />
                    <ViewButton href={route("admin.leaves.show", data.id)} />
                </div>
            );
        },
    },
];
