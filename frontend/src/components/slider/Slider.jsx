import React, { useState, useEffect } from 'react';
import './Slider.css'; // Include a CSS file for styling

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Move to the previous image
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Move to the next image
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // useEffect(() => {
  //   const interval = setInterval(nextSlide, 2000);

  //   // Cleanup interval on component unmount or re-render
  //   return () => clearInterval(interval);
  // }, [currentIndex]);

  return (
    <div className="slider-container">
      <div className="slider">
        <img src={images[currentIndex]} alt="slider" className="slider-image" />
      </div>
      <div className="controls">
        <button className="prev" onClick={prevSlide}>
          &#8592; Prev
        </button>
        <button className="next" onClick={nextSlide}>
          Next &#8594;
        </button>
      </div>
    </div>
  );
};

export default Slider;
