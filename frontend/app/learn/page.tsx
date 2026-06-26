'use client';

import React, { useState } from 'react';
import styles from './learn.module.css';

/* ── Data ── */
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  instructor: string;
  price: number | null;
  duration: string;
  students?: number;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'React.js Fundamentals',
    description:
      'Master the core concepts of React, including hooks, state management, and component lifecycle. Perfect for beginners and those looking to solidify their foundation.',
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
    description:
      'Deep dive into Next.js App Router, server components, API routes, and building scalable full-stack applications with TypeScript.',
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
    description:
      'Learn the fundamentals of user-centered design, typography, color theory, and wireframing. No design background required.',
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
    description:
      'Build responsive, modern layouts with deep knowledge of CSS Grid and Flexbox. Create pixel-perfect designs that work across all devices.',
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
    description:
      'Master TypeScript from basics to advanced patterns. Learn generics, decorators, and best practices for large-scale applications.',
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
    description:
      'Create stunning animations and micro-interactions using CSS, JavaScript, and libraries like Framer Motion. Bring your designs to life.',
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
    description:
      'Design and build robust REST APIs with authentication, validation, error handling, and deployment. Perfect foundation for backend development.',
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
    description:
      'Optimize your web applications for speed. Learn about Core Web Vitals, image optimization, code splitting, and caching strategies.',
    category: 'Programming',
    level: 'Advanced',
    instructor: 'Sophie Laurent',
    price: null,
    duration: '4 weeks',
    students: 756,
  },
];

const paths = [
  {
    icon: '🖥️',
    name: 'Frontend Developer',
    desc: 'Go from zero to shipping polished UIs with React, CSS, and TypeScript.',
    courses: 4,
    duration: '18 weeks',
    color: '#1d9e75',
    bg: '#e1f5ee',
  },
  {
    icon: '🎨',
    name: 'UI/UX Designer',
    desc: 'Learn design thinking, tools, and prototyping to create user-first experiences.',
    courses: 3,
    duration: '12 weeks',
    color: '#7c3aed',
    bg: '#ede9fe',
  },
  {
    icon: '⚡',
    name: 'Full-Stack Engineer',
    desc: 'Build end-to-end apps — frontend, APIs, databases, and deployment.',
    courses: 6,
    duration: '28 weeks',
    color: '#ea580c',
    bg: '#fff7ed',
  },
  {
    icon: '🚀',
    name: 'Performance Expert',
    desc: 'Master Core Web Vitals, caching, and rendering patterns for blazing-fast sites.',
    courses: 2,
    duration: '8 weeks',
    color: '#0284c7',
    bg: '#e0f2fe',
  },
];

const steps = [
  {
    num: '1',
    title: 'Choose your path',
    desc: 'Pick a learning path or browse individual courses that match your goals.',
  },
  {
    num: '2',
    title: 'Learn at your pace',
    desc: 'Watch lessons, complete projects, and revisit concepts whenever you need.',
  },
  {
    num: '3',
    title: 'Build real projects',
    desc: 'Apply what you learn with hands-on projects that go straight into your portfolio.',
  },
  {
    num: '4',
    title: 'Get certified',
    desc: 'Earn a shareable certificate to showcase your skills to employers.',
  },
];

const instructors = [
  { name: 'Sarah Chen', role: 'Senior React Engineer', courses: 3, students: '4.2K', initials: 'SC', color: '#1d9e75' },
  { name: 'Marcus Wright', role: 'Full-Stack Architect', courses: 2, students: '3.8K', initials: 'MW', color: '#7c3aed' },
  { name: 'Alex Rivera', role: 'Lead UX Designer', courses: 2, students: '5.1K', initials: 'AR', color: '#ea580c' },
  { name: 'Jordan Lee', role: 'CSS Specialist', courses: 1, students: '2.9K', initials: 'JL', color: '#0284c7' },
];

const testimonials = [
  {
    text: "The React course completely changed how I approach frontend development. The projects were challenging but the explanations made everything click. Got my first dev job three months after finishing.",
    name: 'Priya Nair',
    meta: 'Junior Frontend Dev at Razorpay',
    color: '#1d9e75',
    initials: 'PN',
  },
  {
    text: "I've tried a dozen platforms. This is the first place where the quality of instruction actually matches the marketing. Marcus's Next.js course alone was worth every rupee.",
    name: 'Arjun Mehta',
    meta: 'Freelance Developer',
    color: '#7c3aed',
    initials: 'AM',
  },
  {
    text: "As someone switching from graphic design to UI/UX, I needed a course that bridged both worlds. Alex's course did exactly that — I finished with a portfolio and a job offer.",
    name: 'Divya Sharma',
    meta: 'Product Designer at Swiggy',
    color: '#ea580c',
    initials: 'DS',
  },
  {
    text: "The TypeScript course saved my team countless hours. Real-world patterns, not toy examples. We've since refactored our entire codebase using what I learned here.",
    name: 'Rohan Kapoor',
    meta: 'Tech Lead at Zepto',
    color: '#0284c7',
    initials: 'RK',
  },
  {
    text: "Free courses that are actually good? I was skeptical. The React Fundamentals course changed my mind — it's more thorough than paid alternatives I've purchased.",
    name: 'Meera Iyer',
    meta: 'CS Student, IIT Bombay',
    color: '#1d9e75',
    initials: 'MI',
  },
  {
    text: "The certificate I earned here helped me negotiate a 30% salary bump. My manager was impressed by the project quality, and it opened a conversation about growth that hadn't happened before.",
    name: 'Karan Bhatia',
    meta: 'Frontend Engineer at PhonePe',
    color: '#7c3aed',
    initials: 'KB',
  },
];

const faqs = [
  {
    q: 'Are the free courses really free — no hidden fees?',
    a: "Yes, completely. Free courses are free forever — no credit card required, no trial period. We offer paid courses for advanced topics, but a meaningful chunk of the library will always stay free.",
  },
  {
    q: 'Do I get a certificate after completing a course?',
    a: 'Every course comes with a shareable completion certificate you can add to your LinkedIn profile or resume. Certificates include your name, course title, and the date you completed it.',
  },
  {
    q: 'How long do I have access to a course after enrolling?',
    a: 'Lifetime access. Once you enroll, the course and any future updates are yours. We update courses regularly as technologies evolve, and those updates come at no extra charge.',
  },
  {
    q: 'What if I get stuck or have a question?',
    a: "Each course has a community forum where instructors and fellow students answer questions, usually within 24 hours. Paid courses also include direct messaging with your instructor.",
  },
  {
    q: 'Can I get a refund if the course isn\'t right for me?',
    a: 'We offer a 30-day money-back guarantee on all paid courses, no questions asked. Just reach out through the support page and we\'ll process your refund within 2 business days.',
  },
  {
    q: 'Do courses have prerequisites?',
    a: 'Each course page lists its prerequisites clearly. Beginner courses assume no prior experience. Intermediate and Advanced courses link to the foundational courses we recommend first.',
  },
];

/* ── Helpers ── */
const levelBadgeClass: Record<Course['level'], string> = {
  Beginner: 'badgeBeginner',
  Intermediate: 'badgeIntermediate',
  Advanced: 'badgeAdvanced',
};

const FILTERS = ['All', 'Programming', 'Design', 'Free', 'Paid'];

export default function LearnPage() {
  const freeCourses = courses.filter((c) => c.price === null).length;
  const totalStudents = courses.reduce((a, c) => a + (c.students ?? 0), 0);
  const [activeFilter, setActiveFilter] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = courses.filter((c) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Free') return c.price === null;
    if (activeFilter === 'Paid') return c.price !== null;
    return c.category === activeFilter;
  });

  return (
    <div className={styles.container}>

      {/* ── 1. HERO ── */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>✦ New courses added every month</div>
          <h1 className={styles.title}>
            Learn &amp; <span>Master</span> Your Skills
          </h1>
          <p className={styles.subtitle}>
            Curated courses for developers and designers — from first principles to
            production-grade patterns. Learn at your own pace, build real projects.
          </p>
          <div className={styles.heroCtas}>
            <button className={styles.btnPrimary}>Browse all courses →</button>
            <button className={styles.btnSecondary}>View learning paths</button>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{courses.length}</span>
              <span className={styles.statLabel}>Courses</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{freeCourses}</span>
              <span className={styles.statLabel}>Free</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{(totalStudents / 1000).toFixed(1)}K</span>
              <span className={styles.statLabel}>Students</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4.8★</span>
              <span className={styles.statLabel}>Avg rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. LEARNING PATHS ── */}
      <div className={styles.pathsSection}>
        <p className={styles.sectionEyebrow}>Structured learning</p>
        <h2 className={styles.sectionTitle}>Pick a learning path</h2>
        <p className={styles.sectionSubtitle}>
          Not sure where to start? Paths bundle courses into a focused curriculum with a clear outcome.
        </p>
        <div className={styles.pathsGrid}>
          {paths.map((p) => (
            <div
              key={p.name}
              className={styles.pathCard}
              style={{ '--pathColor': p.color, '--pathBg': p.bg } as React.CSSProperties}
            >
              <div className={styles.pathIcon} style={{ background: p.bg }}>
                {p.icon}
              </div>
              <h3 className={styles.pathName}>{p.name}</h3>
              <p className={styles.pathDesc}>{p.desc}</p>
              <div className={styles.pathMeta}>
                <span className={styles.pathTag}>{p.courses} courses</span>
                <span className={styles.pathTag}>{p.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. COURSES GRID ── */}
      <div className={styles.coursesSection}>
        <div className={styles.coursesSectionInner}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.sectionEyebrow}>The library</p>
              <h2 className={styles.sectionTitle}>All courses</h2>
            </div>
            <span className={styles.courseCount}>{filtered.length} courses</span>
          </div>

          {/* Filter tabs */}
          <div className={styles.filterRow}>
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`${styles.filterBtn} ${activeFilter === f ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filtered.map((course) => (
              <div key={course.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.badges}>
                    <span
                      className={`${styles.badge} ${styles[levelBadgeClass[course.level] as keyof typeof styles]}`}
                    >
                      {course.level}
                    </span>
                    <span className={styles.badgeCategory}>{course.category}</span>
                  </div>
                  <div className={styles.priceSection}>
                    {course.price === null ? (
                      <span className={styles.free}>Free</span>
                    ) : (
                      <span className={styles.price}>${course.price}</span>
                    )}
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{course.title}</h3>
                <p className={styles.cardDescription}>{course.description}</p>
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
                    <span className={styles.metaValue}>{course.students?.toLocaleString()}</span>
                  </div>
                </div>
                <button className={styles.cta}>Enroll now →</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. HOW IT WORKS ── */}
      <div className={styles.howSection}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className={styles.sectionEyebrow}>The process</p>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <p className={styles.sectionSubtitle} style={{ margin: '0 auto' }}>
            From day one to job-ready in four straightforward steps.
          </p>
        </div>
        <div className={styles.stepsGrid}>
          {steps.map((s) => (
            <div key={s.num} className={styles.step}>
              <div className={styles.stepNum}>{s.num}</div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. INSTRUCTORS ── */}
      <div className={styles.instructorsSection}>
        <div className={styles.instructorsSectionInner}>
          <div style={{ marginBottom: 48 }}>
            <p className={styles.sectionEyebrow}>Who teaches here</p>
            <h2 className={styles.sectionTitle}>Meet the instructors</h2>
            <p className={styles.sectionSubtitle}>
              Practitioners, not theorists. Every instructor works in the industry and teaches from real-world experience.
            </p>
          </div>
          <div className={styles.instructorsGrid}>
            {instructors.map((inst) => (
              <div key={inst.name} className={styles.instructorCard}>
                <div
                  className={styles.instructorAvatar}
                  style={{ '--avatarBg': inst.color } as React.CSSProperties}
                >
                  {inst.initials}
                </div>
                <h3 className={styles.instructorName}>{inst.name}</h3>
                <p className={styles.instructorRole}>{inst.role}</p>
                <div className={styles.instructorStats}>
                  <div className={styles.iStat}>
                    <span className={styles.iStatNum}>{inst.courses}</span>
                    <span className={styles.iStatLabel}>Courses</span>
                  </div>
                  <div className={styles.iStat}>
                    <span className={styles.iStatNum}>{inst.students}</span>
                    <span className={styles.iStatLabel}>Students</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6. TESTIMONIALS ── */}
      <div className={styles.testimonialsSection}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p className={styles.sectionEyebrow}>Student outcomes</p>
          <h2 className={styles.sectionTitle}>What students say</h2>
          <p className={styles.sectionSubtitle} style={{ margin: '0 auto' }}>
            Real results from people who were exactly where you are now.
          </p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.testimonialCard}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testimonialText}>&quot;{t.text}&quot;</p>
              <div className={styles.testimonialAuthor}>
                <div
                  className={styles.authorAvatar}
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorMeta}>{t.meta}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. FAQ ── */}
      <div className={styles.faqSection}>
        <div className={styles.faqSectionInner}>
          <div className={styles.faqHeader}>
            <p className={styles.sectionEyebrow}>Got questions?</p>
            <h2 className={styles.sectionTitle}>Frequently asked</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span
                    className={`${styles.faqIcon} ${openFaq === i ? styles.faqIconOpen : ''}`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p className={styles.faqAnswer}>{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8. CTA BANNER ── */}
      <div className={styles.ctaBanner}>
        <h2 className={styles.ctaTitle}>
          Start learning <span>today</span> — for free
        </h2>
        <p className={styles.ctaSubtitle}>
          No credit card. No commitments. Just pick a course and start building.
        </p>
        <div className={styles.ctaBtns}>
          <button className={styles.ctaBtnPrimary}>Browse free courses →</button>
          <button className={styles.ctaBtnGhost}>See all learning paths</button>
        </div>
      </div>

    </div>
  );
}