export type Reservation = {
  id?: number;
  dateTime: Date;
  numPersons: number;
  name: string;
  phone: string;
  email: string;
  address?: string;
};
