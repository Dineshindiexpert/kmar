"use client";
import React, { useState, useMemo } from 'react';
import { StaffData } from "../../../data/Staffdata";
import { Phone, Mail, MoreHorizontal, Search, ChevronDown } from 'lucide-react';

export default function ConciergePage() {
  const [filter, setFilter] = useState('All Status');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const processedData = useMemo(() => {
    let data = [...StaffData];

   
    if (searchTerm) {
      data = data.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (s.empId && s.empId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        s.id.toString().includes(searchTerm)
      );
    }

    if (filter !== 'All Status') data = data.filter(s => s.status === filter);

    
    data.sort((a, b) => {
      if (sortOrder === 'Newest First') return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      if (sortOrder === 'Oldest First') return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
      if (sortOrder === 'Name A-Z') return a.name.localeCompare(b.name);
      return 0;
    });

    return data;
  }, [filter, sortOrder, searchTerm]); 

  const currentItems = processedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(processedData.length / itemsPerPage);

  return (
    <div className="w-100 min-vh-100 container-fluid" style={{ backgroundColor: "#FDFDFD", padding: "40px" }}>

     
      <div className="d-flex flex-column flex-xl-row justify-content-between align-items-center mb-5" style={{ minHeight: "60px" }}>

        {/* LEFT: Tabs */}
        <div className="d-flex gap-4 fw-bold text-muted h-100 align-items-center mb-4 mb-xl-0" style={{ fontSize: '14px', whiteSpace: 'nowrap' }}>
          {['All Status', 'Active', 'Inactive'].map((tab) => (
            <span
              key={tab}
              onClick={() => { setFilter(tab); setCurrentPage(1); }}
              style={{
                cursor: 'pointer',
                color: filter === tab ? '#2D2D2D' : '#A0A0A0',
                transition: "0.3s",
                position: "relative",
                paddingBottom: "20px",
                top: "10px"
              }}
              className={`${filter === tab ? 'border-bottom border-3 border-dark' : ''}`}
            >
              {tab}
            </span>
          ))}
        </div>

     
        <div className="d-flex flex-wrap flex-md-nowrap align-items-center justify-content-center justify-content-xl-end gap-3 w-100 w-xl-auto">
          
          <div className="d-flex shadow-sm flex-nowrap" style={{ borderRadius: "8px", overflow: "hidden" }}>
            {/* Search Input Linked to State */}
            <div className="position-relative">
              <input
                type="text"
                className="form-control border-0 ps-3"
                placeholder="Search here..."
                value={searchTerm} // Value bind ki
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} // Change handler
                style={{ 
                  width: "calc(100vw - 220px)", 
                  maxWidth: "380px", 
                  minWidth: "150px", 
                  height: "45px", 
                  fontSize: "14px", 
                  backgroundColor: "#F4F4F4", 
                  borderRadius: "8px 0 0 8px", 
                  boxShadow: "none" 
                }}
              />
              <Search className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" size={18} />
            </div>

            {/* Sort */}
            <div className="position-relative bg-white px-2 d-flex align-items-center border-start flex-nowrap" style={{ height: "45px", borderRadius: "0 8px 8px 0", minWidth: "max-content" }}>
              <span className="text-muted d-none d-sm-inline ms-1" style={{ fontSize: "14px", whiteSpace: "nowrap" }}>Sort by </span>
              <select
                className="form-select border-0 fw-bold py-0 ps-1 pe-4"
                value={sortOrder}
                onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }}
                style={{ 
                  fontSize: "14px", 
                  cursor: 'pointer', 
                  appearance: 'none', 
                  background: 'none', 
                  width: 'auto', 
                  color: '#333', 
                  boxShadow: "none"
                }}
              >
                <option value="Newest First">Newest</option>
                <option value="Oldest First">Oldest</option>
                <option value="Name A-Z">Name A-Z</option>
              </select>
              <ChevronDown className="position-absolute end-0 me-2 text-muted" size={14} style={{ pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Add Button */}
          <button
            className="btn text-white px-4 rounded-2 shadow-sm border-0 d-flex align-items-center justify-content-center"
            style={{ 
              backgroundColor: "#EB5757", 
              fontWeight: "600", 
              height: "45px", 
              fontSize: "14px", 
              whiteSpace: "nowrap",
              minWidth: "max-content"
            }}
          >
            Add New Concierge
          </button>
        </div>
      </div>

      {/* STAFF GRID */}
      <div className="row g-4">
        {currentItems.length > 0 ? currentItems.map((staff) => (
          <div key={staff.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div className="card border-0 shadow-sm p-4 rounded-4 text-center h-100" style={{ backgroundColor: "#FFFFFF" }}>
              <div className="mx-auto mb-4" style={{ width: '120px', height: '120px' }}>
                <div className="rounded-circle bg-light w-100 h-100 shadow-sm overflow-hidden border border-2 border-white">
                  <img src={staff.image || "https://via.placeholder.com/150"} className="w-100 h-100" style={{ objectFit: 'cover' }} alt={staff.name} />
                </div>
              </div>
              <h5 className="fw-bold mb-1" style={{ fontSize: '18px' }}>{staff.name}</h5>
              <p className="text-muted small mb-4">{staff.empId || staff.id}</p>
              <div className="d-flex justify-content-center gap-2 my-3">
                <button className="btn p-0 border-0 d-flex align-items-center justify-content-center rounded-circle" style={{ backgroundColor: "#E8F5E9", color: "#27AE60", width: "45px", height: "45px" }}><Mail size={20} /></button>
                <button className="btn p-0 border-0 d-flex align-items-center justify-content-center rounded-circle" style={{ backgroundColor: "#E8F5E9", color: "#27AE60", width: "45px", height: "45px" }}><Phone size={20} /></button>
                <button className="btn p-0 border-0 d-flex align-items-center justify-content-center rounded-circle" style={{ backgroundColor: "#F2F2F2", color: "#BDBDBD", width: "45px", height: "45px" }}><MoreHorizontal size={20} /></button>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4 mb-3 px-1" style={{ fontSize: '11px' }}>
                <span className="text-muted">Joined on {staff.joinDate}</span>
                <span className="fw-bold" style={{ color: staff.status === 'Active' ? '#27AE60' : '#EB5757' }}>● {staff.status}</span>
              </div>
              <div className="mt-2 text-start pt-3 border-top" style={{ borderColor: '#f8f9fa' }}>
                <p className="fw-bold text-muted mb-2" style={{ fontSize: '10px', letterSpacing: "0.5px" }}>JOB DESK</p>
                <p className="text-muted m-0" style={{ fontSize: '11px', lineHeight: '1.5', height: "50px", overflow: "hidden" }}>
                  {staff.jobDescription}
                </p>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-12 text-center py-5">
            <p className="text-muted">No staff found matching your search.</p>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      {processedData.length > 0 && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 gap-3">
          <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
            Showing <b>{currentItems.length}</b> of <b>{processedData.length}</b> data entries
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-2 align-items-center">
            <button className="btn border-0 shadow-sm px-3 text-muted bg-white" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} style={{ fontSize: "13px", height: "38px" }}>Previous</button>
            <div className="d-flex gap-1 overflow-auto">
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} className={`btn border-0 shadow-sm rounded-2 d-flex align-items-center justify-content-center ${currentPage === i + 1 ? 'text-white' : 'text-muted bg-white'}`} style={{ backgroundColor: currentPage === i + 1 ? '#EB5757' : '#FFFFFF', minWidth: "35px", height: "35px", fontSize: "13px" }} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              ))}
            </div>
            <button className="btn border-0 shadow-sm px-3 text-danger bg-white" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} style={{ fontSize: "13px", height: "38px" }}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}