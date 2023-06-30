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
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "institution",
        header: "Institution",
    },
    {
        accessorKey: "start_date",
        header: "Start Date",
    },
    {
        accessorKey: "completion_date",
        header: "Completion Date",
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
                                    route(
                                        "staff.qualifications.destroy",
                                        data.id
                                    )
                                );
                        }}
                    />
                    <EditButton
                        href={route("staff.qualifications.edit", data.id)}
                    />
                    {/* <ViewButton href={route("staff.leaves.show", data.id)} /> */}
                </div>
            );
        },
    },
];
