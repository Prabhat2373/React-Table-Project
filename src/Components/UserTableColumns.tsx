import React from "react";
import { NumberRangeColumnFilter, SelectColumnFilter } from "../Helper/Helpers";


const UserTableColumns =
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
    ]

    export default UserTableColumns;