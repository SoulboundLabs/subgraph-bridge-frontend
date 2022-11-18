import { Chain } from '@web3-onboard/common'
import type { ConnectedChain } from '@web3-onboard/core'

interface Props {
  className?: string
  chains: Chain[]
  setChain: (chainId: string) => Promise<void>
  connectedChain: ConnectedChain | null
}

export const Network = ({ className, chains, connectedChain, setChain }: Props) => (
  <select
    className={`${className} select select-bordered`}
    onChange={({ target: { value } }) => setChain(value)}
    value={connectedChain?.id}
  >
    {chains.map(({ id, label }) => {
      return (
        <option value={id} key={id}>
          {label}
        </option>
      )
    })}
  </select>
)
