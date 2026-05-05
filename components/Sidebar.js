"use client";

import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BsBoxArrowRight, BsHeartFill } from "react-icons/bs";
import { useRouter, usePathname } from "next/navigation";
import ProgressCircle from "./Profileprogress";
import { apiService } from "@/app/api/endpoints";

const Sidebar = ({ isOpen = true, onClose }) => {
    const router = useRouter();
    const pathname = usePathname();

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.id) {
            apiService.getUserById(storedUser.id)
                .then((res) => setUser(res.data))
                .catch((err) => console.error(err));
        }
    }, []);

    const menuItems = [
        { id: 1, name: "Dashboard", icon: "/assets/icons/dashboard.svg", path: "/dashboard" },
        { id: 2, name: "Booking", icon: "/assets/icons/booking.svg", path: "/booking" },
        { id: 3, name: "Guest", icon: "/assets/icons/Guest.svg", path: "/guest" },
        { id: 4, name: "Staff", icon: "/assets/icons/Concerege.svg", path: "/staff" },
        { id: 5, name: "Rooms", icon: "/assets/icons/Rooms.svg", path: "/rooms" },
        { id: 6, name: "Settings", icon: "/assets/icons/Setting.svg", path: "/settings" },
    ];

    return (
        <>
            {onClose && isOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
                    style={{ opacity: 0.4, zIndex: 1040 }}
                    onClick={onClose}
                />
            )}

            <div
                className={`bg-white px-3 py-2 position-fixed top-0 start-0 h-100 overflow-auto
                ${onClose ? (isOpen ? "d-block" : "d-none") : ""}`}
                style={{ zIndex: 1050, width: "250px" }}
            >
                {/* LOGO */}
                <div className="d-flex align-items-center gap-2 mb-3">
                    <img src="/assets/icons/Logo.svg" width={28} />
                    <img src="/assets/icons/kmarlogo.png" height={18} />
                </div>

                {/* PROFILE */}
                <ProgressCircle progress={100} size={42} image={user?.image || "/assets/images/profile.jpg"} />

                <div className="mt-2">
                    <p className="fw-bold mb-0" style={{ fontSize: "15px" }}>
                        {user?.Name || "Alex Geovanny"}
                    </p>
                    <p className="text-secondary mb-0" style={{ fontSize: "13px" }}>
                        {user?.emailid || "alexgeov@mail.com"}
                    </p>
                </div>

                {/* MENU */}
                <ul className="nav flex-column gap-1 mt-3">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => {
                                        router.push(item.path);
                                        onClose && onClose();
                                    }}
                                    className={`nav-link d-flex align-items-center fs-4 gap-2 w-100 border-0 text-start px-2 py-1 rounded
                                    ${isActive ? "bg-primary text-danger" : "text-secondary"}`}
                                    style={{ fontSize: "14px" }}
                                >
                                    <img
                                        src={item.icon}
                                        width={20}
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

                    <li>
                        <Button
                            className="w-100 mt-2 py-1"
                            variant="outline-danger"
                            style={{ fontSize: "13px" }}
                            onClick={() => {
                                localStorage.removeItem("token");
                                document.cookie = "token=; path=/; max-age=0";
                                router.push("/signin");
                            }}
                        >
                            <BsBoxArrowRight className="me-1 text-danger" />
                            Sign Out
                        </Button>
                    </li>
                </ul>

                {/* FOOTER */}
                <div className="mt-4 text-center">
                    <p className="fw-bold mb-1" style={{ fontSize: "12px" }}>
                        Kamr Hotel Admin Dashboard
                    </p>
                    <p className="text-secondary mb-0" style={{ fontSize: "10px" }}>
                        © 2021 All Rights Reserved
                    </p>
                    <p className="text-secondary" style={{ fontSize: "10px" }}>
                        Made with <BsHeartFill className="text-danger" /> by Peterdraw
                    </p>
                </div>
            </div>
        </>
    );
};

export default Sidebar;