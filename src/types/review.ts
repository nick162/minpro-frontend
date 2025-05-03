import { Transaction } from "./transacation";
import { Event } from "./event";
import { User } from "./user";

export interface Review {
  id: number;
  transactionId: number;
  eventId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  reviewDesc: string;
  rating: number;

  transaction?: Transaction;
  event?: Event;
  user?: User;
}
