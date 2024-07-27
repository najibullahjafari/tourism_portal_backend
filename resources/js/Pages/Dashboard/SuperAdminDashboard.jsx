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
            label: "Cars",
            data: [1, 2, 3, 4, 5, 6, 7, 8],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
        },
        {
            label: "Hotels",
            data: [2, 4, 6, 8, 10, 12, 14],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
        },
    ],
};

const SuperAdminDashboard = () => {
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
    const [pendingUsers, setPendingUsers] = useState(0);

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
            data: {
                labels: ["Cars", "Hotels"],
                datasets: [
                    {
                        label: "Number of Cars and Hotels",
                        data: [numberOfCars, numberOfHotels],
                        backgroundColor: ["#42A5F5", "#66BB6A"],
                        hoverBackgroundColor: ["#64B5F6", "#81C784"],
                    },
                ],
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
            data: {
                labels: ["Cars", "Hotels"],
                datasets: [
                    {
                        label: "Number of Cars and Hotels",
                        data: [numberOfCars, numberOfHotels],
                        backgroundColor: ["#42A5F5", "#66BB6A"],
                        hoverBackgroundColor: ["#64B5F6", "#81C784"],
                    },
                ],
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
        const carDiff = numberOfCars - numberOfAllCars;
        setPendingCar(carDiff);
    }, [numberOfAllCars, numberOfCars]);

    // useEffect hook for calculating Diff
    useEffect(() => {
        const HotelDiff = numberOfHotels - numberOfHotelsAccepted;
        setPendingHotel(HotelDiff);
    }, [numberOfHotels, numberOfHotelsAccepted]);
    useEffect(() => {
        const PendingUsers = numberOfUsers - numberOfUsersAccepted;
        setPendingUsers(PendingUsers);
    }, [numberOfUsers, numberOfUsersAccepted]);

    return (
        <Layout>
            <div className="grid">
                <DashboardInfoCard
                    title="Number of Cars"
                    value={numberOfCars}
                    icon="map-marker"
                    iconColor="blue"
                    descriptionValue={numberOfCars}
                    descriptionText=" cars in the system"
                ></DashboardInfoCard>
                <DashboardInfoCard
                    title="Hotels"
                    value={numberOfHotelsAccepted}
                    icon="map-marker"
                    iconColor="orange"
                    descriptionValue={pendingHotel}
                    descriptionText="Pending hotels"
                ></DashboardInfoCard>
                <DashboardInfoCard
                    title="All Users"
                    value={numberOfUsers}
                    descriptionValue={pendingUsers}
                    icon="inbox"
                    iconColor="cyan"
                    descriptionText="Pening Users"
                ></DashboardInfoCard>

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

                <div className="col-12 xl:col-6"></div>
            </div>
        </Layout>
    );
};

export default SuperAdminDashboard;
