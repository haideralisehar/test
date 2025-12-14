"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = Cookies.get("userId");

    if (!userId) {
      router.push("/login");
      
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (!res.ok || !data.user) {
          throw new Error(data.error || "Failed to load profile");
        }

        setUser(data.user);

        
      } catch (err) {
        console.error("Profile fetch error:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  async function handleLogout() {
    try {
      const res = await fetch("/api/logout", { method: "POST" });
      const data = await res.json();

      if (data.success) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (loading) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  if (!user) return null;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center" }}>
      <h1>Welcome, {user.fullName}</h1>
      <p><strong>Username:</strong> {user.userName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.roleName}</p>
      <p><strong>Agency:</strong> {user.agencyName}</p>
      <p><strong>Company Phone:</strong> {user.companyPhone}</p>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#d9534f",
          color: "white",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
