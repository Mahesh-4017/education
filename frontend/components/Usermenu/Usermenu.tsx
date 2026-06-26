"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Usermenu.module.css";

// ── icons (react-icons/fi) ──────────────────────────────────────────────────
import {
  FiGrid,
  FiUser,
  FiSettings,
  FiBookOpen,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import Link from "next/link";
interface UserMenuProps {
  user: User
}
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <FiGrid /> },
    { label: "Profile", href: "/profile", icon: <FiUser /> },
    { label: "My Courses", href: "/learn", icon: <FiBookOpen /> },
    { label: "Settings", href: "/settings", icon: <FiSettings /> },
  ];
  console.log(user);
  if (!user) {
    return <div>user not found</div>;
  }
  return (
    <div className={styles.wrapper} ref={ref}>
      {/* ── Trigger ── */}
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className={styles.avatar}>
  {user?.name?.charAt(0).toUpperCase()}
</span>
        <span className={styles.username}>{user.name}</span>
        <FiChevronDown
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      {/* ── Dropdown ── */}
      <div
        className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}
        role="menu"
      >
        {/* User header */}
        <div className={styles.dropdownHeader}>
          <span className={styles.dropdownAvatar}>
            <span className={styles.avatar}>
  {user?.name?.charAt(0).toUpperCase()}
</span>
          </span>
          <div className={styles.dropdownUserInfo}>
            <span className={styles.dropdownName}>{user.name}</span>
            {user.email && (
              <span className={styles.dropdownEmail}>{user.email}</span>
            )}
          </div>
        </div>

        {/* Menu items */}
        <ul className={styles.menu} role="none">
          {menuItems.map((item) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                className={styles.menuItem}
                role="menuitem"
                onClick={() => setOpen(false)}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}

          <div className={styles.divider} role="separator" />

          <li role="none">
            <button
              className={`${styles.menuItem} ${styles.logoutItem}`}
              role="menuitem"
            >
              <span className={styles.menuIcon}>
                <FiLogOut />
              </span>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;