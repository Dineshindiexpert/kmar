"use client";

import { useState } from "react";
import { BiTrash } from "react-icons/bi";

const Booking = () => {
  const [formData, setFormData] = useState({
    email: "",
    bookingRef: "",
    company: "",
    checkIn: "",
    checkOut: "",
    nights: "",
    ratePlan: "",
    notes: "",
    rooms: [
      {
        roomType: "",
        guests: [{ firstName: "", lastName: "" }]
      }
    ]
  });

  // Generic handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Room change
  const handleRoomChange = (index, value) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[index].roomType = value;
    setFormData({ ...formData, rooms: updatedRooms });
  };

  // Guest change
  const handleGuestChange = (roomIndex, guestIndex, field, value) => {
    const updatedRooms = [...formData.rooms];
    updatedRooms[roomIndex].guests[guestIndex][field] = value;
    setFormData({ ...formData, rooms: updatedRooms });
  };

  // Add room
  const addRoom = () => {
    setFormData((prev) => ({
      ...prev,
      rooms: [
        ...prev.rooms,
        { roomType: "", guests: [{ firstName: "", lastName: "" }] }
      ]
    }));
  };

  // Remove room
  const removeRoom = (index) => {
    const updated = formData.rooms.filter((_, i) => i !== index);
    setFormData({ ...formData, rooms: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Booking Submitted Successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="py-4 booking-card">

      {/* HEADER */}
      <div className="d-flex justify-content-end align-items-center mb-4">
        
        <button type="reset" className="btn btn-outline-danger btn-sm"><BiTrash size={30} /></button>
      </div>

      {/* BOOKING INFO */}
      <div className="card p-4 mb-4 shadow-sm rounded-4">
        <h6 className="fw-semibold mb-3 fs-2">Booking Info</h6>
        <div className="d-flex gap-3 flex-wrap">
          <input name="email" value={formData.email} onChange={handleChange} className="form-control col py-3" placeholder="Client Email" />
          <input name="bookingRef" value={formData.bookingRef} onChange={handleChange} className="form-control col py-3" placeholder="Booking Ref" />
          <input name="company" value={formData.company} onChange={handleChange} className="form-control col py-3" placeholder="Company" />
        </div>
      </div>

      {/* STAY DETAILS */}
      <div className="card p-4 mb-4 shadow-sm rounded-4">
        <h6 className="fw-semibold mb-3 fs-2">Stay Details</h6>
        <div className="d-flex gap-3 flex-wrap">
          <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} className="form-control col py-3" />
          <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} className="form-control col py-3" />
          <input name="nights" value={formData.nights} onChange={handleChange} className="form-control col py-3" placeholder="Nights" />
          <input name="ratePlan" value={formData.ratePlan} onChange={handleChange} className="form-control col py-3" placeholder="Rate Plan" />
        </div>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="form-control mt-3"
          placeholder="Special request..."
        />
      </div>

      {/* ROOMS */}
      <div className="card p-4 shadow-sm rounded-4">
        <div className="d-flex justify-content-between mb-3">
          <h6 className="fw-semibold fs-2">Rooms & Guests</h6>
          <button type="button" onClick={addRoom} className="btn btn-danger btn-lg text-white">
            + Add Room
          </button>
        </div>

        {formData.rooms.map((room, roomIndex) => (
          <div key={roomIndex} className="border rounded-3 p-3 mb-3 bg-light">

            {/* Room Type */}
            <div className="mb-3">
              <input
                className="form-control py-3"
                placeholder="Room Type"
                value={room.roomType}
                onChange={(e) => handleRoomChange(roomIndex, e.target.value)}
              />
            </div>

            {/* Guests */}
            {room.guests.map((guest, guestIndex) => (
              <div key={guestIndex} className="row g-2 mb-2">
                <div className="col-md-5">
                  <input
                    className="form-control py-3"
                    placeholder="First Name"
                    value={guest.firstName}
                    onChange={(e) =>
                      handleGuestChange(roomIndex, guestIndex, "firstName", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-5">
                  <input
                    className="form-control py-3"
                    placeholder="Last Name"
                    value={guest.lastName}
                    onChange={(e) =>
                      handleGuestChange(roomIndex, guestIndex, "lastName", e.target.value)
                    }
                  />
                </div>
                <div className="col-md-2 ">
                  <button
                    type="button"
                    onClick={() => removeRoom(roomIndex)}
                    className="btn btn-outline-danger w-100 py-3"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-danger mt-4 text-white px-5 py-3">
        Submit Booking
      </button>
    </form>
  );
};

export default Booking;