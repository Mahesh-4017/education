'use client';

import React from 'react';
import styles from './learn.module.css';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  price: number | null; // null = free
  duration: string;
  students?: number;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'React.js Fundamentals',
    description: 'Master the core concepts of React, including hooks, state management, and component lifecycle. Perfect for beginners and those looking to solidify their foundation.',
    category: 'Programming',
    level: 'Beginner',
    instructor: 'Sarah Chen',
    price: null,
    duration: '6 weeks',
    students: 1240,
  },
  {
    id: '2',
    title: 'Next.js & Advanced Frontend Architecture',
    description: 'Deep dive into Next.js App Router, server components, API routes, and building scalable full-stack applications with TypeScript.',
    category: 'Programming',
    level: 'Advanced',
    instructor: 'Marcus Wright',
    price: 49.99,
    duration: '8 weeks',
    students: 834,
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user-centered design, typography, color theory, and wireframing. No design background required.',
    category: 'Design',
    level: 'Beginner',
    instructor: 'Alex Rivera',
    price: null,
    duration: '4 weeks',
    students: 2105,
  },
  {
    id: '4',
    title: 'CSS Grid & Flexbox Mastery',
    description: 'Build responsive, modern layouts with deep knowledge of CSS Grid and Flexbox. Create pixel-perfect designs that work across all devices.',
    category: 'Programming',
    level: 'Intermediate',
    instructor: 'Jordan Lee',
    price: 29.99,
    duration: '3 weeks',
    students: 1567,
  },
  {
    id: '5',
    title: 'TypeScript for Production Apps',
    description: 'Master TypeScript from basics to advanced patterns. Learn generics, decorators, and best practices for large-scale applications.',
    category: 'Programming',
    level: 'Intermediate',
    instructor: 'Casey Morgan',
    price: 39.99,
    duration: '6 weeks',
    students: 921,
  },
  {
    id: '6',
    title: 'Animation in Web Design',
    description: 'Create stunning animations and micro-interactions using CSS, JavaScript, and libraries like Framer Motion. Bring your designs to life.',
    category: 'Design',
    level: 'Intermediate',
    instructor: 'Emma Johnson',
    price: null,
    duration: '5 weeks',
    students: 1389,
  },
  {
    id: '7',
    title: 'Building APIs with Node.js & Express',
    description: 'Design and build robust REST APIs with authentication, validation, error handling, and deployment. Perfect foundation for backend development.',
    category: 'Programming',
    level: 'Intermediate',
    instructor: 'David Kumar',
    price: 44.99,
    duration: '7 weeks',
    students: 1098,
  },
  {
    id: '8',
    title: 'Web Performance & Optimization',
    description: 'Optimize your web applications for speed. Learn about Core Web Vitals, image optimization, code splitting, and caching strategies.',
    category: 'Programming',
    level: 'Advanced',
    instructor: 'Sophie Laurent',
    price: null,
    duration: '4 weeks',
    students: 756,
  },
];

export default function LearnPage() {
  const paidCourses = courses.filter(c => c.price !== null).length;
  const freeCourses = courses.filter(c => c.price === null).length;

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Learn & Master Your Skills</h1>
          <p className={styles.subtitle}>
            Explore our curated collection of courses designed to help you grow as a developer and designer. 
            From fundamentals to advanced topics, we&apos;ve got you covered.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{courses.length}</span>
              <span className={styles.statLabel}>Courses</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{freeCourses}</span>
              <span className={styles.statLabel}>Free Courses</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50K+</span>
              <span className={styles.statLabel}>Students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className={styles.coursesSection}>
        <h2 className={styles.coursesTitle}>All Courses</h2>
        <div className={styles.grid}>
          {courses.map((course) => (
            <div key={course.id} className={styles.card}>
  <div className={styles.cardTop}>
    <div className={styles.badges}>
      <span className={styles.badge}>{course.level}</span>
      <span className={styles.badgeCategory}>{course.category}</span>
    </div>

    <div className={styles.priceSection}>
      {course.price === null ? (
        <span className={styles.free}>FREE</span>
      ) : (
        <span className={styles.price}>${course.price}</span>
      )}
    </div>
  </div>

  <h3 className={styles.cardTitle}>{course.title}</h3>

  <p className={styles.cardDescription}>
    {course.description}
  </p>

  <div className={styles.cardMeta}>
    <div className={styles.metaBlock}>
      <span className={styles.metaLabel}>Instructor</span>
      <span className={styles.metaValue}>{course.instructor}</span>
    </div>

    <div className={styles.metaBlock}>
      <span className={styles.metaLabel}>Duration</span>
      <span className={styles.metaValue}>{course.duration}</span>
    </div>

    <div className={styles.metaBlock}>
      <span className={styles.metaLabel}>Students</span>
      <span className={styles.metaValue}>
        {course.students?.toLocaleString()}
      </span>
    </div>
  </div>

  <button className={styles.cta}>
    Enroll Course →
  </button>
</div>
          ))}
        </div>
      </div>
    </div>
  );
}