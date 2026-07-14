"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const initialProfile = { firstName: "", lastName: "", email: "", phone: "", address: "" };
const initialPassword = { oldPassword: "", newPassword: "", confirmPassword: "" };

export default function AccountEdit() {
  const { customer, updateProfile, changePassword } = useAuth();

  const [profile, setProfile] = useState(initialProfile);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [password, setPassword] = useState(initialPassword);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    if (!customer) return;
    setProfile({
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      email: customer.email || "",
      phone: customer.phone || "",
      address: customer.address || "",
    });
  }, [customer]);

  const updateProfileField = (field) => (e) =>
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  const updatePasswordField = (field) => (e) =>
    setPassword((prev) => ({ ...prev, [field]: e.target.value }));

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSavingProfile(true);
    await updateProfile({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
    });
    setIsSavingProfile(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      return;
    }
    setIsSavingPassword(true);
    const result = await changePassword(password.oldPassword, password.newPassword);
    if (result.success) {
      setPassword(initialPassword);
    }
    setIsSavingPassword(false);
  };

  const passwordMismatch =
    password.confirmPassword.length > 0 && password.newPassword !== password.confirmPassword;

  return (
    <div className="my-account-content account-details">
      <div className="wrap" id="profile-details">
        <h4 className="fw-semibold mb-20">Information</h4>
        <form onSubmit={handleProfileSubmit} className="form-account-details">
          <div className="form-content">
            <div className="cols">
              <fieldset>
                <input
                  type="text"
                  placeholder="First Name"
                  value={profile.firstName}
                  onChange={updateProfileField("firstName")}
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={profile.lastName}
                  onChange={updateProfileField("lastName")}
                  required
                />
              </fieldset>
            </div>
            <div className="cols">
              <fieldset>
                <input
                  type="email"
                  placeholder="Email"
                  value={profile.email}
                  onChange={updateProfileField("email")}
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  type="text"
                  placeholder="Phone"
                  value={profile.phone}
                  onChange={updateProfileField("phone")}
                />
              </fieldset>
            </div>
            <fieldset>
              <input
                type="text"
                placeholder="Address"
                value={profile.address}
                onChange={updateProfileField("address")}
              />
            </fieldset>
          </div>
          <div className="box-btn">
            <button type="submit" className="tf-btn btn-large" disabled={isSavingProfile}>
              <span className="text-white">
                {isSavingProfile ? "Saving..." : "Update Account"}
              </span>
            </button>
          </div>
        </form>
      </div>
      <div className="wrap" id="change-password">
        <h4 className="fw-semibold mb-20">Change Password</h4>
        <form onSubmit={handlePasswordSubmit} className="def form-reset-password">
          <fieldset>
            <input
              type="password"
              placeholder="Password*"
              value={password.oldPassword}
              onChange={updatePasswordField("oldPassword")}
              required
            />
          </fieldset>
          <fieldset>
            <input
              type="password"
              placeholder="New Password*"
              value={password.newPassword}
              onChange={updatePasswordField("newPassword")}
              required
              minLength={6}
            />
          </fieldset>
          <fieldset>
            <input
              type="password"
              placeholder="Confirm Password*"
              value={password.confirmPassword}
              onChange={updatePasswordField("confirmPassword")}
              required
            />
            {passwordMismatch && (
              <p className="caption text-danger mt-1">Passwords do not match.</p>
            )}
          </fieldset>
          <div className="box-btn">
            <button
              type="submit"
              className="tf-btn btn-large"
              disabled={isSavingPassword || passwordMismatch}
            >
              <span className="text-white">
                {isSavingPassword ? "Updating..." : "Update Account"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
