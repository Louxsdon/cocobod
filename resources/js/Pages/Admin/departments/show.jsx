import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";

export default function ShowDepartment({ auth, department = {} }) {
    return (
        <>
            <div className="p-5 dark bg-white w-2/4 mx-auto mt-24 shadow-sm rounded-lg">
                <p className="text-xl font-semibold">Department Name</p>
                <hr className="my-2" />
                <div className="">
                    {/* <h3 className="font-semibold">Department Name:</h3> */}
                    <p className=" text-xl">{department.name}</p>
                </div>
            </div>

            {/* Roles and User Roles */}
            <div className="p-5 dark bg-white w-2/4 mx-auto mt-4 shadow-sm rounded-lg">
                <p className="text-lg font-semibold">
                    Staffs in this Department
                </p>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead className="text-right">Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {department?.employees?.map((emp, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">
                                    {emp?.user?.name}
                                </TableCell>
                                <TableCell>{emp?.user?.email}</TableCell>
                                <TableCell>{emp?.user?.phone}</TableCell>
                                <TableCell className="text-right">
                                    {emp?.job_title}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
