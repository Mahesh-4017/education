// =========================
// IMPORTS
// =========================
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
  CheckCircle2,
  Play,
} from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel/TestimonialsCarousel";
import { Clock, Zap } from "lucide-react";

interface Course {
  id: number;
  title: string;
  desc: string;
  image: string;
  rating: number;
  students: string;
  duration?: string;
  tag: string;
  tagColor: string;
  icon: string;
  iconBg: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
}

// =========================
// COURSES DATA
// =========================
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
    tagColor: "tagBlue",
    icon: "💻",
    iconBg: "iconBgBlue",
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
    tagColor: "tagAmber",
    icon: "🧠",
    iconBg: "iconBgAmber",
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
    tagColor: "tagGreen",
    icon: "🎨",
    iconBg: "iconBgGreen",
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
    tagColor: "tagBlue",
    icon: "📊",
    iconBg: "iconBgPurple",
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
    tagColor: "tagRed",
    icon: "🛡️",
    iconBg: "iconBgRed",
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
    tagColor: "tagGreen",
    icon: "📱",
    iconBg: "iconBgTeal",
    level: "Intermediate",
  },
];

// =========================
// PRICING PLANS DATA
// =========================
const PLANS = [
  {
    id: 1,
    name: "Basic",
    newPrice: "$19",
    oldPrice: "$39",
    desc: "Perfect for beginners starting their learning journey",
    features: [
      "Access to 10 courses",
      "Student Community",
      "Download Notes",
      "Basic Support",
    ],
  },
  {
    id: 2,
    name: "Pro",
    newPrice: "$49",
    oldPrice: "$89",
    desc: "Best for serious learners who want results",
    features: [
      "Unlimited Courses",
      "Live Classes",
      "Assignments & Projects",
      "Certificates",
      "Priority Support",
    ],
    featured: true,
  },
  {
    id: 3,
    name: "Academy",
    newPrice: "$99",
    oldPrice: "$149",
    desc: "Complete solution with career support",
    features: [
      "Everything in Pro",
      "1-on-1 Mentorship",
      "Career Guidance",
      "Internship Support",
      "Placement Assistance",
    ],
  },
];

// =========================
// BENEFITS DATA
// =========================
const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Certified Courses",
    text: "Earn industry-recognized certificates after completing your course.",
    color: "benefitBlue",
  },
  {
    icon: Brain,
    title: "Learn Anywhere",
    text: "Access all your courses anytime from desktop, tablet, or mobile.",
    color: "benefitAmber",
  },
  {
    icon: BadgeCheck,
    title: "Expert Instructors",
    text: "Learn directly from experienced professionals and top mentors.",
    color: "benefitGreen",
  },
];

// =========================
// STEPS DATA
// =========================
const STEPS = [
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

// =========================
// STATS DATA
// =========================
const STATS = [
  { value: "40k+", label: "Active Students" },
  { value: "120+", label: "Expert Courses" },
  { value: "4.9★", label: "Average Rating" },
  { value: "95%", label: "Job Placement" },
];

const STATS_BANNER = [
  {
    value: "40,000+",
    label: "Active Students",
    icon: Users,
    color: "statBlue",
  },
  {
    value: "120+",
    label: "Expert Courses",
    icon: BookOpen,
    color: "statAmber",
  },
  {
    value: "4.9 / 5",
    label: "Average Rating",
    icon: Star,
    color: "statYellow",
  },
  {
    value: "95%",
    label: "Job Placement",
    icon: Award,
    color: "statGreen",
  },
  {
    value: "50+",
    label: "Expert Instructors",
    icon: BadgeCheck,
    color: "statPurple",
  },
];

// =========================
// HOME PAGE COMPONENT
// =========================
export default function Home() {
  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="heroSection">
        {/* Decorative background blobs */}
        <div className="floatingBox1" />
        <div className="floatingBox2" />

        <div className="container">
          <div className="heroInner">
            {/* Left: Text Content */}
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

              {/* Stats Row */}
              <div className="heroStats">
                {STATS.map((s, i) => (
                  <div className="heroStatItem" key={i}>
                    <span className="heroStatValue">{s.value}</span>
                    <span className="heroStatLabel">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Hero Image */}
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

      {/* ================= BENEFITS SECTION ================= */}
      <section className="benefitsSection">
        <div className="container">
          <div className="sectionLabel">Why students choose us</div>

          <div className="benefitsGrid">
            {BENEFITS.map(({ icon: Icon, title, text, color }) => (
              <div className={`benefitCard ${color}`} key={title}>
                <div className="benefitIconWrap">
                  <Icon size={22} />
                </div>
                <h3 className="benefitTitle">{title}</h3>
                <p className="benefitText">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS SECTION ================= */}
      <section className="processSection">
        <div className="container">
          <div className="processLayout">
            {/* Left */}
            <div className="processLeft">
              <div className="sectionLabel">How it works</div>
              <h2 className="processTitle">
                Three steps to your
                <br />
                next opportunity
              </h2>
              <p className="processSubtitle">
                A simple, guided journey from beginner to job-ready — no
                experience needed.
              </p>

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

            {/* Right: Image with overlay card */}
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

      {/* ================= COURSES SECTION ================= */}
      <section className="coursesSection">
        <div className="container">
          {/* Header */}
          <div className="coursesSectionHeader">
            <div>
              <div className="sectionLabel">What you&apos;ll learn</div>
              <h2 className="coursesTitle">Popular courses</h2>
              <p className="coursesSubtitle">
                Master in-demand skills with expert instructors
              </p>
            </div>
            <button className="viewAllBtn">
              View all courses
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Responsive Grid */}
          <div className="coursesGrid">
            {COURSES.map((course) => (
              <div className="courseCard" key={course.id}>
                {/* Image Section */}
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

                  {/* Tag */}
                  <span className={`courseTag ${course.tagColor}`}>
                    {course.tag}
                  </span>

                  {/* Level Badge */}
                  {course.level && (
                    <span
                      className={`courseLevelBadge level-${course.level.toLowerCase()}`}
                    >
                      {course.level}
                    </span>
                  )}
                </div>

                {/* Content Section */}
                <div className="courseCardContent">
                  <div className="courseCardHeader">
                    <div className={`courseIcon ${course.iconBg}`}>
                      {course.icon}
                    </div>
                    <h3 className="courseCardTitle">{course.title}</h3>
                  </div>

                  <p className="courseCardDesc">{course.desc}</p>

                  {/* Meta Information */}
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

                  {/* Footer CTA */}
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

      {/* ================= TESTIMONIALS SECTION ================= */}
      <TestimonialsCarousel />

      {/* ================= PRICING SECTION ================= */}
      <section className="pricingSection">
        <div className="container">
          <div className="pricingSectionHeader">
            <div className="sectionLabel">Pricing</div>
            <h2 className="pricingTitle">Simple, transparent pricing</h2>
            <p className="pricingSubtitle">
              Pick the plan that fits your learning goals. Upgrade anytime.
            </p>
          </div>

          <div className="pricingGrid">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`pricingCard ${plan.featured ? "pricingCardFeatured" : ""}`}
              >
                {plan.featured && (
                  <div className="popularBadge">Most popular</div>
                )}

                <div className="pricingCardTop">
                  <h3 className="planName">{plan.name}</h3>
                  <p className="planDesc">{plan.desc}</p>
                </div>

                <div className="priceRow">
                  <span className="priceNew">{plan.newPrice}</span>
                  <div className="priceRight">
                    <span className="priceOld">{plan.oldPrice}</span>
                    <span className="pricePeriod">/month</span>
                  </div>
                </div>

                <ul className="featuresList">
                  {plan.features.map((f) => (
                    <li key={f} className="featureItem">
                      <CheckCircle2 size={15} className="featureCheck" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={
                    plan.featured ? "planBtnPrimary" : "planBtnSecondary"
                  }
                >
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
