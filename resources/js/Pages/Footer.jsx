import React from "react";
import "./Footer.css";
import { Tag } from "primereact/tag";
const Footer = () => {
    return (
        <div className=" mx-auto bg-black p-8">
            <h2 className="text-white mb-5">About us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Person - </div>Najibullah Jafari */}
                <div className="">
                    <img
                        src="najib.jpeg"
                        alt="Najib Image"
                        className="rounded-full w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0"
                    />
                    <div className="text-center md:text-left">
                        <h4 className="text-white text-lg md:text-xl font-bold mb-2">
                            Najibullah Jafari
                        </h4>
                        <p className="text-gray-300">
                            Najibullah is born in Bamyan, Afghanistan. Now he
                            lives in Kabul. He dreamt of becoming a developer
                            since childhood and worked hard to achieve his goal.
                            Now he is a full-stack web developer.
                        </p>
                    </div>
                </div>

                {/* Second Person - M Bassir Payenda */}
                <div className="">
                    <img
                        src="bassir.jpeg"
                        alt="Bassir Image"
                        className="rounded-full w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0"
                    />
                    <div className="text-center md:text-left">
                        <h4 className="text-white text-lg md:text-xl font-bold mb-2">
                            M Bassir Payenda
                        </h4>
                        <p className="text-gray-300">
                            M Bassir is born in Ghor, Afghanistan. He finished
                            school in Ghor province and then attended Kabul
                            University as a computer science student. He is
                            currently studying there.
                        </p>
                    </div>
                </div>

                {/* Communication Links */}
                <div className="mt-8">
                    <h2 className="text-white">Contact us</h2>
                    <div className="mb-2">
                        <a
                            href="mailto:najib2020202020@gmail.com"
                            className="flex items-center text-white"
                        >
                            <Tag icon="pi pi-envelope" className="mr-2"></Tag>
                            <span>afghanportal@gmail.af</span>
                        </a>
                    </div>
                    <div className="mb-2">
                        <a
                            href="https://api.whatsapp.com/send?phone=93798573634"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-white"
                        >
                            <Tag icon="pi pi-whatsapp" className="mr-2"></Tag>
                            <span>(+93)798573634</span>
                        </a>
                    </div>
                    <div className="mb-2">
                        <a
                            href="https://www.facebook.com/AfghanTourismPortal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-white"
                        >
                            <Tag icon="pi pi-facebook" className="mr-2"></Tag>
                            <span>Afghan Tourism Portal</span>
                        </a>
                    </div>
                    <div>
                        <a
                            href="https://www.instagram.com/AfghanTourismPortal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-white"
                        >
                            <Tag icon="pi pi-instagram" className="mr-2"></Tag>
                            <span>Afghan Tourism Portal</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
