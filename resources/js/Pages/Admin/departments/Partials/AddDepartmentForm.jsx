import Input from "@/Components/Input";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";

export function AddDepartmentForm({ visible, handleVisibility }) {
    const { post, errors, data, reset, setData } = useForm({ name: "" });
    function handleSubmit(e) {
        e.preventDefault();
        post(route("admin.departments.store"), {
            onSuccess: () => {
                reset();
                handleVisibility(false);
            },
        });
    }
    return (
        <Modal show={visible} onClose={handleVisibility}>
            <div className="p-5">
                <div className="flex justify-between items-center">
                    <p className="text-xl font-semibold">Add New Department</p>
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
                        label="Department Name"
                        error={errors}
                        placeholder="Enter department name"
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
// export function AddCategoryForm({ visible, handleVisibility }) {
//     function handleSubmit(e) {
//         e.preventDefault();
//     }
//     return (
//         <Modal show={visible} onClose={handleVisibility}>
//             <div className="p-5">
//                 <div className="flex justify-between items-center">
//                     <p className="text-xl font-semibold">
//                         Edit Flight Schedule
//                     </p>
//                     <button
//                         onClick={() => handleVisibility(false)}
//                         className="bg-red-100 text-red-400 cursor-pointer px-2"
//                     >
//                         X
//                     </button>
//                 </div>
//                 <hr className=" my-5" />
//                 <div className="">
//                     <fieldset className="border p-5">
//                         <legend>Flight Route</legend>
//                         <div className="flex space-x-10">
//                             <h3>
//                                 From: <span className="font-semibold">AUH</span>
//                             </h3>
//                             <h3>
//                                 TO: <span className="font-semibold">ADE</span>
//                             </h3>
//                             <h3>
//                                 Aircraft:{" "}
//                                 <span className="font-semibold">
//                                     Boeing 739
//                                 </span>
//                             </h3>
//                         </div>
//                     </fieldset>

//                     {/* Form section */}
//                     <form onSubmit={handleSubmit} action="" className="mt-8">
//                         <div className="flex space-x-6">
//                             <div className="input-group">
//                                 <label htmlFor="">Date</label>
//                                 <input
//                                     type="date"
//                                     name=""
//                                     id=""
//                                     className="input-control"
//                                 />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="">Time</label>
//                                 <input
//                                     type="time"
//                                     name=""
//                                     id=""
//                                     className="input-control"
//                                 />
//                             </div>
//                             <div className="input-group">
//                                 <label htmlFor="">Economy Price: $</label>
//                                 <input
//                                     type="number"
//                                     name=""
//                                     id=""
//                                     className="input-control"
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex justify-end items-center space-x-5 mt-5">
//                             <button className="btn bg-blue-200 text-blue-600">
//                                 Update
//                             </button>
//                             <button className="btn bg-red-200 text-red-600">
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </Modal>
//     );
// }
