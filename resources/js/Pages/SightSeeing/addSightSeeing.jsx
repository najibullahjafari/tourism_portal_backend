import Layout from "@/Layouts/layout/layout";
import { useForm } from "@inertiajs/react";
import { data } from "autoprefixer";
import React, { useState } from "react";
import { useEffect } from "react";

const AddSightSeeing = (props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        address: "",
        province: "",
        open_time: "",
        close_time: "",
        description: "",
        image: "",
        ticket_cost: "",
        status: "deactive",
    });
    function handleSubmit(e) {
        e.preventDefault();
        post(route("sightSeeing.store"));
    }
    const [photoAddress, setphotoAddress] = useState(null);

    useEffect(() => {
        return () => {
            reset("image");
        };
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setData("image", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setphotoAddress(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <Layout>
            <div class="relative overflow-x-auto shadow-x sm:rounded-lg bg-white">
                <h3 class="max-w-md mx-auto mt-5">ADD NEW Sight Seeing</h3>
                <form class="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div class="relative z-0 w-full mb-5 group">
                        <input
                            type="input"
                            name="name"
                            id="name"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <label
                            for="name"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Name
                        </label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input
                            type="Input"
                            name="address"
                            id="address"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                        />
                        <label
                            for="address"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Address
                        </label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input
                            type="input"
                            name="province"
                            id="province"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={data.province}
                            onChange={(e) =>
                                setData("province", e.target.value)
                            }
                        />
                        <label
                            for="province"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Province
                        </label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input
                            type="datetime-local"
                            name="open_time"
                            id="open_time"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={data.open_time}
                            onChange={(e) =>
                                setData("open_time", e.target.value)
                            }
                        />
                        <label
                            for="open_time"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Open Time
                        </label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input
                            type="datetime-local"
                            name="close_time"
                            id="close_time"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={data.close_time}
                            onChange={(e) =>
                                setData("close_time", e.target.value)
                            }
                        />
                        <label
                            for="close_time"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Close Time
                        </label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="ticket_cost"
                            id="ticket_cost"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={data.ticket_cost}
                            onChange={(e) =>
                                setData("ticket_cost", e.target.value)
                            }
                        />
                        <label
                            for="ticket_cost"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Ticket Cost
                        </label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <textarea
                            name="description"
                            id="description"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        <label
                            for="description"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Description
                        </label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input
                            type="file"
                            name="image"
                            id="image"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            onChange={handleFileUpload}
                        />
                        <label
                            for="image"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Choose a image
                        </label>
                    </div>
                    <span>
                        <button
                            type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-5"
                            disabled={processing}
                        >
                            Save
                        </button>
                    </span>
                </form>
            </div>
        </Layout>
    );
};

export default AddSightSeeing;
