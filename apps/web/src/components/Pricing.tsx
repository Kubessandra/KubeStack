import { useRouter } from "next/router";
import { STARTER_PRICE_ID } from "~/utils/constants";
import { trpc } from "~/utils/trpc";
import Loading from "./Loading";
import PriceCard from "./Pricing/PriceCard";

const tiers = [
  {
    id: "free-tier",
    name: "Free",
    priceMonthly: 0,
    description:
      "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis.",
    features: ["Pariatur quod similique"],
  },
  {
    id: STARTER_PRICE_ID,
    name: "Pro",
    priceMonthly: 25,
    description:
      "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis.",
    features: [
      "Pariatur quod similique",
      "Sapiente libero doloribus modi nostrum",
    ],
  },
];

export default function Pricing() {
  const router = useRouter();
  const createCheckoutSession = trpc.payment.createSession.useMutation();
  const { data: paymentInfo, isLoading } =
    trpc.payment.getPaymentInfo.useQuery();
  const customerPortalMutation =
    trpc.payment.createCustomerPortal.useMutation();

  if (isLoading || !paymentInfo) return <Loading />;

  const { isSubscriptionActive } = paymentInfo;
  const handlePriceClick = async (priceId: string) => {
    let redirectUrl: string;
    if (priceId === "free-tier" || isSubscriptionActive) {
      redirectUrl = await customerPortalMutation.mutateAsync();
    } else {
      redirectUrl = await createCheckoutSession.mutateAsync({ priceId });
    }
    router.push(redirectUrl);
  };
  const currentSubId = isSubscriptionActive ? STARTER_PRICE_ID : "free-tier";

  return (
    <div className="bg-gray-900">
      <div className="relative overflow-hidden pt-32 pb-96 lg:pt-40">
        <div>
          <img
            className="absolute bottom-0 left-1/2 w-[1440px] max-w-none -translate-x-1/2"
            src="https://tailwindui.com/img/component-images/grid-blur-purple-on-black.jpg"
            alt=""
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <h2 className="text-lg font-semibold leading-8 text-indigo-400">
              Pricing
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-white">
              The right price for you,{" "}
              <br className="hidden sm:inline lg:hidden" />
              whoever you are
            </p>
            <p className="mt-6 text-lg leading-8 text-white/60">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
              numquam eligendi quos odit doloribus molestiae voluptatum.
            </p>
          </div>
        </div>
      </div>
      <div className="flow-root bg-white pb-32 lg:pb-40">
        <div className="relative -mt-80">
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 lg:gap-8">
              {tiers.map((tier) => {
                const isCurrentSub = currentSubId === tier.id;
                return (
                  <PriceCard
                    key={tier.id}
                    name={tier.name}
                    onButtonClick={handlePriceClick}
                    buttonTitle={
                      isCurrentSub ? "Current Plan" : `Switch to ${tier.name}`
                    }
                    description={tier.description}
                    features={tier.features}
                    priceMonthly={tier.priceMonthly}
                    currentSub={isCurrentSub}
                    id={tier.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
