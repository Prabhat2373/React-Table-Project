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
        <span className={`px-2 rounded-3xl flex items-center w-2/3 gap-1 ${row?.original?.status === "Active" ? "text-green-500 bg-green-50" : "bg-gray-300 text-gray-800"}`}>
          <span className={`w-2 h-2 relative rounded-full ${row?.original?.status === "Active" ? "bg-green-500" : "bg-gray-700"}`}></span>
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