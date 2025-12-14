import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userName, password } = await req.json();

    const response = await fetch(
      "https://cityinbookingapi20251018160614-fxgqdkc6d4hwgjf8.canadacentral-01.azurewebsites.net/api/Auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Invalid username or password" },
        { status: 401 }
      );
    }

    // ✅ Extract userId and token from API response
    const userId = data.user?.id; // Adjust key based on your backend response

    // ✅ Create response
    const res = NextResponse.json({
      success: true,
      userId,
      token: data.token,
    });

    // ✅ Store token (HTTP-only)
    res.cookies.set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // ✅ Store user ID (readable cookie)
    res.cookies.set("userId", userId, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    console.log("✅ Login successful, cookies set");
    return res;
  } catch (error) {
    console.error("❌ Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
