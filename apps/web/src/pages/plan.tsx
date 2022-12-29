import { ReactElement } from "react";
import Layout from "~/components/Layout";
import Pricing from "~/components/Pricing";

const PlanPage = () => {
  return <Pricing />;
};

PlanPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default PlanPage;
