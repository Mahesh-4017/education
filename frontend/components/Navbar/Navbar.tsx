"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";
import logo from "@/public/pngegg.png";
import { IoMdMenu } from "react-icons/io";
import { usePathname } from "next/navigation";
import UserMenu from "@/components/Usermenu/Usermenu";
import { useAppSelector } from "@/store";

const links = [
  { title: "Home", href: "/" },
  { title: "Learn", href: "/learn" },
  { title: "Practice", href: "/practice" },
  { title: "Resources", href: "/resources" },
  { title: "Community", href: "/community" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { userInfo } = useAppSelector((state) => state.user)
  const hideNavbarRoutes = ["/login", "/signup"];
  if (pathname && hideNavbarRoutes.includes(pathname)) return null;

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.innernavbar}>
          {/* Logo */}
          <div className={styles.logoSection}>
            <Image src={logo} alt="Logo" className={styles.logo} />
            <span className={styles.brand}>FutureLearners</span>
          </div>

          {/* Desktop nav links */}
         <nav className={styles.navLinks}>
      {links.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className={pathname === link.href ? styles.active : ""}
        >
          {link.title}
        </Link>
      ))}
    </nav>

          {/* Right side */}
          <div className={styles.rightcontainer}>
            <div className={styles.actions}>
              {userInfo?._id ? (
                <UserMenu user={userInfo} />
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

            {/* Hamburger — only visible on mobile */}
            <label htmlFor="menu-toggle" className={styles.menubutton}>
              <IoMdMenu size={25} />
            </label>
          </div>
        </div>
      </header>

      {/* ── Mobile slide-out menu ── */}
      <div className={styles.menucontainer}>
        <input
          type="checkbox"
          id="menu-toggle"
          className={styles.menucheckbox}
        />

        <ul className={styles.menudropdown}>
          {links.map((link) => (
            <li key={link.title}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}

          <div className={styles.actionsdropdown}>
            {userInfo?._id ? (
              <UserMenu />
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
