export interface IUser {
  id: string;
  email: string;
  username: string;
  created_at: Date;
  token: string;
  refresh_token: string;
}
