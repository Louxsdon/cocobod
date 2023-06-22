// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { DeleteButton, EditButton } from "@/Components/Buttons";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";
import { TbArrowsUpDown } from "react-icons/tb";

export const roleColumns = [
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
            const role = cell.row.original;
            return (
                <div className="flex items-center space-x-2">
                    <DeleteButton
                        onClick={() => {
                            confirm(
                                "Are you sure you want to delete this item?"
                            ) && router.delete("/admin/roles/" + role.id);
                        }}
                    />
                    <EditButton href={route("admin.roles.edit", role.id)} />
                </div>
            );
        },
    },
];

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
            const permission = cell.row.original;
            return (
                <div className="flex items-center space-x-2">
                    <DeleteButton
                        onClick={() => {
                            confirm(
                                "Are you sure you want to delete this item?"
                            ) && router.delete("permissions/" + permission.id);
                        }}
                    />
                    <EditButton
                        href={route("admin.permissions.edit", permission.id)}
                    />
                </div>
            );
        },
    },
];
