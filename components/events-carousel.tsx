'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Event {
  id: number;
  type: 'Event' | 'Webinar' | 'Achievement';
  title: string;
  description: string;
  date: string;
  time: string;
  buttonText: string;
  gradient: string;
  textColor: string;
  buttonColor: string;
}

const events: Event[] = [
  {
    id: 1,
    type: 'Event',
    title: 'PCB Design Workshop',
    description: 'Learn cutting-edge PCB design techniques from industry experts',
    date: 'January 25, 2026',
    time: '2:00 PM - 4:00 PM',
    buttonText: 'Register Now',
    gradient: 'from-blue-500 to-blue-600',
    textColor: 'text-blue-100',
    buttonColor: 'bg-white text-blue-600 hover:bg-blue-50',
  },
  {
    id: 2,
    type: 'Webinar',
    title: 'Solar Solutions Summit',
    description: 'Discover sustainable energy solutions and cluster energy systems',
    date: 'February 5, 2026',
    time: '10:00 AM - 12:00 PM',
    buttonText: 'Register Now',
    gradient: 'from-green-500 to-green-600',
    textColor: 'text-green-100',
    buttonColor: 'bg-white text-green-600 hover:bg-green-50',
  },
  {
    id: 3,
    type: 'Achievement',
    title: 'Company Milestones',
    description: 'Celebrate our journey and success stories in innovation',
    date: 'February 12, 2026',
    time: '3:00 PM - 5:00 PM',
    buttonText: 'View Details',
    gradient: 'from-purple-500 to-purple-600',
    textColor: 'text-purple-100',
    buttonColor: 'bg-white text-purple-600 hover:bg-purple-50',
  },
  {
    id: 4,
    type: 'Event',
    title: 'Team Building Meetup',
    description: 'Details coming soon - Stay tuned for this exciting event',
    date: 'TBD',
    time: 'TBD',
    buttonText: 'Learn More',
    gradient: 'from-orange-500 to-orange-600',
    textColor: 'text-orange-100',
    buttonColor: 'bg-white text-orange-600 hover:bg-orange-50',
  },
  {
    id: 5,
    type: 'Webinar',
    title: 'Industry Insights Session',
    description: 'Details coming soon - Stay tuned for this exciting session',
    date: 'TBD',
    time: 'TBD',
    buttonText: 'Register',
    gradient: 'from-pink-500 to-pink-600',
    textColor: 'text-pink-100',
    buttonColor: 'bg-white text-pink-600 hover:bg-pink-50',
  },
  {
    id: 6,
    type: 'Achievement',
    title: 'Employee Recognition Program',
    description: 'Details coming soon - Celebrating our talented team members',
    date: 'TBD',
    time: 'TBD',
    buttonText: 'Learn More',
    gradient: 'from-indigo-500 to-indigo-600',
    textColor: 'text-indigo-100',
    buttonColor: 'bg-white text-indigo-600 hover:bg-indigo-50',
  },
];

export function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(true);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    setAutoPlay(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
    setAutoPlay(true);
  };

  const currentEvent = events[currentIndex];

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Company Events & Webinars</h2>

      {/* Carousel Container */}
      <div className="relative w-full">
        {/* Main Slide */}
        <div className="relative overflow-hidden rounded-lg shadow-2xl">
          <div
            className={`bg-gradient-to-br ${currentEvent.gradient} text-white p-8 rounded-lg transition-all duration-500`}
          >
            <div className="mb-4">
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                {currentEvent.type}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-3">{currentEvent.title}</h3>
            <p className={`${currentEvent.textColor} mb-6 text-lg`}>{currentEvent.description}</p>

            <div className={`text-sm ${currentEvent.textColor} mb-6 space-y-2`}>
              <p>📅 {currentEvent.date}</p>
              <p>🕐 {currentEvent.time}</p>
            </div>

            <Button
              className={`w-full md:w-auto px-8 py-2 text-base font-semibold rounded-md transition-all ${currentEvent.buttonColor}`}
            >
              {currentEvent.buttonText}
            </Button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-3 mt-6">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60 w-3'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
