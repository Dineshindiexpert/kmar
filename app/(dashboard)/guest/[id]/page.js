"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { GuestListData } from "@/data/GuestListData";
import { Search, Bell, Mail, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function GuestDetails() {
  const params = useParams();
  
  const guest = GuestListData.find(g => g.roomid.replace('#', '') === params.id);

  if (!guest) return <div className="p-5 text-center fw-bold">Guest data not found!</div>;

  return (
    
    <div className="w-100 min-vh-100 d-flex flex-column" style={{ backgroundColor: "#F7F8FA", padding: "calc(15px + 1vw)" }}>
      
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4 mb-md-5">
        <div>
          <h1 className="fw-bold h2 mb-1" style={{ fontSize: 'calc(20px + 0.5vw)' }}>Guest Details</h1>
        </div>
      </div>

     
      <div className="row g-4">
        
        
        <div className="col-lg-5 order-2 order-lg-1">
          {/* Profile Card */}
          <div className="card border-0 shadow-sm p-3 p-md-4 mb-4" style={{ borderRadius: "24px" }}>
            <div className="d-flex align-items-center gap-3 gap-md-4">
              <img src={guest.image} className="rounded-circle border flex-shrink-0" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
              <div>
                <h4 className="fw-bold mb-1" style={{ fontSize: '18px' }}>{guest.name}</h4>
                <p className="text-muted mb-0 small">{guest.roomid}</p>
              </div>
            </div>
          </div>

          {/* Room Details Card */}
          <div className="card border-0 shadow-sm p-3 p-md-4" style={{ borderRadius: "24px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-bold h5 mb-0">Marcella Court</h3>
              <span className={`badge rounded-pill px-3 py-2 ${guest.status === 'BOOKED' ? 'bg-success' : 'bg-danger'}`} style={{ fontSize: '10px' }}>
                {guest.status}
              </span>
            </div>
            
            <div className="row mb-4">
              <div className="col-6 mb-2 text-muted small">Type</div>
              <div className="col-6 mb-2 text-muted small">Room Capacity</div>
              <div className="col-6 fw-bold small">🛏️ {guest.roomType}</div>
              <div className="col-6 fw-bold small">👥 2-4 Person</div>
            </div>

            <div className="mb-4 text-muted small">
                Check In: <span className="fw-bold text-dark ms-2">{guest.checkIn}</span>
            </div>

            <p className="text-muted small mb-3">Facilities</p>
            <div className="row g-2 mb-4">
              {["Full AC", "LED TV", "Shower", "Bathup"].map(f => (
                <div key={f} className="col-6 small fw-bold" style={{ fontSize: '12px' }}>
                  <span className="text-success me-2">✔</span> {f}
                </div>
              ))}
            </div>
            <button className="btn w-100 py-3 text-muted fw-bold border-0 bg-light" style={{ borderRadius: '15px', fontSize: '14px' }}>View More</button>
          </div>
        </div>

       
        <div className="col-lg-7 order-1 order-lg-2">
          <div className="position-relative mb-4">
            {/* Main Image: Height auto for responsiveness */}
            <img src={guest.image} className="w-100 rounded-5 shadow-sm border" style={{ height: 'auto', minHeight: '300px', maxHeight: '420px', objectFit: 'cover' }} />
            <div className="position-absolute bottom-0 end-0 m-3 m-md-4 d-flex align-items-center gap-3 bg-dark bg-opacity-75 px-3 py-2 rounded-pill text-white shadow" style={{ fontSize: '12px' }}>
               <ChevronLeft size={16} /> <span className="px-2 border-start border-end">1/8</span> <ChevronRight size={16} />
            </div>
          </div>
          
          {/* Thumbnails Row */}
          <div className="row g-2 g-md-3">
            <div className="col-3"><img src={guest.image} className="rounded-4 w-100 border-danger border" style={{ height: '70px', mdHeight: '110px', objectFit: 'cover' }} /></div>
            <div className="col-3"><img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400" className="rounded-4 w-100" style={{ height: '70px', mdHeight: '110px', objectFit: 'cover' }} /></div>
            <div className="col-3"><img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400" className="rounded-4 w-100" style={{ height: '70px', mdHeight: '110px', objectFit: 'cover' }} /></div>
            <div className="col-3">
              <div className="bg-dark rounded-4 d-flex align-items-center justify-content-center text-white fw-bold h-100" style={{ minHeight: '70px' }}>🖼️ 8</div>
            </div>
          </div>
        </div>
      </div>

    
      <div className="mt-5 pb-5">
        <h4 className="fw-bold mb-4" style={{ fontSize: '20px' }}>Purchase History</h4>
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <table className="table align-middle mb-0 bg-white text-nowrap">
              <thead className="bg-light text-muted small fw-bold">
                <tr>
                  <th className="ps-4 py-4">Room Name</th>
                  <th>Bed Type</th>
                  <th>Room Floor</th>
                  <th>Room Facility</th>
                  <th>Book Date</th>
                  <th className="pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Maria Pines", id: "#0001", type: "Single Bed", floor: "Floor G-05" },
                  { name: "Kanapelski Pines", id: "#0002", type: "Double Bed", floor: "Floor G-02" },
                  { name: "Riverware Inlet", id: "#0003", type: "Double Bed", floor: "Floor G-05" }
                ].map((row, idx) => (
                  <tr key={idx} className="border-bottom">
                    <td className="ps-4 py-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="bg-light rounded-3 flex-shrink-0" style={{ width: '60px', height: '45px' }}></div>
                        <div>
                          <div className="text-danger fw-bold" style={{ fontSize: '10px' }}>{row.id}</div>
                          <div className="fw-bold" style={{ fontSize: '14px' }}>{row.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted fw-bold small">{row.type}</td>
                    <td className="text-muted fw-bold small">{row.floor}</td>
                    <td className="text-muted small">AC, Shower, LED TV...</td>
                    <td className="fw-bold small">Oct 29th, 2025</td>
                    <td className="pe-4 text-muted"><MoreHorizontal size={18} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}