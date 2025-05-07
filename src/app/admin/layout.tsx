import { FC, PropsWithChildren } from "react";
import UserSidebar from "../components/UserSidebar";
import AdminSidebar from "../components/SideBar";

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <section className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-100 md:ml-64">{children}</main>
    </section>
  );
};

export default UserLayout;
