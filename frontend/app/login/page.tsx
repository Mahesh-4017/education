"use client";

import React, { useState } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:8000/api/v1/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        alert("Logged In Successfully 🎉");
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
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
