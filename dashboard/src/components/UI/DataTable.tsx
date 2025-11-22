import React, { useState } from 'react'
import {
    MdChevronLeft,
    MdChevronRight,
    MdFirstPage,
    MdLastPage,
    MdSearch,
    MdFilterList,
    MdFileDownload,
    MdKeyboardArrowDown,
    MdKeyboardArrowRight
} from 'react-icons/md'

export interface Column<T> {
    header: string
    accessor: keyof T | ((row: T) => React.ReactNode)
    sortable?: boolean
    className?: string
    headerClassName?: string
}

export interface ExpandableRow<T> {
    getRowCanExpand?: (row: T) => boolean
    renderExpandedRow?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[]
    itemsPerPageOptions?: number[]
    defaultItemsPerPage?: number
    searchable?: boolean
    filterable?: boolean
    exportable?: boolean
    onRowClick?: (row: T) => void
    rowClassName?: (row: T) => string
    expandable?: ExpandableRow<T>
}

const DataTable = <T extends Record<string, unknown>>({
    columns,
    data,
    itemsPerPageOptions = [10, 25, 50, 100],
    defaultItemsPerPage = 10,
    searchable = true,
    filterable = false,
    exportable = false,
    onRowClick,
    rowClassName,
    expandable
}: DataTableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage)
    const [searchQuery, setSearchQuery] = useState('')
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T | null
        direction: 'asc' | 'desc'
    }>({ key: null, direction: 'asc' })

    // Filter data based on search query
    const filteredData = data.filter((row) => {
        if (!searchQuery) return true
        return Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    })

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0

        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
    })

    // Pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = sortedData.slice(startIndex, endIndex)

    const handleSort = (key: keyof T) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
        }))
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    }

    const toggleRowExpansion = (rowIndex: number) => {
        setExpandedRows((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(rowIndex)) {
                newSet.delete(rowIndex)
            } else {
                newSet.add(rowIndex)
            }
            return newSet
        })
    }

    const handleExport = () => {
        // Simple CSV export
        const headers = columns.map(col => col.header).join(',')
        const rows = filteredData.map(row =>
            columns.map(col => {
                if (typeof col.accessor === 'function') return ''
                return String(row[col.accessor] || '')
            }).join(',')
        ).join('\n')

        const csv = `${headers}\n${rows}`
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'export.csv'
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
        if (typeof column.accessor === 'function') {
            return column.accessor(row)
        }
        const value = row[column.accessor]
        return value as React.ReactNode
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header Actions */}
            {(searchable || filterable || exportable) && (
                <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3 justify-between">
                    {/* Search */}
                    {searchable && (
                        <div className="relative flex-1 max-w-md">
                            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setCurrentPage(1)
                                }}
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                        {filterable && (
                            <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                <MdFilterList className="text-lg" />
                                <span className="hidden sm:inline">Filters</span>
                            </button>
                        )}
                        {exportable && (
                            <button
                                onClick={handleExport}
                                className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                            >
                                <MdFileDownload className="text-lg" />
                                <span className="hidden sm:inline">Export</span>
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {expandable && <th className="px-6 py-3 w-12"></th>}
                            {columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.headerClassName || ''
                                        } ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                                    onClick={() =>
                                        column.sortable &&
                                        typeof column.accessor !== 'function' &&
                                        handleSort(column.accessor as keyof T)
                                    }
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{column.header}</span>
                                        {column.sortable &&
                                            typeof column.accessor !== 'function' &&
                                            sortConfig.key === column.accessor && (
                                                <span className="text-blue-600">
                                                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIndex) => {
                                const isExpanded = expandedRows.has(rowIndex)
                                const canExpand = expandable?.getRowCanExpand ? expandable.getRowCanExpand(row) : false

                                return (
                                    <React.Fragment key={rowIndex}>
                                        <tr
                                            onClick={() => onRowClick && onRowClick(row)}
                                            className={`hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''
                                                } ${rowClassName ? rowClassName(row) : ''}`}
                                        >
                                            {expandable && (
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {canExpand && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                toggleRowExpansion(rowIndex)
                                                            }}
                                                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                        >
                                                            {isExpanded ? (
                                                                <MdKeyboardArrowDown className="text-xl text-gray-600" />
                                                            ) : (
                                                                <MdKeyboardArrowRight className="text-xl text-gray-600" />
                                                            )}
                                                        </button>
                                                    )}
                                                </td>
                                            )}
                                            {columns.map((column, colIndex) => (
                                                <td
                                                    key={colIndex}
                                                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${column.className || ''
                                                        }`}
                                                >
                                                    {getCellValue(row, column)}
                                                </td>
                                            ))}
                                        </tr>
                                        {isExpanded && expandable?.renderExpandedRow && (
                                            <tr className="bg-gray-50">
                                                <td colSpan={columns.length + 1} className="px-6 py-4">
                                                    {expandable.renderExpandedRow(row)}
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                )
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length + (expandable ? 1 : 0)}
                                    className="px-6 py-8 text-center text-gray-500"
                                >
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {paginatedData.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    {/* Items per page */}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <span>Show</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value))
                                setCurrentPage(1)
                            }}
                            className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {itemsPerPageOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <span>entries</span>
                    </div>

                    {/* Info */}
                    <div className="text-sm text-gray-700">
                        Showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of{' '}
                        {sortedData.length} entries
                    </div>

                    {/* Pagination Buttons */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            title="First Page"
                        >
                            <MdFirstPage className="text-xl" />
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Previous Page"
                        >
                            <MdChevronLeft className="text-xl" />
                        </button>

                        {/* Page Numbers */}
                        <div className="hidden sm:flex gap-1">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum
                                if (totalPages <= 5) {
                                    pageNum = i + 1
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i
                                } else {
                                    pageNum = currentPage - 2 + i
                                }

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`px-3 py-1 rounded-lg ${currentPage === pageNum
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                )
                            })}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Next Page"
                        >
                            <MdChevronRight className="text-xl" />
                        </button>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Last Page"
                        >
                            <MdLastPage className="text-xl" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DataTable
