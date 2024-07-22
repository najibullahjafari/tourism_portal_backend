import { useForm, usePage } from "@inertiajs/react";
import React from "react";

const Book = () => {
    const { id, type } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        obj_type: type,
        obj_id: id,
        start_date: "",
    });
    function handleSubmit(e) {
        e.preventDefault();
        post(route("booking.store"));
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md sm:p-12">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Booking
                    </h2>
                    <div className="mb-6">
                        <label
                            htmlFor="datetime"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Date and Time
                        </label>
                        <input
                            type="datetime-local"
                            id="datetime"
                            name="obj_type"
                            value={data.start_date}
                            onChange={(e) =>
                                setData("start_date", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="type"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Type
                        </label>
                        <input
                            type="text"
                            id="type"
                            name="obj_type"
                            value={data.obj_type}
                            onChange={(e) =>
                                setData("obj_type", e.target.value)
                            }
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="obj_id"
                            className="block text-gray-700 font-bold mb-2"
                        >
                            Booked ID
                        </label>
                        <input
                            type="text"
                            id="obj_id"
                            name="obj_id"
                            value={data.obj_id}
                            onChange={(e) => setData("obj_id", e.target.value)}
                            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline transition-colors duration-300"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Book;
