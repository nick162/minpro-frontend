"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      {/* Photo Profile */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
              No Image
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="photo" className="mb-3">
            Profile Photo
          </Label>
          <Input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Form Input */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="John Doe" />
        </div>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="johnny123" />
        </div>

        <div>
          <Label htmlFor="points">Points</Label>
          <Input id="points" type="number" placeholder="1000" />
        </div>

        <div>
          <Label htmlFor="referralCode">Referral Code</Label>
          <Input id="referralCode" placeholder="ABCD1234" />
        </div>

        <div>
          <Label htmlFor="coupon">Coupon</Label>
          <Input id="coupon" placeholder="COUPON2024" />
        </div>

        <div>
          <Label htmlFor="voucher">Voucher</Label>
          <Input id="voucher" placeholder="VOUCHER50" />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john@example.com" />
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Input id="role" placeholder="CUSTOMER or ADMIN" />
        </div>

        {/* Save Button */}
        <div className="col-span-1 md:col-span-2 flex justify-end mt-4">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
