// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { DeleteButton, EditButton, ViewButton } from "@/Components/Buttons";
import { router } from "@inertiajs/react";

export const permissionColumns = [
    // {
    //     accessorKey: "id",
    //     header: "User ID",
    // },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ cell }) => {
            console.log(cell);
            const department = cell.row.original;
            return (
                <div className="flex items-center space-x-2">
                    <DeleteButton
                        onClick={() => {
                            confirm(
                                "Are you sure you want to delete this item?"
                            ) && router.delete("departments/" + department.id);
                        }}
                    />
                    <EditButton
                        href={route("admin.departments.edit", department.id)}
                    />
                    <ViewButton
                        href={route("admin.departments.show", department.id)}
                    />
                </div>
            );
        },
    },
];
