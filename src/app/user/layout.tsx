import { FC, PropsWithChildren } from "react";
import Sidebar from "../components/SideBar";
import UserSidebar from "../components/UserSidebar";

const UserLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <UserSidebar />
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default UserLayout;
