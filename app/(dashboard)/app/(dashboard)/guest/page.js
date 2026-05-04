"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GuestListData } from "@/data/GuestListData";
import { MoreHorizontal } from 'lucide-react'; 

export default function GuestList() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 7; 

  const currentItems = GuestListData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(GuestListData.length / itemsPerPage);

  const handleViewDetail = (roomid) => {
    if (roomid) {
      const cleanId = roomid.replace('#', ''); 
      router.push(`/guest/${cleanId}`);
    }
  };

  return (

    <div className="container-fluid w-100 min-vh-100 d-flex flex-column" style={{ backgroundColor: "#FDFDFD", padding: "calc(15px + 1vw) calc(15px + 2vw)" }}>
      
      

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5">
        {/* Table Responsive wrapper is MUST for mobile scrolling */}
        <div className="table-responsive">
          <table className="table align-middle mb-0 bg-white text-nowrap">
            <thead className="bg-light border-bottom">
              <tr className="text-uppercase small text-muted fw-bold" style={{ fontSize: '12px' }}>
                <th className="ps-4 py-4"><input type="checkbox" className="form-check-input" /></th>
                <th className="py-4">Guest</th>
                <th className="py-4">Date Order</th>
                <th className="py-4">Check In</th>
                <th className="py-4">Check Out</th>
                <th className="py-4">Request</th>
                <th className="py-4">Room Type</th>
                <th className="py-4 text-center">Status</th>
                <th className="py-4 text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr 
                  key={item.roomid} 
                  className="border-bottom" 
                  style={{ minHeight: "110px", cursor: 'pointer' }}
                  onClick={() => handleViewDetail(item.roomid)}
                >
                  <td className="ps-4" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="form-check-input" />
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      {/* Responsive Image Size */}
                      <img src={item.image || "https://i.pravatar.cc/150"} className="rounded-circle border flex-shrink-0" width="45" height="45" style={{ objectFit: 'cover' }} alt={item.name} />
                      <div>
                        <div className="fw-bold" style={{ fontSize: '15px', whiteSpace: 'normal' }}>{item.name}</div>
                        <div className="text-danger small fw-bold" style={{ fontSize: '12px' }}>{item.roomid}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-muted" style={{ fontSize: '13px' }}>{item.dateOrder.split('|')[0]}</td>
                  <td className="fw-bold" style={{ fontSize: '13px' }}>{item.checkIn.split('|')[0]}</td>
                  <td className="fw-bold" style={{ fontSize: '13px' }}>{item.checkOut.split('|')[0]}</td>
                  <td>
                    <button 
                      className="btn btn-link p-0 text-danger text-decoration-none fw-bold"
                      style={{ fontSize: '13px' }}
                      onClick={(e) => { e.stopPropagation(); handleViewDetail(item.roomid); }}
                    >
                      {item.request || "View Notes"}
                    </button>
                  </td>
                  <td>
                    <div className="fw-bold" style={{ fontSize: '13px' }}>{item.roomType}</div>
                    <div className="text-muted small" style={{ fontSize: '11px' }}>Room No. {item.roomNo}</div>
                  </td>
                  <td className="text-center">
                    <span className={`badge rounded-pill px-3 py-2 text-uppercase 
                      ${item.status === 'BOOKED' ? 'bg-success-subtle text-success' : 
                        item.status === 'PENDING' ? 'bg-warning-subtle text-warning' : 
                        item.status === 'CANCELED' ? 'bg-danger-subtle text-danger' :
                        'bg-info-subtle text-info'}`} 
                      style={{ fontSize: '10px', fontWeight: '800', minWidth: '100px' }}>
                      {item.status}
                    </span>
                  </td>
                  <td className="text-end pe-4 text-muted" onClick={(e) => e.stopPropagation()}>
                    <MoreHorizontal size={20} style={{ cursor: "pointer" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 px-2 pb-4">
        <div className="text-muted fw-bold text-center text-md-start" style={{ fontSize: '14px' }}>
          Showing <span className="text-dark">{currentItems.length}</span> of {GuestListData.length} data
        </div>
        
        <nav>
          <ul className="pagination mb-0 gap-1 gap-md-2 align-items-center flex-wrap justify-content-center">
            <button 
              disabled={currentPage === 1}
              className="btn btn-outline-danger border-0 fw-bold px-2 px-md-3" 
              onClick={() => setCurrentPage(p => p - 1)}
              style={{ fontSize: '14px' }}
            >
              Prev
            </button>
            
            <div className="d-flex gap-1 gap-md-2 overflow-auto">
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  className={`btn rounded-3 fw-bold ${currentPage === i + 1 ? 'btn-danger text-white' : 'btn-light border-0 text-muted'}`} 
                  style={{ width: '36px', height: '36px', fontSize: '14px', flexShrink: 0 }} 
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              disabled={currentPage === totalPages}
              className="btn btn-outline-danger border-0 fw-bold px-2 px-md-3" 
              onClick={() => setCurrentPage(p => p + 1)}
              style={{ fontSize: '14px' }}
            >
              Next
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
}