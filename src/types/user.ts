export interface User {
  id: number;
  name: string;
  profilePict?: string;
  username: string;
  email: string;
  password: string;
  role: string;
  totalPoint?: number;
  coupons?: number;
  voucher?: string;
  referralCode: string;
}
