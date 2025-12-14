"use client";
import React, { useState, useEffect } from "react";
import "../app/component/voucher.css"
export default function DownloadBtn({ booking }) {
  const [loading, setLoading] = useState(false);
  const [previewHtml, setPreviewHtml] = useState(null);

  useEffect(() => {
  if (loading) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [loading]);


   useEffect(() => {
handleGenerate();

   },[]);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/create-voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: {
            logo: "/logo.png",
            name: "Next Room Finder",
            phone: "+973 7700 0000",
            email: "info@nextroomfinder.com",
            address: "Manama, Bahrain",
          },
          hotel: {
            name: booking.hotelName,
            phone: booking.guestPhone,
            address: "Hotel Street, Bahrain",
          },
          booking: {
            reference: booking.reference,
            arrival: booking.arrivalDate,
            departure: booking.departureDate,
          },
          tableRows: booking.roomType.map((_, index) => ({
            roomType: booking.roomType[index],
            bedType: "Double Bed",
            guestName: booking.guestName[index],
            adults: booking.guests[index],
            mealType: booking.mealType[index],
          })),
          customer: {
            requests: ["No smoking room", "Late checkout"],
          },
          reminders: [
            "Bring passport",
            "Present voucher on arrival",
            "Early check-in subject to availability",
          ],
        }),
      });

      const data = await response.json();
      setPreviewHtml(data);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${previewHtml.pdf}`;
    link.download = "HotelVoucher.pdf";
    link.click();
  };

  return (
    <div>
      {/* <button
        onClick={handleGenerate}
        className="p-3 bg-blue-600 text-white rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Voucher"}
      </button> */}

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">Generating Voucher</p>
        </div>
      )}


      {previewHtml?.html && (
        <div>
          <div className="fix" style={{display:"flex", justifyContent:"space-between"}}>


          
          <h2 className="text-xl font-bold mb-40">Voucher Preview</h2>
          <button className="download-btn"
            onClick={downloadPDF}
            
          >
            Download
            
          </button>
          </div>
          <br />
          <br />
          <br />

          {/* FIXED, ISOLATED, PERFECT PREVIEW */}
          <iframe
            key={Date.now()}               // force reload
            srcDoc={previewHtml.html}       // render HTML directly
            className="w-full"
            style={{
              width:"100%",
              height: "1200px",
              border: "1px solid #ccc",
              background: "white",
            }}
            sandbox="allow-same-origin allow-scripts"
          />

          
        </div>
      )}
    </div>
  );
}
