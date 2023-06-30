import Input from "@/Components/Input";
import Modal from "@/Components/Modal";
import MultiSelectBox from "@/Components/MultiSelectBox";
import TextareaInput from "@/Components/TextareaInput";
import { generateSlug } from "@/lib/utils";
import { useForm, usePage } from "@inertiajs/react";

export function AddCategoryForm({ visible, handleVisibility, categories }) {
    const { post, errors, data, reset, setData } = useForm({
        name: "",
        slug: "",
        sub_categories: [],
        publish: true,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newData = { ...data, [name]: value };

        if (name === "name" || name === "slug") {
            const newSlug = generateSlug(value);
            newData.slug = newSlug;
        }

        setData(newData);
    };

    function handleSubmit(e) {
        e.preventDefault();
        post("categories", {
            onSuccess: () => {
                reset();
                handleVisibility(false);
            },
        });
        console.log("Data: ", data);
    }

    function renderCategoryOptions() {
        return categories.map((opt, i) => (
            <option key={i} value={opt.id}>
                {opt?.name}
            </option>
        ));
    }

    function renderSelectedOptions(option) {
        // setData({ ...data, option });
        return option.map((opt, i) => {
            const item = categories.find((o) => o.id == opt);
            return (
                <option key={i} value={opt}>
                    {item?.name}
                </option>
            );
        });
    }
    return (
        <div className="p-5">
            <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">Add New Category</p>
            </div>
            <hr className=" my-2" />
            {/* Form section */}
            <form onSubmit={(e) => e.preventDefault()} action="">
                <Input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    error={errors}
                    placeholder="Enter category name"
                    value={data.name}
                    label="Category Name"
                />
                {/* <Input
                        // disabled
                        onChange={handleChange}
                        type="text"
                        name="slug"
                        error={errors}
                        placeholder="Category Slug: e.g my-category-name"
                        value={data.slug}
                        label="Slug"
                    /> */}
                <div className="form-control ">
                    <label htmlFor="telco" className="label label-text">
                        Telco
                    </label>
                    <select
                        defaultValue=""
                        className="input input-bordered"
                        name="telco"
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select Telco
                        </option>
                    </select>
                </div>
                <div className="form-control ">
                    <label htmlFor="type" className="label label-text">
                        Category Type
                    </label>
                    <select
                        defaultValue=""
                        className="input input-bordered"
                        name="type"
                        onChange={handleChange}
                    >
                        <option value="data">Data Bundle</option>
                        <option value="airtime">Airtime</option>
                    </select>
                </div>

                <TextareaInput
                    label="Description"
                    placeholder="Package description"
                    name="description"
                    onChange={handleChange}
                />
                <div className="form-control w-32">
                    <label className="cursor-pointer label">
                        <span className="label-text">Publish</span>
                        <input
                            defaultChecked={data.publish}
                            onChange={({ target }) =>
                                setData({
                                    ...data,
                                    publish: target.checked,
                                })
                            }
                            type="checkbox"
                            name="publish"
                            className="toggle toggle-accent"
                        />
                    </label>
                </div>
                <div className="mt-4">
                    <button
                        onClick={handleSubmit}
                        className="btn !px-8 bg-green-600 text-green-200"
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
