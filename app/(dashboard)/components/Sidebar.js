"use client";

import { useState, useEffect } from "react";
import { BsHeartFill } from "react-icons/bs";
import { useRouter, usePathname } from "next/navigation";
import ProgressCircle from "./Profileprogress";

const Sidebar = ({ isOpen = true, onClose }) => {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { id: 1, name: "Dashboard", icon: "/assets/icons/dashboard.svg", path: "/dashboard" },
        { id: 2, name: "Booking", icon: "/assets/icons/Booking.svg", path: "/booking" },
        { id: 3, name: "Guest", icon: "/assets/icons/Guest.svg", path: "/guest" },
        { id: 4, name: "Staff", icon: "/assets/icons/concerege.svg", path: "/staff" },
        { id: 5, name: "Rooms", icon: "/assets/icons/Rooms.svg", path: "/rooms" },
        { id: 6, name: "Settings", icon: "/assets/icons/Setting.svg", path: "/settings" },
    ];

    const handleClick = (item) => {
        router.push(item.path);

        if (onClose) onClose();
    };

    return (
        <>
            {/* Overlay */}
            {onClose && isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
                    style={{ opacity: 0.4, zIndex: 1040 }}
                    onClick={onClose}
                />
            )}

            <div
                className={`bg-white vh-100 px-4 p-3 position-fixed top-0 start-0  
                ${onClose ? (isOpen ? "d-block" : "d-none") : ""}`}
                style={{ zIndex: 1050, width: "300px" }}
            >

                {/* LOGO */}
                <div className="d-flex align-items-center gap-2 mb-4">
                    <img src="/assets/icons/Logo.svg" alt="logo" />
                    <img src="/assets/icons/kmarlogo.png" alt="logo" />
                </div>

                {/* PROFILE */}
                <ProgressCircle progress={100} size={160} image="/assets/images/profile.jpg" />

                <div className="mt-3">
                    <p className="fs-4 fw-bold ms-3 mb-0">Alex Geovanny</p>
                    <p className="fs-6 text-secondary ms-3">alexgeov@mail.com</p>
                </div>

                {/* MENU */}
                <ul className="nav flex-column gap-2 fs-3 mt-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleClick(item)}
                                    className={`nav-link d-flex align-items-center gap-2 w-100 border-0 text-start p-2 rounded
                                    ${isActive ? "bg-primary text-danger" : "text-secondary"}`}
                                >
                                    <img
                                        src={item.icon}
                                        width={24}
                                        style={{
                                            filter: isActive
                                                ? "brightness(0) saturate(100%) invert(34%) sepia(80%) saturate(2000%) hue-rotate(330deg)"
                                                : "grayscale(1)"
                                        }}
                                    />
                                    {item.name}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* FOOTER */}
                <div className="mt-5 text-center">
                    <p className="fw-bold" style={{ fontSize: "14px" }}>
                        Kamr Hotel Admin Dashboard
                    </p>

                    <p className="text-secondary mb-1" style={{ fontSize: "12px" }}>
                        © 2021 All Rights Reserved
                    </p>

                    <p className="text-secondary" style={{ fontSize: "12px" }}>
                        Made with <BsHeartFill className="text-danger" /> by Peterdraw
                    </p>
                </div>

            </div>
        </>
    );
};

export default Sidebar;