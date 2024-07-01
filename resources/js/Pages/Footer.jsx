import React from "react";
import "./Footer.css";
import { Tag } from "primereact/tag";
const Footer = () => {
    return (
        <div className="contianer bg-black  w-full">
            <div className="about-us">
                <img
                    src="najib.jpeg"
                    alt="Najib Image"
                    className="rounded-full"
                />
                <div>
                    <h4>Najibullah Jafari</h4>
                    <p>
                        Najibullah is born at Bamyan Afghanistan. Now he lives
                        in Kabul. As he wanted to developer when he was child.
                        He tried hard in order to get his goal. Now he is a full
                        stack web developer.
                    </p>
                </div>
            </div>
            <div className="about-us">
                <img
                    src="bassir.jpeg"
                    alt="Bassir Image"
                    className="rounded-full"
                />
                <div>
                    <h4>M Bassir Payenda</h4>
                    <p>
                        M Bassir is born at Ghor Afghanistan. He finished school
                        at Ghor province. Then he attend at the Kabul university
                        as one of computer science student. Now he is studying
                        there.
                    </p>
                </div>
            </div>
            <div className="communication">
                <div>
                    <a>
                        <Tag icon="pi pi-envelope"></Tag>
                        <span>afghanportal@gmail.af</span>
                    </a>
                </div>
                <div>
                    <a>
                        <Tag icon="pi pi-whatsapp"></Tag>
                        <span>(+93)798573634</span>
                    </a>
                </div>
                <div>
                    <a>
                        <Tag icon="pi pi-facebook"></Tag>
                        <span>Afghan Tourism Portal</span>
                    </a>
                </div>
                <div>
                    <a>
                        <Tag icon="pi pi-instagram"></Tag>
                        <span>Afghan Tourism Portal</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
