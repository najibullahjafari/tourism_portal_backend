import Layout from "@/Layouts/layout/layout";
import { router, useForm, usePage } from "@inertiajs/react";
import { data } from "autoprefixer";
import React, { useState } from "react";
const HotelAdmin = (props) => {
    const { hotel, rooms, foods } = usePage().props;

    const {
        data: hotelData,
        setData,
        processing: profileStatus,
        error,
        post,
    } = useForm({
        name: hotel[0].name,
        address: hotel[0].address,
        province: hotel[0].province,
        photoAddress: hotel[0].photoAddress,
        status: "deactive",
    });
    const {
        data: RoomData,
        setData: setRoomData,
        processing: roomStatus,
    } = useForm({
        cost: "",
        hotel_id: "",
        capacity: "",
        room_number: "",
    });
    const {
        data: fooData,
        setData: setFoodData,
        processing: foodStatus,
    } = useForm({
        hotel_id: "",
        name: "",
        description: "",
        cost: "",
        image: "",
    });
    
    // const hotelSubmit = (e, id) => {
    //     e.preventDefault();
    //     router.put(`/hotelUpdate/${id}`);
    // };
    const [hotelImage, setHotelImage] = useState(hotel[0].photoAddress);
    const [image, setImage] = useState();
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setData("photoAddress", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHotelImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleFileUploadFood = (event) => {
        const file = event.target.files[0];
        setFoodData("image", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <div className="bg-gray-50 py-12">
                <div className="max-w-screen-lg mx-auto">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-6 py-8">
                            <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                Hotel {hotelData.name}
                            </div>
                            <form
                            // onSubmit={(e) => hotelSubmit(e, hotel[0].id)}
                            >
                                <div className="mb-6">
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={hotelData.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="Address"
                                        className="block text-gray-700 font-bold mb-2"
                                    >
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={hotelData.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <img
                                        src={hotelImage}
                                        alt="Hotel image"
                                        className="block py-2.5 px-0 w-full"
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="file"
                                        name="photoAddress"
                                        id="Admin_Hotel_Province"
                                        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        onChange={handleFileUpload}
                                    />
                                    <label
                                        for="Admin_Hotel_Province"
                                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                    >
                                        Choose a image
                                    </label>
                                </div>
                                <div className="mb-6">
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
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={hotelData.province}
                                        onChange={(e) =>
                                            setData("province", e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        disable={profileStatus}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Existen Room */}
            {rooms.map((room) => (
                <div className="bg-gray-50 py-12" key={room.id}>
                    <div className="max-w-screen-lg mx-auto">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="px-6 py-8">
                                <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    Room Of {hotelData.name}
                                </div>
                                <form>
                                    <input
                                        name="id"
                                        value={room.id}
                                        className="hidden"
                                    ></input>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="cost"
                                            className="block text-gray-700 font-bold mb-2"
                                        >
                                            Cost
                                        </label>
                                        <input
                                            type="text"
                                            id="cost"
                                            name="cost"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={room.cost}
                                            onChange={(e) =>
                                                setRoomData(
                                                    "cost",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="room_number"
                                            className="block text-gray-700 font-bold mb-2"
                                        >
                                            Room Number
                                        </label>
                                        <input
                                            type="number"
                                            id="room_number"
                                            name="room_number"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={room.room_number}
                                            onChange={(e) =>
                                                setRoomData(
                                                    "room_number",
                                                    e.target.value
                                                )
                                            }
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="capacity"
                                            className="block text-gray-700 font-bold mb-2"
                                        >
                                            Capacity
                                        </label>
                                        <input
                                            type="number"
                                            id="capacity"
                                            name="capacity"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={room.capacity}
                                            onChange={(e) =>
                                                setRoomData(
                                                    "capacity",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            disable={roomStatus}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Existen Food */}
            {foods.map((food) => (
                <div className="bg-gray-50 py-12" key={food.id}>
                    <div className="max-w-screen-lg mx-auto">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="px-6 py-8">
                                <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    Food Of {hotelData.name}
                                </div>
                                <form
                                // onSubmit={(e) =>
                                //     hotelSubmit(e, hotel[0].id)
                                // }
                                >
                                    <input
                                        type="number"
                                        className="hidden"
                                        name="id"
                                        value={food.id}
                                    />
                                    <div className="mb-6">
                                        <label
                                            htmlFor="cost"
                                            className="block text-gray-700 font-bold mb-2"
                                        >
                                            Cost
                                        </label>
                                        <input
                                            type="text"
                                            id="cost"
                                            name="cost"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={food.cost}
                                            onChange={(e) =>
                                                setFoodData(
                                                    "cost",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="name"
                                            className="block text-gray-700 font-bold mb-2"
                                        >
                                            name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={food.name}
                                            onChange={(e) =>
                                                setFoodData(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor="description"
                                            className="block text-gray-700 font-bold mb-2"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            value={food.description}
                                            onChange={(e) =>
                                                setFoodData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <img
                                            src={food.image}
                                            alt="Hotel image"
                                            className="block py-2.5 px-0 w-full"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <input
                                            type="file"
                                            name="image"
                                            id="foodImage"
                                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            onChange={handleFileUploadFood}
                                        />
                                        <label
                                            for="foodImage"
                                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Choose a image
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button
                                            disable={foodStatus}
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default HotelAdmin;
