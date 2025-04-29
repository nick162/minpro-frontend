import { Event } from "./event";
import { TransactionDetail } from "./transcationDetail";
import { Review } from "./review";
import { User } from "./user";

export enum TransactionStatus {
  WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
  PAID = "PAID",
  EXPIRED = "EXPIRED",
}

export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  createdAt: Date;
  deletedAt: Date | null;
  totalPrice: number;
  status: TransactionStatus;
  uuid: string;

  user?: User;
  event?: Event;
  transactionDetails?: TransactionDetail[];
  review?: Review | null;
}
