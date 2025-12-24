'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const backgroundImages = [
  '/images/hero/hero-1.jpg',
  '/images/hero/hero-2.jpeg',
  '/images/hero/hero-3.jpg',
  '/images/hero/hero-4.jpg',
  '/images/hero/hero-5.jpg',
  '/images/hero/hero-6.jpg',
  '/images/hero/hero-7.jpg',
  '/images/hero/hero-8.jpg',
  '/images/hero/hero-9.jpg',
  '/images/hero/hero-10.jpg',
  '/images/hero/hero-11.jpg',
  '/images/hero/hero-12.jpg',
  '/images/hero/hero-13.jpg',
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background images with fade transition */}
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      {/* Fallback gradient if images don't load */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-teal-600" />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
          Plan Your Dream Vacation
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-md">
          Expert travel planning with personalized service to make your journey unforgettable
        </p>
        <Link href="/start-planning">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Planning Your Trip
          </Button>
        </Link>
      </div>
    </section>
  );
}
