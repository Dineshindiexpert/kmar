'use client';
import { RoomsData } from '@/data/RoomData';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Badge, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { BiListUl } from 'react-icons/bi';
import { BsStarFill, BsThreeDots } from 'react-icons/bs';


const Rooms = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState('ALL');
  const [sort, setSort] = useState('NEWEST');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const router = useRouter();
  const filtered = RoomsData.filter((room) => {
    const matchSearch = room.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = status === 'ALL' ? true : room.status === status;
    return matchSearch && matchStatus;
  });

  // Sort
  const sortedRooms = [...filtered].sort((a, b) => {
    if (sort === "NEWEST") return b.id - a.id;
    if (sort === "OLDEST") return a.id - b.id;
    if (sort === "POPULAR") return b.reviews - a.reviews;
    if (sort === "RANDOM") return Math.random() - 0.5;
    return 0;

  });
  const currentRooms = sortedRooms.slice(indexOfFirst, indexOfLast);

  const handleCard = (id) => {
    router.push(`/rooms/${id}`);
  };
  const totalPages = Math.ceil(sortedRooms.length / itemsPerPage);

  return (
    <div className='px-4 fs-5'>

      {/* HEADER */}
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3">

        {/* LEFT SIDE - FILTER BUTTONS */}
        <div className="d-flex flex-nowrap gap-4">

          <Button
            variant={status === "ALL" ? "secondary" : "outline-secondary"}
            size='md'
            onClick={() => setStatus("ALL")}
            className="p-3"
          >
            All
          </Button>

          <Button
           variant={status === "BOOKED" ? "secondary" : "outline-secondary"}
            size='md'
            onClick={() => setStatus("BOOKED")}
            className="px-3 py-2"
          >
            Booked
          </Button>

          <Button
           variant={status === "AVAILABLE" ? "secondary" : "outline-secondary"}
            size='md'
            onClick={() => setStatus("AVAILABLE")}
            className="px-3 py-2"
          >
            Available
          </Button>

        </div>

        {/* RIGHT SIDE */}
        <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2 w-100 w-lg-auto justify-content-lg-end">
          <div className='d-flex justify-content-between' >
            {/* SEARCH */}
            <InputGroup
              className="rounded-4 overflow-hidden w-100 w-sm-50 me-4 "
              style={{ maxWidth: "350px", minHeight: "45px" }}
            >
              <Form.Control
                className="border-0 text-secondary px-3 py-3"
                style={{ background: "#F4F4F4" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search here..."
              />

              <InputGroup.Text
                className="border-0 pe-3"
                style={{ background: "#F4F4F4" }}
              >
                <img src="./assets/icons/search.svg" alt="search" width={18} />
              </InputGroup.Text>
            </InputGroup>
            {/* SORT */}
            <Form.Select
              className="rounded-4 border-secondary py-2 py-md-3 me-3 w-sm-100"
              style={{ width: "140px" }}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="NEWEST">Newest</option>
              <option value="OLDEST">Oldest</option>
              <option value="POPULAR">Popular</option>
              <option value="RANDOM">Random</option>
            </Form.Select>
          </div>





          {/* ICONS */}
          <div className="d-flex gap-2 justify-content-between">
            <Button
              className="border-0 rounded-4 d-flex  mt-2 align-items-center justify-content-center p-2"
              style={{ background: "#F4F4F4", width: "60px", height: "60px" }}
            >
              <BiListUl className="text-secondary" size={28} />
            </Button>

            <Button className=" bg-transparent p-2 border-0">
              <img src="./assets/icons/menusection.png" width={60} alt="menu" />
            </Button>
          </div>

          {/* ADD BUTTON */}
          <Button
            className="rounded-4 border-0 bg-danger text-white px-4 py-3"
            style={{
              whiteSpace: "nowrap",
              fontSize: "16px",
              fontWeight: 500
            }}
          >
            Add New Room
          </Button>

        </div>
      </div>

      {/* ROOM CARDS */}
      <div className="d-flex flex-wrap my-4">

        {currentRooms.map((room) => (
          <div className="room-card p-2" key={room.id}>

            <Card className="border-0 rounded-4 h-100"
              onClick={() => handleCard(room.id)}  >

              <Card.Body
                className="position-relative rounded-4 text-white p-3 d-flex flex-column justify-content-between"
                style={{
                  backgroundImage: `url(${room.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "300px"
                }}
              >


                <div className="d-flex justify-content-end align-items-start">
                  {/* MENU / ICON */}
                  <span
                    className="btn bg-secondary rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      cursor: "pointer"
                    }}
                  >
                    <BsThreeDots className='text-white' />
                  </span>
                </div>


                <div>

                  {/* STATUS */}
                  <Badge className={`mb-3 p-2 rounded-pill px-3 ${room.status === "BOOKED" ? "bg-danger" : "bg-success"}`}>
                    {room.status}
                  </Badge>

                  <p className="mb-0 fw-semibold">{room.name}</p>
                  <small>#{room.roomid}</small>
                </div>

              </Card.Body>
              {/* FOOTER */}
              <Card.Footer style={{ backgroundColor: "transparent" }}>

                <div className='d-flex justify-content-between'>
                  <p className="mb-1">
                    {room.rating} <BsStarFill className="text-warning" /> <BsStarFill className="text-warning" />
                    <BsStarFill className="text-warning" />
                    <BsStarFill className="text-warning" />

                  </p>
                  <p className="mb-1">{room.reviews} Reviews</p>
                </div>

                <div className='d-flex justify-content-between'>
                  <span>Floor</span>
                  <span>{room.floor}</span>
                </div>

                <hr />

                <div className='d-flex justify-content-between'>
                  <span>Bed Type</span>
                  <span>{room.bedType}</span>
                </div>

              </Card.Footer>

            </Card>
          </div>
        ))}
        
      </div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 my-4">

        {/* LEFT SIDE */}
        <div>
          <span>
            Showing  {currentPage} of {totalPages} data
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="d-flex gap-3">

          <Button
            className=" px-4 py-2 rounded-4"
            variant='outline-warning'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous
          </Button>

          <span className="align-self-center fw-semibold p-2 px-4 rounded-4 bg-warning">
            {currentPage}
          </span>

          <Button
            className=" px-4 py-2 rounded-4"
            variant='outline-warning'
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>

        </div>
      </div>
    </div>
  );
};

export default Rooms;