import React, { useState, useEffect } from "react";
import h1 from "../assets/hero1.jpeg";
import h2 from "../assets/hero2.jpeg";
import h3 from "../assets/hero3.jpeg";
import { Link } from "react-router-dom";

const slides = [
  { id: 1, src: h1 },
  { id: 2, src: h2 },
  { id: 3, src: h3 },
];

const Hero = () => {

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
 
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.src}
            alt={`slide-${index + 1}`}
            className="w-full h-full object-cover"
          />
         
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      ))}

    
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="prata-regular text-5xl font-bold mb-4">Best Fashionstore in Town</h1>
        <p className="text-lg mb-6">Enjoy latest trends at friendly prices, Look nice & fresh with us</p>

        <div className="flex gap-4">
        <Link to='/collection'><button className="prata-regular bg-green-400 text-black px-6 py-3 font-semibold rounded hover:bg-gray-200 transition">
            Collection
          </button></Link> 
       <Link to='/about'><button className="prata-regular bg-transparent border border-white px-6 py-3 font-semibold rounded hover:bg-white hover:text-black transition">
            Learn More
          </button></Link> 
        </div>
      </div>
    </div>
  );
};

export default Hero;
