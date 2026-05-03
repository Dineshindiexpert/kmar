"use client";

import { useState, useEffect } from "react";
import { BsBoxArrowRight, BsHeartFill } from "react-icons/bs";
import { useRouter, usePathname } from "next/navigation";
import ProgressCircle from "./Profileprogress";
import { Button } from "react-bootstrap";
import { apiService } from "@/app/api/endpoints";

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

    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // 1. check localStorage first
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }

                // 2. fetch fresh user from API
                const userId = localStorage.getItem("userId");

                if (userId) {
                    const res = await apiService.getUserById(userId);

                    setUser(res.data);

                    // 3. update cache
                    localStorage.setItem("user", JSON.stringify(res.data));
                }

            } catch (err) {
                console.error("Error fetching user:", err);
            }
        };

        fetchUser();
    }, []);
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
                className={`bg-white vh-100 px-4 p-3 position-fixed top-0 start-0 overflow-auto
                ${onClose ? (isOpen ? "d-block" : "d-none") : ""}`}
                style={{ zIndex: 1050, width: "280px" }}
            >

                {/* LOGO */}
                <div className="d-flex align-items-center gap-2 mb-4">
                    <img src="/assets/icons/Logo.svg" alt="logo" />
                    <img src="/assets/icons/kmarlogo.png" alt="logo" />
                </div>

                {/* PROFILE */}
                <ProgressCircle progress={100} size={160} image={user?.image || "/assets/images/profile.jpg"} />

                <div className="mt-3">
                    <p className="fs-4 fw-bold ms-3 mb-0">{user?.Name || "Alex Geovanny"}</p>
                    <p className="fs-6 text-secondary ms-3">{user?.emailid || "alexgeov@mail.com"}</p>
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
                    <li>
                        <Button
                            variant="link"
                            className="nav-link d-flex align-items-center gap-2 w-100 border-0 text-start p-2 rounded text-secondary"
                            onClick={() => {
                                // Clear token cookie
                                document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
                                // Clear localStorage
                                localStorage.removeItem("userId");
                                // Redirect to signin page
                                router.push("/signin");
                            }}
                        >
                            <BsBoxArrowRight className="text-danger" />

                            Logout
                        </Button>
                    </li>

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