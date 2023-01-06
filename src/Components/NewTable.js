import React from "react";
// import styled from "styled-components";
import {
    useTable,
    useFilters,
    usePagination,
    useRowSelect,
    useSortBy
} from "react-table";
// A great library for fuzzy filtering/sorting items
import { matchSorter } from "match-sorter";


//var reactListbox = require("react-listbox");

// const Styles = styled.div`
//   padding: 1rem;

//   .row {
//     box-sizing: border-box;
//     display: flex;
//     flex: 0 1 auto;
//     flex-direction: row;
//     flex-wrap: wrap;
//     margin-right: var(--gutter-compensation, -0.5rem);
//     margin-left: var(--gutter-compensation, -0.5rem);
//   }

//   .col-xs-6 {
//     flex-basis: 50%;
//   }

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
//   .pagination {
//     padding: 0.5rem;
//   }
// `;

// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter }
}) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ""}
            onChange={e => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    );
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id }
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach(row => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

// This is a custom UI for our 'between' or number range
// filter. It uses two number boxes and filters rows to
// ones that have values between the two
function NumberRangeColumnFilter({
    column: { filterValue = [], preFilteredRows, setFilter, id }
}) {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach(row => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div
            style={{
                display: "flex"
            }}
        >
            <input
                value={filterValue[0] || ""}
                type="number"
                onChange={e => {
                    const val = e.target.value;
                    setFilter((old = []) => [
                        val ? parseInt(val, 10) : undefined,
                        old[1]
                    ]);
                }}
                placeholder={`Min (${min})`}
                style={{
                    width: "70px",
                    marginRight: "0.5rem"
                }}
            />
            to
            <input
                value={filterValue[1] || ""}
                type="number"
                onChange={e => {
                    const val = e.target.value;
                    setFilter((old = []) => [
                        old[0],
                        val ? parseInt(val, 10) : undefined
                    ]);
                }}
                placeholder={`Max (${max})`}
                style={{
                    width: "70px",
                    marginLeft: "0.5rem"
                }}
            />
        </div>
    );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val;

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        );
    }
);

function Pagination({
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageOptions,
    pageIndex,
    pageSize,
    setPageSize
}) {
    return (
        <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
            </button>{" "}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {"<"}
            </button>{" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
            </button>{" "}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {">>"}
            </button>{" "}
            <span>
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
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        gotoPage(page);
                    }}
                    style={{ width: "100px" }}
                />
            </span>{" "}
            <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value));
                }}
            >
                {[20, 50, 100, 1000, 10000].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
    );
}
// Our table component
function Table({ columns, data }) {
    const filterTypes = React.useMemo(
        () => ({
            // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            }
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        pageCount,
        page, // Instead of using 'rows', we'll use page, which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,

        state
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
            initialState: { pageSize: 100 }
        },
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: "selection",
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    )
                },
                ...columns
            ]);
        }
    );

    console.log(state);

    const { pageSize, pageIndex } = state;
    const paginationProps = {
        gotoPage,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        pageCount,
        pageOptions,
        pageIndex,
        pageSize,
        setPageSize
    };

    return (
        <>
            {/* <Pagination {...paginationProps} /> */}
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                                    </span>
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination {...paginationProps} />
            <br />
            <div className="row">
                <div className="col-xs-6">
                    <pre>
                        <code>Filters: {JSON.stringify(state.filters, null, 2)}</code>
                    </pre>
                </div>
                <div className="col-xs-6">
                    <pre>
                        <code>
                            Pagination:{" "}
                            {JSON.stringify({ pageIndex, pageSize, pageCount }, null, 2)}
                        </code>
                    </pre>
                </div>
            </div>
        </>
    );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id];
        return rowValue >= filterValue;
    });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== "number";

function NewTable() {
    const columns = React.useMemo(
        () => [
            {
                Header: "Info",
                columns: [
                    {
                        Header: "email",
                        accessor: "email"
                    },
                    {
                        Header: "Alias",
                        accessor: "alias",
                        // Use our custom `fuzzyText` filter on this column
                        filter: "fuzzyText"
                    },
                    {
                        Header: "Gender",
                        accessor: "gender",
                        Filter: SelectColumnFilter,
                        filter: "equals"
                    },
                    {
                        Header: "Manager?",
                        accessor: "manager",
                        Filter: SelectColumnFilter,
                        filter: "equals"
                    },
                    {
                        Header: "Teams Managed",
                        accessor: "teamsManaged",
                        Filter: NumberRangeColumnFilter,
                        filter: "between"
                    }
                ]
            }
        ],
        []
    );

    const data = [
        {
            email: "aohn.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]

        },{
            email: "aohn.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "aohn.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "female",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        },{
            email: "john.doe@example.com",
            alias: "John Doe",
            gender: "Male",
            manager: true,
            teamsManaged: [1, 2, 3]
            
        }
    ];

    return (
        <Table columns={columns} data={data} />

    );
}

export default NewTable;
