"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./TestimonialsCarousel.css";

const testimonials = [
  {
    id: 1,
    name: "Jane Doe",
    role: "CEO at TechCorp",
    text: "This platform completely changed how I approach learning. The courses are structured brilliantly and the instructors are world-class. I landed my dream job within 3 months.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "John Smith",
    role: "Product Manager",
    text: "I've tried many online learning platforms, but nothing compares to this. The live classes and mentorship made all the difference. Highly recommend to anyone serious about their career.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Alice Brown",
    role: "UI/UX Designer",
    text: "The UI/UX course was incredibly hands-on. I built a real portfolio during the course and got hired before I even finished. The community support is amazing.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Ravi Sharma",
    role: "Data Analyst",
    text: "The Data Science curriculum is up-to-date with industry standards. The projects gave me real experience that I could show in interviews. Worth every penny.",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    rating: 5,
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

  const active = testimonials[index];

  return (
    <section className="testimonialsSection">
      <div className="testimonialsContainer">

        {/* Left: Header + Nav */}
        <div className="testimonialsLeft">
          <div className="sectionLabelT">Student reviews</div>

          <h2 className="testimonialsTitle">
            What our students<br />are saying
          </h2>

          <p className="testimonialsSubtext">
            Thousands of learners have transformed their careers. Here&apos;s what a few of them have to say.
          </p>

          {/* Rating summary */}
          <div className="ratingRow">
            <span className="ratingStars">★★★★★</span>
            <span className="ratingValue">4.9</span>
            <span className="ratingCount">from 12,000+ reviews</span>
          </div>

          {/* Navigation dots */}
          <div className="testimonialDots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonialDot ${i === index ? "testimonialDotActive" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right: Active card + thumbnails */}
        <div className="testimonialsRight">

          {/* Main Active Card */}
          <div className="testimonialActiveCard">
            <div className="testimonialQuoteMark">&quot;</div>

            <p className="testimonialText">{active.text}</p>

            <div className="testimonialStars">
              {"★".repeat(active.rating)}
            </div>

            <div className="testimonialUser">
              <Image
                src={active.image}
                alt={active.name}
                width={52}
                height={52}
                className="testimonialUserImage"
              />
              <div>
                <h4 className="testimonialUserName">{active.name}</h4>
                <span className="testimonialUserRole">{active.role}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail row — other testimonials */}
          <div className="testimonialThumbs">
            {testimonials.map((item, i) => (
              i !== index && (
                <button
                  key={item.id}
                  className="testimonialThumb"
                  onClick={() => setIndex(i)}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="testimonialThumbImage"
                  />
                  <div className="testimonialThumbInfo">
                    <span className="testimonialThumbName">{item.name}</span>
                    <span className="testimonialThumbRole">{item.role}</span>
                  </div>
                </button>
              )
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}