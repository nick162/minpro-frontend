"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);
  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    // <ProtectedRoute allowedRoles="CUSTOMER">
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Welcome, {user.name}</h1>

      <div className="bg-white shadow-md rounded-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Image
              src={
                user?.profilePict && user.profilePict.startsWith("http")
                  ? user.profilePict
                  : "/cs-1.png"
              }
              alt="Profile Picture"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            <Link href="/user/setting">Edit</Link>
          </button>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Username</label>
            <input
              type="text"
              value={user.username}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="text"
              value={user.email}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Total Point
            </label>
            <input
              type="text"
              value={user.totalPoint}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Referral Code
            </label>
            <input
              type="text"
              value={user.referralCode}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Role</label>
            <input
              type="text"
              value={user.role}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md capitalize"
            />
          </div>
        </div>

        {/* Tambahan Email Section */}
        <div className="mt-10">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            My Email Address
          </h3>
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full">📧</div>
            <div>
              <p className="text-sm">{user.email}</p>
              <p className="text-xs text-gray-500">1 month ago</p>
            </div>
          </div>

          <button className="mt-4 text-blue-600 text-sm hover:underline">
            + Add Email Address
          </button>
        </div>
      </div>
    </div>
    // </ProtectedRoute>
  );
};

export default ProfilePage;
