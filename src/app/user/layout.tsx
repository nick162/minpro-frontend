import { FC, PropsWithChildren } from "react";
import Sidebar from "../components/SideBar";
import UserSidebar from "../components/UserSidebar";
import NextAuthProvider from "@/providers/NextAuthProvider";
import TokenProvider from "@/providers/TokenProvider";

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="flex min-h-screen">
      <UserSidebar />
      <main className="flex-1 p-6 bg-gray-100">
        <NextAuthProvider>
          <TokenProvider>{children}</TokenProvider>
        </NextAuthProvider>
      </main>
    </section>
  );
};

export default UserLayout;
