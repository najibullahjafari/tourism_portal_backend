import React from "react";

export default function Vission() {
    return (
        <div className="surface-section px-4 py-8 md:px-6 lg:px-8 text-center">
            <div className="mb-3 font-bold text-3xl">
                <span className="text-900">Tourism Portal, </span>
                <span className="text-primary">Afghanistan</span>
            </div>
            <div className="text-700 mb-6">
                Discover the breathtaking landscapes and rich cultural heritage
                of Afghanistan.
            </div>
            <div className="grid">
                <div className="col-12 md:col-4  mb-4 px-5">
                    <span
                        className="p-3 shadow-2 mb-3 inline-block hover:scale-110 surface-card"
                        style={{ borderRadius: "10px" }}
                    >
                        <i className="pi pi-map-marker text-4xl  text-primary"></i>
                    </span>
                    <div className="text-900 text-xl mb-3 font-medium">
                        Stunning Destinations
                    </div>
                    <span className="text-700 line-height-3">
                        Explore the majestic mountains, serene valleys, and
                        historic sites.
                    </span>
                </div>
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span
                        className="p-3 shadow-2 mb-3 inline-block hover:scale-110 surface-card"
                        style={{ borderRadius: "10px" }}
                    >
                        <i className="pi pi-calendar text-4xl text-primary"></i>
                    </span>
                    <div className="text-900 text-xl mb-3 font-medium">
                        Cultural Events
                    </div>
                    <span className="text-700 line-height-3">
                        Experience the vibrant festivals and traditions of
                        Afghanistan.
                    </span>
                </div>
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span
                        className="p-3 shadow-2 mb-3 inline-block hover:scale-110 surface-card"
                        style={{ borderRadius: "10px" }}
                    >
                        <i className="pi pi-check-circle text-4xl text-primary"></i>
                    </span>
                    <div className="text-900 text-xl mb-3 font-medium">
                        Delicious Cuisine
                    </div>
                    <span className="text-700 line-height-3">
                        Savor the unique flavors of Afghan cuisine, from kebabs
                        to pilaf.
                    </span>
                </div>
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span
                        className="p-3 shadow-2 mb-3 inline-block hover:scale-110 transition-colors surface-card"
                        style={{ borderRadius: "10px" }}
                    >
                        <i className="pi pi-users text-4xl text-primary"></i>
                    </span>
                    <div className="text-900 text-xl mb-3 font-medium">
                        Warm Hospitality
                    </div>
                    <span className="text-700 line-height-3">
                        Enjoy the warm and welcoming nature of Afghan people.
                    </span>
                </div>
                <div className="col-12 md:col-4 mb-4 px-5">
                    <span
                        className="p-3 shadow-2 mb-3 inline-block hover:scale-110 surface-card"
                        style={{ borderRadius: "10px" }}
                    >
                        <i className="pi pi-camera text-4xl text-primary"></i>
                    </span>
                    <div className="text-900 text-xl mb-3 font-medium">
                        Scenic Photography
                    </div>
                    <span className="text-700 line-height-3">
                        Capture the beauty of Afghanistan's landscapes and
                        architecture.
                    </span>
                </div>
                <div className="col-12 md:col-4 md:mb-4 mb-0 px-3">
                    <span
                        className="p-3 shadow-2 mb-3 inline-block hover:scale-110 surface-card"
                        style={{ borderRadius: "10px" }}
                    >
                        <i className="pi pi-info-circle text-4xl text-primary"></i>
                    </span>
                    <div className="text-900 text-xl mb-3 font-medium">
                        Travel Information
                    </div>
                    <span className="text-700 line-height-3">
                        Get all the necessary information for a safe and
                        enjoyable trip.
                    </span>
                </div>
            </div>
        </div>
    );
}
