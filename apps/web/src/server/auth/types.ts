export interface Session {
  userID: string;
  email: string;
}

export type GetSessionFunc = (params: {
  authorization: string;
  cookies: Record<string, string | undefined>;
}) => Promise<Session | null>;
