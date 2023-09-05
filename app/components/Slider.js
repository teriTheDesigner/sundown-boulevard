"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Slider.module.css";
import { useState } from "react";
import Image from "next/image";

const images = [
  "/images/elevate-7omeJVzcgTE-unsplash.jpg",
  "/images/elevate-nYgy58eb9aw-unsplash.jpg",
  "/images/elevate-snnhGYNqm44-unsplash.jpg",
  "/images/fred-moon-0yqa0rMCsYk-unsplash.jpg",
];
export default function Slider() {
  const [details, setDetails] = useState(null);

  const [sliderRef] = useKeenSlider({
    loop: true,
    detailsChanged(s) {
      setDetails(s.track.details);
    },
    initial: 2,
  });

  function scaleStyle(idx) {
    if (!details) return {};
    const slide = details.slides[idx];
    const scale_size = 0.7;
    const scale = 1 - (scale_size - scale_size * slide.portion);
    return {
      transform: `scale(${scale})`,
      WebkitTransform: `scale(${scale})`,
    };
  }
  return (
    <div ref={sliderRef} className="keen-slider zoom-out">
      {images.map((src, idx) => (
        <div key={idx} className="keen-slider__slide zoom-out__slide">
          <div style={scaleStyle(idx)}>
            <Image alt={src} src={src} width={500} height={300}></Image>
          </div>
        </div>
      ))}
    </div>
  );
}
