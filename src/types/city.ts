import { Event } from "./event";

export interface City {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  cityName: string;
  events?: Event[];
}
