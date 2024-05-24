"use server";

import { db } from "@/src/lib/prisma";

export const updateUser = async(userId: string, data: any) => {
    const user =  await db.user.update({
        where: {id: userId},
        data :{...data},
    });

    return user;
}