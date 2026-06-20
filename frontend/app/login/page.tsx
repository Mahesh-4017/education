import React from "react";
import styles from "./login.module.css";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>Welcome Back</h1>
        <p>Login to access your dashboard and manage your account.</p>
      </div>

      <div className={styles.right}>
        <form className={styles.form}>
          <h2>Login</h2>

          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            className={styles.input}
          />

          <a href="#" className={styles.forgot}>
            Forgot Password?
          </a>

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
