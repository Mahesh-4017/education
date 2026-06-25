"use client";

import React, { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../store/index";
import { loginUser } from "../../store/user";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    const payload = await dispatch(loginUser({
      email: formData.email,
      password: formData.password,
    })).unwrap();
    if (payload.success) {
      console.log("Success", payload)
      router.push("/");
    } else {
      console.log("Failed", payload)
      setError(payload?.message || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>Welcome Back</h1>
        <p>Login to access your dashboard and manage your account.</p>
      </div>

      <div className={styles.right}>
        <form className={styles.form} onSubmit={handleLogin}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          <a href="/forgot-password" className={styles.forgot}>
            Forgot Password?
          </a>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
