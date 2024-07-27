import { useForm, usePage } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

const Book = ({ id, objType }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        obj_type: objType,
        obj_id: id,
        start_date: "",
    });
    const [success, setSuccess] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        post(route("booking.store"), {
            onSuccess: () => {
                setSuccess(true);
                reset();
            },
        });
    }

    return (
        <div className="flex justify-center items-center  ">
            <div className="  rounded-lg p-8 w-full max-w-md sm:p-12">
                {success && (
                    <div className="mb-6 text-green-500 font-bold text-center">
                        Booking successful!
                    </div>
                )}
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
                            name="start_date"
                            value={data.start_date}
                            onChange={(e) =>
                                setData("start_date", e.target.value)
                            }
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
