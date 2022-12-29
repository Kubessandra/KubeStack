import CheckIcon from "@heroicons/react/24/outline/CheckIcon";

interface PriceCardProps {
  name: string;
  id: string;
  priceMonthly: number;
  description: string;
  features: string[];
  onButtonClick?: (id: string) => void;
  buttonTitle?: string;
  currentSub?: boolean;
}

const PriceCard = (props: PriceCardProps) => {
  const {
    name,
    id,
    priceMonthly,
    features,
    description,
    onButtonClick = () => undefined,
    buttonTitle = "Get Started Today",
    currentSub = false,
  } = props;
  return (
    <div
      key={name}
      className="flex flex-col rounded-3xl bg-white shadow-xl ring-1 ring-black/10"
    >
      <div className="p-8 sm:p-10">
        <h3
          className="text-lg font-semibold leading-8 tracking-tight text-indigo-600"
          id={id}
        >
          {name}
        </h3>
        <div className="mt-4 flex items-baseline text-5xl font-bold tracking-tight text-gray-900">
          ${priceMonthly}
          <span className="text-lg font-semibold leading-8 tracking-normal text-gray-500">
            /mo
          </span>
        </div>
        <p className="mt-6 text-base leading-7 text-gray-600">{description}</p>
      </div>
      <div className="flex flex-1 flex-col p-2">
        <div className="flex flex-1 flex-col justify-between rounded-2xl bg-gray-50 p-6 sm:p-8">
          <ul role="list" className="space-y-6">
            {features.map((feature) => (
              <li key={feature} className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckIcon
                    className="h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-3 text-sm leading-6 text-gray-600">
                  {feature}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <button
              disabled={currentSub}
              onClick={() => onButtonClick(id)}
              className="inline-block w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold leading-5 text-white shadow-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:hover:cursor-not-allowed"
              aria-describedby={id}
            >
              {buttonTitle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
