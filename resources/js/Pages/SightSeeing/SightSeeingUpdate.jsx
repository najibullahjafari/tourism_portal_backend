import Layout from "@/Layouts/layout/layout";
import { router, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { useState } from "react";

const SightSeeingUpdate = () => {
    const { data } = usePage().props;
    const {
        data: sightSeeing,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        name: data.name,
        address: data.address,
        province: data.province,
        open_time: data.close_time,
        close_time: data.open_time,
        description: data.description,
        image: data.image,
        ticket_cost: data.ticket_cost,
        status: "active",
    });
    const [image, setImage] = useState(data.image);
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     router.post(`/sightSeeingUpdate/${id}`);
    // };
    const handleImage = (event) => {
        const file = event.target.files[0];
        setData("image", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="flex justify-center items-center bg-gray-100 w-50 h-auto">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
                <form
                // onSubmit={() => {
                // handleSubmit(data.id);
                // }}
                >
                    <div className="mb-4">
                        <label
                            htmlFor="name"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={sightSeeing.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="address"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={sightSeeing.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="province"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Province
                        </label>
                        <input
                            type="text"
                            id="province"
                            name="province"
                            value={sightSeeing.province}
                            onChange={(e) =>
                                setData("province", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="open-time"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Open Time
                        </label>
                        <input
                            type="text"
                            id="open-time"
                            name="open_time"
                            value={sightSeeing.open_time}
                            onChange={(e) =>
                                setData("open_time", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="close-time"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Close Time
                        </label>
                        <input
                            type="text"
                            id="close-time"
                            name="close_time"
                            value={sightSeeing.close_time}
                            onChange={(e) =>
                                setData("close_time", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="ticket-cost"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Ticket Cost
                        </label>
                        <input
                            type="text"
                            id="ticket-cost"
                            name="ticket_cost"
                            value={sightSeeing.ticket_cost}
                            onChange={(e) =>
                                setData("ticket_cost", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={sightSeeing.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    {/* <div className="mb-4">
                        <img src={image} alt="Sight Seeing Image" />
                    </div> */}
                    <div className="mb-4">
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={(e) => handleImage}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SightSeeingUpdate;
