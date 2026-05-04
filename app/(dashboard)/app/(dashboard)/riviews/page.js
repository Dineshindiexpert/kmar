"use client";
import React, { useState, useMemo } from 'react';
import { Search, Star, CheckCircle, ChevronDown, Bell, XCircle } from 'lucide-react';
import { ReviewData as InitialData } from '@/data/RiviewData'; // Data import

export default function ReviewsPage() {
  const [data, setData] = useState(InitialData);
  const [activeTab, setActiveTab] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;


  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesTab = activeTab === 'All Status' || item.status.toLowerCase() === activeTab.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [data, activeTab, searchTerm]);

  // 2. Pagination Calculation
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  
  const handleStatusUpdate = (id, newStatus) => {
    const updatedData = data.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };

  const StarRating = ({ rating }) => (
    <div className="d-flex gap-1 justify-content-center justify-content-lg-end mt-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} fill={i < Math.floor(rating) ? "#FF6B35" : "#E5E7EB"} color={i < Math.floor(rating) ? "#FF6B35" : "#E5E7EB"} />
      ))}
    </div>
  );

  return (
    <div className="container-fluid p-3 p-lg-5" style={{ backgroundColor: "#FDFDFD", minHeight: "100vh" }}>

     
      <div className="bg-white p-3 rounded-4 shadow-sm mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-lg-5">
            <div className="d-flex gap-3 gap-md-4 border-bottom border-lg-0 overflow-auto pb-2 pb-lg-0">
              {['All Status', 'Published', 'Archived', 'New'].map((tab) => (
                <span key={tab} onClick={() => {setActiveTab(tab); setCurrentPage(1);}} 
                  className={`pb-2 fw-semibold text-nowrap ${activeTab === tab ? 'text-dark border-bottom border-3 border-dark' : 'text-muted'}`}
                  style={{ cursor: 'pointer', fontSize: '14px' }}>{tab}</span>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-4">
            <div className="position-relative">
              <input 
                className="form-control bg-light border-0 ps-5" 
                placeholder="Search here..." 
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                style={{ height: '45px', fontSize: '14px', borderRadius: '10px' }} 
              />
              <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" size={18} />
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-3">
            <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-between px-3" style={{ height: '45px', fontSize: '13px', borderRadius: '10px' }}>
              Sort by Newest <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

     
      <div className="d-flex flex-column gap-3">
        {currentItems.length > 0 ? currentItems.map((review) => (
          <div key={review.id} className="card border-0 shadow-sm p-3 p-md-4 rounded-4">
            <div className="row align-items-start align-items-lg-center g-3">
              {/* User Section */}
              <div className="col-12 col-lg-3 d-flex flex-row flex-lg-column align-items-center align-items-lg-start border-end-lg gap-3">
                <img src={review.image} className="rounded-circle border" width="65" height="65" style={{ objectFit: 'cover' }} alt={review.name} />
                <div>
                    <h6 className="fw-bold m-0 text-dark">{review.name}</h6>
                    <p className="text-muted small m-0">{review.id}</p>
                    <p className="text-muted d-none d-lg-block" style={{fontSize: '11px'}}>{review.date}</p>
                </div>
              </div>

             
              <div className="col-12 col-lg-6 px-lg-4">
                <h6 className="fw-bold text-dark">{review.title}</h6>
                <p className="text-muted small" style={{ lineHeight: '1.6', fontSize: '13px' }}>{review.comment}</p>
                <div className="d-flex flex-wrap gap-2">
                  {review.badges.map((b, j) => (
                    <span key={j} className="badge rounded-pill bg-light text-secondary border fw-normal" style={{ fontSize: '10px', padding: '6px 12px' }}>{b}</span>
                  ))}
                </div>
              </div>

              
              <div className="col-12 col-lg-3 text-center text-lg-end mt-3 mt-lg-0 d-flex flex-column gap-2">
                <div className="d-flex flex-lg-column justify-content-between align-items-center align-items-lg-end">
                    <div className="h4 fw-bold m-0 text-dark">{review.rating}</div>
                    <StarRating rating={review.rating} />
                </div>
                
                <div className="mt-2">
                    {review.status === 'new' ? (
                    <div className="d-flex gap-2">
                        <button 
                            onClick={() => handleStatusUpdate(review.id, 'published')}
                            className="btn btn-success btn-sm rounded-pill flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-2" 
                            style={{ fontSize: '11px', backgroundColor: '#27AE60' }}>
                            <CheckCircle size={14} /> Accept
                        </button>
                        <button 
                            onClick={() => handleStatusUpdate(review.id, 'archived')}
                            className="btn btn-danger btn-sm rounded-pill flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-2" 
                            style={{ fontSize: '11px', backgroundColor: '#EB5757' }}>
                            <XCircle size={14} /> Reject
                        </button>
                    </div>
                    ) : (
                    <div className={`badge rounded-pill w-100 py-2 border ${review.status === 'published' ? 'bg-success-subtle text-success border-success' : 'bg-secondary-subtle text-secondary border-secondary'}`} style={{ fontSize: '12px' }}>
                        {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                    </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        )) : (
            <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                <p className="text-muted">No reviews found matching your search.</p>
            </div>
        )}
      </div>

     
      {filteredData.length > 0 && (
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 bg-white p-3 rounded-4 shadow-sm gap-3">
            <p className="text-muted small m-0 text-center text-md-start">
                Showing <b>{currentItems.length}</b> of <b>{filteredData.length}</b> results
            </p>
            {/* Wrapper for buttons to handle overflow on small screens */}
            <div className="d-flex gap-2 align-items-center justify-content-center">
                <button 
                  className="btn btn-sm border px-3" 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(p => p - 1)}
                  style={{ fontSize: '12px', minWidth: '60px' }}
                >
                  Prev
                </button>
                
                {/* Numeric buttons wrapper with scroll if many pages */}
                <div className="d-flex gap-1 overflow-auto px-1" style={{ maxWidth: '200px', scrollbarWidth: 'none' }}>
                    {[...Array(totalPages)].map((_, i) => (
                        <button 
                            key={i} 
                            className={`btn btn-sm px-3 rounded-2 ${currentPage === i + 1 ? 'btn-danger text-white' : 'border bg-white'}`} 
                            onClick={() => setCurrentPage(i + 1)}
                            style={{ fontSize: '12px', minWidth: '35px' }}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>

                <button 
                  className="btn btn-sm border px-3" 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(p => p + 1)}
                  style={{ fontSize: '12px', minWidth: '60px' }}
                >
                  Next
                </button>
            </div>
        </div>
      )}
    </div>
  );
}