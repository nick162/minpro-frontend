// @/types/user.ts
export interface RegisterPayload {
  name: string;
  email: string;
  username: string;
  password: string;
  referralCode?: string;
  role: "CUSTOMER" | "EVENT_ORGANIZER";
}
