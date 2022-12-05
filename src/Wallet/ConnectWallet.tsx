import styled from "@emotion/styled";
import { ConnectKitButton } from "connectkit";
import { Wallet } from "tabler-icons-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { UserAddress } from "../Account/UserAddress";
import { Button } from "../Button/Button";

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 14px 24px;
  color: #ffffff;
  background: #1a88f8;
  font-size: 16px;
  font-weight: 500;
  border-radius: 10rem;
  box-shadow: 0 4px 24px -6px #1a88f8;

  transition: 200ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 40px -6px #1a88f8;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 32px -6px #1a88f8;
  }
`;

export const ConnectKitCustom = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <Button
            onClick={show}
            reverse
            Icon={Wallet}
            label={
              isConnected ? (
                <UserAddress address={truncatedAddress} size={32} />
              ) : (
                "Connect Wallet"
              )
            }
          />
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export function ConnectWallet() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <ConnectKitCustom />
    </div>
  );
}
