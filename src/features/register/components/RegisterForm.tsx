"use client";

import { useState } from "react";
import { useFormik } from "formik";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RegisterSchema } from "../schema";
import { useRegister } from "@/hooks/api/auth/useRegister";
import Image from "next/image";

export default function RegisterForm() {
  const [showReferral, setShowReferral] = useState(false);
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  const { mutateAsync: register, isPending } = useRegister();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      referralCode: "",
      role: "CUSTOMER" as "CUSTOMER" | "EVENT_ORGANIZER",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        username: values.username,
        password: values.password,
        referralCode:
          values.role === "EVENT_ORGANIZER" ? "" : values.referralCode,
        role: values.role,
      };

      register(payload);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        {/* Gambar Kiri */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center">
          <img
            src="/assets/hero/hero-bg1.png"
            alt="Register Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Kanan */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
            Create Your Account
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-gray-700 dark:text-white">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                />
                {!!formik.touched.name && !!formik.errors.name && (
                  <p className="text-xs text-red-500">{formik.errors.name}</p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="username"
                className="text-gray-700 dark:text-white"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                required
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
              {!!formik.touched.username && !!formik.errors.username && (
                <p className="text-xs text-red-500">{formik.errors.username}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
              {!!formik.touched.email && !!formik.errors.email && (
                <p className="text-xs text-red-500">{formik.errors.email}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="text-gray-700 dark:text-white"
              >
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="your password"
                required
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
              />
              {!!formik.touched.password && !!formik.errors.password && (
                <p className="text-xs text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {/* Tombol Pilih Role */}
            <button
              type="button"
              onClick={() => setShowRoleSelect(!showRoleSelect)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showRoleSelect ? "Hide Role Selection" : "Choose Role"}
            </button>

            {/* Dropdown Role */}
            {showRoleSelect && (
              <select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="CUSTOMER">CUSTOMER</option>
                <option value="EVENT_ORGANIZER">ORGANIZER</option>
              </select>
            )}

            {/* Tombol Referral */}
            <button
              type="button"
              onClick={() => setShowReferral(!showReferral)}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showReferral ? "Hide Referral Code" : "Have a Referral Code?"}
            </button>

            {/* Input Referral */}
            {showReferral && (
              <input
                type="text"
                name="referralCode"
                placeholder="Referral Code"
                value={formik.values.referralCode}
                onChange={formik.handleChange}
                disabled={formik.values.role === "EVENT_ORGANIZER"}
                className="w-full p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Loading" : "Register"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
