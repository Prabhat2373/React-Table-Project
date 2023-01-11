import { Column } from "react-table";
import { TableDataType } from "./DataTable";
import moment from 'moment'

export const UserTableColumns: Column<TableDataType>[] = [
  {
    Header: "name",
    accessor: "name",
    width: 400,
    Cell: ({ row }: any) => {
      return (
        <span>
          {row?.original?.name ?? "N.A."}
        </span>
      )
    }
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }: any) => {
      // console.log(row?.original)
      return (
        <span className={`px-2 rounded-3xl flex items-center w-2/3 gap-1 ${row?.original?.status === "Active" ? "text-green-500 bg-green-50" : "bg-gray-200 text-gray-800"}`}>
          <span className={`w-2 h-2 relative rounded-full ${row?.original?.status === "Active" ? "bg-green-500" : "bg-gray-700"}`}></span>
          {row?.original?.status ?? "N.A."}
        </span>
      )
    },
    width: 400

  },
  {
    Header: "Role",
    accessor: "role",
    width: 400,
    Cell: ({ row }: any) => {
      return (
        <span>
          {row?.original?.role ?? "N.A."}
        </span>
      )
    }

  },
  {
    Header: "Last Login",
    accessor: "lastLogin",
    width: 100,
    Cell: ({ row }: any) => {
      return (
        <>
          <span>{moment(row?.original?.lastLogin).format("MMM Do YY") ?? "N.A."}</span>
        </>
      )
    }
  },
  {
    Header: 'actions',
    accessor: "actions",
  }
];