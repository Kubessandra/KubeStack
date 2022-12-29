import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import auth from "~/utils/auth";

export const useSession = (redirect: boolean) => {
  const router = useRouter();

  const { data: session } = useQuery(["fetch-session"], async () => {
    try {
      const session = await auth.getSession();
      return session;
    } catch (e) {
      if (redirect) {
        router.push(auth.loginURL);
      }
      return null;
    }
  });

  return session;
};
