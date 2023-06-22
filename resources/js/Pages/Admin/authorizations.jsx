import { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus, FaTimes } from "react-icons/fa";
import AuthLayout from "@/Layouts/AuthLayout";
import { router } from "@inertiajs/react";
import { EditProductForm } from "./Partials/EditProductForm";
import { AddRoleForm } from "./Partials/AddRoleForm";
import { AddPermissionForm } from "./Partials/AddPermissionForm";
import { DeleteButton, EditButton } from "@/Components/Buttons";
import { DataTable } from "@/Components/ui/DataTable";
import { permissionColumns, roleColumns } from "./components/TableColumns";

export default function Authorizations({
    auth,
    errors,
    roles = [],
    permissions = [],
}) {
    const [addRole, setAddRole] = useState(false);
    const [addPermission, setAddPermission] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [product, setProduct] = useState(null);

    const handleProductEdit = (id) => {
        const product = roles.find((p) => p.id === id);
        setProduct(product);
        setEditProduct(true);
    };

    useEffect(() => {
        console.log(roles);
        // console.log(permissions);
    }, []);

    return (
        <>
            <AddRoleForm
                categories={permissions}
                visible={addRole}
                handleVisibility={setAddRole}
            />
            <AddPermissionForm
                categories={permissions}
                visible={addPermission}
                handleVisibility={setAddPermission}
            />

            {editProduct && (
                <EditProductForm
                    categories={permissions}
                    product={product}
                    visible={editProduct}
                    handleVisibility={setEditProduct}
                />
            )}

            <div className="mt-16 container mx-auto">
                {/* ====================== */}
                {/* Roles table */}
                {/* ====================== */}
                <div className="table-section bg-white m-auto px-4 py-5 mt-20 w-11/12 lg:w-10/12 border rounded-md">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-xl text-slate-600">
                            Roles
                        </h3>
                        <button
                            onClick={() => setAddRole(true)}
                            className="btn btn-primary flex items-center "
                        >
                            <FaPlus className="mr-2 inline-block" />
                            New Role
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <DataTable columns={roleColumns} data={roles} />
                    </div>
                </div>

                {/* ================================== */}
                {/* Permission Table */}
                {/* ================================== */}
                <div className="table-section bg-white m-auto px-4 py-5 mt-20 w-11/12 lg:w-10/12 border rounded-md">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-xl text-slate-600">
                            Permissions
                        </h3>
                        <button
                            onClick={() => setAddPermission(true)}
                            className="btn btn-primary flex items-center "
                        >
                            <FaPlus className="mr-2 inline-block" />
                            New Permission
                        </button>
                    </div>
                    <DataTable columns={permissionColumns} data={permissions} />
                </div>
            </div>
        </>
    );
}
