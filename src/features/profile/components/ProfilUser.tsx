"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProfileAppearancePage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  const editLink =
    user.role === "EVENT_ORGANIZER" ? "/admin/setting" : "/user/setting";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
        Welcome, {user.name}
      </h1>

      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={
                  user.profilePict && user.profilePict.startsWith("http")
                    ? user.profilePict
                    : "/cs-1.png"
                }
                alt="Profile Picture"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div>
                <CardTitle className="text-lg sm:text-xl">
                  {user.name}
                </CardTitle>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>
            <Link
              href={editLink}
              className="w-full sm:w-auto text-center bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Full Name", value: user.name },
              { label: "Username", value: user.username },
              { label: "Email", value: user.email },
              { label: "Total Point", value: user.totalPoint },
              { label: "Referral Code", value: user.referralCode },
              { label: "Role", value: user.role },
            ].map((field, idx) => (
              <div key={idx}>
                <label className="block text-sm text-gray-600 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={field.value}
                  disabled
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md capitalize"
                />
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              My Email Address
            </h3>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                📧
              </div>
              <div>
                <p className="text-sm">{user.email}</p>
                <p className="text-xs text-gray-500">1 month ago</p>
              </div>
            </div>

            <button className="mt-4 text-blue-600 text-sm hover:underline">
              + Add Email Address
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileAppearancePage;
