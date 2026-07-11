"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  useLoginMutation,
  useCreateCustomerMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useChangePasswordMutation,
  useVerifyAuthLazyQuery,
} from "@/graphql/generated";
import type { CustomerFieldsFragment } from "@/graphql/generated/types";
import type { CustomerInput } from "@/graphql/generated/schema-types";
import { AUTH_TOKEN_COOKIE } from "@/graphql/authToken";

export interface AuthActionResult {
  success: boolean;
  message?: string;
}

interface AuthContextValue {
  customer: CustomerFieldsFragment | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthActionResult>;
  register: (input: CustomerInput) => Promise<AuthActionResult>;
  verifyOtp: (email: string, otp: string) => Promise<AuthActionResult>;
  resendOtp: (email: string) => Promise<AuthActionResult>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<AuthActionResult>;
  logout: () => void;
}

const authContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(authContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return "Something went wrong. Please try again.";
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerFieldsFragment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [loginMutation] = useLoginMutation();
  const [createCustomerMutation] = useCreateCustomerMutation();
  const [verifyOtpMutation] = useVerifyOtpMutation();
  const [resendOtpMutation] = useResendOtpMutation();
  const [changePasswordMutation] = useChangePasswordMutation();
  const [verifyAuthQuery] = useVerifyAuthLazyQuery({ fetchPolicy: "network-only" });

  const logout = useCallback(() => {
    Cookies.remove(AUTH_TOKEN_COOKIE);
    setCustomer(null);
  }, []);

  useEffect(() => {
    const token = Cookies.get(AUTH_TOKEN_COOKIE);
    if (!token) {
      setIsLoading(false);
      return;
    }
    verifyAuthQuery()
      .then(({ data, error }) => {
        if (error || !data?.verifyAuth?.customer) {
          logout();
          return;
        }
        setCustomer(data.verifyAuth.customer);
      })
      .catch(() => logout())
      .finally(() => setIsLoading(false));
    // Auto-login runs once on mount; verifyAuthQuery/logout are stable across renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<AuthActionResult> => {
      try {
        const { data } = await loginMutation({ variables: { email, password } });
        if (!data?.login?.token || !data.login.customer) {
          const message = "Invalid email or password.";
          toast.error(message);
          return { success: false, message };
        }
        Cookies.set(AUTH_TOKEN_COOKIE, data.login.token, { expires: 7, sameSite: "lax" });
        setCustomer(data.login.customer);
        toast.success("Logged in successfully.");
        return { success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
        return { success: false, message };
      }
    },
    [loginMutation]
  );

  const register = useCallback(
    async (input: CustomerInput): Promise<AuthActionResult> => {
      try {
        const { data } = await createCustomerMutation({ variables: { input } });
        if (!data?.createCustomer) {
          const message = "Could not create account.";
          toast.error(message);
          return { success: false, message };
        }
        toast.success("Account created. Please verify your email.");
        return { success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
        return { success: false, message };
      }
    },
    [createCustomerMutation]
  );

  const verifyOtp = useCallback(
    async (email: string, otp: string): Promise<AuthActionResult> => {
      try {
        const { data } = await verifyOtpMutation({ variables: { email, otp } });
        if (!data?.verifyOTP?.token || !data.verifyOTP.customer) {
          const message = "Invalid or expired code.";
          toast.error(message);
          return { success: false, message };
        }
        Cookies.set(AUTH_TOKEN_COOKIE, data.verifyOTP.token, { expires: 7, sameSite: "lax" });
        setCustomer(data.verifyOTP.customer);
        toast.success("Verified successfully.");
        return { success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
        return { success: false, message };
      }
    },
    [verifyOtpMutation]
  );

  const resendOtp = useCallback(
    async (email: string): Promise<AuthActionResult> => {
      try {
        const { data } = await resendOtpMutation({ variables: { email } });
        if (!data?.resendOTP) {
          const message = "Could not resend code.";
          toast.error(message);
          return { success: false, message };
        }
        toast.success("Code resent.");
        return { success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
        return { success: false, message };
      }
    },
    [resendOtpMutation]
  );

  const changePassword = useCallback(
    async (oldPassword: string, newPassword: string): Promise<AuthActionResult> => {
      if (!customer?.id) {
        const message = "You must be logged in.";
        toast.error(message);
        return { success: false, message };
      }
      try {
        const { data } = await changePasswordMutation({
          variables: { id: customer.id, oldPassword, newPassword },
        });
        if (!data?.changePassword) {
          const message = "Could not change password.";
          toast.error(message);
          return { success: false, message };
        }
        toast.success("Password changed.");
        return { success: true };
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
        return { success: false, message };
      }
    },
    [changePasswordMutation, customer]
  );

  const value: AuthContextValue = {
    customer,
    isAuthenticated: !!customer,
    isLoading,
    login,
    register,
    verifyOtp,
    resendOtp,
    changePassword,
    logout,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
