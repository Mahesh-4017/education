"use client";

import React, { useState } from "react";
import styles from "./forgot-password.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [tempToken, setTempToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !newPassword) {
      setError("Please provide an email and a new password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:8000/api/v1/user/forgotPassword", {
        email,
        password: newPassword,
      });

      if (res.data.success) {
        setTempToken(res.data.token);
        setStep(2);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to request password reset.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter the OTP sent to your email.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:8000/api/v1/user/resetPassword", {
        token: tempToken,
        otp,
      });

      if (res.data.success) {
        alert("Password reset successfully 🎉");
        router.push("/login");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>Password Reset</h1>
        <p>Follow the steps to regain access to your account securely.</p>
      </div>

      <div className={styles.right}>
        {step === 1 ? (
          <form className={styles.form} onSubmit={handleRequestReset}>
            <h2>Forgot Password?</h2>
            <p style={{ color: "#666", fontSize: "14px" }}>
              Enter your email and a new password. We will send you an OTP to verify.
            </p>

            <input
              type="email"
              placeholder="Email Address"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {error && <p style={{ color: "red", fontSize: "14px", margin: 0 }}>{error}</p>}

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Sending OTP..." : "Reset Password"}
            </button>
            <a href="/login" className={styles.backLink}>Back to Login</a>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleVerifyReset}>
            <h2>Verify OTP</h2>
            <p style={{ color: "#666", fontSize: "14px" }}>
              An OTP has been sent to <b>{email}</b>. Please enter it below.
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              className={styles.input}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            {error && <p style={{ color: "red", fontSize: "14px", margin: 0 }}>{error}</p>}

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Verifying..." : "Confirm Reset"}
            </button>
            <a href="/login" className={styles.backLink}>Cancel & Go to Login</a>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
