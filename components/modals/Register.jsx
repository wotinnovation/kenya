"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function Register() {
  const { register, verifyOtp, resendOtp } = useAuth();
  const [step, setStep] = useState("form");
  const [form, setForm] = useState(initialForm);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const closeModal = () => {
    const bootstrap = require("bootstrap");
    const modalEl = document.getElementById("register");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
      modalInstance.hide();
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const result = await register(form);
    setIsSubmitting(false);
    if (result.success) {
      setStep("otp");
    } else {
      setError(result.message || "Could not create your account.");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const result = await verifyOtp(form.email, otp);
    setIsSubmitting(false);
    if (result.success) {
      setForm(initialForm);
      setOtp("");
      setStep("form");
      closeModal();
    } else {
      setError(result.message || "Invalid or expired code.");
    }
  };

  return (
    <div className="modal modalCentered fade modal-log" id="register">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span
            className="icon icon-close btn-hide-popup"
            data-bs-dismiss="modal"
          />
          <div className="modal-log-wrap list-file-delete">
            {step === "form" ? (
              <>
                <h5 className="title fw-semibold">Sign Up</h5>
                <form onSubmit={handleRegister} className="form-log">
                  <div className="form-content">
                    <fieldset>
                      <label className="fw-semibold body-md-2"> First name * </label>
                      <input
                        type="text"
                        placeholder="Your first name"
                        value={form.firstName}
                        onChange={handleChange("firstName")}
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <label className="fw-semibold body-md-2"> Last name * </label>
                      <input
                        type="text"
                        placeholder="Your last name"
                        value={form.lastName}
                        onChange={handleChange("lastName")}
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <label className="fw-semibold body-md-2"> Email * </label>
                      <input
                        type="email"
                        placeholder="Your email"
                        value={form.email}
                        onChange={handleChange("email")}
                        required
                      />
                    </fieldset>
                    <fieldset>
                      <label className="fw-semibold body-md-2"> Password * </label>
                      <input
                        type="password"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={handleChange("password")}
                        minLength={6}
                        required
                      />
                    </fieldset>
                    {error && <p className="body-text-3 text-danger">{error}</p>}
                  </div>
                  <button
                    type="submit"
                    className="tf-btn w-100 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                  </button>
                  <p className="body-text-3 text-center">
                    Already have an account?
                    <a href="#log" data-bs-toggle="modal" className="text-primary">
                      Sign in
                    </a>
                  </p>
                </form>
              </>
            ) : (
              <>
                <h5 className="title fw-semibold">Verify your email</h5>
                <form onSubmit={handleVerify} className="form-log">
                  <div className="form-content">
                    <p className="body-text-3">
                      Enter the code we sent to {form.email}.
                    </p>
                    <fieldset>
                      <label className="fw-semibold body-md-2"> Verification code * </label>
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </fieldset>
                    {error && <p className="body-text-3 text-danger">{error}</p>}
                  </div>
                  <button
                    type="submit"
                    className="tf-btn w-100 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Verifying..." : "Verify"}
                  </button>
                  <p className="body-text-3 text-center">
                    Didn't get a code?
                    <a
                      href="#"
                      className="text-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        resendOtp(form.email);
                      }}
                    >
                      Resend
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
