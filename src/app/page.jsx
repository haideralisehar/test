"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaSearch,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../app/HotelSearchBar.css";

// ✅ Static hotels data
export const hotelsData = {
  Islamabad: [
    {
      id: 1,
      name: "Islamabad Hotel One",
      location: "Blue Area, Islamabad",
      price: 120,
      image: "/hotel1.jpg",
    },
    {
      id: 2,
      name: "Islamabad Hotel Two",
      location: "F-7, Islamabad",
      price: 150,
      image: "/hotel2.jpg",
    },
  ],
  Paris: [
    {
      id: 3,
      name: "Hotel Louvre",
      location: "Near Eiffel Tower, Paris",
      price: 200,
      image: "/hotel3.jpg",
    },
  ],
};

export default function RoomSearch({
  initialDestination = "",
  initialCheckIn = null,
  initialCheckOut = null,
  initialRooms = [],
}) {
  const router = useRouter();
  const [destination, setDestination] = useState(initialDestination);
  const [checkInDate, setCheckInDate] = useState(
    initialCheckIn ? new Date(initialCheckIn) : null
  );
  const [checkOutDate, setCheckOutDate] = useState(
    initialCheckOut ? new Date(initialCheckOut) : null
  );
  const [rooms, setRooms] = useState(initialRooms);

  const handleSearch = () => {
    router.push(
      `/results?destination=${destination}&from=${checkInDate?.toISOString()}&to=${checkOutDate?.toISOString()}&rooms=${encodeURIComponent(
        JSON.stringify(rooms)
      )}`
    );
  };

  return (
    <div className="search-container">
      {/* Destination */}
      <div className="search-box">
        <FaMapMarkerAlt className="icon" />
        <input
          type="text"
          placeholder="Enter a destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      {/* Dates */}
      <div className="search-box">
        <FaCalendarAlt className="icon" />
        <DatePicker
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          placeholderText="Check-in"
        />
        <DatePicker
          selected={checkOutDate}
          onChange={(date) => setCheckOutDate(date)}
          placeholderText="Check-out"
        />
      </div>

      {/* Guests */}
      <div className="search-box">
        <FaUsers className="icon" />
        <input
          type="number"
          placeholder="Rooms"
          value={rooms.length || 1}
          readOnly
        />
      </div>

      {/* Search Button */}
      <button className="search-btn" onClick={handleSearch}>
        <FaSearch /> Search
      </button>
    </div>
  );
}
