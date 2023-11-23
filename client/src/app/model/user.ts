export interface User {
  username: string;
  token: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserProfile {
  id: number;
  userName: string;
}
