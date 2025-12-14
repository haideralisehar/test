"use client";
import React from "react";
import "./youtube.css";

export default function AnimatedScrollPage() {
  const sections = [
    { title: "Plan", color: "#fef6e4" },
    { title: "Design", color: "#e3f6f5" },
    { title: "Build", color: "#f3e8ff" },
    { title: "Launch", color: "#fff1f2" },
  ];

  return (
    <div className="page-container">
      <section className="intro">
        <h1>Flow from idea to outcome in seconds</h1>
        <p>Inspired by Miro’s smooth interactive style.</p>
      </section>

      <section className="horizontal-scroll">
        <div className="scroll-inner">
          {sections.map((sec, i) => (
            <div
              className="scroll-card"
              style={{ background: sec.color }}
              key={i}
            >
              <h2>{sec.title}</h2>
              <p>Step {i + 1} of your creative journey.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="content">
        <h2>Summary</h2>
        <ul>
          <li>Login & Wallet APIs integrated</li>
          <li>Tap Payment attached (Testing)</li>
          <li>Country API fetching live data</li>
          <li>Design polished and responsive</li>
        </ul>
      </section>
    </div>
  );
}
