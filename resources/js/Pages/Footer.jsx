import React from "react";
import "./Footer.css";
import { Tag } from "primereact/tag";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between items-center">
                <div className="container mx-auto px-4 mt-8 w-1/3">
                    <img
                        src="najib.jpeg"
                        alt="Najib Image"
                        className="rounded-full w-24 h-24 md:w-32 md:h-32 mr-4"
                    />
                    <div>
                        <h4 className="text-white md:text-xl font-bold mb-2  ">
                            Najibullah Jafari
                        </h4>
                        <p className="text-gray-300 text-sm md:text-base">
                            Najibullah is born in Bamyan, Afghanistan. Now he
                            lives in Kabul. He dreamt of becoming a developer
                            since childhood and worked hard to achieve his goal.
                            Now he is a full-stack web developer.
                        </p>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-8 w-1/3">
                    <img
                        src="bassir.jpeg"
                        alt="Bassir Image"
                        className="rounded-full w-24 h-24 md:w-32 md:h-32 mr-4"
                    />
                    <div>
                        <h4 className="text-white md:text-xl font-bold mb-2">
                            M Bassir Payenda
                        </h4>
                        <p className="text-gray-300 text-sm md:text-base">
                            M Bassir is born in Ghor, Afghanistan. He finished
                            school in Ghor province and then attended Kabul
                            University as a computer science student. He is
                            currently studying there.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 mt-8 w-1/3">
                    <h2 className="text-white mb-4 text-lg md:text-xl">
                        Contact us
                    </h2>
                    <div className="mb-2">
                        <a
                            href="mailto:afghanportal@gmail.af"
                            className="flex items-center text-white"
                        >
                            <i className="pi pi-envelope mr-2"></i>
                            <span className="text-sm md:text-base">
                                afghanportal@gmail.af
                            </span>
                        </a>
                    </div>
                    <div className="mb-2">
                        <a
                            href="https://api.whatsapp.com/send?phone=93798573634"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-white"
                        >
                            <i className="pi pi-whatsapp mr-2"></i>
                            <span className="text-sm md:text-base">
                                (+93)798573634
                            </span>
                        </a>
                    </div>
                    <div className="mb-2">
                        <a
                            href="https://www.facebook.com/AfghanTourismPortal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-white"
                        >
                            <i className="pi pi-facebook mr-2"></i>
                            <span className="text-sm md:text-base">
                                Afghan Tourism Portal
                            </span>
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://www.instagram.com/AfghanTourismPortal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-white"
                        >
                            <i className="pi pi-instagram mr-2"></i>
                            <span className="text-sm md:text-base">
                                Afghan Tourism Portal
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
