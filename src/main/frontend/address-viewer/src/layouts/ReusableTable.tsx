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
    // Filtre değerleri
    const [filterValues, setFilterValues] = useState<{ [key: string]: string }>({});
    const [filterDropdown, setFilterDropdown] = useState<{ [key: string]: boolean }>({});

    // Kolon görünürlüğü
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

    // Filtrelenmiş veri
    const filteredData = data.filter((row) => {
        return columns.every((column) => {
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
        });
    });

    // Görünür kolonlar
    const visibleColumns = columns.filter(col => columnsVisible[String(col.accessor)]);

    return (
        <div style={{ position: "relative", padding: "1rem", background: "#729bf1" }}>
            {/* Options butonu */}
            <div style={{ position: "relative", marginBottom: "1rem" }}>
                <button onClick={() => setShowOptions(prev => !prev)}>⚙️ Columns</button>
                {showOptions && (
                    <div
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            background: "white",
                            border: "1px solid #ccc",
                            padding: "0.5rem",
                            zIndex: 20,
                        }}
                    >
                        {columns.map(col => (
                            <label key={String(col.accessor)} style={{ display: "block", cursor: "pointer" }}>
                                <input
                                    type="checkbox"
                                    checked={columnsVisible[String(col.accessor)]}
                                    onChange={() => toggleColumnVisibility(String(col.accessor))}
                                />{" "}
                                {col.header}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Tablo */}
            <table className="table table-bordered">
                <thead>
                <tr>
                    {visibleColumns.map((col) => (
                        <th key={String(col.accessor)} style={{ position: "relative" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                {col.header}
                                {col.filterType && (
                                    <button
                                        style={{
                                            marginLeft: "0.5rem",
                                            border: "none",
                                            background: "transparent",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => toggleFilterDropdown(String(col.accessor))}
                                    >
                                        🔽
                                    </button>
                                )}
                            </div>

                            {/* Açılır filtre alanı */}
                            {filterDropdown[String(col.accessor)] && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        background: "white",
                                        border: "1px solid #ccc",
                                        padding: "0.5rem",
                                        zIndex: 10,
                                    }}
                                >
                                    {col.filterType === "select" ? (
                                        <select
                                            value={filterValues[String(col.accessor)] || ""}
                                            onChange={(e) =>
                                                handleFilterChange(String(col.accessor), e.target.value)
                                            }
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
                        <tr key={idx}>
                            {visibleColumns.map((col) => (
                                <td key={String(col.accessor)}>
                                    {String(row[col.accessor])}
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
        </div>
    );
};

export default ReusableTable;
