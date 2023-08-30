"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./Stepper.module.css";
import { useState } from "react";

const images = [
  "/images/mae-mu-8Vh6ulKc50o-unsplash.jpg",
  "/images/edward-howell-VXIpXxpZ5ms-unsplash.jpg",
  "/images/gaby-yerden-lDyreMNIo5A-unsplash.jpg",
  "/images/olena-sergienko-JjGLEN7T8xI-unsplash.jpg",
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
            <img alt={src} src={src} />
          </div>
        </div>
      ))}
    </div>
  );
}
