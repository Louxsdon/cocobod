import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { DataTable } from "../../../Components/ui/DataTable";
import { columns } from "./components/TableColumns";
import { Link } from "@inertiajs/react";

export default function Users({ users = [], categories = [] }) {
    const [showModal, setshowModal] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [product, setProduct] = useState(null);

    return (
        <>
            <div className="my-12 container mx-auto">
                <div className="">
                    <div className="table-section bg-white drop-shadow-sm m-auto px-4 py-5 mt-20  border rounded-md">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-xl text-slate-600">
                                Users Management
                            </h3>
                            <Link
                                href="users/create"
                                className="btn btn-primary flex items-center"
                            >
                                <FaPlus className="mr-2 inline-block" />
                                New User
                            </Link>
                        </div>

                        <DataTable columns={columns} data={users} />
                    </div>
                </div>
            </div>
        </>
    );
}
