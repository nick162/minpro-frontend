"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string;
}

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      router.push("/login");
    } else if (!allowedRoles.includes(session.user.role)) {
      router.push("/");
    } else {
      setIsChecking(false);
    }
  }, [status, session, allowedRoles, router]);

  if (status === "loading" || isChecking) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};
