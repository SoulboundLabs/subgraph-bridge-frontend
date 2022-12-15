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
        }
      }
    `,
    }),
   })
   .then((r) => r.json())
   .then((data) => setData(data.data));
   }, []);

   console.log("SUBGRAPH ADDEDS: ", data);

  const columns = React.useMemo(
    () => [
      {
        header: "Data",
        accessorFn: (row) => row.data,
        cell: (info) => (
          <div>
            <div className="text-slate-300 flex font-bold">{info.getValue()}</div>

            <div className="text-slate-400 -mt-1.5">
              Submitted {info.row.original.submittedAt} by <a className="text-sky-300">{formatAddress(info.row.original.submitter)}</a>
            </div>
          </div>
        ),
      },

    //{
    //  header: "Indexer",
    //  accessorFn: (row) => row.indexer,
    //  cell: (info) => {
    //    return <UserAddress address={info.getValue()} extra={info.row.original.grtStaked + " GRT Staked"} />;
    //  },
    //},

      {
        header: "Query Bridger",
        accessorFn: (row) => row.queryBridger,
        cell: (info) => {
          return <UserAddress address={info.getValue()} extra={info.row.original.grtStaked + " GRT Staked"} />;
        },
      },

    //{
    //  header: "Block",
    //  accessorFn: (row) => row.block,
    //  cell: (info) => {
    //    return <div className="text-slate-300 flex  font-mono text-sm">{info.getValue()}</div>;
    //  },
    //},

    //{
    //  header: "Status",
    //  accessorFn: (row) => row.status,
    //  cell: (info) => {
    //    return (
    //      <div className="flex gap-2 w-24">
    //        <StatusBadge status={info.getValue()} extra={info.row.original.status === Status.Frozen && <span>{info.row.original.frozenFor}</span>} />
    //      </div>
    //    );
    //  },
    //},

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
    []
  );

  const renderRowSubComponent = React.useCallback(
    ({ row }) => {

    return (
      <pre
        style={{
          fontSize: "10px",
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    )},
    []
  );

  return <SortableTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />;
}
