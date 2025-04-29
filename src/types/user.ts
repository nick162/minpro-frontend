export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  point: number;
  coupons: number;
  voucher?: string;
  referralCode: string;
}
