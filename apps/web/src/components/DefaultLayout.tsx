import Head from "next/head";
import { ReactNode } from "react";

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-full h-full flex flex-col">{children}</main>
    </>
  );
};
