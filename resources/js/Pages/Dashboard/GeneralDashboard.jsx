import { Link, usePage } from "@inertiajs/react";
import TransportDashboard from "./TransportDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import HotelDashboard from "./HotelDashboard";
import Layout from "@/Layouts/layout/layout";
import SightSeeing from "../SightSeeing";
import Navbar from "../Navbar";
import Vission from "../Vission";
import Footer from "../Footer";

const GeneralDashboard = () => {
    const { user } = usePage().props;
    const userRole = user.roles[0];

    console.log(userRole);

    return (
        <>
            {userRole === "user" && (
                <>
                    <Navbar />
                    <div className="container card justify-center">
                        <div>welcome {user.name}</div>
                    </div>
                    <Vission />
                    <Footer />
                </>
            )}
            {userRole === "hotel-admin" && <HotelDashboard />}
            {userRole === "super-admin" && <SuperAdminDashboard />}
            {userRole === "transport-admin" && <TransportDashboard />}
        </>
    );
};

export default GeneralDashboard;
