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
}

const ReusableTable = <T extends RowData>({ data, columns }: TableProps<T>) => {
    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
    const [filterDropdown, setFilterDropdown] = useState<{ [key: string]: boolean }>({});
    const [columnsVisible, setColumnsVisible] = useState<{ [key: string]: boolean }>(
        () => columns.reduce((acc, col) => ({ ...acc, [String(col.accessor)]: true }), {})
    );
    const [showOptions, setShowOptions] = useState(false);

    const handleFilterChange = (accessor: string, value: string) => {
        setFilterValues(prev => ({ ...prev, [accessor]: value }));
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 p-6">
            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-6xl p-6">
                {/* Options */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-blue-900">📊 Data Table</h2>
                    <button
                        onClick={() => setShowOptions(prev => !prev)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        ⚙️ Columns
                    </button>
                </div>

                {showOptions && (
                    <div className="absolute bg-white shadow-lg border rounded-lg p-4 z-50">
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

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm text-gray-700">
                        <thead className="bg-blue-700 text-white">
                        <tr>
                            {visibleColumns.map((col) => (
                                <th key={String(col.accessor)} className="p-3 text-left relative">
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
                                        <div className="absolute mt-2 bg-white shadow-lg border rounded-lg p-2 z-50">
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
                        {filteredData.length > 0 ? (
                            filteredData.map((row, idx) => (
                                <tr key={idx} className="hover:bg-blue-100 transition">
                                    {visibleColumns.map((col) => (
                                        <td key={String(col.accessor)} className="p-3 border">
                                            {String(row[col.accessor])}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={visibleColumns.length} className="text-center p-4 text-gray-500">
                                    No data found
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReusableTable;
