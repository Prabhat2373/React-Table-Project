import { Column } from "react-table";
import { TableDataType } from "./DataTable";
import moment from 'moment'
import Bin from "../icons/Bin";
import Edit from './../icons/Edit';

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
    Header: "actions",
    accessor: "_id",
    Cell: ({ row }: any) => {
      return (
        <>
          <span></span>
        </>
      )
    }
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ row }: any) => {
      // console.log(row?.original)
      return (
        <span className={`px-2 rounded-3xl flex items-center w-2/3 gap-1 ${row?.original?.status?.toLowerCase() === "active" ? "text-green-500 bg-green-50" : "bg-gray-200 text-gray-800"}`}>
          <span className={`w-2 h-2 relative rounded-full ${row?.original?.status?.toLowerCase() === "active" ? "bg-green-500" : "bg-gray-700"}`}></span>
          {row?.original?.status.charAt(0) + row?.original?.status.slice(1) ?? "N.A."}
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
    Cell: ({ row }: any) => {
      return (
        <>
          <span className="flex gap-2">
            <button onClick={() => {
              console.log(row?.original?._id)
            }}>
              <Bin className="cursor-pointer" />
            </button>
            <button onClick={() => {
              console.log(row?.original?._id)
            }}>
              <Edit />
            </button>
          </span>
        </>
      )
    }
  }
];