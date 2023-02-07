import { UserButton, useUser } from "@clerk/nextjs";
import { ReactElement } from "react";
import Layout from "~/components/Layout";
import Loading from "~/components/Loading";

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) return <Loading />;

  return (
    <div>
      <h1 className="text-2xl font-bold my-8">Welcome to the dashboard</h1>
      <h2 className="my-4">{user.emailAddresses[0]?.emailAddress || "none"}</h2>
      <UserButton />
    </div>
  );
};

Dashboard.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Dashboard;
