import { Column } from "react-table";
import { TableDataType } from "./DataTable";

export const UserTableColumns: Column<TableDataType>[] = [
  {
    Header: "name",
    accessor: "name"
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }: any) => {
      // console.log(row?.original)
      return (
        <span className={`px-2 rounded-3xl ${row?.original?.status === "active" ? "text-green-500 bg-green-50" : "bg-gray-300 text-gray-800"}`}>
          {row?.original?.status}
        </span>
      )
    }
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Last Login",
    accessor: "lastLogin",

  }
];