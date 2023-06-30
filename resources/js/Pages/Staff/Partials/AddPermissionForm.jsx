import Input from "@/Components/Input";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export function AddPermissionForm({ visible, handleVisibility }) {
    const { post, errors, data, reset, setData } = useForm({ name: "" });
    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.permissions.store"), {
            onSuccess: () => {
                reset();
                handleVisibility(false);
            },
        });
        console.log("Data: ", data);
    }
    return (
        <Modal show={visible} onClose={handleVisibility}>
            <div className="p-5">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Add New Permission</p>
                    <button
                        onClick={() => handleVisibility(false)}
                        className="bg-red-100 text-red-400 cursor-pointer px-2"
                    >
                        X
                    </button>
                </div>
                <hr className=" my-2" />
                {/* Form section */}
                <form onSubmit={handleSubmit} action="">
                    <Input
                        onChange={(e) => setData({ name: e.target.value })}
                        type="text"
                        name="name"
                        label="Permission Name"
                        error={errors}
                        placeholder="Enter permission name"
                        className="input-control"
                        defaultValue={data.name}
                    />
                    <div className="mt-4">
                        <button className="btn !px-8 bg-green-600 text-green-200">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
