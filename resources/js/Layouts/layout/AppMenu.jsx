import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { rule } from "postcss";

const AppMenu = () => {
    const { user } = usePage().props;
    const userRole = user.roles[0];
    const model = [
        {
            label: "Home",
            items: [
                {
                    label: "Dashboard",
                    icon: "pi pi-fw pi-home",
                    to: route("dashboard"),
                    roles: [
                        "super-admin",
                        "hotel-admin",
                        "transport-admin",
                        "tourist",
                    ],
                },
                {
                    label: "Hotel",
                    icon: "pi pi-fw pi-building",
                    items: [
                        {
                            label: "Hotel List",
                            icon: "pi pi-fw pi-list",
                            to: route("hotelList"),
                        },
                        {
                            label: "Requests",
                            icon: "pi pi-fw pi-request",
                            to: route("hotelRequest"),
                            icon: "pi pi-fw pi-question",
                        },
                        {
                            label: "Add Hotel",
                            icon: "pi pi-fw pi-plus",
                            to: route("addHotel"),
                        },
                        {
                            label: "Food categories",
                            icon: "pi pi-fw pi-palette",
                            to: route("footCategories"),
                        },
                    ],
                    roles: ["super-admin", "hotel-admin"],
                },
                {
                    label: "Transportation",
                    icon: "pi pi-fw pi-car",
                    items: [
                        {
                            label: "Cars",
                            icon: "pi pi-fw pi-car",
                            to: route("cars"),
                        },
                        {
                            label: "Requests",
                            icon: "pi pi-fw pi-question",
                            to: route("cars.requested.cars"),
                        },
                    ],
                    roles: ["super-admin", "transport-admin"],
                },

                {
                    label: "Sight Seeing",
                    icon: "pi pi-fw pi-map",
                    items: [
                        {
                            label: "Sight Seeing",
                            icon: "pi pi-fw pi-map",
                            to: route("sightSeeing.index"),
                        },
                        {
                            label: "Request",
                            icon: "pi pi-fw pi-question",
                            to: route("userRequest"),
                        },
                    ],
                    roles: ["super-admin", "sight-seeing-admin"],
                },
                {
                    label: "View",
                    icon: "pi pi-fw pi-eye",
                    items: [
                        {
                            label: "Hotels",
                            icon: "pi pi-fw pi-building", // Modified icon for hotel
                            to: route("hotels"),
                        },
                        {
                            label: "Sight Seeing",
                            icon: "pi pi-fw pi-map",
                            to: route("sightSeeings"),
                        },
                        {
                            label: "Tour Guide",
                            icon: "pi pi-fw pi-user",
                            to: route("tourGuides"),
                        },
                        {
                            label: "Tourist",
                            icon: "pi pi-fw pi-user",
                            to: route("tourists"),
                        },
                    ],
                    roles: [
                        "super-admin",
                        "hotel-admin",
                        "transport-admin",
                        "user",
                    ],
                },
                {
                    label: "Message",
                    icon: "pi pi-fw pi-envelope",
                    items: [
                        {
                            label: "Hotels",
                            icon: "pi pi-fw pi-user",
                            to: route("hotelsMessage"),
                        },
                        // {
                        //     label: "Sight Seeing",
                        //     icon: "pi pi-fw pi-user",
                        //     to: route("sightSeeingsMessage"),
                        // },
                        // {
                        //     label: "Tour Guide",
                        //     icon: "pi pi-fw pi-user",
                        //     to: route("tourGuidesMessage"),
                        // },
                        // {
                        //     label: "Tourist",
                        //     icon: "pi pi-fw pi-user",
                        //     to: route("touristsMessage"),
                        // },
                    ],
                },
                {
                    label: "User",
                    icon: "pi pi-fw pi-user",
                    items: [
                        {
                            label: "Active users",
                            icon: "pi pi-fw pi-users",
                            to: route("user"),
                        },
                        {
                            label: "Request",
                            icon: "pi pi-fw pi-question",
                            to: route("userRequest.index"),
                        },
                        {
                            label: "Profile",
                            icon: "pi pi-fw pi-setting",
                            to: route("profile.edit"),
                        },
                    ],
                    roles: ["super-admin"],
                },
                {
                    label: "Booking",
                    icon: "pi pi-fw pi-user",
                    items: [
                        {
                            label: "Booked",
                            icon: "pi pi-fw pi-users",
                            to: route("booked"),
                        },
                        {
                            label: "booking",
                            icon: "pi pi-fw pi-question",
                            to: route("booking"),
                        },
                    ],
                },
                {
                    label: "News",
                    icon: "pi pi-fw pi-user",
                    items: [
                        {
                            label: "News",
                            icon: "pi pi-fw pi-users",
                            to: route("news"),
                        },
                    ],
                },
            ],
        },
    ];
    // Function to filter items based on the user's role
    const filterItemsByRole = (items) => {
        return items
            .filter((item) => {
                if (!item.roles) return true;
                return item.roles.includes(userRole);
            })
            .map((item) => {
                // Recursively filter sub-items if they exist
                if (item.items) {
                    return { ...item, items: filterItemsByRole(item.items) };
                }
                return item;
            });
    };

    const filteredModel = filterItemsByRole(model);

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {filteredModel.map((item, i) =>
                    !item?.separator ? (
                        <AppMenuitem
                            item={item}
                            root={true}
                            index={i}
                            key={item.label}
                        />
                    ) : (
                        <li
                            className="menu-separator"
                            key={`separator-${i}`}
                        ></li>
                    )
                )}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
