import Image from "next/image";
import React from "react";
export default function ResumePage() {
  return (
    <div className="resume-container">
      {/* HEADER */}
      <header className="resume-header">
        <div className="resume-avatar">
         <Image
              className="circular-left-right"
              src="/pic.jpeg"
              alt="pics"
              width={200}
              height={200}
            />
        </div>
        <div className="resume-title">
          <h1>Faisal Arshad</h1>
          <p>Student</p>
        </div>
      </header>

      {/* BODY */}
      <div className="resume-body">
        {/* LEFT */}
        <section className="resume-left">
          <Block title="Professional Summary">
            <p>
              I am Faisal Arshad, a Computer Science student at the University of Agriculture, Faisalabad, with a strong interest in programming and modern software development technologies.
            </p>
          </Block>

          <Block title="Expertise">
            <ul>
              <li>Effective Communication</li>
              <li>Critical Thinking</li>
  
              <li>Time Management</li>
             
            </ul>
          </Block>

          <Block title="Work Experience">
            <h4>Fresh</h4>
            {/* <p>Punjab College, Pir Mahal</p>

            <h4>Senior Front-End Web Developer | 2024 – Present</h4>
            <p>Citybooking.net (Remote)</p> */}
          </Block>

          <Block title="Academic History">
            
            <p><strong>Intermediate </strong> — Punjab Group of Colleges (2023–2025)</p>
            <p><strong>Matric</strong> — Faran College Pirmahal (2021–2023)</p>
          </Block>
        </section>

        {/* RIGHT */}
        <section className="resume-right">
          <Block title="Contact">
            <p>📞 +92 317 1756622</p>
            <p>✉️ faisalarshad039@gmail.com</p>
            <p>🪪 33304-0368936-5</p>
            <p>📍 Chak no 681/22 G.B Toba Tek Singh</p>
          </Block>

          <Block title="Extra Expertise">
            <ul>
              <li>Photo Editing</li>
              {/* <li>React / Next.js</li> */}
              {/* <li>C++, C#, Python</li> */}
              <li>HTML, CSS</li>
              <li>Data Entry</li>
            </ul>
          </Block>

          <Block title="Awards & Certification">
            <p>Not Yet</p>
            {/* <p>Essay Writing Competition (2023)</p> */}
          </Block>
        </section>
      </div>
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="resume-block">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
