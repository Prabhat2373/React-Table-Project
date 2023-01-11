import React from "react";
import { matchSorter } from "match-sorter";

export const NumberRangeColumnFilter = ({
    column: { filterValue = [], preFilteredRows, setFilter, id }
}: any) => {
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach((row: any) => {
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
export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id }
}: any) => {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options: any = new Set();
        preFilteredRows.forEach((row: any) => {
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
export const Pagination = ({
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
}: any) => {
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
export const fuzzyTextFilterFn = function ({ rows, id, filterValue }: any) {
    return matchSorter(rows, filterValue, { keys: [(row: any) => row.values[id]] });
}

export const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter }
}: any) => {
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


