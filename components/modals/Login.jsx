"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (result.success) {
      setEmail("");
      setPassword("");
      const bootstrap = require("bootstrap");
      const modalEl = document.getElementById("log");
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) {
        modalInstance.hide();
      }
    } else {
      setError(result.message || "Could not log in.");
    }
  };

  return (
    <div className="modal modalCentered fade modal-log" id="log">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span
            className="icon icon-close btn-hide-popup"
            data-bs-dismiss="modal"
          />
          <div className="modal-log-wrap list-file-delete">
            <h5 className="title fw-semibold">Log In</h5>
            <form onSubmit={handleSubmit} className="form-log">
              <div className="form-content">
                <fieldset>
                  <label className="fw-semibold body-md-2"> Email * </label>
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset>
                  <label className="fw-semibold body-md-2"> Password * </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </fieldset>
                {error && (
                  <p className="body-text-3 text-danger">{error}</p>
                )}
              </div>
              <button
                type="submit"
                className="tf-btn w-100 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <p className="body-text-3 text-center">
                Don't you have an account?
                <a
                  href="#register"
                  data-bs-toggle="modal"
                  className="text-primary"
                >
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
