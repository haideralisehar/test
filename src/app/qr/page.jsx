"use client";
import { useEffect, useState } from "react";

export default function QRPage() {
  const [qrImage, setQrImage] = useState("");
  const [targetUrl, setTargetUrl] = useState("");

  useEffect(() => {
    async function fetchQr() {
      const res = await fetch("/api/generate-qr");
      const data = await res.json();
      setQrImage(data.qrImage);
      setTargetUrl(data.targetUrl);
    }
    fetchQr();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // vertical center
        alignItems: "center", // horizontal center
        height: "100vh", // full viewport height
        backgroundColor: "#f9fafb", // light gray background
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        QR Code to Static Page
      </h1>

      {qrImage ? (
        <>
          <img
            src={qrImage}
            alt="QR Code"
            style={{
              width: "250px",
              height: "250px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          />
          <p style={{ marginTop: "12px", fontSize: "14px", color: "#555" }}>
            Scan this QR code to open:{" "}
            <span style={{ color: "#2563eb" }}>{targetUrl}</span>
          </p>
        </>
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
}
