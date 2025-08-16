import React, { useState } from "react";
import { FaFilter, FaCog } from "react-icons/fa";

export interface Column<T> {
    accessor: keyof T;
    header: string;
    isVisible?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
    filterOptions?: string[];
    type?: "text" | "number" | "date";
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    searchable: boolean;
}

function ReusableTable<T extends object>({ data, columns }: TableProps<T>) {
    const [selectedColumn, setSelectedColumn] = useState<string>("");
    const [filterValue, setFilterValue] = useState<string>("");
    const [columnVisibility, setColumnVisibility] = useState<{ [key: string]: boolean }>(
        () => columns.reduce((acc, col) => ({ ...acc, [col.accessor as string]: col.isVisible !== false }), {})
    );
    const [showColumnOptions, setShowColumnOptions] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const PAGE_SIZE = 25; // sayfa başına kayıt sayısı

    const visibleColumns = columns.filter(c => columnVisibility[c.accessor as string]);

    const handleFilterChange = (value: string) => {
        setFilterValue(value);
        setCurrentPage(1); // filtre değişince sayfa 1'e dönsün
    };

    const handleColumnVisibilityChange = (accessor: string, visible: boolean) => {
        setColumnVisibility(prev => ({ ...prev, [accessor]: visible }));
    };

    // Filtrelenmiş veri
    const filteredData = selectedColumn
        ? data.filter(row => {
            const col = columns.find(c => c.accessor === selectedColumn);
            if (!col) return true;
            const cellValue = row[col.accessor];

            if (!filterValue) return true;

            if (col.type === "date") {
                const cellDate = new Date(cellValue as any);
                const filterDate = new Date(filterValue);
                return cellDate.toDateString() === filterDate.toDateString();
            }

            return cellValue?.toString().toLowerCase().includes(filterValue.toLowerCase());
        })
        : data;

    // Sayfalama hesaplama
    const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
    const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <div>
            {/* Filtre ve Options */}
            <div className="d-flex align-items-start mb-3 gap-2">
                <FaFilter />
                <select
                    className="form-control"
                    value={selectedColumn}
                    onChange={e => {
                        setSelectedColumn(e.target.value);
                        setFilterValue("");
                        setCurrentPage(1);
                    }}
                >
                    <option value="">Filtrele</option>
                    {columns.map(col => (
                        <option key={String(col.accessor)} value={String(col.accessor)}>
                            {col.header}
                        </option>
                    ))}
                </select>

                {selectedColumn && (() => {
                    const col = columns.find(c => c.accessor === selectedColumn);
                    if (!col) return null;

                    if (col.filterOptions) {
                        return (
                            <select
                                className="form-control"
                                value={filterValue}
                                onChange={e => handleFilterChange(e.target.value)}
                            >
                                <option value="">All</option>
                                {col.filterOptions.map(opt => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        );
                    }

                    if (col.type === "date") {
                        return (
                            <input
                                type="date"
                                className="form-control"
                                value={filterValue}
                                onChange={e => handleFilterChange(e.target.value)}
                            />
                        );
                    }

                    return (
                        <input
                            type="text"
                            className="form-control"
                            value={filterValue}
                            placeholder={`Filter by ${col.header}`}
                            onChange={e => handleFilterChange(e.target.value)}
                        />
                    );
                })()}

                <div className="position-relative">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setShowColumnOptions(prev => !prev)}
                    >
                        <FaCog />
                    </button>
                    {showColumnOptions && (
                        <div
                            className="card position-absolute p-2"
                            style={{ zIndex: 10, minWidth: "150px" }}
                        >
                            {columns.map(col => (
                                <label key={String(col.accessor)} className="d-flex align-items-center gap-1">
                                    <input
                                        type="checkbox"
                                        checked={columnVisibility[col.accessor as string]}
                                        onChange={e =>
                                            handleColumnVisibilityChange(col.accessor as string, e.target.checked)
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
                    {visibleColumns.map(col => (
                        <th key={String(col.accessor)} style={{ cursor: "default" }}>
                            {col.header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {paginatedData.length > 0 ? (
                    paginatedData.map((row, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "table-light" : "table-white"}>
                            {visibleColumns.map(col => (
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
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Önceki
                    </button>
                    <span className="align-self-center">
            {currentPage} / {totalPages}
          </span>
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
