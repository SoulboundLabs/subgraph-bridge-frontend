import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { ChevronsDown, ChevronsUp } from "tabler-icons-react";
import { classNames } from "../lib/utils";
import { Status } from "../store/types";

export function SortableTable({
  columns,
  data,
  renderHeader = true,
  rounded = true,
}: any) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div
      className={` ${
        rounded ? "rounded-t-lg " : ""
      } lg:overflow-auto scrollbar:!w-1.5 scrollbar:!h-1.5 scrollbar:bg-transparent scrollbar-track:!bg-slate-100 scrollbar-thumb:!rounded scrollbar-track:!rounded scrollbar-track:!bg-slate-500/[0.16] scrollbar-thumb:!bg-slate-500/50`}
    >
      <table className="w-full text-left border-collapse">
        {renderHeader && (
          <thead className={rounded ? "rounded-t-lg " : ""}>
            {" "}
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      className={`sticky z-10 group top-0 text-sm leading-6 font-semibold p-0 bg-slate-900 text-slate-300 `}
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: classNames(
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              "px-4 py-2 align-middle border-b  border-slate-400/20 flex items-center gap-1"
                            ),
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ChevronsUp style={{ width: 18 }} />,
                            desc: <ChevronsDown style={{ width: 18 }} />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
        )}
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr
                key={row.id}
                className={classNames(
                  `px-4 text-xs relative leading-6 whitespace-pre text-sky-300 font-semibold`,
                  row.original["status"] === Status.Disputed
                    ? "bg-red-500/20"
                    : "",
                  row.original["status"] === Status.Certified
                    ? "bg-green-500/20"
                    : ""
                )}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      className="px-4 py-2 align-middle items-center"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
