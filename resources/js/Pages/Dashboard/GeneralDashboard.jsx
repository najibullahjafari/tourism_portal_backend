import { usePage } from "@inertiajs/react";
import TransportDashboard from "./TransportDashboard";
import SuperAdminDashboard from "./SuperAdminDashboard";
import HotelDashboard from "./HotelDashboard";
import Layout from "@/Layouts/layout/layout";

const GeneralDashboard = () => {
    const { user } = usePage().props;
    const userRole = user.roles[0];

    console.log(userRole);

    return (
        <>
            {userRole === "hotel-admin" && <HotelDashboard />}
            {userRole === "super-admin" && <SuperAdminDashboard />}
            {userRole === "transport-admin" && <TransportDashboard />}
        </>
    );
};

export default GeneralDashboard;
