import { getServerSession } from "next-auth";
import Header from "../../components/nav/header";
import { redirect } from "next/navigation";
import { db } from "../../lib/prisma";
import { authOptions } from "@/src/lib/auth";
import CalendarioADM from "@/src/components/user/CalendarioAdmin";
import ServiceUpload from "@/src/components/user/service_up";

const AdminPage = async () => {
  const allowedEmails = [
    "joadison2219@gmail.com",
    "anavitoriaesteticista@gmail.com",
    "victoriamariald@gmail.com",
    "anavitoria2005gj@gmail.com",
  ];

  const session = await getServerSession(authOptions);
  const user = session?.user;
  const email = user?.email;
  if (!user || typeof email !== "string" || !allowedEmails.includes(email)) {
    return redirect("/");
  }

  const bookings = await db.booking.findMany({
    where: {
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: true,
      user: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const service = await db.service.findMany();

  return (
    <div className="">
      <Header />
      <div className="px-5 py-6">
        <div className="pb-2">
          <ServiceUpload service={service} />
        </div>
        <div className="pb-2">
          <CalendarioADM bookings={bookings} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
