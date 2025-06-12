"use client";

import React, { useState } from "react";

const techStackImages: string[] = [
  "/tech/html.png",
  "/tech/css.png",
  "/tech/tailwind.png",
  "/tech/js.png",
  "/tech/react.png",
  "/tech/nextjs.png",
  "/tech/redux.png",
  "/tech/sanity.png",
  "/tech/appwrite.png",
  "/tech/typescript.png",
  "/tech/express.png",
  "/tech/nodejs.png",
  "/tech/figma.png",
  "/tech/photoshop.png",
  "/tech/mysql.png",
  "/tech/mongodb.png",
  "/tech/vercel.png",
  "/tech/cpp.png",
];

const TechMarquee: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const repeatedImages = [...techStackImages, ...techStackImages];

  return (
    <div className="marquee-container">
      <div className={`marquee-track ${isHovered ? "paused" : ""}`}>
        {repeatedImages.map((src, idx) => (
          <div
            key={idx}
            className="marquee-item"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img src={src} alt="Tech stack logo" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
