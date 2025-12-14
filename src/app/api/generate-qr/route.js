import QRCode from "qrcode";

export async function GET() {
  try {
    // URL of your static page (adjust domain accordingly)
    const targetUrl = "http://localhost:3000/thank-you";

    // Generate the QR code as a base64 image
    const qrImage = await QRCode.toDataURL(targetUrl);

    return new Response(
      JSON.stringify({ qrImage, targetUrl }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
