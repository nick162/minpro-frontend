import { Event } from "./event";
import { TransactionDetail } from "./transcationDetail";

export interface Ticket {
  id: number;
  eventId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  ticketType: string;
  sold: number;
  availableSeats: number;
  price: number;

  event?: Event;
  transactionDetails?: TransactionDetail[];

}
