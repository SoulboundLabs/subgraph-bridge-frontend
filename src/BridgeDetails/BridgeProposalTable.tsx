import React from "react";
import { AlertOctagon, Checkbox, Eye } from "tabler-icons-react";
import { UserAddress } from "../Account/UserAddress";
import { Button } from "../Button/Button";
import { formatAddress } from "../lib/utils";
import { Status } from "../store/types";
import { StatusBadge } from "../Tag/StatusBadge";
import { SortableTable } from "./SortableTable";

export function BridgeProposalTable({}) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.studio.thegraph.com/query/13658/subgraphbridge/0.69", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
      {
        subgraphResponseAddeds {
          queryBridger
          subgraphDeploymentID
          response
          blockNumber
        }
      }
    `,
      }),
    })
      .then((r) => r.json())
      .then((data) => setData(data.data.subgraphResponseAddeds));
  }, []);

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
        header: "Response Data",
        accessorFn: (row) => row.response,
        cell: (info) => {
          return (
            <div>
              <div className="text-slate-300 flex font-bold">{info.getValue()}</div>
            </div>
          );
        },
      },

      {
        id: "actions",
        header: <div className="opacity-0">Status</div>,
        cell: (info) => {
          const showDispute = [Status.Pending, Status.Frozen].includes(info.row.original.status);
          const showCertify = info.row.original.status === Status.Pending;
          const showRead = info.row.original.status === Status.Certified;

          return (
            <div className="flex justify-end gap-2">
              {showCertify && <Button label="Certify" Icon={Checkbox} palette="secondary" reverse />}
              {showRead && <Button label="View On-Chain" Icon={Eye} palette="secondary" reverse />}
            </div>
          );
        },
      },
    ],
    [data]
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
