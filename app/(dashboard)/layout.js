'use client'

import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { BsList } from "react-icons/bs";


const Layout = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <Container fluid>
            <Row>

                {/*  MOBILE TOP BAR */}
                <div className="d-md-none p-2 bg-white border-bottom d-flex justify-content-between align-items-center">
                    <h5 className="m-0 fs-1 align-item-center"><span><img src="./assets/icons/logo.svg" className="me-2" width={35} alt="profile pic" /></span>Kamrr</h5>

                    <BsList size={30} className="me-2" onClick={() => setShowSidebar(true)} />
                </div>



                {/*  DESKTOP SIDEBAR */}
                <Col
                    md={3}
                    lg={3}
                    xl={2}
                    className="d-none d-md-block p-0"
                >
                    <div className="bg-white border-end h-100 sidebar-desktop">
                        <Sidebar />
                    </div>
                </Col>

                {/* MOBILE SIDEBAR */}
                {showSidebar && (
                    <div className="d-flex mobile-sidebar show">
                        <Sidebar
                            isOpen={showSidebar}
                            onClose={() => setShowSidebar(false)}
                        />
                    </div>
                )}

                {/* MAIN CONTENT */}
                <Col
                    xs={12}
                    md={9}
                    lg={9}
                    xl={10}
                    className="py-3 ms-0 px-4 bg-light"
                >
                    <Header />
                    {children}
                </Col>

            </Row>
        </Container>
    );
};

export default Layout;