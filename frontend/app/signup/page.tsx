"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tempToken, setTempToken] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [error, setError] = useState("");

  const validateStep = () => {
    setError("");

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          setError("Name is required");
          return false;
        }
        break;

      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
          setError("Enter a valid email");
          return false;
        }
        break;

      case 3:
        const phoneRegex = /^[0-9]{10}$/;

        if (!phoneRegex.test(formData.phone)) {
          setError("Enter a valid 10-digit phone number");
          return false;
        }
        break;

      case 4:
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

        if (!passwordRegex.test(formData.password)) {
          setError(
            "Password must contain uppercase, lowercase, number and special character",
          );
          return false;
        }
        break;

      case 5:
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return false;
        }
        break;

      case 6:
        if (formData.otp.length < 4) {
          setError("Enter a valid OTP");
          return false;
        }
        break;
    }

    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setError("");
    setStep((prev) => prev - 1);
  };

  const handleRegister = async () => {
    if (!validateStep()) return;

    try {
      setError("");
      const res = await axios.post("http://localhost:8000/api/v1/user", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        setTempToken(res.data.token);
        setStep(6);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleVerify = async () => {
    if (!validateStep()) return;

    try {
      setError("");
      const res = await axios.post("http://localhost:8000/api/v1/user/verify", {
        token: tempToken,
        otp: formData.otp,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.accessToken);
        alert("Account Verified Successfully 🎉");
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  const progress = (step / 5) * 100;

  return (
    <div className={styles.container}>
      {/* Left Side */}

      <div className={styles.left}>
        <div className={styles.content}>
          <h1>Join Us Today</h1>

          <p>
            Create your account and unlock access to our dashboard, analytics,
            projects and many more amazing features.
          </p>
        </div>
      </div>

      {/* Right Side */}

      <div className={styles.right}>
        <div className={styles.formCard}>
          <h2 className={styles.title}>Create Account</h2>

          <p className={styles.subtitle}>{step === 6 ? "Check your email for OTP" : "Complete the steps below"}</p>

          <div className={styles.stepText}>Step {step} of 6</div>

          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className={styles.inputGroup}>
            {step === 1 && (
              <input
                className={styles.input}
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />
            )}

            {step === 2 && (
              <input
                className={styles.input}
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />
            )}

            {step === 3 && (
              <input
                className={styles.input}
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
              />
            )}

            {step === 4 && (
              <>
                <div className={styles.passwordWrapper}>
                  <input
                    className={styles.input}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <div className={styles.passwordWrapper}>
                  <input
                    className={styles.input}
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </>
            )}

            {step === 6 && (
              <input
                className={styles.input}
                type="text"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    otp: e.target.value,
                  })
                }
              />
            )}

            {error && <p className={styles.error}>{error}</p>}
          </div>

          <div className={styles.buttonGroup}>
            {step > 1 && step < 6 && (
              <button className={styles.prevButton} onClick={prevStep}>
                Previous
              </button>
            )}

            {step < 5 ? (
              <button className={styles.nextButton} onClick={nextStep}>
                Next →
              </button>
            ) : step === 5 ? (
              <button className={styles.nextButton} onClick={handleRegister}>
                Create Account
              </button>
            ) : (
              <button className={styles.nextButton} onClick={handleVerify}>
                Verify OTP
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
