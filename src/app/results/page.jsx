"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import RoomSearch, { hotelsData } from "../page";
import "./ResultsPage.css";

export default function ResultsPage() {
  const searchParams = useSearchParams();

  const destination = searchParams.get("destination") || "";
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  let rooms = [];
  try {
    const roomsParam = searchParams.get("rooms");
    rooms = roomsParam ? JSON.parse(decodeURIComponent(roomsParam)) : [];
  } catch (e) {
    console.error("Invalid rooms data:", e);
  }

  const results = hotelsData[destination] || [];

  return (
    <div className="results-container">
      {/* Search bar with pre-filled values */}
      <RoomSearch
        initialDestination={destination}
        initialCheckIn={from}
        initialCheckOut={to}
        initialRooms={rooms}
      />

      <h2>
        {results.length > 0
          ? `Hotels in ${destination}`
          : `No hotels found in ${destination}`}
      </h2>

      {/* Hotel list */}
      <div className="hotel-list">
        {results.map((hotel) => (
          <div key={hotel.id} className="hotel-card">
            <img src={hotel.image} alt={hotel.name} className="hotel-img" />
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p className="price">${hotel.price} / night</p>
              <button className="book-btn">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
