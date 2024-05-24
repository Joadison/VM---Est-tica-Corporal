"use server";

import { db } from "@/src/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";
import ical from 'ical-generator';

interface SaveBookingParams {
  userId: string;
  serviceId: string;
  date: Date;
}


//Envio de Email
const sendBookingEmailVi = async (user: any, date: Date) => {
  const iCalContent = await createCalendarEvent(date, user.address);
  //E-mail de Envio...
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "joadison2219@gmail.com",
      pass: "tran iexo ytel yyvd",
    },
  });

  const formattedDate = format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });

  //Formato no E-mail Enviado...
  let mailOptions = {
    from: "joadison2219@gmail.com",
    to: user?.email,
    subject: "Confirmação de Agendamento!",
    text: `Olá!\n\nSeu agendamento foi confirmado para ${formattedDate}.\n\nAtenciosamente,\nVM - Estética Corporall`,
    icalEvent: {
      contentType: 'text/calendar; charset="utf-8"; method=REQUEST',
      content: iCalContent,
      method: 'request',
  }
  };
  await transporter.sendMail(mailOptions);
};

//Create ical de agendamento
const createCalendarEvent = (date: Date, location: string) => {
  const calendar = ical({ name: 'VM - Estética Corporal' });
  const startTime = date;
  const createEvent = {
    start: startTime,
    summary: 'VM - Estética Corporal',
    description: 'Massagem',
    location: location,
    url: 'http://localhost:3000/',
    organizer: {
      name: 'VM - Estética Corporal',
      email: 'joadison2219@gmail.com',
    },
  };
  calendar.createEvent(createEvent);
  const iCalContent = calendar.toString();
  return iCalContent;
}

export const saveBooking = async (params: SaveBookingParams) => {
  await db.booking.create({
    data: {
      userId: params.userId,
      serviceId: params.serviceId,
      date: params.date,
    },
  });

  revalidatePath("/");

  const mail = await db.user.findUnique({ where: { id: params.userId } });
  sendBookingEmailVi(mail, params.date);
};
