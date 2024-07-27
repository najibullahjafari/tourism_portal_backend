import React, { useContext, useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Chart } from "primereact/chart";
import { Menu } from "primereact/menu";
import { LayoutContext } from "@/Layouts/layout/context/layoutcontext";
import Layout from "@/Layouts/layout/layout.jsx";
import DashboardInfoCard from "@/Components/DashboardInfoCard.jsx";
import { router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import MapReact from "../map/MapReact.jsx";
const lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Internal Tourists",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
        },
        {
            label: "External Tourists",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
        },
    ],
};

const HotelDashboard = () => {
    const menu1 = useRef(null);
    const [lineOptions, setLineOptions] = useState({});
    const { layoutConfig } = useContext(LayoutContext);
    const [numberOfCars, setNumberOfCars] = useState(0);
    const [numberOfAllCars, setnumberOfAllCars] = useState(0);
    const [numberOfHotels, setNumberOfHotels] = useState(0);
    const [numberOfHotelsAccepted, setNumberOfHotelsAccepted] = useState(0);
    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [numberOfUsersAccepted, setNumberOfUsersAccepted] = useState(0);
    const [pendingCar, setPendingCar] = useState(0);
    const [pendingHotel, setPendingHotel] = useState(0);

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#495057",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: "#ebedef",
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
                y: {
                    ticks: {
                        color: "#ebedef",
                    },
                    grid: {
                        color: "rgba(160, 167, 181, .3)",
                    },
                },
            },
        };

        setLineOptions(lineOptions);
    };

    useEffect(() => {
        if (layoutConfig.colorScheme === "light") {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);

    // a function to get the number of cars form the database

    useEffect(() => {
        // function to fetch the data
        const fetchNumberOfCars = async () => {
            try {
                const response = await fetch("/car/numbers");
                const data = await response.json();
                setNumberOfCars(data);
            } catch (error) {
                console.error("Error fetching number of cars:", error);
            }
        };

        const fetchAllCars = async () => {
            try {
                const response = await fetch("car/allnumbers");
                const data = await response.json();
                setnumberOfAllCars(data);
            } catch (error) {
                console.error("Error fetching number of cars:", error);
            }
        };

        const fetchNumberOfHotels = async () => {
            try {
                const response = await fetch("/numberOFHotels");
                const data = await response.json();
                setNumberOfHotels(data);
            } catch (error) {
                console.error("Error fetching number of hotels:", error);
            }
        };
        const fetchNumberOfHotelsAccepted = async () => {
            try {
                const response = await fetch("/numberOFHotelsAccepted");
                const data = await response.json();
                setNumberOfHotelsAccepted(data);
            } catch (error) {
                console.error("Error fetching number of hotels:", error);
            }
        };

        const fetchNumberOfUsers = async () => {
            try {
                const response = await fetch("numberOfUsers");
                const data = await response.json();
                setNumberOfUsers(data);
            } catch (error) {
                console.error("Error fetching number of users:", error);
            }
        };
        const fetchNumberOfUserAccepted = async () => {
            try {
                const response = await fetch("numberOfUsersAccepted");
                const data = await response.json();
                setNumberOfUsersAccepted(data);
            } catch (error) {
                console.error("Error fetching number of users:", error);
            }
        };

        fetchAllCars();
        fetchNumberOfCars();
        fetchNumberOfHotels();
        fetchNumberOfHotelsAccepted();
        fetchNumberOfUsers();
        fetchNumberOfUserAccepted();
    }, []);
    useEffect(() => {
        const carDiff = numberOfAllCars - numberOfCars;
        setPendingCar(carDiff);
    }, [numberOfAllCars, numberOfCars]);

    // useEffect hook for calculating Diff
    useEffect(() => {
        const HotelDiff = numberOfHotels - numberOfHotelsAccepted;
        setPendingHotel(HotelDiff);
    }, [numberOfHotels, numberOfHotelsAccepted]);

    return (
        <Layout>
            <div className="grid">
                <div className="col-12 xl:col-6">
                    <div className="card">
                        <h5>Overview</h5>
                        <Chart
                            type="line"
                            data={lineData}
                            options={lineOptions}
                        />
                    </div>
                </div>

                <div className="col-12 xl:col-6">
                    <div className="card">
                        <div className="flex justify-content-between align-items-center mb-5">
                            <h5>Most visited places</h5>
                            <div>
                                <Button
                                    type="button"
                                    icon="pi pi-ellipsis-v"
                                    rounded
                                    text
                                    className="p-button-plain"
                                    onClick={(event) =>
                                        menu1.current?.toggle(event)
                                    }
                                />
                                <Menu
                                    ref={menu1}
                                    popup
                                    model={[
                                        {
                                            label: "Add New",
                                            icon: "pi pi-fw pi-plus",
                                        },
                                        {
                                            label: "Remove",
                                            icon: "pi pi-fw pi-minus",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <ul className="list-none p-0 m-0">
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                                        Bamyan
                                    </span>
                                    <div className="mt-1 text-600">
                                        Band Amir
                                    </div>
                                </div>
                                <div className="mt-2 md:mt-0 flex align-items-center">
                                    <div
                                        className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                                        style={{ height: "8px" }}
                                    >
                                        <div
                                            className="bg-orange-500 h-full"
                                            style={{ width: "50%" }}
                                        />
                                    </div>
                                    <span className="text-orange-500 ml-3 font-medium">
                                        %50
                                    </span>
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                                        Mazar Sharif
                                    </span>
                                    <div className="mt-1 text-600">
                                        Band Qush Tepa
                                    </div>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div
                                        className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                                        style={{ height: "8px" }}
                                    >
                                        <div
                                            className="bg-cyan-500 h-full"
                                            style={{ width: "16%" }}
                                        />
                                    </div>
                                    <span className="text-cyan-500 ml-3 font-medium">
                                        %16
                                    </span>
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                                        Noristan
                                    </span>
                                    <div className="mt-1 text-600">
                                        Band Qala
                                    </div>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div
                                        className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                                        style={{ height: "8px" }}
                                    >
                                        <div
                                            className="bg-pink-500 h-full"
                                            style={{ width: "67%" }}
                                        />
                                    </div>
                                    <span className="text-pink-500 ml-3 font-medium">
                                        %67
                                    </span>
                                </div>
                            </li>
                            <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                                <div>
                                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                                        Kabul
                                    </span>
                                    <div className="mt-1 text-600">
                                        Darul Aman Palace
                                    </div>
                                </div>
                                <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                                    <div
                                        className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                                        style={{ height: "8px" }}
                                    >
                                        <div
                                            className="bg-blue-500 h-full"
                                            style={{ width: "35%" }}
                                        />
                                    </div>
                                    <span className="text-blue-500 ml-3 font-medium">
                                        %35
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HotelDashboard;
