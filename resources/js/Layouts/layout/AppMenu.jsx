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
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        {
                            label: "Hotel List",
                            icon: "pi pi-fw pi-home",
                            to: route("hotelList"),
                        },
                        {
                            label: "Hotel Request",
                            icon: "pi pi-fw pi-home",
                            to: route("hotelRequest"),
                        },
                        {
                            label: "Add Hotel",
                            icon: "pi pi-fw pi-home",
                            to: route("addHotel"),
                        },
                        {
                            label: "Categoy Foot",
                            icon: "pi pi-fw pi-home",
                            to: route("footCategories"),
                        },
                    ],
                    roles: ["super-admin", "hotel-admin"],
                },
                {
                    label: "Transportation",
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        {
                            label: "Cars",
                            icon: "pi pi-fw pi-car",
                            to: route("cars"),
                        },
                        {
                            label: "Requests",
                            icon: "pi pi-fw pi-id-card",
                            to: route("cars.requested.cars"),
                        },
                    ],
                    roles: ["super-admin", "transport-admin"],
                },
                {
                    label: "User",
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        {
                            label: "User",
                            icon: "pi pi-fw pi-user",
                            to: route("user"),
                        },
                        {
                            label: "Request",
                            icon: "pi pi-fw pi-user",
                            to: route("userRequest.index"),
                        },
                    ],
                    roles: ["super-admin"],
                },
                {
                    label: "Sight Seeing",
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        {
                            label: "Sight Seeing",
                            icon: "pi pi-fw pi-user",
                            to: route("sightSeeing.index"),
                        },
                        {
                            label: "Request",
                            icon: "pi pi-fw pi-user",
                            to: route("userRequest"),
                        },
                    ],
                },
                {
                    label: "View",
                    icon: "pi pi-fw pi-id-card",
                    items: [
                        {
                            label: "Hotels",
                            icon: "pi pi-fw pi-user",
                            to: route("hotels"),
                        },
                        {
                            label: "Sight Seeing",
                            icon: "pi pi-fw pi-user",
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
