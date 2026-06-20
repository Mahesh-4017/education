"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    role: "CEO",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus elementum magna ut duis pulvinar.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Manager",
    text: "Eget dui quis etiam sed eget sed est. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Alice Brown",
    role: "Designer",
    text: "Cursus elementum magna ut duis pulvinar tincidunt vivamus adipiscing elit.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonial-section">
      <div className="testimonial-header">
  <div className="header-accent"></div>
  <h2>Testimonials</h2>
  <p className="subtext">What people say about my work</p>
</div>

      <div className="slider-wrapper">
        <div className="slider" style={{ transform: `translateX(-${index * 100}%)` }}>
          {testimonials.map((item) => (
            <div className="card" key={item.id}>
              <div className="quote-mark">"</div>
              <p className="testimonial-text">{item.text}</p>
              <div className="user-info">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  width={48} 
                  height={48}
                  className="user-image"
                />
                <div className="user-details">
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="dots-container">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}