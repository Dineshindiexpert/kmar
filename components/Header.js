'use client';
import { useState } from 'react';
import { Search, Calendar, ChevronDown } from 'lucide-react';
import { Badge, Form } from 'react-bootstrap';
import { usePathname } from 'next/navigation';

const DashboardHeader = () => {
    const [date, setDate] = useState(new Date());
    const pathname = usePathname();

    const getTitle = () => {
        if (pathname === "/dashboard") return "Dashboard";
        if (pathname.startsWith("/rooms/")) return "Room Details";
        if (pathname.startsWith("/guest/")) return "Guest Details";
        if (pathname === "/rooms") return "Rooms";
        if (pathname === "/guest") return "Guest";
        if (pathname === "/staff") return "Staff";
        if (pathname === "/booking") return "Bookings";
        if (pathname === "/client") return "client list";
        return "Dashboard";
    };

    const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <header className="navbar bg-light py-3 px-3 px-md-4 d-flex justify-content-between align-items-center">
            
            {/* LEFT: Title Section */}
            <div className="flex-grow-1">
                <h2 className="fw-bold fs-2 fs-md-3 mb-0">{getTitle()}</h2>
                <p className=" fs-5 text-muted d-none d-lg-block">
                    Welcome to Kanri Modern Hotel Admin Dashboard
                </p>
            </div>

            {/* RIGHT: Actions Section */}
            <div className="d-flex align-items-center gap-2 gap-md-3">
                
                {/* Icons - for the mobiles also  */}
                <div className="d-flex gap-2 gap-md-3 text-secondary align-items-center me-3">
                    <div className="p-2 hover-bg-light cursor-pointer">
                        <Search size={30} />
                    </div>

                    <div className="position-relative p-2">
                        <img src="./assets/icons/notification.svg" width={30} alt="notif" />
                        <Badge
                            bg="danger"
                            className="position-absolute top-0 start-100 translate-middle rounded-circle"
                            style={{ fontSize: '15px' }}
                        >
                            1
                        </Badge>
                    </div>

                    <div className="position-relative p-2 d-none d-sm-block me-4">
                        <img src="./assets/icons/Email.svg" width={30} alt="email" />
                        <Badge
                            bg="danger"
                            className="position-absolute top-0 start-100 translate-middle rounded-circle "
                            style={{ fontSize: '15px' }}
                        >
                            1
                        </Badge>
                    </div>
                </div>

                {/* Date Picker - Mobile friendly height */}
                <div className="position-relative d-none d-md-block p-2 py-4">
                    <input
                        type="date"
                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                        onChange={(e) => setDate(new Date(e.target.value))}
                        style={{ zIndex: 2 }}
                    />
                    <div className="d-flex align-items-center gap-2 border rounded px-2 py-2 fs-3 bg-white">
                        <Calendar size={20} className="text-danger" />
                        <span className="small d-none d-sm-inline">{formattedDate}</span>
                        <ChevronDown size={15} />
                    </div>
                </div>

                {/* Language - Fixed width to prevent jumping */}
                <Form.Select 
                    size="lg" 
                    className="border-0  border-secondary bg-transparent fw-semibold"
                    style={{ width: "auto", minWidth: "65px", cursor: "pointer" }}
                >
                    <option>EN</option>
                    <option>HI</option>
                    <option>PU</option>
                </Form.Select>

            </div>
        </header>
    );
};

export default DashboardHeader;
