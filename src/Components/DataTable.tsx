import * as React from "react";
import { useTable, useSortBy, Column, TableOptions } from "react-table";


// const columns: Column<Data>[] = [
//   {
//     Header: "name",
//     accessor: "name"
//   },
//   {
//     Header: "email",
//     accessor: "email"
//   }
// ];

export interface TableDataType {
  name: string;
  status?:string;
  role?:string;
  lastLogin?:string;
}
interface DataTableTypes {
  columns: Column<TableDataType>[];
  data: TableDataType[];
}

function DataTable({ columns, data }: DataTableTypes) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable<TableDataType>({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups?.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers?.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {/* {console.log(column.getSortByToggleProps())} */}
                {column.render("Header")}
                <span>
                  {" "}
                  {column.isSorted
                    ? column.isSortedDesc
                      ? " 🔽"
                      : " 🔼"
                    : ""}{" "}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows?.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells?.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;
