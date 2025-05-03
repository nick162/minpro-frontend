"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";

import Link from "next/link";
import { LoginSchema } from "../schema";
import Image from "next/image";
import useLogin from "@/hooks/api/auth/useLogin";
export default function LoginForm() {
  const { mutateAsync: login, isPending } = useLogin();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
        {/* Gambar Kiri */}
        <div className="md:w-1/2  hidden md:flex items-center justify-center relative">
          <Image
            src="/assets/hero/hero-bg1.png"
            alt="register"
            fill
            className="h-full object-cover"
          />
        </div>

        {/* Form Kanan */}
        <div className="w-full md:w-1/2 p-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your data below to Login into your Account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="username"
                      name="username"
                      placeholder="username"
                      required
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {!!formik.touched.username && !!formik.errors.username && (
                      <p className="text-xs text-red-500">
                        {formik.errors.username}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link className="ml-32 text-sm" href="/forgot-password">
                        Forgot Passowrd
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="your password"
                      required
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {!!formik.touched.password && !!formik.errors.password && (
                      <p className="text-xs text-red-500">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Loading" : "login"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="/register" className="underline underline-offset-4">
                    Sign Up
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
