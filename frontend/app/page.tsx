"use client";
import Image from "next/image";
import {
  ShieldCheck,
  Brain,
  BadgeCheck,
  Star,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Play,
  Briefcase,
  Clock,
  Zap,
  LucideIcon,
  ChevronDown,
} from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel/TestimonialsCarousel";
import { useState } from "react";

interface Course {
  id: number;
  title: string;
  desc: string;
  image: string;
  rating: number;
  students: string;
  duration?: string;
  tag: string;
  tone: "tone-green" | "tone-amber" | "tone-red";
  icon: string;
  iconTone: "tone-green" | "tone-amber" | "tone-red" | "tone-purple";
  level?: "Beginner" | "Intermediate" | "Advanced";
}

interface Benefit {
  icon: LucideIcon;
  title: string;
  text: string;
  tone: "tone-green" | "tone-amber";
}

interface ProcessStep {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
}

interface Stat {
  value: string;
  label: string;
}

interface Partner {
  id: number;
  name: string;
  logo: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedCourse {
  id: number;
  title: string;
  image: string;
  price: string;
}


const COURSES: Course[] = [
  {
    id: 1,
    title: "Web Development",
    desc: "HTML, CSS, JavaScript & React",
    image: "/Images/images1.jfif",
    rating: 4.9,
    students: "12.4k",
    duration: "24 weeks",
    tag: "Popular",
    tone: "tone-green",
    icon: "💻",
    iconTone: "tone-green",
    level: "Beginner",
  },
  {
    id: 2,
    title: "Data Science & AI",
    desc: "Python, Machine Learning & Neural Networks",
    image: "/Images/images6.jfif",
    rating: 4.8,
    students: "9.1k",
    duration: "20 weeks",
    tag: "Trending",
    tone: "tone-amber",
    icon: "🧠",
    iconTone: "tone-amber",
    level: "Intermediate",
  },
  {
    id: 3,
    title: "UI/UX Design",
    desc: "Figma, Prototyping & User Research",
    image: "/Images/images5.jpg",
    rating: 4.7,
    students: "7.3k",
    duration: "16 weeks",
    tag: "New",
    tone: "tone-green",
    icon: "🎨",
    iconTone: "tone-green",
    level: "Beginner",
  },
  {
    id: 4,
    title: "Digital Marketing",
    desc: "SEO, Social Media & Growth Strategy",
    image: "/Images/images4.jfif",
    rating: 4.8,
    students: "8.5k",
    duration: "12 weeks",
    tag: "Popular",
    tone: "tone-green",
    icon: "📊",
    iconTone: "tone-purple",
    level: "Beginner",
  },
  {
    id: 5,
    title: "Cyber Security",
    desc: "Protect systems and networks from threats",
    image: "/Images/images3.jfif",
    rating: 4.9,
    students: "5.6k",
    duration: "18 weeks",
    tag: "Hot",
    tone: "tone-red",
    icon: "🛡️",
    iconTone: "tone-red",
    level: "Advanced",
  },
  {
    id: 6,
    title: "Mobile App Dev",
    desc: "Build Android & iOS applications",
    image: "/Images/images2.jfif",
    rating: 4.8,
    students: "6.2k",
    duration: "22 weeks",
    tag: "New",
    tone: "tone-green",
    icon: "📱",
    iconTone: "tone-green",
    level: "Intermediate",
  },
];

const BENEFITS: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "Certified Courses",
    text: "Earn industry-recognized certificates after successfully completing your course.",
    tone: "tone-green",
  },
  {
    icon: Brain,
    title: "Learn Anywhere",
    text: "Access your courses anytime on desktop, tablet, or mobile devices.",
    tone: "tone-amber",
  },
  {
    icon: BadgeCheck,
    title: "Expert Instructors",
    text: "Learn from experienced professionals and industry-leading mentors.",
    tone: "tone-green",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    text: "Follow a well-structured curriculum designed to build practical skills step by step.",
    tone: "tone-amber",
  },
  {
    icon: Users,
    title: "Community Support",
    text: "Join a community of learners, ask questions, and collaborate with peers.",
    tone: "tone-green",
  },
  {
    icon: Briefcase,
    title: "Career Opportunities",
    text: "Gain job-ready skills, build your portfolio, and prepare for career growth.",
    tone: "tone-amber",
  },
];

const STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Choose a course",
    text: "Browse 120+ expert-led courses across tech, design, and business.",
    icon: BookOpen,
  },
  {
    number: "02",
    title: "Learn at your pace",
    text: "Watch lessons, complete projects, and practice with real assignments.",
    icon: Play,
  },
  {
    number: "03",
    title: "Get certified",
    text: "Earn a certificate and showcase your skills to employers worldwide.",
    icon: Award,
  },
];

const PARTNERS: Partner[] = [
  { id: 1, name: "Java", logo: "/Images/java.png" },
  { id: 2, name: "Python", logo: "/Images/python.png" },
  { id: 3, name: "MySQL", logo: "/Images/mysql.png" },
  { id: 4, name: "JavaScript", logo: "/Images/javascript.png" },
  { id: 5, name: "HTML", logo: "/Images/html.png" },
  { id: 6, name: "CSS", logo: "/Images/css.png" },
  { id: 7, name: "PHP", logo: "/Images/php.png" },
  { id: 8, name: "TypeScript", logo: "/Images/typescript.png" },
  { id: 9, name: "Swift", logo: "/Images/swift.png" },
];

const STATS: Stat[] = [
  { value: "40k+", label: "Active Students" },
  { value: "120+", label: "Expert Courses" },
  { value: "4.9★", label: "Average Rating" },
  { value: "95%", label: "Job Placement" },
];

const FAQS: FAQ[] = [
  {
    question: "Do I need any prior experience?",
    answer:
      "No. This course is beginner-friendly and starts from the fundamentals.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. You'll receive a certificate after successfully completing the course.",
  },
  {
    question: "How long will I have access?",
    answer:
      "You'll get lifetime access to all course materials and future updates.",
  },
  {
    question: "Can I access the course on mobile?",
    answer:
      "Yes. Learn anytime using your desktop, tablet, or mobile device.",
  },
];

const RELATED_COURSES: RelatedCourse[] = [
  { id: 1, title: "Python Masterclass", image: "/Images/python.png", price: "$49" },
  { id: 2, title: "PHP Complete Guide", image: "/Images/php.png", price: "$59" },
  { id: 3, title: "JavaScript Essentials", image: "/Images/javascript.png", price: "$39" },
];


function SectionHeader({
  label,
  title,
  subtitle,
  action,
}: {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={action ? "sectionHeaderRow" : undefined}>
      <div>
        <div className="sectionLabel">{label}</div>
        <h2 className="sectionTitle">{title}</h2>
        {subtitle && <p className="sectionSubtitle">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ============================================================================
// HOME PAGE
// ============================================================================

export default function Home() {
  const triplePartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="heroSection">
        <div className="floatingBox1" />
        <div className="floatingBox2" />

        <div className="container">
          <div className="heroInner">
            <div className="heroContent">
              <div className="accentBar" />

              <h1 className="heroTitle">
                Learn skills that
                <br />
                build your <span className="heroHighlight">future</span>
              </h1>

              <p className="heroDesc">
                Join 40,000+ students learning technology, design, and business
                from real industry professionals — at your own pace.
              </p>

              <div className="heroActions">
                <button className="btnEnroll">
                  Enroll now <ArrowRight size={16} />
                </button>
                <button className="btnBrowse">Browse courses</button>
              </div>

              <div className="heroStats">
                {STATS.map((stat) => (
                  <div className="heroStatItem" key={stat.label}>
                    <span className="heroStatValue">{stat.value}</span>
                    <span className="heroStatLabel">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="imageWrapper">
              <Image
                src="/notion1.png"
                alt="Hero Image"
                width={500}
                height={400}
                className="heroImage"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRUSTED BY ========== */}
      <section className="trustedBySection">
        <div className="container">
          <p className="trustedByLabel">Trusted By</p>
          <h2 className="trustedByTitle sectionTitle">
            Trusted by companies around the world
          </h2>
        </div>

        <div className="trustedByMarqueeWrapper">
          <div className="trustedByMarqueeContent">
            {triplePartners.map((partner, index) => (
              <div className="partnerLogoItem" key={`${partner.id}-${index}`}>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={80}
                  height={80}
                  className="partnerLogo"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BENEFITS ========== */}
      <section className="benefitsSection">
        <div className="container">
          <SectionHeader
            label="Why Choose Us"
            title={
              <>
                Everything You Need to <br /> Succeed in Your Learning Journey
              </>
            }
          />
          <p className="sectionDescription">
            Learn from industry experts, earn recognized certifications, and
            access high-quality courses anytime, anywhere. We provide the
            tools and support you need to achieve your career goals.
          </p>

          <div className="benefitsGrid">
            {BENEFITS.map(({ icon: Icon, title, text, tone }) => (
              <div className="benefitCard" key={title}>
                <div className={`benefitIconWrap ${tone}`}>
                  <Icon size={22} />
                </div>
                <h3 className="benefitTitle">{title}</h3>
                <p className="benefitText">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROCESS ========== */}
      <section className="processSection">
        <div className="container">
          <div className="processLayout">
            <div className="processLeft">
              <SectionHeader
                label="How it works"
                title={
                  <>
                    Three steps to your
                    <br />
                    next opportunity
                  </>
                }
                subtitle="A simple, guided journey from beginner to job-ready — no experience needed."
              />

              <div className="stepsList">
                {STEPS.map(({ number, title, text, icon: Icon }) => (
                  <div className="stepItem" key={number}>
                    <div className="stepNumber">{number}</div>
                    <div className="stepBody">
                      <div className="stepIconRow">
                        <Icon size={16} />
                        <h3 className="stepTitle">{title}</h3>
                      </div>
                      <p className="stepText">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="processRight">
              <div className="processImageWrap">
                <Image
                  src="/kids1.png"
                  alt="Students learning"
                  width={560}
                  height={480}
                  className="processImg"
                />

                <div className="processFloatCard">
                  <div className="floatCardRow">
                    <div className="floatAvatars">
                      <span className="floatAvatar">A</span>
                      <span className="floatAvatar">B</span>
                      <span className="floatAvatar">C</span>
                    </div>
                    <div>
                      <p className="floatCardValue">2,400+</p>
                      <p className="floatCardLabel">enrolled this month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== COURSES ========== */}
      <section className="coursesSection">
        <div className="container">
          <SectionHeader
            label="What you'll learn"
            title="Popular courses"
            subtitle="Master in-demand skills with expert instructors"
            action={
              <button className="viewAllBtn">
                View all courses
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            }
          />

          <div className="coursesGrid">
            {COURSES.map((course) => (
              <div className="courseCard" key={course.id}>
                <div className="courseImageContainer">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={220}
                    className="courseImage"
                    priority={course.id <= 3}
                  />

                  <div className="imageOverlay">
                    <button className="exploreBtn">
                      Explore
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  <span className={`courseTag ${course.tone}`}>
                    {course.tag}
                  </span>

                  {course.level && (
                    <span
                      className={`courseLevelBadge level-${course.level.toLowerCase()}`}
                    >
                      {course.level}
                    </span>
                  )}
                </div>

                <div className="courseCardContent">
                  <div className="courseCardHeader">
                    <div className={`courseIcon ${course.iconTone}`}>
                      {course.icon}
                    </div>
                    <h3 className="courseCardTitle">{course.title}</h3>
                  </div>

                  <p className="courseCardDesc">{course.desc}</p>

                  <div className="courseMetaSection">
                    <div className="metaItem">
                      <Star size={14} className="metaIcon" />
                      <span className="metaText">{course.rating}</span>
                    </div>
                    <div className="metaItem">
                      <Users size={14} className="metaIcon" />
                      <span className="metaText">{course.students}</span>
                    </div>
                    {course.duration && (
                      <div className="metaItem">
                        <Clock size={14} className="metaIcon" />
                        <span className="metaText">{course.duration}</span>
                      </div>
                    )}
                  </div>

                  <button className="enrollBtn">
                    Enroll now
                    <Zap size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <TestimonialsCarousel />

      {/* ========== FAQ ========== */}
      <section className="faqSection">
        <div className="container">
          <SectionHeader
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before enrolling."
          />

          <div className="faqList">
            {FAQS.map((item, index) => (
              <div className="faqItem" key={item.question}>
                <button
                  className="faqQuestion"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  {item.question}
                  <ChevronDown
                    size={18}
                    className={openFaq === index ? "rotate" : ""}
                  />
                </button>

                {openFaq === index && (
                  <div className="faqAnswer">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RELATED COURSES ========== */}
      <section className="relatedSection">
        <div className="container">
          <SectionHeader
            label="Related Courses"
            title="Continue Your Learning Journey"
          />

          <div className="relatedGrid">
            {RELATED_COURSES.map((course) => (
              <div className="relatedCard" key={course.id}>
                <Image
                  src={course.image}
                  alt={course.title}
                  width={350}
                  height={200}
                  className="relatedImage"
                />
                <div className="relatedBody">
                  <h3>{course.title}</h3>
                  <p>{course.price}</p>
                  <button className="courseBtn">View Course</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="courseCTA">
        <div className="container">
          <div className="ctaBox">
            <h2>Ready to Start Learning?</h2>
            <p>
              Join thousands of students learning new skills every day.
              Enroll now and start building your future.
            </p>

            <div className="ctaButtons">
              <button className="btnPrimary">Enroll Now</button>
              <button className="btnSecondary">
                Browse Courses
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}