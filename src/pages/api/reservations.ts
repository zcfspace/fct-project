import prisma from "../../libs/prisma";
import { Reservation } from "../../types/types";

export const createReservation = async (reservation: Reservation) => {
  const createdReservation = await prisma.reservation.create({
    data: reservation,
  });

  return createdReservation;
};

