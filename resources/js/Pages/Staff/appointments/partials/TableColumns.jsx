// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { DeleteButton, EditButton, ViewButton } from "@/Components/Buttons";
import { router } from "@inertiajs/react";

export const columns = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "date",
        header: "Appointment Date",
    },
    {
        accessorKey: "time",
        header: "Apointment Time ",
    },
    {
        accessorKey: "comments",
        header: "Comments",
    },
    {
        accessorKey: "department.name",
        header: "Department",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ cell }) => {
            const data = cell.row.original;
            return (
                <div className="flex  items-center space-x-2 w-2/3">
                    {/* <DeleteButton
                        onClick={() => {
                            confirm(
                                "Are you sure you want to delete this item?"
                            ) &&
                                router.delete(
                                    route("staff.appointments.destroy", data.id)
                                );
                        }}
                    /> */}
                    <EditButton
                        href={route("staff.appointments.edit", data.id)}
                    />
                    {/* <ViewButton href={route("staff.leaves.show", data.id)} /> */}
                </div>
            );
        },
    },
];
