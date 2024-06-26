import Layout from "@/Layouts/layout/layout";
import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React from "react";

const HotelDetial = () => {
    const { hotel, rooms, foods } = usePage().props;
    return (
        <div>
            <div className="bg-gray-80 flex content-center justify-center ">
                <div className="bg-gray-50 py-6 w-5">
                    <div className="max-w-screen-lg mx-auto">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="px-6 pt-8">
                                <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    Information Of {hotel[0].name}
                                </div>
                            </div>
                            <div className="px-6 py-2">
                                <h5>Province</h5>
                                <p>{hotel[0].province}</p>
                                <h5>Address</h5>
                                <p>{hotel[0].address}</p>
                            </div>
                            <div className="px-6 py-2">
                                <img
                                    src={hotel[0].photoAddress}
                                    alt="Hotel Image"
                                    className=""
                                ></img>
                            </div>
                            <div className="px-6 py-2">
                                <Button
                                    className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    icon="pi pi-thumbs-up"
                                    onClick={() => {
                                        router.get(
                                            `/like/${hotel[0].id}?type=hotel&page=hotelDetial`
                                        );
                                    }}
                                >
                                    <span className="ml-2">
                                        {hotel[0].hotelLiked}
                                    </span>
                                </Button>
                                <button
                                    className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    // disable={roomStatus}
                                >
                                    Comment
                                </button>
                                <button
                                    className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => router.get("/hotel/view")}
                                >
                                    Go back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {foods.map((item) => (
                <div
                    className="bg-gray-80 flex content-center justify-center "
                    key={item.id}
                >
                    <div className="bg-gray-50 py-4 w-5">
                        <div className="max-w-screen-lg mx-auto">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="px-6 pt-8">
                                    <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                        Food Of {item.name}
                                    </div>
                                </div>
                                <div className="px-6 py-2">
                                    <h5>Cost</h5>
                                    <p>{item.cost}</p>
                                    <h5>Description</h5>
                                    <p>{item.description}</p>
                                </div>
                                <div className="px-6 py-2">
                                    <img
                                        src={item.image}
                                        alt="Hotel Image"
                                        className=""
                                        style={{
                                            height: "45vh",
                                            width: "100%",
                                        }}
                                    ></img>
                                </div>
                                <div className="px-6 py-2">
                                    <Button
                                        className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        icon="pi pi-thumbs-up"
                                        onClick={() => {
                                            router.get(
                                                `/like/${item.id}?type=food&page=hotelDetial`
                                            );
                                        }}
                                    >
                                        <span className="ml-2">
                                            {item.foodsLiked}
                                        </span>
                                    </Button>
                                    <button
                                        className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        // disable={roomStatus}
                                    >
                                        Comment
                                    </button>
                                    <button
                                        className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() =>
                                            router.get("/hotel/view")
                                        }
                                    >
                                        Go back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {rooms.map((item) => (
                <div
                    className="bg-gray-80 flex content-center justify-center "
                    key={item.id}
                >
                    <div className="bg-gray-50 w-5">
                        <div className="max-w-screen-lg mx-auto">
                            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                <div className="px-6 pt-8">
                                    <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                        Room Of {item.name}
                                    </div>
                                </div>
                                <div className="px-6 py-2">
                                    <h5>Cost</h5>
                                    <p>{item.cost}</p>
                                </div>
                                <div className="px-6 py-2">
                                    <h5>Room Number</h5>
                                    <p>{item.room_number}</p>
                                </div>
                                <div className="px-6 py-2">
                                    <h5>Capacity</h5>
                                    <p>{item.capacity}</p>
                                </div>
                                <div className="px-6 py-2">
                                    <Button
                                        className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        icon="pi pi-thumbs-up"
                                        onClick={() => {
                                            router.get(
                                                `/like/${item.id}?type=room&page=hotelDetial`
                                            );
                                        }}
                                    >
                                        <span className="ml-2">
                                            {item.roomsLiked}
                                        </span>
                                    </Button>
                                    <button
                                        className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        // disable={roomStatus}
                                    >
                                        Comment
                                    </button>
                                    <button
                                        className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() =>
                                            router.get("/hotel/view")
                                        }
                                    >
                                        Go back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HotelDetial;
