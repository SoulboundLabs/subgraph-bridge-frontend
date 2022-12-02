const plans = [
  {
    id: 1,
    name: "Hobby",
    memory: "4 GB RAM",
    cpu: "4 CPUs",
    storage: "128 GB SSD disk",
    price: "$40",
    isCurrent: false,
  },
  {
    id: 2,
    name: "Startup",
    memory: "8 GB RAM",
    cpu: "6 CPUs",
    storage: "256 GB SSD disk",
    price: "$80",
    isCurrent: true,
  },
  // More plans...
];

import React from "react";
import { SortableTable } from "./SortableTable";

export function BridgeProposalTable({}) {
  const data = [];
  const columns = React.useMemo(
    () => [
      {
        header: "Name",
        accessorFn: (row) => row.name,
        cell: (info) => (
          <div className="flex flex-col" style={{ width: 240 }}>
            <div className="text-sky-300 flex font-bold">{info.getValue()}</div>
          </div>
        ),
      },

      {
        header: "Type",
        accessorFn: (row) => row.type,
        cell: (info) => {
          return <div className="flex gap-2 w-24">{info.getValue()}</div>;
        },
      },
    ],
    []
  );

  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: "10px",
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    ),
    []
  );

  return (
    <SortableTable
      columns={columns}
      data={data}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
}
