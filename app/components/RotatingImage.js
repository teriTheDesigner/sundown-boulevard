"use client";

import React, { useEffect, useState } from "react";

const RotatingImage = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Get the current scroll position from the document element
      const scrollY = document.documentElement.scrollTop;

      // Calculate the rotation angle based on scroll direction
      const newRotation = scrollY > 0 ? -scrollY : scrollY;

      // Update the rotation state
      setRotation(newRotation);
    };

    // Attach the scroll event listener to the document element
    document.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the scroll event listener when the component unmounts
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: "transform 0.2s ease",
  };

  return (
    <img
      src="/images/plate.png"
      alt="Rotating Image"
      className="h-60 w-60"
      style={imageStyle}
    />
  );
};

export default RotatingImage;
