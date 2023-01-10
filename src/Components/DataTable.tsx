import * as React from "react";
import { useTable, useSortBy, Column, TableOptions, usePagination } from "react-table";
import PagiationNavs from "./PagiationNavs";
import { useGetExportCSVMutation } from "../services/rtk/UserApi";


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
  status?: string;
  role?: string;
  lastLogin?: string;
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
    prepareRow,
    page,
    nextPage,
    pageOptions,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    setPageSize,
    state
  } = useTable<TableDataType>({ columns, data, initialState: { pageIndex: 2 } }, useSortBy, usePagination);
  const { pageIndex, pageSize } = state;

  const [DownloadCSV] = useGetExportCSVMutation()

  return (
    <>
      <div>
        <div className="table-top flex flex-col gap-7 pb-10">
          <h1 className="text-4xl font-semibold">Company Settings</h1>
          <div>

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:bg-gray-100 focus:text-blue-700 ">
                General
              </button>
              <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:bg-gray-100 focus:text-blue-700  ">
                Users
              </button> <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:bg-gray-100 focus:text-blue-700  ">
                Billing
              </button><button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:bg-gray-100 focus:text-blue-700  ">
                Integrations
              </button>
              <button type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
                plan
              </button>
            </div>

          </div>
        </div>
        <div className="border-2 border-gray-300 rounded-lg">
          <div className="data-tab m-4 flex justify-between items-center">
            <div>
              <h1 className="font-semibold text-lg">Users  <span className="px-2 py-1 text-base bg-green-50 text-green-500 rounded-3xl">42 users</span></h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing </p>
            </div>
            <div className="flex gap-4">
              <button className="border border-gray-300 p-2 rounded-lg font-semibold" onClick={() => {
                console.log("DOWNLOADING...")
                DownloadCSV("")
              }}>
                Download CSV
              </button>
              <button className="p-2 bg-blue-500 text-white rounded-lg">
                Add User
              </button>
            </div>
          </div>
          <table {...getTableProps()} className="w-full p-4 border-collapse border border-gray-300 ">
            <thead>
              {headerGroups?.map(headerGroup => (
                <tr {...headerGroup?.getHeaderGroupProps()} className="">
                  {headerGroup.headers?.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} title="Toggle Sort" className="text-left p-4">
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
                  <tr {...row.getRowProps()} className="border border-slate-600">
                    {row?.cells?.map(cell => {
                      return <td {...cell?.getCellProps()} className="p-4">{cell.render("Cell")}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between w-full items-center">
          {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          
          </button>{" "} */}
          <div>
            <button onClick={() => previousPage()} disabled={!canPreviousPage} className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 ">
              <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
              Previous
            </button>
          </div>
          {/* <button onClick={() => nextPage()} disabled={!canNextPage}>
            Next
          </button> */}
          {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {">>"}
          </button>{" "} */}
          <PagiationNavs pageIndex={pageIndex} pageSize={pageSize} />
          {/* <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "50px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select> */}
          <div>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700" onClick={() => nextPage()} disabled={!canNextPage}>
              Next
              <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

export default DataTable;
