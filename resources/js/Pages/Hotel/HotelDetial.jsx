import Layout from "@/Layouts/layout/layout";
import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React from "react";

const HotelDetial = () => {
    const { hotel, rooms, foods } = usePage().props;
    return (
        <div>
            <div class="bg-gray-100 flex justify-center items-center py-20 rounded-lg shadow-lg h-2/3">
                <div class="bg-white shadow-lg rounded-lg mx-auto sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 sm:mx-4px md:mx-5">
                    <img
                        src={hotel[0].photoAddress}
                        alt="Sight Seeing Image"
                        class="w-full h-64 object-cover rounded-lg shadow-md xl:mb-6 lg:mb-5 md:mb-5 sm:mb-5"
                    />
                    <div class="text-center mb-8">
                        <h2 class="text-3xl font-bold text-gray-800 mb-2">
                            Information of {hotel[0].name}
                        </h2>
                        <p class="text-gray-600 px-5">
                            {hotel[0].province}.{hotel[0].name} is located in{" "}
                            {hotel[0].address}.
                        </p>
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <Button
                            className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                            icon="pi pi-thumbs-up"
                            onClick={() => {
                                router.get(
                                    `/like/${hotel[0].id}?type=hotel&page=hotelDetial`
                                );
                            }}
                        >
                            <span className="ml-2">{hotel[0].hotelLiked}</span>
                        </Button>
                        <Button
                            className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                            // disable={roomStatus}
                            onClick={() =>
                                router.get(
                                    `/booking/obj/${hotel[0].id}?type=hotel`
                                )
                            }
                        >
                            Booking
                        </Button>
                        <Button
                            className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                            icon="pi pi-arrow-left"
                            onClick={() => router.get("/about-hotel")} // /sightSeeing/view
                        ></Button>
                    </div>
                </div>
            </div>
            {foods.map((item) => (
                <div
                    class="bg-gray-100 flex justify-center items-center py-20 rounded-lg shadow-lg h-2/3 mt-10"
                    key={item.id}
                >
                    <div class="bg-white shadow-lg rounded-lg mx-auto sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 sm:mx-4px md:mx-5">
                        <img
                            src={item.image}
                            alt="Image"
                            class="w-full h-64 object-cover rounded-lg shadow-md xl:mb-6 lg:mb-5 md:mb-5 sm:mb-5"
                        />
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-gray-800 mb-2">
                                Information of {item.name}
                            </h2>
                            <p class="text-gray-600 px-5">
                                {item.description}.{item.name} is cost{" "}
                                {item.cost}.{hotel[0].address}.
                            </p>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <Button
                                className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                                icon="pi pi-thumbs-up"
                                onClick={() => {
                                    router.get(
                                        `/like/${item.id}?type=food&page=hotelDetial`
                                    );
                                }}
                            >
                                <span className="ml-2">{item.foodsLiked}</span>
                            </Button>
                            <button
                                className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                                // disable={roomStatus}
                            >
                                Comment
                            </button>
                            <Button
                                className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                                icon="pi pi-arrow-left"
                                onClick={() => router.get("/about-hotel")} // /sightSeeing/view
                            ></Button>
                        </div>
                    </div>
                </div>
            ))}
            {rooms.map((item) => (
                <div
                    class="bg-gray-100 flex justify-center items-center py-20 rounded-lg shadow-lg h-2/3 mt-10"
                    key={item.id}
                >
                    <div class="bg-white shadow-lg rounded-lg mx-auto sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 sm:mx-4px md:mx-5">
                        <div class="text-center mb-8">
                            <h2 class="text-3xl font-bold text-gray-800 mb-2">
                                Information of {hotel[0].name}
                            </h2>
                            <p class="text-gray-600 px-5">
                                This room has the capacity of {item.capacity}.
                                It is cost about {item.cost}. It is number is{" "}
                                {item.room_number}.
                            </p>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <Button
                                className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                                icon="pi pi-thumbs-up"
                                onClick={() => {
                                    router.get(
                                        `/like/${item.id}?type=room&page=hotelDetial`
                                    );
                                }}
                            >
                                <span className="ml-2">{item.roomsLiked}</span>
                            </Button>
                            <button
                                className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                                // disable={roomStatus}
                            >
                                Comment
                            </button>
                            <Button
                                className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                                icon="pi pi-arrow-left"
                                onClick={() => router.get("/about-hotel")} // /sightSeeing/view
                            ></Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HotelDetial;
