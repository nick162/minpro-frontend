import { Event } from "./event";
import { User } from "./user";

export interface Voucher {
  id: number;
  userId: number;
  eventId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  amount: number;
  quota: number;
  claimed: number;
  validUntil: Date;
  code: string;

  user?: User;
  event?: Event;
}
