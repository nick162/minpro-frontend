import { Transaction } from "./transcation";
import { Ticket } from "./ticket";

export interface TransactionDetail {
  id: number;
  transactionId: number;
  ticketId: number;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  price: number;
  qty: number;

  transaction?: Transaction;
  ticket?: Ticket;
}
