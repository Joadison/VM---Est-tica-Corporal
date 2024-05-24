import Header from '@/src/components/nav/header';
import Users from '@/src/components/user/users';
import { db } from '@/src/lib/prisma';

interface Props {
  params: {
    id: string;
  };
}

const UserPage = async ({ params }: Props) => {
  const { id } = params;
  const user = await db.user.findUnique({ where: { id } });

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <>
      <Header/>
      <Users user={user} />
    </>
  );
};

export default UserPage;