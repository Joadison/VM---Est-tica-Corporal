import { getServerSession } from "next-auth";
import Header from "../../components/nav/header";
import { redirect } from "next/navigation";
import { db } from "../../lib/prisma";
import { authOptions } from "@/src/lib/auth";
import Admin from "@/src/components/user/admin";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user || session?.user?.email !== 'joadison2219@gmail.com') {
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
      date: 'asc',
    },
  });
 
  return (
    <div className="">
      <Header />
      <div className="px-5 py-6">
        <Admin bookings={bookings}/>
      </div>
    </div>
  );
};

export default AdminPage;
