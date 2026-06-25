"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";
import logo from "@/public/pngegg.png";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const footerLinks = [
  {
    heading: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Learn", href: "/learn" },
      { label: "Practice", href: "/practice" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Forum", href: "/community" },
      { label: "Discord", href: "#" },
      { label: "Events", href: "#" },
      { label: "Newsletter", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const socials = [
  { icon: <FaTwitter />, href: "#", label: "Twitter" },
  { icon: <FaGithub />, href: "#", label: "GitHub" },
  { icon: <FaLinkedin />, href: "#", label: "LinkedIn" },
  { icon: <FaInstagram />, href: "#", label: "Instagram" },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Top grid */}
        <div className={styles.grid}>

          {/* Brand column */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <Image src={logo} alt="FutureLearners logo" className={styles.logo} />
              <span className={styles.brandName}>FutureLearners</span>
            </div>
            <p className={styles.tagline}>
              A platform for curious minds. Learn, practise, and grow — at your
              own pace, with a community that keeps you moving.
            </p>
            <div className={styles.socials}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.socialBtn}
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading} className={styles.col}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div className={styles.newsletter}>
          <div className={styles.newsletterText}>
            <h3>Stay in the loop</h3>
            <p>New lessons, challenges, and resources — straight to your inbox.</p>
          </div>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="you@example.com"
              className={styles.newsletterInput}
              aria-label="Email address"
            />
            <button className={styles.newsletterBtn}>Subscribe</button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} <span>FutureLearners</span>. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Cookie Settings</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;