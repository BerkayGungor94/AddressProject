import React, { useState } from "react";
import { FaFilter, FaCog } from "react-icons/fa";

export interface Column<T> {
    accessor: keyof T;
    header: string;
    isVisible?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
    filterOptions?: string[];
    type?: "text" | "number" | "date" | "select";
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchable: boolean;
}

function ReusableTable<T extends object>({ data, columns }: TableProps<T>) {
    const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>(
        {}
    );
    const [columnVisibility, setColumnVisibility] = useState<{
        [key: string]: boolean;
    }>(() =>
        columns.reduce(
            (acc, col) => ({
                ...acc,
                [col.accessor as string]: col.isVisible !== false,
            }),
            {}
        )
    );
    const [showColumnOptions, setShowColumnOptions] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 25;
    const visibleColumns = columns.filter(
        (c) => columnVisibility[c.accessor as string]
    );

    const handleColumnFilterChange = (accessor: string, value: string) => {
        setColumnFilters((prev) => ({ ...prev, [accessor]: value }));
        setCurrentPage(1);
    };

    const handleColumnVisibilityChange = (accessor: string, visible: boolean) => {
        setColumnVisibility((prev) => ({ ...prev, [accessor]: visible }));
    };

    // Kombine filtreleme
    const filteredData = data.filter((row) => {
        return Object.entries(columnFilters).every(([accessor, value]) => {
            if (!value) return true;
            const col = columns.find((c) => c.accessor === accessor);
            if (!col) return true;

            const cellValue = row[accessor as keyof T];
            if (col.type === "date") {
                return (
                    new Date(cellValue as any)
                        .toLocaleDateString("tr-TR")
                        .includes(value) ?? false
                );
            }
            if (col.type === "number") {
                return String(cellValue) === value;
            }
            if (col.type === "select" && col.filterOptions) {
                return cellValue?.toString() === value;
            }
            return cellValue?.toString().toLowerCase().includes(value.toLowerCase());
        });
    });

    const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    return (
        <div>
            {/* Filtre ve Options */}
            <div className="d-flex align-items-center mb-3 gap-2">
                {/* Filter dropdown menu */}
                <div className="position-relative">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setShowFilterMenu((prev) => !prev)}
                    >
                        <FaFilter />
                    </button>

                    {showFilterMenu && (
                        <div
                            className="card position-absolute p-2"
                            style={{ zIndex: 10, minWidth: "220px" }}
                        >
                            {columns.map((col) => (
                                <div key={String(col.accessor)} className="mb-2">
                                    <label className="form-label">{col.header}</label>
                                    {col.type === "select" && col.filterOptions ? (
                                        <select
                                            className="form-control"
                                            value={columnFilters[col.accessor as string] || ""}
                                            onChange={(e) =>
                                                handleColumnFilterChange(col.accessor as string, e.target.value)
                                            }
                                        >
                                            <option value="">Tümü</option>
                                            {col.filterOptions.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    ) : col.type === "date" ? (
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={columnFilters[col.accessor as string] || ""}
                                            onChange={(e) =>
                                                handleColumnFilterChange(col.accessor as string, e.target.value)
                                            }
                                        />
                                    ) : (
                                        <input
                                            type={col.type === "number" ? "number" : "text"}
                                            className="form-control"
                                            placeholder={`${col.header} ara...`}
                                            value={columnFilters[col.accessor as string] || ""}
                                            onChange={(e) =>
                                                handleColumnFilterChange(col.accessor as string, e.target.value)
                                            }
                                        />
                                    )}
                                </div>
                            ))}
                            <button
                                className="btn btn-sm btn-outline-primary w-100 mt-1"
                                onClick={() => setColumnFilters({})}
                            >
                                Clear All
                            </button>
                        </div>
                    )}
                </div>

                {/* Column visibility */}
                <div className="position-relative">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setShowColumnOptions((prev) => !prev)}
                    >
                        <FaCog />
                    </button>
                    {showColumnOptions && (
                        <div
                            className="card position-absolute p-2"
                            style={{ zIndex: 10, minWidth: "150px" }}
                        >
                            {columns.map((col) => (
                                <label
                                    key={String(col.accessor)}
                                    className="d-flex align-items-center gap-1"
                                >
                                    <input
                                        type="checkbox"
                                        checked={columnVisibility[col.accessor as string]}
                                        onChange={(e) =>
                                            handleColumnVisibilityChange(
                                                col.accessor as string,
                                                e.target.checked
                                            )
                                        }
                                    />
                                    {col.header}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Tablo */}
            <table className="table table-bordered">
                <thead>
                <tr>
                    {visibleColumns.map((col) => (
                        <th key={String(col.accessor)} style={{ cursor: "default" }}>
                            {col.header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {paginatedData.length > 0 ? (
                    paginatedData.map((row, idx) => (
                        <tr
                            key={idx}
                            className={idx % 2 === 0 ? "table-light" : "table-white"}
                        >
                            {visibleColumns.map((col) => (
                                <td key={String(col.accessor)} style={{ cursor: "default" }}>
                                    {col.type === "date" && row[col.accessor]
                                        ? new Date(row[col.accessor] as any).toLocaleDateString("tr-TR")
                                        : String(row[col.accessor] ?? "")}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={visibleColumns.length} className="text-center">
                            No data found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* Sayfa Kontrolleri */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center gap-2 mt-2">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Önceki
                    </button>
                    <span className="align-self-center">
            {currentPage} / {totalPages}
          </span>
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Sonraki
                    </button>
                </div>
            )}
        </div>
    );
}

export default ReusableTable;
