"use client";
import React from "react";

// Receives already-built HTML and injects your CSS
export default function VoucherUI({ html }) {
  return (
    <div 
      className="voucher-container"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
