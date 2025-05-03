"use client";

import React from "react";

interface Props {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePasswordInput = ({ value, error, onChange }: Props) => (
  <div className="space-y-1">
    <label htmlFor="password" className="font-medium text-sm">
      Password (opsional)
    </label>
    <input
      id="password"
      name="password"
      type="password"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

export default ProfilePasswordInput;
