import { FC, PropsWithChildren } from "react";
import Sidebar from "../components/SideBar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import TokenProvider from "@/providers/TokenProvider";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles="EVENT_ORGANIZER">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100">
          <NextAuthProvider>
            <TokenProvider>{children}</TokenProvider>
          </NextAuthProvider>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
