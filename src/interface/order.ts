import { IFood } from "./food";
import { IBooking } from "./booking";

export interface IOrder {
  _id: string;
  food: IFood[];
  book: IBooking;
  status: string; 
}
