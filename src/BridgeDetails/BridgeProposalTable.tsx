import React from "react";
import subgraphBridgeABI from "../assets/abis/subgraph-bridge-abi.json";
import { Check, Checkbox, Clock, ClockOff } from "tabler-icons-react";
import { useBlockNumber } from "wagmi";
import { UserAddress } from "../Account/UserAddress";
import { Button } from "../Button/Button";
import { blockChainMap, GOERLI } from "../lib/blockchains";
import { formatAddress } from "../lib/utils";
import { Status } from "../store/types";
import { StatusBadge } from "../Tag/StatusBadge";
import { SortableTable } from "./SortableTable";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { SubgraphDataCertifiedQuery } from "./BridgeDetails";
import { useQuery } from "urql";

export function BridgeProposalTable({ data, certifiedData }) {
  const blockNumber = useBlockNumber({
    chainId: 5, //@dev change to 1 for mainnet
  });

  const requestCIDMap = React.useMemo(() => {
    const map = new Map();
    for (const item of certifiedData.queryResultFinalizeds) {
      map.set(item.requestCID, true);
    }
    return map;
  }, [certifiedData]);

  const columns = React.useMemo(
    () => [
      {
        header: "BlockNumber",
        accessorFn: (row) => row.blockNumber,
        cell: (info) => (
          <div>
            <div className="text-slate-300 flex font-bold">{info.getValue()}</div>
          </div>
        ),
      },

      {
        header: "Query Bridger",
        accessorFn: (row) => row.queryBridger,
        cell: (info) => {
          return <UserAddress address={info.getValue()} />;
        },
      },

      {
        header: "RequestCID",
        accessorFn: (row) => row.requestCID,
        cell: (info) => (
          <div>
            <div className="text-slate-300 flex font-bold">{info.getValue()}</div>
          </div>
        ),
      },

      // {
      //   header: "Response Data",
      //   accessorFn: (row) => row.response,
      //   cell: (info) => {
      //     return (
      //       <div>
      //         <div className="text-slate-300 flex font-bold">{info.getValue()}</div>
      //       </div>
      //     );
      //   },
      // },

      {
        id: "actions",
        header: <div className="opacity-0">Status</div>,
        cell: (info) => {
          const unlocksAt = info.row.original.unlocksAt;
          const showPending = unlocksAt > blockNumber.data;
          const showCertify = !showPending && !requestCIDMap.get(info.row.original.requestCID);
          const showRead = !showCertify && !showPending;

          const certify = async () => {
            try {
              const { subgraphBridgeID, response, attestationData } = info.row.original;
              console.log("ARGS[]:", subgraphBridgeID, response, attestationData);
              const config = await prepareWriteContract({
                address: blockChainMap[GOERLI].address,
                abi: subgraphBridgeABI as any,
                functionName: "certifySubgraphResponse",
                args: [subgraphBridgeID, response, attestationData],
              });
              const data = await writeContract(config);
              console.log("SUCCESS", data);
            } catch (e) {
              console.error(e);
            }
          };

          return (
            <div className="flex justify-end gap-2">
              {showCertify && <Button label="Certify" Icon={Checkbox} palette="secondary" reverse onClick={certify} />}
              {showPending && <Button label="Pending" Icon={Clock} palette="secondary" disabled reverse />}
              {showRead && <Button label="Certified" Icon={Check} palette="secondary" disabled reverse />}
            </div>
          );
        },
      },
    ],
    [blockNumber]
  );

  const renderRowSubComponent = React.useCallback(({ row }) => {
    return (
      <pre
        style={{
          fontSize: "10px",
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    );
  }, []);

  return <SortableTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />;
}
