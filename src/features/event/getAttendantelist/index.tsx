"use client";

import React from "react";

import AttendanceTable from "@/features/event/getAttendantelist/components.tsx/AttendenceList";
import { useAttendanceTransactions } from "@/hooks/api/Event/useGetAttendance";

const AttendancePage = () => {
  const { data, isLoading, error } = useAttendanceTransactions();

  if (isLoading) return <p>Loading daftar attendee...</p>;
  if (error) return <p>Gagal memuat data.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Semua Attendee</h1>
      <AttendanceTable attendees={data.attendees} />
    </div>
  );
};

export default AttendancePage;
