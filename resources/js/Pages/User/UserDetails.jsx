import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React from "react";
const UserDetails = () => {
    const { data } = usePage().props;
    console.log("What the fact!", data);
    return (
        <div class="bg-gray-100 flex justify-center items-center py-20 rounded-lg shadow-lg h-2/3">
            <div class="bg-white shadow-lg rounded-lg mx-auto sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/3 sm:mx-4px md:mx-5">
                <img
                    src={data[0].image}
                    alt="Sight Seeing Image"
                    class="w-full h-64 object-cover rounded-lg shadow-md xl:mb-6 lg:mb-5 md:mb-5 sm:mb-5"
                />
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-gray-800 mb-2">
                        Information of {data[0].name}
                    </h2>
                    <p class="text-gray-600 px-5">
                        {data[0].bio}. {data[0].name} is located in{" "}
                        {data[0].location}. {data[0].phone} is phone number of{" "}
                        {data[0].name}.
                    </p>
                </div>
                <div className="flex flex-row items-center justify-center">
                    <Button
                        className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                        icon="pi pi-thumbs-up"
                        onClick={() => {
                            router.get(
                                `/like/${data[0].id}?type=tourGuide&page=tourGuide`
                            );
                        }}
                    >
                        <span className="ml-2">{data[0].liked}</span>
                    </Button>
                    <Button
                        className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                        onClick={() =>
                            router.get(
                                `/booking/obj/${data[0].id}?type=tourguide`
                            )
                        }
                    >
                        Booking
                    </Button>
                    <Button
                        className="mx-3 my-3 text-blue-600 hover:text-blue-700 bg-white font-bold py-1 px-2 rounded border-white hover:shadow-lg hover:border-blue-500 "
                        icon="pi pi-arrow-left"
                        onClick={() => router.get("/about-tourGuide")} // /sightSeeing/view
                    ></Button>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
