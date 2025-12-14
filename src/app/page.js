// app/page.js
import React from "react";
import DownloadBtn from "./downloadbtn";

export default function Page() {
  return (
    <div style={{ background: "#f3f6fb", minHeight: "100vh", padding: 28 }}>
      <DownloadBtn
        booking={{
          reference: "15262220160",
          guestName: ["Jalal Saleh", "Jalal Saleh"],
          guestEmail: "jalal@example.com",
          guestPhone: "+92 345773783",
          hotelName: "Zedwell Piccadilly Circus",
          totalAmount: "120 BHD",
          arrivalDate: "2025-11-03",
          departureDate: "2025-11-06",
          roomType: ["Cocoon 2 / 1 Double Bed", "1 Double Bed"],
          guests: ["1", "2"],
          mealType: ["Room Only", "All Inclusive"],
        }}
      />
    </div>
  );
}
