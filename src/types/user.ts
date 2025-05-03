export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  profilePict?: string | null;
  referralCode?: string | null;
  totalPoint: number;
  role: "ADMIN" | "USER"; // sesuaikan enum Role kamu
};
