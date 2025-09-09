import React, { useState } from "react";

type RowData = { [key: string]: any };

export interface Column<T extends RowData> {
    accessor: keyof T;
    header: string;
    filterType?: "text" | "number" | "date" | "select";
}

interface TableProps<T extends RowData> {
    data: T[];
    columns: Column<T>[];
    pageSize?: number;
}

const ReusableTable = <T extends RowData>({
                                              data,
                                              columns,
                                              pageSize = 25
                                          }: TableProps<T>) => {
    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
    const [filterDropdown, setFilterDropdown] = useState<{ [key: string]: boolean }>({});
    const [columnsVisible, setColumnsVisible] = useState<{ [key: string]: boolean }>(
        () => columns.reduce((acc, col) => ({ ...acc, [String(col.accessor)]: true }), {})
    );
    const [showOptions, setShowOptions] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalContent, setModalContent] = useState<string | null>(null);

    const handleFilterChange = (accessor: string, value: string) => {
        setFilterValues(prev => ({ ...prev, [accessor]: value }));
        setCurrentPage(1);
    };

    const toggleFilterDropdown = (accessor: string) => {
        setFilterDropdown(prev => ({ ...prev, [accessor]: !prev[accessor] }));
    };

    const toggleColumnVisibility = (accessor: string) => {
        setColumnsVisible(prev => ({ ...prev, [accessor]: !prev[accessor] }));
    };

    const filteredData = data.filter((row) =>
        columns.every((column) => {
            if (!column.filterType) return true;
            const filterValue = filterValues[String(column.accessor)];
            if (!filterValue) return true;

            const cellValue = row[column.accessor];
            if (column.filterType === "text") {
                return String(cellValue).toLowerCase().includes(filterValue.toLowerCase());
            }
            if (column.filterType === "number") {
                return Number(cellValue) === Number(filterValue);
            }
            if (column.filterType === "date") {
                return String(cellValue).startsWith(filterValue);
            }
            if (column.filterType === "select") {
                return String(cellValue) === filterValue;
            }
            return true;
        })
    );

    const visibleColumns = columns.filter(col => columnsVisible[String(col.accessor)]);

    // --- Pagination ---
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const startIdx = (currentPage - 1) * pageSize;
    const currentData = filteredData.slice(startIdx, startIdx + pageSize);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-6">
            <div className="bg-white shadow-xl rounded-xl w-full p-6">
                {/* Options */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-900">📊 Data Table</h2>
                    <div className="relative">
                        <button
                            onClick={() => setShowOptions(prev => !prev)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            ⚙️ Columns
                        </button>

                        {showOptions && (
                            <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-lg p-4 z-50">
                                {columns.map(col => (
                                    <label key={String(col.accessor)} className="block cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={columnsVisible[String(col.accessor)]}
                                            onChange={() => toggleColumnVisibility(String(col.accessor))}
                                            className="mr-2"
                                        />
                                        {col.header}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-base text-gray-700">
                        <thead className="bg-gray-600 text-white">
                        <tr>
                            {visibleColumns.map((col) => (
                                <th key={String(col.accessor)} className="p-4 text-left relative">
                                    <div className="flex items-center">
                                        {col.header}
                                        {col.filterType && (
                                            <button
                                                className="ml-2 text-white hover:text-gray-200"
                                                onClick={() => toggleFilterDropdown(String(col.accessor))}
                                            >
                                                🔽
                                            </button>
                                        )}
                                    </div>

                                    {filterDropdown[String(col.accessor)] && (
                                        <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-lg p-2 z-50">
                                            {col.filterType === "select" ? (
                                                <select
                                                    value={filterValues[String(col.accessor)] || ""}
                                                    onChange={(e) =>
                                                        handleFilterChange(String(col.accessor), e.target.value)
                                                    }
                                                    className="border px-2 py-1 rounded w-full"
                                                >
                                                    <option value="">All</option>
                                                    {Array.from(new Set(data.map(row => row[col.accessor]))).map((val, idx) => (
                                                        <option key={idx} value={String(val)}>
                                                            {String(val)}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={col.filterType}
                                                    placeholder={`Filter ${col.header}`}
                                                    value={filterValues[String(col.accessor)] || ""}
                                                    onChange={(e) =>
                                                        handleFilterChange(String(col.accessor), e.target.value)
                                                    }
                                                    className="border px-2 py-1 rounded w-full"
                                                />
                                            )}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {currentData.length > 0 ? (
                            currentData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className="odd:bg-gray-50 even:bg-white hover:bg-blue-100 transition"
                                >
                                    {visibleColumns.map((col) => {
                                        const rawValue = row[col.accessor];
                                        const cellValue = rawValue == null ? "-" : String(rawValue);
                                        const isOverflowing = cellValue.length > 30;

                                        return (
                                            <td
                                                key={String(col.accessor)}
                                                className="p-4 border cursor-pointer max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap"
                                                onClick={() => isOverflowing && setModalContent(cellValue)}
                                                title={isOverflowing ? "Click to view full content" : undefined}
                                            >
                                                {cellValue}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={visibleColumns.length}
                                    className="text-center p-4 text-gray-500"
                                >
                                    No data found
                                </td>
                            </tr>
                        )}
                        </tbody>

                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        ⬅️ Prev
                    </button>

                    <span className="text-gray-700">
                    Page {currentPage} / {totalPages || 1}
                </span>

                    <input
                        type="number"
                        min={1}
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => {
                            const page = Number(e.target.value);
                            if (page >= 1 && page <= totalPages) {
                                goToPage(page);
                            }
                        }}
                        className="w-16 px-2 py-1 border rounded text-center"
                    />

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        Next ➡️
                    </button>
                </div>
            </div>
        </div>
    );


};

export default ReusableTable;
