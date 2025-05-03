"use client";

import React from "react";

interface Props {
  label: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileInput = ({ label, name, value, error, onChange }: Props) => (
  <div className="space-y-1">
    <label htmlFor={name} className="font-medium text-sm">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

export default ProfileInput;
