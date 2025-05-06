import React, { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Attendee = {
  id: string;
  name: string;
  email: string;
  eventName: string;
};

type Props = {
  attendees: Attendee[];
};

const AttendanceTable: FC<Props> = ({ attendees }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 w-[200px] md:w-[850px]">
      {attendees.map((attendee) => (
        <Card
          key={attendee.id}
          className="bg-gradient-to-br from-indigo-100 to-blue-50 shadow-md"
        >
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">
              {attendee.name}
            </h3>
            <p className="text-sm text-gray-700">
              <span className="font-medium text-gray-900">Email:</span>{" "}
              {attendee.email}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium text-gray-900">Event:</span>{" "}
              {attendee.eventName}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AttendanceTable;
