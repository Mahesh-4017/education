"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import logo from "@/public/pngegg.png";
import { IoMdMenu } from "react-icons/io";
import { usePathname } from "next/navigation";
import Popupbutton from "@/components/popbutton/popupbutton";

const links = [
  { title: "Home", href: "/" },
  { title: "Learn", href: "/learn" },
  { title: "Practice", href: "/practice" },
  { title: "Resources", href: "/resources" },
  { title: "Community", href: "/community" },
];
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const pathname = usePathname();

  const hideNavbarRoutes = ["/login", "/signup"];

  if (pathname && hideNavbarRoutes.includes(pathname)) {
    return null;
  }
  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.logoSection}>
          <Image src={logo} alt="Logo" className={styles.logo} />
          <span className={styles.brand}>FutureLearners</span>
        </div>

        <nav className={styles.navLinks}>
          {links.map((link) => (
            <Link key={link.title} href={link.href}>
              {link.title}
            </Link>
          ))}
        </nav>
        <div className={styles.rightcontainer}>
          <div className={styles.actions}>
            {isLoggedIn ? (
              <Popupbutton />
            ) : (
              <>
                <Link className={styles.loginBtn} href="/login">
                  Login
                </Link>

                <Link className={styles.signupBtn} href="/signup">
                  Get Started
                </Link>
              </>
            )}
          </div>
          <label htmlFor="menu-toggle" className={styles.menubutton}>
            <IoMdMenu size={25} />
          </label>
        </div>
      </header>
      <div className={styles.menucontainer}>
        <input
          type="checkbox"
          id="menu-toggle"
          className={styles.menucheckbox}
        />

        <ul className={styles.menudropdown}>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <div className={styles.actionsdropdown}>
            {isLoggedIn ? (
              <Popupbutton />
            ) : (
              <>
                <Link className={styles.loginBtndropdown} href="/login">
                  Login
                </Link>

                <Link className={styles.signupBtndropdown} href="/signup">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
