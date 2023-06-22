import { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus, FaTimes } from "react-icons/fa";
import AuthLayout from "@/Layouts/AuthLayout";
import { router } from "@inertiajs/react";
import { EditProductForm } from "./Partials/EditProductForm";
import { AddDepartmentForm } from "./Partials/AddDepartmentForm";
import { AddPermissionForm } from "./Partials/AddPermissionForm";
import { DeleteButton, EditButton } from "@/Components/Buttons";
import { DataTable } from "@/Components/ui/DataTable";
import { permissionColumns } from "./components/TableColumns";

export default function Authorizations({ auth, errors, departments = [] }) {
    const [addRole, setAddRole] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [product, setProduct] = useState(null);

    const handleProductEdit = (id) => {
        const product = departments.find((p) => p.id === id);
        setProduct(product);
        setEditProduct(true);
    };

    useEffect(() => {
        console.log(departments);
    }, []);

    return (
        <>
            <AddDepartmentForm
                categories={departments}
                visible={addRole}
                handleVisibility={setAddRole}
            />

            <div className="mt-16 container mx-auto">
                {/* ====================== */}
                {/* Roles table */}
                {/* ====================== */}
                <div className="table-section bg-white m-auto px-4 py-5 mt-20 w-11/12 lg:w-10/12 border rounded-md">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-xl text-slate-600">
                            Departments
                        </h3>
                        <button
                            onClick={() => setAddRole(true)}
                            className="btn btn-primary flex items-center "
                        >
                            <FaPlus className="mr-2 inline-block" />
                            New Department
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <DataTable
                            columns={permissionColumns}
                            data={departments}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
