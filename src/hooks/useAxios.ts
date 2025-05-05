"use client";

import { axiosInstance } from "@/lib/axios";
// import { useAuthStore } from "@/store/auth";
import { getSession, signOut } from "next-auth/react";

import { useEffect } from "react";

const useAxios = () => {
  // const { accessToken, clearAuth } = useAuthStore();

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      async (config) => {
        const session = await getSession();
        const accessToken = session?.user.accessToken;
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        if (
          err?.response.data.message === "Token expired" ||
          err?.response.data.message === "Token is missing" ||
          err?.response.data.message === "Invalid Token"
        ) {
          signOut();
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, []); //[accessToken, clearAuth]);

  return { axiosInstance };
};

export default useAxios;
