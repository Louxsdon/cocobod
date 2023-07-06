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
        accessorKey: "name",
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
    },
    {
        accessorKey: "email",
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
        accessorKey: "phone",
        header: "Phone",
    },
    {
        header: "Job",
        cell: ({ cell }) => {
            const staff = cell.row.original;
            return <span>{staff.employee?.job_title}</span>;
        },
    },
    {
        header: "Department",
        cell: ({ cell }) => {
            const staff = cell.row.original;
            return <span>{staff.employee?.department?.name}</span>;
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ cell }) => {
            const staff = cell.row.original;
            return (
                <div className="flex items-center space-x-2 w-2/3">
                    {staff.employee ? (
                        <>
                            <DeleteButton
                                onClick={() => {
                                    confirm(
                                        "Are you sure you want to delete this item?"
                                    ) &&
                                        router.delete(
                                            route(
                                                "admin.employees.destroy",
                                                staff?.employee?.id
                                            )
                                        );
                                }}
                            />
                            <EditButton
                                href={route(
                                    "admin.employees.edit",
                                    staff?.employee?.id
                                )}
                            />
                            <ViewButton
                                href={route(
                                    "admin.employees.show",
                                    staff?.employee?.id
                                )}
                            />
                        </>
                    ) : (
                        <>
                            <DeleteButton
                                onClick={() => {
                                    confirm(
                                        "Are you sure you want to delete this item?"
                                    ) &&
                                        router.delete(
                                            route(
                                                "admin.users.destroy",
                                                staff.id
                                            )
                                        );
                                }}
                            />
                            <EditButton
                                href={"/admin/employees/create/" + staff.id}
                            />
                            <ViewButton
                                href={route("admin.users.show", staff.id)}
                            />
                        </>
                    )}
                </div>
            );
        },
    },
];
