import { Container } from "../Layout/Container";
import { ConnectWallet } from "../Wallet/ConnectWallet";

export function Header({ title, cta }) {
  return (
    <div className="flex w-full pr-12 pt-16 lg:pt-12 pb-8 lg:border-b lg:border-slate-500">
      <Container className="w-full">{title}</Container>
      <div className="flex justify-end gap-4 items-center w-full">
        {cta}
        <ConnectWallet />
      </div>
    </div>
  );
}
