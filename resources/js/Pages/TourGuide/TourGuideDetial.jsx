import { router, usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import React from "react";
const TourGuideDetial = () => {
    const { data } = usePage().props;
    return (
        <div
            className="bg-gray-80 flex content-center justify-center "
            key={data[0].id}
        >
            <div className="bg-gray-50 py-12 w-1/2">
                <div className="max-w-screen-lg mx-auto">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="px-6 pt-8">
                            <div className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                Information Of {data[0].name}
                            </div>
                        </div>
                        <div className="px-6 py-2">{data[0].bio}</div>
                        <div className="px-6 py-2">
                            <img
                                src={data[0].image}
                                alt="TourGuide Image"
                                style={{
                                    height: "45vh",
                                    width: "100%",
                                }}
                            ></img>
                        </div>
                        <div className="px-6 py-2">
                            <h5>Location</h5>
                            <p>{data[0].location}</p>
                            <h5>Phone</h5>
                            <p>{data[0].phone}</p>
                        </div>
                        <div className="px-6 py-2">
                            <Button
                                className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                icon="pi pi-thumbs-up"
                                onClick={() => {
                                    router.get(
                                        `/like/${data[0].id}?type=tourGuide&page=tourGuide`
                                    );
                                }}
                            >
                                <span className="ml-2">{data[0].liked}</span>
                            </Button>
                            <button
                                className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                // disable={roomStatus}
                            >
                                Comment
                            </button>
                            <button
                                className="mx-3 my-3 bg-gray-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => router.get(`/tourGuide/view`)}
                            >
                                Go back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourGuideDetial;
