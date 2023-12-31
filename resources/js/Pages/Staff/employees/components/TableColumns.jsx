// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { DeleteButton, EditButton, ViewButton } from "@/Components/Buttons";
import { Button } from "@/Components/ui/button";
import { router } from "@inertiajs/react";
import { TbArrowsUpDown } from "react-icons/tb";

export const columns = [
    {
        accessorKey: "id",
        header: "User ID",
    },
    {
        accessorKey: "user",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <TbArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ cell }) => {
            const employee = cell.row.original;
            console.log(employee);
            return (
                <div className="flex items-center space-x-2 w-2/3">
                    {employee.user.name}
                </div>
            );
        },
    },
    {
        accessorKey: "user.email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <TbArrowsUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "user.phone",
        header: "Phone",
    },
    {
        accessorKey: "job_title",
        header: "Job",
    },
    {
        accessorKey: "department.name",
        header: "Department",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ cell }) => {
            const employee = cell.row.original;
            return (
                <div className="flex items-center space-x-2 w-2/3">
                    <DeleteButton
                        onClick={() => {
                            confirm(
                                "Are you sure you want to delete this item?"
                            ) &&
                                router.delete(
                                    route("admin.employees.destroy", {
                                        employee: employee.id,
                                    })
                                );
                        }}
                    />
                    <EditButton
                        href={route("admin.employees.edit", employee.id)}
                    />
                    <ViewButton
                        href={route("admin.employees.show", employee.id)}
                    />
                </div>
            );
        },
    },
];
