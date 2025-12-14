const express = require("express");
const cors = require("cors");
// import cors from "cors";
const bodyParser = require("body-parser");
const pdf = require("html-pdf");


const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

app.post("/api/createVoucher", async (req, res) => {
  try {
    const { company, hotel, booking, tableRows, customer, reminders } = req.body;

    const html = `
<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: Arial, sans-serif; }
.company-logo{ background:#1c1cad; padding:30px 10px; border-radius:6px; }
.voucher-wrapper{ width:100%; padding:25px; background:#fff; }
.voucher-header{ border:1px solid #bfbfbf; padding:15px; display:flex; gap:20px; }
.company-logo img{ width:120px; }
.company-info p{ margin:3px 0; font-size:14px; }
.voucher-title{ text-align:center; font-size:22px; margin-top:25px; }
.voucher-subtitle{ text-align:center; font-size:13px; }
.section{ margin-top:25px; border:1px solid #ccc; }
.section-heading{ background:#f2f2f2; padding:10px; font-weight:bold; }
.hotel-info,.customer-requests{ padding:12px 15px; }
.order-grid{ display:flex; justify-content:space-between; padding:12px 15px; }
.order-grid div{ min-width:180px; }
.order-table{ width:100%; border-collapse:collapse; margin-top:10px; }
.order-table th,.order-table td{ border:1px solid #d1d1d1; padding:8px; }
</style>
</head>

<body>
<div class="voucher-wrapper">

  <div class="voucher-header">
    <div class="company-logo">
      <img src="${company.logo}" />
    </div>
    <div class="company-info">
      <p><strong>Company:</strong> ${company.name}</p>
      <p><strong>Tel:</strong> ${company.phone}</p>
      <p><strong>Email:</strong> ${company.email}</p>
      <p><strong>Addr:</strong> ${company.address}</p>
    </div>
  </div>

  <h2 class="voucher-title">HOTEL VOUCHER</h2>
  <p class="voucher-subtitle">PLEASE PRESENT THIS VOUCHER UPON ARRIVAL</p>

  <div class="section">
    <div class="section-heading">Hotel Information</div>
    <div class="hotel-info">
      <p><strong>${hotel.name}</strong></p>
      <p><strong>Tel:</strong> ${hotel.phone}</p>
      <p><strong>Addr:</strong> ${hotel.address}</p>
    </div>
  </div>

  <div class="section">
    <div class="section-heading">Order Information</div>

    <div class="order-grid">
      <div>
        <p>Reference</p>
        <strong>${booking.reference}</strong>
      </div>
      <div>
        <p>Check-In</p>
        <strong>${booking.arrival}</strong>
      </div>
      <div>
        <p>Check-Out</p>
        <strong>${booking.departure}</strong>
      </div>
    </div>

    <table class="order-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Room</th>
          <th>Guests</th>
          <th>Number</th>
          <th>Meal</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows.map((r, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${r.roomType}<br/>${r.bedType}</td>
            <td>${r.guestName}</td>
            <td>${r.number}</td>
            <td>${r.mealType}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="customer-requests">
      <p><strong>Customer Requests</strong></p>
      ${customer.requests.map(r => `<p>${r}</p>`).join("")}
    </div>
  </div>

  <div class="section">
    <div class="section-heading">Reminders</div>
    <ol>
      ${reminders.map(r => `<li>${r}</li>`).join("")}
    </ol>
  </div>

</div>
</body>
</html>
`;

    pdf.create(html, { format: "A4" }).toBuffer((err, buffer) => {
      if (err) return res.status(500).json({ success: false });

      res.json({
        success: true,
        html,
        pdf: buffer.toString("base64"),
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
