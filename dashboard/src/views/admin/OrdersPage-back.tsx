import DataTable, { type Column } from '../../components/UI/DataTable'
import { MdVisibility, MdLocalShipping, MdInventory } from 'react-icons/md'

interface SubOrder {
    itemId: string
    name: string
    quantity: number
    price: number
    sku: string
}

interface Order extends Record<string, unknown> {
    id: string
    customer: string
    email: string
    product: string
    amount: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    date: string
    subOrders?: SubOrder[]
}

const OrdersPage = () => {
    // Mock data
    const orders: Order[] = [
        {
            id: 'ORD-001',
            customer: 'John Doe',
            email: 'john@example.com',
            product: 'iPhone 15 Pro',
            amount: 999.99,
            status: 'delivered',
            date: '2024-11-20',
            subOrders: [
                { itemId: 'ITEM-001', name: 'iPhone 15 Pro 256GB', quantity: 1, price: 999.99, sku: 'IP15P-256' },
                { itemId: 'ITEM-002', name: 'iPhone Case', quantity: 2, price: 29.99, sku: 'CASE-01' },
                { itemId: 'ITEM-003', name: 'Screen Protector', quantity: 2, price: 15.99, sku: 'SP-01' }
            ]
        },
        {
            id: 'ORD-002',
            customer: 'Jane Smith',
            email: 'jane@example.com',
            product: 'MacBook Pro',
            amount: 2499.99,
            status: 'processing',
            date: '2024-11-21',
            subOrders: [
                { itemId: 'ITEM-004', name: 'MacBook Pro 14" M3', quantity: 1, price: 1999.99, sku: 'MBP14-M3' },
                { itemId: 'ITEM-005', name: 'USB-C Hub', quantity: 1, price: 79.99, sku: 'HUB-01' },
                { itemId: 'ITEM-006', name: 'Laptop Sleeve', quantity: 1, price: 39.99, sku: 'SLEEVE-01' }
            ]
        },
        {
            id: 'ORD-003',
            customer: 'Bob Johnson',
            email: 'bob@example.com',
            product: 'AirPods Pro',
            amount: 249.99,
            status: 'shipped',
            date: '2024-11-19',
            subOrders: [
                { itemId: 'ITEM-007', name: 'AirPods Pro 2nd Gen', quantity: 1, price: 249.99, sku: 'APP-2ND' }
            ]
        },
        {
            id: 'ORD-004',
            customer: 'Alice Williams',
            email: 'alice@example.com',
            product: 'iPad Air',
            amount: 599.99,
            status: 'pending',
            date: '2024-11-22',
            subOrders: [
                { itemId: 'ITEM-008', name: 'iPad Air 256GB', quantity: 1, price: 599.99, sku: 'IPAD-AIR-256' },
                { itemId: 'ITEM-009', name: 'Apple Pencil', quantity: 1, price: 129.99, sku: 'PENCIL-02' }
            ]
        },
        {
            id: 'ORD-005',
            customer: 'Charlie Brown',
            email: 'charlie@example.com',
            product: 'Apple Watch',
            amount: 399.99,
            status: 'cancelled',
            date: '2024-11-18'
        },
        {
            id: 'ORD-006',
            customer: 'David Lee',
            email: 'david@example.com',
            product: 'Mac Mini',
            amount: 699.99,
            status: 'delivered',
            date: '2024-11-17',
            subOrders: [
                { itemId: 'ITEM-010', name: 'Mac Mini M2', quantity: 1, price: 599.99, sku: 'MM-M2' },
                { itemId: 'ITEM-011', name: 'Magic Keyboard', quantity: 1, price: 99.99, sku: 'KB-01' }
            ]
        },
        {
            id: 'ORD-007',
            customer: 'Emma Davis',
            email: 'emma@example.com',
            product: 'HomePod',
            amount: 299.99,
            status: 'processing',
            date: '2024-11-21'
        },
        {
            id: 'ORD-008',
            customer: 'Frank Miller',
            email: 'frank@example.com',
            product: 'Magic Keyboard',
            amount: 149.99,
            status: 'shipped',
            date: '2024-11-20'
        },
        {
            id: 'ORD-009',
            customer: 'Grace Wilson',
            email: 'grace@example.com',
            product: 'AirTag 4-Pack',
            amount: 99.99,
            status: 'delivered',
            date: '2024-11-16',
            subOrders: [
                { itemId: 'ITEM-012', name: 'AirTag 4-Pack', quantity: 1, price: 99.99, sku: 'AT-4PK' }
            ]
        },
        {
            id: 'ORD-010',
            customer: 'Henry Moore',
            email: 'henry@example.com',
            product: 'Apple TV 4K',
            amount: 179.99,
            status: 'pending',
            date: '2024-11-22',
            subOrders: [
                { itemId: 'ITEM-013', name: 'Apple TV 4K 128GB', quantity: 1, price: 179.99, sku: 'ATV-4K-128' },
                { itemId: 'ITEM-014', name: 'HDMI Cable', quantity: 1, price: 19.99, sku: 'HDMI-01' }
            ]
        }
    ]

    const getStatusBadge = (status: Order['status']) => {
        const statusConfig = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            shipped: 'bg-purple-100 text-purple-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        }

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        )
    }

    const columns: Column<Order>[] = [
        {
            header: 'Order ID',
            accessor: 'id',
            sortable: true,
            className: 'font-semibold text-blue-600'
        },
        {
            header: 'Customer',
            accessor: 'customer',
            sortable: true
        },
        {
            header: 'Email',
            accessor: 'email',
            sortable: true,
            className: 'text-gray-600'
        },
        {
            header: 'Product',
            accessor: 'product',
            sortable: true
        },
        {
            header: 'Amount',
            accessor: (row) => (
                <span className="font-semibold text-green-600">
                    ${row.amount.toFixed(2)}
                </span>
            ),
            sortable: true
        },
        {
            header: 'Status',
            accessor: (row) => getStatusBadge(row.status),
            sortable: false
        },
        {
            header: 'Date',
            accessor: 'date',
            sortable: true,
            className: 'text-gray-600'
        },
        {
            header: 'Actions',
            accessor: (row) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log('View order:', row.id)
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                    >
                        <MdVisibility className="text-lg" />
                    </button>
                    {/* <button
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log('Edit order:', row.id)
                        }}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                    >
                        <MdEdit className="text-lg" />
                    </button> */}
                    {/* <button
                        onClick={(e) => {
                            e.stopPropagation()
                            console.log('Delete order:', row.id)
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                    >
                        <MdDelete className="text-lg" />
                    </button> */}
                </div>
            ),
            sortable: false
        }
    ]

    const renderSubOrders = (order: Order) => {
        if (!order.subOrders || order.subOrders.length === 0) {
            return (
                <div className="text-gray-500 text-sm py-4">
                    No sub-orders available for this order.
                </div>
            )
        }

        const totalItems = order.subOrders.reduce((sum, item) => sum + item.quantity, 0)
        const subtotal = order.subOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0)

        return (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <MdLocalShipping className="text-blue-600" />
                        Order Items
                    </h3>
                    <span className="text-sm text-gray-600">
                        {totalItems} item{totalItems !== 1 ? 's' : ''} total
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item ID</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {order.subOrders.map((item) => (
                                <tr key={item.itemId} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{item.itemId}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                        <div className="flex items-center gap-2">
                                            <MdInventory className="text-gray-400" />
                                            {item.name}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600 font-mono">{item.sku}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900 text-center">
                                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                            {item.quantity}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-900 text-right font-semibold">
                                        ${item.price.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-green-600 text-right font-semibold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                            <tr>
                                <td colSpan={5} className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                                    Order Total:
                                </td>
                                <td className="px-4 py-3 text-right text-base font-bold text-green-600">
                                    ${subtotal.toFixed(2)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        )
    }

    const handleRowClick = (order: Order) => {
        console.log('Row clicked:', order)
    }

    return (
        <div className="px-2 md:px-7 py-5">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Orders Management</h1>
                <p className="text-gray-600 mt-1">View and manage all customer orders</p>
            </div>

            <DataTable<Order>
                columns={columns}
                data={orders}
                searchable={true}
                filterable={true}
                exportable={true}
                onRowClick={handleRowClick}
                itemsPerPageOptions={[5, 10, 25, 50]}
                defaultItemsPerPage={10}
                expandable={{
                    getRowCanExpand: (row) => !!row.subOrders && row.subOrders.length > 0,
                    renderExpandedRow: (row) => renderSubOrders(row)
                }}
            />
        </div>
    )
}

export default OrdersPage