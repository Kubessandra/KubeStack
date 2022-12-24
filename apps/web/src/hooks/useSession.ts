import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import auth, { IAuthSession } from "~/utils/auth";

export const useSession = (redirect: boolean) => {
  const router = useRouter();
  const [session, setSession] = useState<IAuthSession | null>(null);

  useEffect(() => {
    const fun = async () => {
      try {
        const session = await auth.getSession();
        setSession(session);
      } catch (e) {
        if (redirect) {
          router.push(auth.loginURL);
        }
      }
    };
    fun();
  }, [router, redirect]);

  return session;
};
