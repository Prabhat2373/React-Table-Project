import { Column } from "react-table";
import { TableDataType } from "./DataTable";

export const UserTableColumns: Column<TableDataType>[]  = [
    {
      Header: "name",
      accessor: "name"
    },
    {
      Header: "Status",
      accessor: "status",
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