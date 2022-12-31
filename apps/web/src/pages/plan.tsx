import { useRouter } from "next/router";
import { ReactElement } from "react";
import Layout from "~/components/Layout";
import Pricing from "~/components/Pricing";
import { useSession } from "~/hooks/useSession";
import { trpc } from "~/utils/trpc";

const PlanPage = () => {
  const router = useRouter();
  const session = useSession(true);
  const customerPortalMutation =
    trpc.payment.createCustomerPortal.useMutation();

  if (!session) return null;
  return (
    <div className="flex-col items-center flex">
      <Pricing />
      <button
        className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
        onClick={async () => {
          const url = await customerPortalMutation.mutateAsync();
          router.push(url);
        }}
      >
        Customer Portal
      </button>
    </div>
  );
};

PlanPage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default PlanPage;
