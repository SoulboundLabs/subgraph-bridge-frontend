const steps = [
  { id: "Step 1", name: "Submitted", href: "#", status: "complete" },
  { id: "Step 2", name: "Challenge Window", href: "#", status: "current" },
  { id: "Step 3", name: "Certified", href: "#", status: "upcoming" },
];

export function BridgeProposalSteps() {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-0">
        {steps.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.status === "complete" ? (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-sky-600 py-2 pl-4 hover:border-sky-800 md:border-l-0 md:border-t md:pl-4 md:pt-2 md:pb-0"
              >
                <span className="text-sm font-medium text-sky-300 group-hover:text-sky-800">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            ) : step.status === "current" ? (
              <a
                href={step.href}
                className="flex flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t md:pl-4 md:pt-2 md:pb-0"
                aria-current="step"
              >
                <span className="text-sm font-medium text-sky-300">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            ) : (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t md:pl-4 md:pt-2 md:pb-0"
              >
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
