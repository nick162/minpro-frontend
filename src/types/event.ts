import { City } from "./city";
import { Transaction } from "./transacation";
import { Review } from "./review";
import { Ticket } from "./ticket";
import { Voucher } from "./voucher";
import { User } from "./user";

export interface Event {
  id: number;
  userId: number;
  cityId: number;
  category: string; // jika enum, bisa ganti ke enum Category
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  eventName: string;
  slug: string;
  description: string;
  thumbnail: string;
  startDate: Date;
  endDate: Date;

  user?: User;
  city?: City;
  tickets?: Ticket[];
  transactions?: Transaction[];
  reviews?: Review[];
  vouchers?: Voucher[];
}
