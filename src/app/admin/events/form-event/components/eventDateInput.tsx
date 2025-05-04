"use client";

import React from "react";

interface Props {
  startDate: string;
  endDate: string;
  errors?: { [key: string]: string | undefined };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventDateInput = ({
  startDate,
  endDate,
  errors,
  handleChange,
}: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="font-medium text-sm">Tanggal Mulai</label>
      <input
        type="date"
        name="startDate"
        value={startDate}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
      />
      {errors?.startDate && (
        <p className="text-sm text-red-500">{errors.startDate}</p>
      )}
    </div>
    <div>
      <label className="font-medium text-sm">Tanggal Selesai</label>
      <input
        type="date"
        name="endDate"
        value={endDate}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
      />
      {errors?.endDate && (
        <p className="text-sm text-red-500">{errors.endDate}</p>
      )}
    </div>
  </div>
);

export default EventDateInput;
