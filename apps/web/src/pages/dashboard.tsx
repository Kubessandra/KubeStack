import Link from "next/link";
import { ReactElement } from "react";
import Layout from "~/components/Layout";
import { useSession } from "~/hooks/useSession";
import auth from "~/utils/auth";

const Dashboard = () => {
  const session = useSession(true);
  if (!session) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Welcome to the dashboard</h1>
      <h2 className="my-4">{session.email}</h2>
      <div className="flex flex-col items-center space-y-4 m-8">
        <Link
          className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
          href={auth.logoutURL}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Dashboard;
