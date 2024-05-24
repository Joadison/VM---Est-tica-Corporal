"use client";

import { Prisma } from "@prisma/client";
import CalendarioADM from "./CalendarioAdmin";


interface BookingsProps {
  bookings: Prisma.BookingGetPayload<{
    include: {
      service: true;
      user: true;
    };
  }>[];
}

const Admin = ({ bookings }: BookingsProps) => {
  return (
    <div className="pb-2">
      <CalendarioADM bookings={bookings}/>
    </div>
  );
};

export default Admin;