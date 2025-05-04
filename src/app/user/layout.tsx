import { FC, PropsWithChildren } from "react";
import UserSidebar from "../components/UserSidebar";
import NextAuthProvider from "@/providers/NextAuthProvider";
import TokenProvider from "@/providers/TokenProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles="CUSTOMER">
      <section className="flex min-h-screen">
        <UserSidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <NextAuthProvider>
            <TokenProvider>{children}</TokenProvider>
          </NextAuthProvider>
        </main>
      </section>
    </ProtectedRoute>
  );
};

export default UserLayout;
