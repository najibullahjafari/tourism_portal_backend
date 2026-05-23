import { usePage } from "@inertiajs/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useMemo, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Content.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Vission from "./Vission";
import Book from "./Booking/Book";

const Hotel = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [visible, setVisible] = useState(false);
    const [bookingVisible, setBookingVisible] = useState(false);
    const { data = [] } = usePage().props;

    const imageList = (photoAddress) =>
        (photoAddress ?? "")
            .split(",")
            .map((image) => image.trim())
            .filter(Boolean);

    const handleDialogOpen = (hotel) => {
        setSelectedHotel(hotel);
        setVisible(true);
    };

    const handleDialogClose = () => {
        setVisible(false);
        setSelectedHotel(null);
    };

    const handleBookingOpen = (hotel) => {
        setSelectedHotel(hotel);
        setBookingVisible(true);
    };

    const handleBookingClose = () => {
        setBookingVisible(false);
        setSelectedHotel(null);
    };

    const filteredData = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return data;
        }

        return data.filter((item) =>
            `${item.name} ${item.province} ${item.address}`
                .toLowerCase()
                .includes(query)
        );
    }, [data, searchQuery]);

    const featuredHotel = filteredData[0] ?? data[0];

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <Navbar />

            <section className="relative overflow-hidden bg-slate-950 text-white">
                <div className="absolute inset-0">
                    <img
                        src={featuredHotel?.photoAddress || "/r1.jpg"}
                        alt=""
                        className="h-full w-full object-cover opacity-30"
                    />
                </div>
                <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-28">
                    <div className="space-y-6">
                        <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                            Book stays faster with fewer clicks
                        </span>
                        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                            Find a hotel that fits your trip, budget, and
                            schedule.
                        </h1>
                        <p className="max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                            Compare rooms, preview photos instantly, and book in
                            just a few steps.
                        </p>

                        <form
                            onSubmit={handleSearchSubmit}
                            className="grid gap-3 rounded-3xl bg-white/10 p-3 backdrop-blur sm:grid-cols-[1fr_auto]"
                        >
                            <input
                                type="search"
                                placeholder="Search by hotel name, province, or address"
                                className="rounded-2xl border-0 bg-white px-4 py-3 text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button
                                type="submit"
                                icon="pi pi-search"
                                label="Search"
                                className="justify-center rounded-2xl bg-emerald-500 px-5 py-3 font-semibold text-white"
                            />
                        </form>

                        <div className="flex flex-wrap gap-3 text-sm text-slate-200">
                            <span className="rounded-full bg-white/10 px-4 py-2">
                                {data.length} hotels available
                            </span>
                            <span className="rounded-full bg-white/10 px-4 py-2">
                                {filteredData.length} matching results
                            </span>
                            <span className="rounded-full bg-white/10 px-4 py-2">
                                Fast booking • instant details
                            </span>
                        </div>
                    </div>

                    {featuredHotel && (
                        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-black/20">
                            <img
                                src={featuredHotel.photoAddress}
                                alt={featuredHotel.name}
                                className="h-96 w-full object-cover"
                                loading="eager"
                                decoding="async"
                            />
                            <div className="space-y-4 p-6 text-slate-900">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
                                        Featured hotel
                                    </p>
                                    <h2 className="mt-2 text-2xl font-bold">
                                        {featuredHotel.name}
                                    </h2>
                                    <p className="mt-1 text-slate-600">
                                        {featuredHotel.province} •{" "}
                                        {featuredHotel.address}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        label="See details"
                                        icon="pi pi-eye"
                                        onClick={() =>
                                            handleDialogOpen(featuredHotel)
                                        }
                                        className="rounded-xl border-0 bg-slate-900 px-4 py-3 font-semibold text-white"
                                    />
                                    <Button
                                        label="Book now"
                                        icon="pi pi-calendar"
                                        onClick={() =>
                                            handleBookingOpen(featuredHotel)
                                        }
                                        className="rounded-xl border-0 bg-emerald-500 px-4 py-3 font-semibold text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Browse hotels
                        </h2>
                        <p className="mt-1 text-slate-600">
                            Smooth cards, lighter images, and faster page loads.
                        </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                        {filteredData.length} results
                    </span>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredData.map((item) => {
                        const images = imageList(item.photoAddress);
                        const coverImage = images[0] ?? item.photoAddress;

                        return (
                            <article
                                key={item.id}
                                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative">
                                    <img
                                        src={coverImage}
                                        alt={item.name}
                                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 to-transparent p-4 text-white">
                                        <div className="flex items-center justify-between gap-2">
                                            <div>
                                                <h3 className="text-xl font-semibold">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-slate-200">
                                                    {item.province}
                                                </p>
                                            </div>
                                            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                                                {images.length || 1} photo
                                                {images.length === 1 ? "" : "s"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 p-5">
                                    <p className="text-sm leading-6 text-slate-600">
                                        {item.address}
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <Button
                                            label="Details"
                                            icon="pi pi-eye"
                                            onClick={() =>
                                                handleDialogOpen(item)
                                            }
                                            className="rounded-xl border-0 bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
                                        />
                                        <Button
                                            label="Book"
                                            icon="pi pi-calendar"
                                            onClick={() =>
                                                handleBookingOpen(item)
                                            }
                                            className="rounded-xl border-0 bg-emerald-500 px-4 py-3 text-sm font-semibold text-white"
                                        />
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>

            {selectedHotel && (
                <Dialog
                    header="Hotel Details"
                    visible={visible}
                    style={{ width: "min(90vw, 56rem)" }}
                    modal
                    onHide={handleDialogClose}
                >
                    <div className="hotel-details">
                        <Carousel
                            showThumbs={false}
                            infiniteLoop
                            useKeyboardArrows
                        >
                            {imageList(selectedHotel.photoAddress).map(
                                (image, index) => (
                                    <div key={index}>
                                        <img
                                            src={image}
                                            alt={`Image ${index + 1}`}
                                            className="hotel_image w-full h-96 object-cover rounded mb-4"
                                        />
                                    </div>
                                )
                            )}
                        </Carousel>
                        <h3 className="text-lg font-bold mb-2">
                            Name: {selectedHotel.name}
                        </h3>
                        <p className="mb-4">Address: {selectedHotel.address}</p>
                        <p className="mb-4">
                            Province: {selectedHotel.province}
                        </p>
                        <p className="mb-4">Phone: 0793647446</p>
                        <div className="flex flex-row justify-between">
                            <Button
                                label="Book"
                                className="p-button-success"
                                onClick={() => handleBookingOpen(selectedHotel)}
                            />
                            <a
                                className="justify-center align-middle"
                                href={`skype:$'{0793647446}?call`}
                            >
                                <i
                                    style={{ fontSize: "2rem" }}
                                    className="pi pi-phone p-2 "
                                />
                            </a>
                        </div>
                    </div>
                </Dialog>
            )}

            {selectedHotel && (
                <Dialog
                    header={`Book ${selectedHotel.name}`}
                    visible={bookingVisible}
                    style={{ width: "min(92vw, 42rem)" }}
                    modal
                    onHide={handleBookingClose}
                >
                    <Book
                        id={selectedHotel.id}
                        objType="hotel"
                        title={selectedHotel.name}
                        subtitle={selectedHotel.province}
                        onSuccess={handleBookingClose}
                    />
                </Dialog>
            )}

            <Vission />
            <Footer />
        </>
    );
};

export default Hotel;
