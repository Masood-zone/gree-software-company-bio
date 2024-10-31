"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface Point {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface Slide {
  id: number;
  heading: string;
  image: StaticImageData;
  description: string;
  points: Point[];
}

export default function AboutCarousel({ slides }: { slides: Slide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative min-h-[600px] px-6 py-6 md:px-12 lg:px-8">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-[45%] z-10 -translate-y-1/2 transform opacity-0 transition-all duration-300 hover:opacity-100 group"
          aria-label="Previous slide"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-300 group-hover:shadow-xl">
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-text-dark" />
          </div>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-5 top-[45%] z-10 -translate-y-1/2 transform opacity-0 transition-all duration-300 hover:opacity-100 group"
          aria-label="Next slide"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-300 group-hover:shadow-xl">
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-text-dark" />
          </div>
        </button>

        {/* Slides Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out space-x-8"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="min-w-full bg-gray-50 dark:bg-gray-700 rounded-3xl overflow-hidden p-5"
            >
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-text-dark">
                    {slide.heading}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-text-dark">
                    {slide.description}
                  </p>
                  <div className="space-y-4">
                    {slide.points.map((point) => (
                      <div
                        key={point.id}
                        className="flex items-start space-x-4"
                      >
                        <div className="flex-shrink-0">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100">
                            <Image
                              src={point.icon}
                              alt={point.title}
                              width={24}
                              height={24}
                              className="h-6 w-6"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-text-dark">
                            {point.title}
                          </h3>
                          <p className="mt-1 text-gray-600 dark:text-text-dark">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative lg:w-[600px] lg:h-[450px] flex items-center justify-center">
                  <Image
                    src={slide.image}
                    alt={slide.heading}
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={clsx(
                "h-2 w-2 rounded-full transition-all duration-300",
                currentSlide === index
                  ? "bg-cyan-500 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
