// "use client";
// import React, { useState } from "react";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import "./Slider2.module.css";

// const images = [
//   "/images/gaby-yerden-lDyreMNIo5A-unsplash.jpg",
//   "/images/edward-howell-VXIpXxpZ5ms-unsplash.jpg",
//   "/images/gaby-yerden-lDyreMNIo5A-unsplash.jpg",
//   "/images/olena-sergienko-JjGLEN7T8xI-unsplash.jpg",
// ];

// export default function Slider() {
//   const [details, setDetails] = useState(null);
//   const [sliderRef, slider] = useKeenSlider({
//     loop: true,
//     detailsChanged(s) {
//       setDetails(s.details);
//     },
//     initial: 2,
//   });

//   const slideTo = (index) => {
//     if (slider) {
//       slider.moveToSlideRelative(index);
//     }
//   };

//   return (
//     <div className="slider-container">
//       <button className="arrow arrow-left" onClick={() => slideTo(-1)}>
//         &lt;
//       </button>
//       <div ref={sliderRef} className="keen-slider zoom-out">
//         {images.map((src, idx) => (
//           <div key={idx} className="keen-slider__slide zoom-out__slide">
//             <div className="slider-image" style={scaleStyle(idx)}>
//               <img alt={src} src={src} />
//             </div>
//           </div>
//         ))}
//       </div>
//       <button className="arrow arrow-right" onClick={() => slideTo(1)}>
//         &gt;
//       </button>
//     </div>
//   );
// }

// function scaleStyle(idx) {
//   if (!details) return {};
//   const slide = details.slides[idx];
//   const scale_size = 0.7;
//   const scale = 1 - (scale_size - scale_size * slide.portion);
//   return {
//     transform: `scale(${scale})`,
//     WebkitTransform: `scale(${scale})`,
//   };
// }
