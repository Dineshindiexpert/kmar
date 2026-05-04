"use client";

import React, { useState } from "react";
import { Users, Key, ArrowUpDown } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid
} from 'recharts';


import styles from '../../../css/dashboard.module.css';

import { RoomsData } from '@/data/RoomData';
import { GuestListData } from '@/data/GuestListData';
import { ReviewData } from '@/data/RiviewData';

const guestActivityData = [
  { name: 'Sunday', checkIn: 100, checkOut: 140 },
  { name: 'Monday', checkIn: 180, checkOut: 140 },
  { name: 'Tuesday', checkIn: 140, checkOut: 80 },
  { name: 'Wednesday', checkIn: 260, checkOut: 120 },
  { name: 'Thursday', checkIn: 100, checkOut: 220 },
  { name: 'Friday', checkIn: 150, checkOut: 180 },
  { name: 'Saturday', checkIn: 90, checkOut: 280 },
];

const roomsAvailabilityData = [
  { name: 'Available', value: 66, color: '#22C55E' },
  { name: 'Sold Out', value: 129, color: '#FFD66B' },
];

export default function KamrDashboardFinal() {
  const [showAllGuests, setShowAllGuests] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeReview, setActiveReview] = useState(ReviewData[0] || {});

  const displayRooms = Array.isArray(RoomsData) ? RoomsData.slice(0, 5) : [];

  return (
    <div className={`container-fluid py-4 ${styles.mainContainer}`}>

      <div className="card border-0 shadow-sm rounded-4 mb-5 overflow-hidden">
        <div className="row g-0 align-items-center py-4">
          <div className={`col-lg-5 col-md-12 d-flex align-items-center px-4 position-relative ${styles.borderEndLg}`}>
            <div className={`me-3 ${styles.iconBox}`}>
              <ArrowUpDown size={20} />
            </div>
            <div className="me-4">
              <h3 className={`fw-bold mb-0 ${styles.incomeValue}`}>$45,945</h3>
              <p className={`text-muted mb-0 ${styles.textSmall}`}>Total incomes</p>
            </div>
            <div className="ms-auto d-flex align-items-center">
              <svg width="70" height="30" viewBox="0 0 70 30" className="me-2">
                <path d="M5 25 L15 15 L25 20 L40 5 L55 18 L65 8" fill="none" stroke="#00B69B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-end">
                <span className={`text-success fw-bold d-block ${styles.percentText}`}>+2.4%</span>
                <span className={`text-muted d-block ${styles.subText}`}>Than last week</span>
              </div>
            </div>
          </div>

          <div className={`col-lg-3 col-md-6 d-flex align-items-center justify-content-between px-4 position-relative mt-3 mt-lg-0 ${styles.borderEndLg}`}>
            <div>
              <h3 className={`fw-bold mb-0 ${styles.incomeValue}`}>845</h3>
              <p className={`text-muted mb-0 ${styles.textSmall}`}>New Guest</p>
            </div>
            <div className={styles.iconBox}>
              <Users size={20} />
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-between px-4 mt-3 mt-lg-0">
            <div>
              <h3 className={`fw-bold mb-0 ${styles.incomeValue}`}>195</h3>
              <p className={`text-muted mb-0 ${styles.textSmall}`}>Rooms</p>
            </div>
            <div className={styles.iconBox}>
              <Key size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Popular Rooms Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 px-2">
        <h5 className={`fw-bold mb-0 ${styles.popularRoomTitle}`}>Popular Rooms</h5>
        <div className="d-flex gap-1 align-items-center">
          <div className={`rounded-pill ${styles.indicatorOrange}`}></div>
          <div className={`rounded-pill ${styles.indicatorGrey1}`}></div>
          <div className={`rounded-pill ${styles.indicatorGrey2}`}></div>
        </div>
      </div>

      <div className="row g-3 align-items-center px-2 mb-5">
        {displayRooms.map((room, index) => {
          const img = room?.image || room?.img || "/images/room-placeholder.jpg";
          return (
            <div key={index} className={styles.colCustom}>
              <div
                className={`card border-0 rounded-4 shadow-sm text-white position-relative overflow-hidden ${styles.roomCard}`}
                style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.9) 100%), url(${img})` }}
              >
                <div className="position-absolute bottom-0 p-3 w-100">
                  <span className={`badge rounded-2 px-2 py-1 mb-2 ${room?.status?.toUpperCase() === "AVAILABLE" ? "bg-success" : "bg-danger"} ${styles.roomBadge}`}>
                    {room?.status || "UNKNOWN"}
                  </span>
                  <h6 className={`fw-bold mb-1 ${styles.roomName}`}>{room?.name || "Room"}</h6>
                  <p className={`mb-0 opacity-75 ${styles.roomType}`}>{room?.type || "Standard"}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="row g-4 px-2 mb-5">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Guest Activity</h5>
              <div className="btn-group btn-group-sm bg-light rounded-pill p-1">
                <button className="btn btn-transparent text-muted px-3 border-0">Month</button>
                <button className="btn btn-white shadow-sm rounded-pill px-3 fw-bold border-0 bg-white">Weekly</button>
                <button className="btn btn-transparent text-muted px-3 border-0">Day</button>
              </div>
            </div>
            <div className={`d-flex gap-4 mb-4 ${styles.activityLegend}`}>
              <span><span className={styles.dot} style={{ backgroundColor: '#0061D1' }}></span> <b className="me-1">245 Guest</b> Check In</span>
              <span><span className={styles.dot} style={{ backgroundColor: '#FF4D4D' }}></span> <b className="me-1">157 Guest</b> Check Out</span>
            </div>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <AreaChart data={guestActivityData}>
                  <defs>
                    <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0061D1" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#0061D1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF4D4D" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#FF4D4D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="checkIn" stroke="#0061D1" strokeWidth={3} fill="url(#colorIn)" />
                  <Area type="monotone" dataKey="checkOut" stroke="#FF4D4D" strokeWidth={3} fill="url(#colorOut)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h5 className="fw-bold mb-4">Rooms Availability</h5>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={roomsAvailabilityData} innerRadius={45} outerRadius={80} dataKey="value" stroke="none">
                    {roomsAvailabilityData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small"><span className={styles.dot} style={{ backgroundColor: '#22C55E' }}></span> Available</span>
                <span className="fw-bold">66 Rooms</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small"><span className={styles.dot} style={{ backgroundColor: '#FFD66B' }}></span> Sold Out</span>
                <span className="fw-bold">129 Rooms</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-12">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
            <h6 className={`text-muted mb-1 ${styles.visitorTitle}`}>Visitor</h6>
            <h2 className={`fw-bold mb-4 ${styles.visitorCount}`}>12,456</h2>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Week 01', bottom: 400, top: 120 },
                    { name: 'Week 02', bottom: 650, top: 220 },
                    { name: 'Week 03', bottom: 350, top: 180 },
                  ]}
                  margin={{ top: 0, right: 0, left: -15, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} stroke="#F8F8F8" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#A0A0A0' }} dy={10} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#A0A0A0' }} 
                    domain={[0, 1000]} 
                    ticks={[0, 200, 400, 600, 800, 1000]}
                    tickFormatter={(value) => {
                        const labels = {0: '8am', 200: '10am', 400: '12pm', 600: '2pm', 800: '4pm', 1000: '6pm'};
                        return labels[value] || value;
                    }}
                  />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="bottom" stackId="a" barSize={32} radius={[0, 0, 12, 12]}>
                    <Cell fill="#E1F0FF" />
                    <Cell fill="#0061D1" />
                    <Cell fill="#E1F0FF" />
                  </Bar>
                  <Bar dataKey="top" stackId="a" barSize={32} radius={[12, 12, 0, 0]}>
                    <Cell fill="#FFF4E5" />
                    <Cell fill="#FFD66B" />
                    <Cell fill="#FFF4E5" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 px-2 pb-4">
        {/* Guest List */}
        <div className="col-lg-4 col-md-12">
          <div className="card border-0 shadow-sm rounded-5 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Guest List</h5>
              <button 
                onClick={() => setShowAllGuests(!showAllGuests)}
                className={`btn border-0 rounded-3 px-3 py-1 ${styles.guestMoreBtn}`}
              >
                {showAllGuests ? "Less" : "More"}
              </button>
            </div>
            
            <div className={`d-flex flex-column gap-4 ${showAllGuests ? styles.scrollContainer : ''}`}>
              {(showAllGuests ? GuestListData : GuestListData.slice(0, 5)).map((guest, i) => (
                <div key={i} className="d-flex align-items-center">
                  <img 
                    src={guest.image || "https://via.placeholder.com/48"} 
                    alt={guest.name}
                    className={`rounded-circle me-3 ${styles.guestImg}`} 
                  />
                  <div>
                    <h6 className={`mb-0 fw-bold ${styles.guestName}`}>{guest.name}</h6>
                    <small className={styles.guestId}>{guest.id}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="col-lg-8 col-md-12">
          <div className="card border-0 shadow-sm rounded-5 p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <h5 className="fw-bold mb-0">Customer Reviews</h5>
              <div className="d-flex gap-2">
                <select className={`form-select form-select-sm border-0 bg-light rounded-3 px-3 ${styles.reviewSelect}`}>
                  <option>Sort by Newest</option>
                </select>
                <button 
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className={`btn border-0 rounded-3 px-3 py-1 ${styles.reviewMoreBtn}`}
                >
                  {showAllReviews ? "View less" : "View more"}
                </button>
              </div>
            </div>

            <div className="row g-0">
              <div className={`col-md-4 border-end pe-md-3 ${styles.scrollContainer}`}>
                <div className="d-flex flex-column gap-3">
                  {(showAllReviews ? ReviewData : ReviewData.slice(0, 5)).map((rev, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveReview(rev)}
                      className={`d-flex align-items-center p-2 rounded-4 ${activeReview.name === rev.name ? 'bg-light' : ''}`} 
                      style={{ cursor: 'pointer', transition: '0.3s' }}
                    >
                      <img 
                        src={rev.image || "https://via.placeholder.com/42"} 
                        alt={rev.name}
                        className={`rounded-circle me-2 ${styles.reviewImg}`} 
                      />
                      <div className="overflow-hidden">
                        <h6 className={`mb-0 fw-bold text-truncate ${styles.reviewName}`}>{rev.name}</h6>
                        <small className={`text-muted ${styles.reviewTime}`}>{rev.time || "Just now"}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-8 ps-md-4 mt-4 mt-md-0 d-flex flex-column">
                <h6 className={`fw-bold mb-1 ${styles.activeReviewTitle}`}>{activeReview.title || "I love that room service"}</h6>
                <div className="mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < (activeReview.rating || 4) ? styles.starActive : styles.starInActive}>★</span>
                  ))}
                </div>
                <p className={`text-muted ${styles.reviewComment}`}>
                  {activeReview.comment || "We were totally refreshed and rejuvenated..."}
                </p>
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {(activeReview.tags || ["Great Service", "Recommended", "Best Price"]).map((tag, idx) => (
                    <span key={idx} className={`badge border-0 rounded-3 bg-light text-muted px-3 py-2 fw-normal ${styles.reviewTag}`}>{tag}</span>
                  ))}
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top flex-wrap gap-3">
                  <div className="d-flex align-items-center">
                    <img src={activeReview.image || "https://via.placeholder.com/40"} className={`rounded-circle me-2 ${styles.reviewImg}`} alt="user" />
                    <div>
                      <h6 className={`mb-0 fw-bold ${styles.reviewName}`}>{activeReview.name || "User Name"}</h6>
                      <small className={`text-muted ${styles.reviewTime}`}>{activeReview.time || "Recently"}</small>
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button className={`btn btn-success btn-sm rounded-3 px-3 d-flex align-items-center gap-1 ${styles.actionBtnText}`}>
                        Accept <span className="rounded-circle bg-white text-success d-flex align-items-center justify-content-center" style={{width: '12px', height: '12px', fontSize: '9px'}}>✓</span>
                    </button>
                    <button className={`btn btn-danger btn-sm rounded-3 px-3 d-flex align-items-center gap-1 ${styles.actionBtnText}`}>
                        Reject <span className="rounded-circle bg-white text-danger d-flex align-items-center justify-content-center" style={{width: '12px', height: '12px', fontSize: '9px'}}>✕</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}