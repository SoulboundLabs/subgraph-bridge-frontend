const data = [
  {
    id: 3,
    data: "0x4dcef5e5df51ec87349be2c2102fe69be9a5a89a08c3c2002acfa3a5c65b8a27",
    indexer: "0xcac4bba812b1285d29faf57d00ca110cf2e12686",
    submitter: "0x188435e42C58ee0Fe07A2d7069F6d2EA1d53ECf7",
    submittedAt: "8 days ago",
    grtStaked: "1202k",
    status: Status.Certified,
    block: 160811234,
  },

  {
    id: 2,
    data: "0xfec520a2e58425cda775c84203d16284a519146da59b4e4549fdd694c98cbd14",
    indexer: "0xcac4bba812b1285d29faf57d00ca110cf2e12686",
    submitter: "0x188435e42C58ee0Fe07A2d7069F6d2EA1d53ECf7",
    submittedAt: "3 days ago",
    grtStaked: "1202k",
    status: Status.Frozen,
    frozenFor: "4 days",
    block: 160512994,
  },
  {
    id: 1,
    data: "0x66a58ece05cfb708ac12e456d2c2db75e417029fe9ca398e6eb45048b926ac7a",
    indexer: "0x2a9df649f88b9ea0d85a405299ceab227da4c5dd",
    submitter: "0x188435e42C58ee0Fe07A2d7069F6d2EA1d53ECf7",
    submittedAt: "6 days ago",
    grtStaked: "227k",
    status: Status.Frozen,
    frozenFor: "7 Hours",
    block: 160111234,
  },
  {
    id: 3,
    data: "0xd5c03aedfbd18c0c765a7d5aff8d7303b8d9018707e0ce900cd993daa551960c",
    indexer: "0xcac4bba812b1285d29faf57d00ca110cf2e12686",
    submitter: "0x188435e42C58ee0Fe07A2d7069F6d2EA1d53ECf7",
    submittedAt: "8 days ago",
    grtStaked: "1202k",
    status: Status.Pending,
    block: 160623437,
  },

  {
    id: 3,
    data: "0x7fb10e30dad17aa189f0e01a31a5385bd995f8a1371882124fdb6a511aabfa00",
    indexer: "0x55d8344f6672654fb04458037d9cb74f685e6bd3",
    submitter: "0x188435e42C58ee0Fe07A2d7069F6d2EA1d53ECf7",
    submittedAt: "8 days ago",
    grtStaked: "1202k",
    status: Status.Disputed,
    block: 160989849,
  },
  {
    id: 3,
    data: "0x4dcef5e5df51ec87349be2c2102fe69be9a5a89a08c3c2002acfa3a5c65b8a27",
    indexer: "0x87ea05e53b26943b477a1a3031919b4dcb71a83a",
    submitter: "0x188435e42C58ee0Fe07A2d7069F6d2EA1d53ECf7",
    submittedAt: "8 days ago",
    grtStaked: "1202k",
    status: Status.Disputed,
    block: 160989849,
  },
];

import React from "react";
import { AlertOctagon, Checkbox, Eye } from "tabler-icons-react";
import { UserAddress } from "../Account/UserAddress";
import { Button } from "../Button/Button";
import { formatAddress } from "../lib/utils";
import { Status } from "../store/types";
import { StatusBadge } from "../Tag/StatusBadge";
import { SortableTable } from "./SortableTable";

export function BridgeProposalTable({}) {
  const columns = React.useMemo(
    () => [
      {
        header: "Data",
        accessorFn: (row) => row.data,
        cell: (info) => (
          <div>
            <div className="text-slate-300 flex font-bold">
              {info.getValue()}
            </div>

            <div className="text-slate-400 -mt-1.5">
              Submitted {info.row.original.submittedAt} by{" "}
              <a className="text-sky-300">
                {formatAddress(info.row.original.submitter)}
              </a>
            </div>
          </div>
        ),
      },

      {
        header: "Indexer",
        accessorFn: (row) => row.indexer,
        cell: (info) => {
          return (
            <UserAddress
              address={info.getValue()}
              extra={info.row.original.grtStaked + " GRT Staked"}
            />
          );
        },
      },

      {
        header: "Block",
        accessorFn: (row) => row.block,
        cell: (info) => {
          return (
            <div className="text-slate-300 flex  font-mono text-sm">
              {info.getValue()}
            </div>
          );
        },
      },

      {
        header: "Status",
        accessorFn: (row) => row.status,
        cell: (info) => {
          return (
            <div className="flex gap-2 w-24">
              <StatusBadge
                status={info.getValue()}
                extra={
                  info.row.original.status === Status.Frozen && (
                    <span>{info.row.original.frozenFor}</span>
                  )
                }
              />
            </div>
          );
        },
      },

      {
        id: "actions",
        header: <div className="opacity-0">Status</div>,
        cell: (info) => {
          const showDispute = [Status.Pending, Status.Frozen].includes(
            info.row.original.status
          );
          const showCertify = info.row.original.status === Status.Pending;
          const showRead = info.row.original.status === Status.Certified;

          return (
            <div className="flex justify-end gap-2">
              {showCertify && (
                <Button
                  label="Certify"
                  Icon={Checkbox}
                  palette="secondary"
                  reverse
                />
              )}
              {showDispute && (
                <Button label="Dispute" Icon={AlertOctagon} reverse />
              )}
              {showRead && (
                <Button
                  label="View On-Chain"
                  Icon={Eye}
                  palette="secondary"
                  reverse
                />
              )}
            </div>
          );
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
