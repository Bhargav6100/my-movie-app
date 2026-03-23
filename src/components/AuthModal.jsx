import { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { API_BASE_URL } from "../config/app";
import PasswordInput from "./PasswordInput";
import styles from "./AuthModal.module.css";

export default function AuthModal({ mode, onClose, setMode }) {
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isLogin = mode === "login";
  const isRegister = mode === "register";
  const isForgotPassword = mode === "forgotPassword";

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const switchMode = (nextMode) => {
    setError("");
    setSuccess("");
    setShowPassword(false);
    setMode(nextMode);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint = isLogin
        ? `${API_BASE_URL}/api/auth/login`
        : `${API_BASE_URL}/api/auth/register`;

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      login(data);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset link");
      }

      setSuccess(data.message || "Reset link sent");
    } catch (err) {
      setError(err.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>
          {isLogin
            ? "Login"
            : isRegister
            ? "Register"
            : "Forgot Password"}
        </h2>

        <form
          className={styles.form}
          onSubmit={isForgotPassword ? handleForgotPasswordSubmit : handleAuthSubmit}
        >
          {isRegister && (
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {!isForgotPassword && (
            <PasswordInput
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading
              ? isLogin
                ? "Logging in..."
                : isRegister
                ? "Registering..."
                : "Sending..."
              : isLogin
              ? "Login"
              : isRegister
              ? "Register"
              : "Send Reset Link"}
          </button>
        </form>

        {isLogin && (
          <p className={styles.switchText}>
            <button
              type="button"
              className={styles.switchBtn}
              onClick={() => switchMode("forgotPassword")}
            >
              Forgot Password?
            </button>
          </p>
        )}

        <p className={styles.switchText}>
          {isLogin
            ? "Don't have an account?"
            : isRegister
            ? "Already have an account?"
            : "Remembered your password?"}{" "}
          <button
            type="button"
            className={styles.switchBtn}
            onClick={() =>
              switchMode(isLogin ? "register" : isRegister ? "login" : "login")
            }
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}