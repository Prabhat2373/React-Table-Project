import { Column } from "react-table";
import { TableDataType } from "./DataTable";
// import moment from 'moment'
import Bin from "../icons/Bin";
import Edit from './../icons/Edit';
import Modal from "../Components/Modals/Modal";
import EditUserForm from './Forms/EditUserForm';
import { useState } from 'react';
import moment from 'moment';
import { useDeleteUserMutation, useUpdateUserMutation } from "../services/rtk/UserApi";

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
          {/* <span>{row?.original?.lastLogin ?? "N.A."}</span> */}
        </>
      )
    }
  },
  {
    Header: 'actions',
    accessor: "actions",
    Cell: ({ row }: any) => {
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [DeleteUser] = useDeleteUserMutation();
      function DeleteUserFn(id: string | number) {
        DeleteUser(id).then(() => {
          console.log("SUCCESS");
          window.location.reload(); // IGONRE THIS BECAUSE REDUX ISNT'S SETTED UP.
        }).catch((err) => err?.message)
      }
      function UpdateUser({ data }: any) {
        const [UpdateUser] = useUpdateUserMutation();

      }
      return (
        <>
          <span className="flex gap-2">
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} children={<EditUserForm id={row?.original?._id} />} />
            {row?.original?.role.toLowerCase() === "admin" ? <span>
              <button onClick={() => {
                console.log(row?.original?._id)
                let conf = window.confirm("Are You Sure To Delete This User")
                // conf === true ? DeleteUserFn(row?.original?._id) : "false";
                if (conf === true) {
                  console.log("CONDITIOM IS TRUE");
                  DeleteUserFn(row?.original?._id)
                }
              }}>
                <Bin className="cursor-pointer" />
              </button>
              <button onClick={() => {
                setIsModalOpen((prev) => !prev)
                console.log(row?.original?._id)
              }}>
                <Edit />
              </button>
            </span> : <></>}
          </span>
        </>
      )
    }
  }
];