import { Fragment } from "react";
import { Container } from "../Layout/Container";
import { ConnectWallet } from "../Wallet/ConnectWallet";

export function Header({ breadcrumbs, cta }) {
  return (
    <div className="flex w-full pr-12 py-3 lg:border-b lg:border-slate-500">
      <Container className="w-full">
        <div className="flex items-center gap-6 mt-2 ">
          <span className="flex gap-6 font-bold text-slate-300">
            {breadcrumbs.map((breadcrumb, idx) => (
              <Fragment key={idx}>
                {idx !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {breadcrumb}
              </Fragment>
            ))}
          </span>
        </div>
      </Container>
      <div className="flex justify-end gap-4 items-center w-full">
        {cta}
        <ConnectWallet />
      </div>
    </div>
  );
}
