export interface UpdateProfilePayload {
  name: string;
  username: string;
  email: string;
  password?: string;
  profilePict?: File | null;
}
