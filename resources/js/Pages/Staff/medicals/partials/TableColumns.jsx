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
        accessorKey: "condition",
        header: "Condition",
    },
    {
        accessorKey: "diagnosis_date",
        header: "Date of Diagnosis ",
    },
    {
        accessorKey: "provider",
        header: "Provider Name",
    },
    {
        accessorKey: "next_check_up",
        header: "Nex Check Up",
    },
    {
        accessorKey: "notes",
        header: "Notes",
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
                                    route("staff.medicals.destroy", data.id)
                                );
                        }}
                    />
                    <EditButton href={route("staff.medicals.edit", data.id)} />
                    {/* <ViewButton href={route("staff.leaves.show", data.id)} /> */}
                </div>
            );
        },
    },
];
