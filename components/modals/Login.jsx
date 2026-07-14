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
    <>
      <style>{`
        /* Modern Premium Login Modal Custom Styles */
        .modern-login-card {
          border: none !important;
          border-radius: 20px !important;
          background: rgba(255, 255, 255, 0.95) !important;
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.16), 0 0 60px rgba(255, 61, 61, 0.04) !important;
          overflow: hidden;
          backdrop-filter: blur(15px);
          position: relative;
        }

        .modern-login-header {
          background: linear-gradient(135deg, #ff3d3d 0%, #d80027 100%);
          padding: 45px 30px 40px 30px;
          position: relative;
          text-align: center;
          color: white;
        }

        .modern-login-header h3 {
          color: white !important;
          font-weight: 700;
          margin-bottom: 8px;
          font-size: 24px;
          letter-spacing: 0.5px;
          animation: fadeInDownModern 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .modern-login-header p {
          color: rgba(255, 255, 255, 0.85) !important;
          font-size: 14px;
          margin: 0;
          animation: fadeInUpModern 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }

        .modern-login-body {
          padding: 40px 35px 35px 35px !important;
          animation: fadeInUpModern 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
        }

        .modern-input-group {
          position: relative;
          margin-bottom: 24px;
        }

        .modern-input-group label {
          position: absolute;
          left: 45px;
          top: 50%;
          transform: translateY(-50%);
          color: #8c8c8c;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          font-weight: 500 !important;
          font-size: 14px;
          background: transparent;
          padding: 0 5px;
        }

        .modern-input-group input {
          width: 100% !important;
          padding: 16px 16px 16px 45px !important;
          border: 1.5px solid #e5e7eb !important;
          border-radius: 12px !important;
          outline: none !important;
          font-size: 14px !important;
          background: #f9fafb !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          color: #1f2937 !important;
        }

        .modern-input-group input:focus {
          border-color: #ff3d3d !important;
          background: white !important;
          box-shadow: 0 0 0 4px rgba(255, 61, 61, 0.08) !important;
        }

        /* Floating label transition */
        .modern-input-group input:focus + label,
        .modern-input-group input:not(:placeholder-shown) + label {
          top: 0;
          background: white;
          font-size: 12px;
          color: #ff3d3d;
          font-weight: 600 !important;
          transform: translateY(-50%);
          left: 12px;
        }

        .modern-input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          transition: color 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modern-input-group input:focus ~ .modern-input-icon {
          color: #ff3d3d;
        }

        .modern-btn-submit {
          background: linear-gradient(135deg, #ff3d3d 0%, #d80027 100%) !important;
          border: none !important;
          padding: 16px !important;
          border-radius: 12px !important;
          font-weight: 600 !important;
          font-size: 15px;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 24px rgba(255, 61, 61, 0.25) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          cursor: pointer;
          color: white !important;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .modern-btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(255, 61, 61, 0.35) !important;
        }

        .modern-btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .modern-btn-submit:disabled {
          background: #d1d5db !important;
          box-shadow: none !important;
          cursor: not-allowed;
        }

        .modern-login-footer {
          text-align: center;
          margin-top: 25px;
          font-size: 14px;
          color: #4b5563;
        }

        .modern-login-footer a {
          color: #ff3d3d !important;
          font-weight: 600;
          text-decoration: none;
          margin-left: 5px;
          transition: color 0.2s ease;
        }

        .modern-login-footer a:hover {
          color: #d80027 !important;
          text-decoration: underline !important;
        }

        .btn-hide-popup-modern {
          position: absolute;
          top: 20px;
          right: 20px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s ease;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-hide-popup-modern:hover {
          color: white;
          background: rgba(255, 255, 255, 0.25);
          transform: rotate(90deg);
        }

        .spinner-modern {
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          animation: spinModern 0.8s linear infinite;
        }

        /* Keyframes */
        @keyframes spinModern {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeInDownModern {
          from {
            opacity: 0;
            transform: translateY(-16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUpModern {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="modal modalCentered fade modal-log" id="log" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modern-login-card">
            
            <div className="btn-hide-popup-modern" data-bs-dismiss="modal">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>

            <div className="modern-login-header">
              <h3>Welcome Back</h3>
              <p>Sign in to access your account details & orders</p>
            </div>

            <div className="modern-login-body">
              <form onSubmit={handleSubmit} className="d-flex flex-column">
                
                <div className="modern-input-group">
                  <input
                    type="email"
                    id="login-email"
                    placeholder=" "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="login-email">Email Address</label>
                  <svg className="modern-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>

                <div className="modern-input-group">
                  <input
                    type="password"
                    id="login-password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="login-password">Password</label>
                  <svg className="modern-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>

                {error && (
                  <p className="body-text-3 text-danger mb-3" style={{ fontSize: 13, fontWeight: 500 }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="modern-btn-submit w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <div className="spinner-modern" />}
                  <span>{isSubmitting ? "Signing in..." : "Sign In"}</span>
                </button>

                <div className="modern-login-footer">
                  Don't have an account?
                  <a
                    href="#register"
                    data-bs-toggle="modal"
                  >
                    Register
                  </a>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
