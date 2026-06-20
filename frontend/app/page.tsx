import Image from "next/image";
import { ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel/TestimonialsCarousel";

const PLANS = [
  {
    id: 1,
    name: "Starter",
    newPrice: "$29",
    oldPrice: "$49",
    desc: "Perfect for getting started",
    features: ["Up to 5 projects", "Basic support", "1GB storage", "Community access"],
  },
  {
    id: 2,
    name: "Professional",
    newPrice: "$79",
    oldPrice: "$129",
    desc: "For growing teams",
    features: ["Unlimited projects", "Priority support", "100GB storage", "Advanced analytics", "API access"],
    featured: true,
  },
  {
    id: 3,
    name: "Enterprise",
    newPrice: "$199",
    oldPrice: "$299",
    desc: "For large organizations",
    features: ["Everything in Pro", "Dedicated manager", "Custom integrations", "SLA guarantee", "White-label option"],
  },
];

const products = [
  {
    id: 1,
    title: "Ocean Waves",
    desc: "Calm sea waves touching the shore under a peaceful sky",
    image: "/Images/images2.jfif",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Mountain Peaks",
    desc: "Snow-covered mountains touching the clouds",
    image: "/Images/images3.jfif",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Black & White Sea",
    desc: "Moody monochrome ocean view with dramatic waves",
    image: "/Images/images4.jfif",
    rating: 4.6,
  },
  {
    id: 4,
    title: "Ocean Waves",
    desc: "Calm sea waves touching the shore under a peaceful sky",
    image: "/Images/images3.jfif",
    rating: 4.5,
  },
  {
    id: 5,
    title: "Mountain Peaks",
    desc: "Snow-covered mountains touching the clouds",
    image: "/Images/images2.jfif",
    rating: 4.7,
  },
  {
    id: 6,
    title: "Black & White Sea",
    desc: "Moody monochrome ocean view with dramatic waves",
    image: "/Images/images1.jfif",
    rating: 4.6,
  },
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Best Quality",
    text: "All of our furniture uses the best materials and finishes for our customers.",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    text: "Free shipping everywhere you buy furniture from us without exception.",
  },
  {
    icon: BadgeCheck,
    title: "Warranty",
    text: "Every time you buy our furniture products, you will get a warranty without exception.",
  },
];

const STEPS = [
  {
    number: 1,
    title: "Briefing",
    text: "We start by understanding your requirements and planning the structure for a smooth experience.",
  },
  {
    number: 2,
    title: "Processing",
    text: "We carefully design and process each part to ensure high quality and clean execution.",
  },
  {
    number: 3,
    title: "Finishing",
    text: "Final touches are added to ensure everything is polished and ready for delivery.",
  },
];

export default function Home() {
  return (
    <>
      <section className="heroSection">
        <div className="container">
          <div className="floatingBox1" />
          <div className="floatingBox2" />

          <div className="heroGrid">
            <div className="content">
              <div className="accentBar" />
              <p className="label">Build & Create</p>

              <h1 className="title">
                Make something <br />
                <span className="highlight">beautiful</span>
              </h1>

              <p className="description">
                Simple tools for creating amazing projects. No complexity, just
                pure creativity.
              </p>

              <div className="buttonGroup">
                <button className="buttonPrimary">Start Now</button>
                <button className="buttonSecondary">Learn More</button>
              </div>
            </div>

            <div className="imageWrapper">
              <Image
                src="/notion.webp"
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

      <section className="benefitsSection">
        <div className="container">
          <div className="sectionHeader">
            <span className="line" />
            <h2>Benefits you get when using our services</h2>
            <span className="line" />
          </div>

          <div className="benefitsGrid">
            {BENEFITS.map(({ icon: Icon, title, text }) => (
              <div className="benefitCard" key={title}>
                <Icon className="icon" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="processSection">
        <div className="container processGrid">
          <div className="processContent">
            <h2 className="processTitle">
              We provide the best <br />
              process experience
            </h2>

            {STEPS.map(({ number, title, text }) => (
              <div className="step" key={number}>
                <div className="circle">{number}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="processImage">
            <Image
              src="/kids.avif"
              alt="Process"
              width={600}
              height={500}
              className="img"
            />
          </div>
        </div>
      </section>

      <section className="featuredSsection">
        <div className="container">
          <h2 className="heading">Featured Food</h2>

          <div className="grid">
            {/* LEFT BIG CARD */}
            <div className="mainCard">
              <Image
                src="/Images/images6.jfif"
                alt="Main Product"
                width={200}
                height={200}
                className="mainImage1"
              />
              <Image
                src="/Images/images5.jpg"
                alt="Main Product"
                width={500}
                height={200}
                className="mainImage"
              />
            </div>

            {/* RIGHT GRID */}
            <div className="sideGrid">
              {products.map((item) => (
                <div key={item.id} className="featuredcard">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={150}
                    className="featuredimage"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      <section className="pricingSection">
        <div className="container">
          <div className="pricingHeader">
            <div className="headerAccent"></div>
            <h2>Pricing Plans</h2>
            <p className="headerSubtext">Choose the perfect plan for your needs</p>
          </div>

          <div className="pricingGrid">
            {PLANS.map((plan) => (
              <div
                className={`pricingCard ${plan.featured ? "featured" : ""}`}
                key={plan.id}
              >
                {plan.featured && <div className="badge">Most Popular</div>}

                <h3 className="planName">{plan.name}</h3>
                <p className="planDesc">{plan.desc}</p>

                <div className="priceSection">
                  <div className="priceDisplay">
                    <span className="newPrice">{plan.newPrice}</span>
                    <span className="period">/month</span>
                  </div>
                  <span className="oldPrice">{plan.oldPrice}</span>
                </div>

                <ul className="featureList">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className="checkmark">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button className={`btn ${plan.featured ? "btnPrimary" : "btnSecondary"}`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}