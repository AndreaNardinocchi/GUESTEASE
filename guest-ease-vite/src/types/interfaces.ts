// Signed up User interface
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
}

// AuthContext Interface
export interface AuthContextInterface {
  token: string | null;
  // User object added
  user?: User;
  // authenticate: (username: string, password: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authenticate: (user: any) => void;
  signout: () => void;
}
