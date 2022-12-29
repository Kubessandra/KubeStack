import { ReactElement } from "react";
import Layout from "~/components/Layout";

const SettingsPage = () => {
  return <div>Settings page</div>;
};

SettingsPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default SettingsPage;
