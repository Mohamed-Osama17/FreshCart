import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrdersContext } from '../../Context/OrdersContext';
import { FiSearch, FiFilter, FiCalendar, FiPlus, FiShoppingCart, FiPrinter, FiEdit, FiEye } from 'react-icons/fi';
import { FaRegMoneyBillAlt, FaCreditCard, FaShippingFast, FaRegCheckCircle } from 'react-icons/fa';
import { DarkModeContext } from '../../Context/DarkModeContext';

const UserOrders = () => {
    let { userOrders } = useContext(OrdersContext);
    const { darkMode } = useContext(DarkModeContext);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [timeFilter, setTimeFilter] = useState('last7days');
    const [stats, setStats] = useState({
        totalOrders: 0,
        revenue: 0,
        pending: 0,
        delivered: 0
    });
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Calculate statistics
    useEffect(() => {
        if (userOrders.length) {
            const totalOrders = userOrders.length;
            const revenue = userOrders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
            const pending = userOrders.filter(order => !order.isDelivered).length;
            const delivered = userOrders.filter(order => order.isDelivered).length;

            setStats({
                totalOrders,
                revenue,
                pending,
                delivered
            });
        }
    }, [userOrders]);

    // Filter orders based on active filters and search term
    const filteredOrders = userOrders.filter(order => {
        const matchesStatus = activeFilter === 'all' ||
            (activeFilter === 'cash' && order.paymentMethodType === 'cash') ||
            (activeFilter === 'card' && order.paymentMethodType === 'card') ||
            (activeFilter === 'pending' && !order.isDelivered) ||
            (activeFilter === 'delivered' && order.isDelivered);

        const matchesSearch = order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) || order.id.toString().includes(searchTerm);
        order.cartItems.some(item =>
            item.product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.product.brand.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return matchesStatus && matchesSearch;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const toggleOrderDetails = (orderId) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId);
    };

    const clearFilters = () => {
        setActiveFilter('all');
        setSearchTerm('');
        setTimeFilter('last7days');
        setShowFilterMenu(false);
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br ${!darkMode ? '' : 'from-purple-950 to-fuchsia-950'}  pt-12 px-4 md:p-12`}>
            <div className="max-w-5xl mx-auto">
                {/* Floating Decorations */}
                <motion.div
                    className="fixed top-28 left-1/2 hidden md:block"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                        <span className="text-white">⭐</span>
                    </div>
                </motion.div>

                <motion.div
                    className="fixed top-1/3 right-20 hidden md:block"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, delay: 0.8 }}
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                        <span className="text-white text-xs">✅</span>
                    </div>
                </motion.div>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00]' : 'from-purple-600 to-fuchsia-600'} `}
                        >
                            Order Dashboard
                        </motion.h1>
                        <p className={`${!darkMode ? 'text-gray-600' : 'text-gray-300'}  mt-2`}>Manage and track all customer orders</p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <FiPrinter className={!darkMode ? 'text-orange-600' : 'text-purple-600'} /> Reports
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] shadow-orange-500/30' : 'from-purple-600 to-fuchsia-600 shadow-fuchsia-500/30'}  text-white font-medium flex items-center gap-2 hover:opacity-90 transition-all shadow-lg`}
                        >
                            <FiPlus /> Create Order
                        </motion.button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className={`bg-gradient-to-br ${!darkMode ? 'from-white to-orange-50 border-orange-100' : 'from-white to-purple-50 border-purple-100'}  p-6 rounded-2xl border  shadow-sm hover:shadow-md transition-all`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalOrders}</p>
                            </div>
                            <div className="bg-indigo-100 p-3 rounded-xl">
                                <FiShoppingCart className="text-indigo-600 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-indigo-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-white to-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">${stats.revenue.toFixed(2)}</p>
                            </div>
                            <div className="bg-emerald-100 p-3 rounded-xl">
                                <FaRegMoneyBillAlt className="text-emerald-600 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-emerald-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-white to-amber-50 p-6 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pending}</p>
                            </div>
                            <div className="bg-amber-100 p-3 rounded-xl">
                                <FaShippingFast className="text-amber-600 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-amber-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stats.pending / stats.totalOrders) * 100}%` }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-white to-green-50 p-6 rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Delivered Orders</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.delivered}</p>
                            </div>
                            <div className="bg-green-100 p-3 rounded-xl">
                                <FaRegCheckCircle className="text-green-600 text-xl" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-green-500"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stats.delivered / stats.totalOrders) * 100}%` }}
                                    transition={{ duration: 1 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-2xl p-6 mb-6 border border-gray-100 shadow-sm relative">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <div className="absolute left-4 top-3.5 text-gray-400">
                                <FiSearch />
                            </div>
                            <input
                                type="text"
                                placeholder="Search orders, customers, products..."
                                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 ${!darkMode ? 'focus:border-orange-500 focus:ring-orange-300' : 'focus:border-purple-500 focus:ring-purple-300'}  focus:ring-1  outline-none transition-all bg-white shadow-sm`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-3">
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                                    className="px-5 py-3.5 rounded-xl border border-gray-200 bg-white flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
                                >
                                    <FiFilter className={`${!darkMode ? 'text-orange-600' : 'text-purple-600'} `} /> Filters
                                </button>

                                {/* Filter dropdown menu */}
                                {showFilterMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute z-10 mt-2 w-56 rounded-xl bg-white shadow-lg border border-gray-200 p-4"
                                    >
                                        <div className="mb-3">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => setActiveFilter('all')}
                                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${activeFilter === 'all' ? `${!darkMode ? 'bg-orange-100 text-orange-500' : 'bg-purple-100 text-purple-700'}` : `${!darkMode ? 'hover:bg-orange-200' : 'hover:bg-purple-200'}`}`}
                                                >
                                                    All Orders
                                                </button>
                                                <button
                                                    onClick={() => setActiveFilter('cash')}
                                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${activeFilter === 'cash' ? `${!darkMode ? 'bg-orange-100 text-orange-500' : 'bg-purple-100 text-purple-700'}` : `${!darkMode ? 'hover:bg-orange-200' : 'hover:bg-purple-200'}`}`}
                                                >
                                                    Cash Payments
                                                </button>
                                                <button
                                                    onClick={() => setActiveFilter('card')}
                                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${activeFilter === 'card' ? `${!darkMode ? 'bg-orange-100 text-orange-500' : 'bg-purple-100 text-purple-700'}` : `${!darkMode ? 'hover:bg-orange-200' : 'hover:bg-purple-200'}`}`}
                                                >
                                                    Card Payments
                                                </button>
                                                <button
                                                    onClick={() => setActiveFilter('pending')}
                                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${activeFilter === 'pending' ? `${!darkMode ? 'bg-orange-100 text-orange-500' : 'bg-purple-100 text-purple-700'}` : `${!darkMode ? 'hover:bg-orange-200' : 'hover:bg-purple-200'}`}`}
                                                >
                                                    Pending Delivery
                                                </button>
                                                <button
                                                    onClick={() => setActiveFilter('delivered')}
                                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${activeFilter === 'delivered' ? `${!darkMode ? 'bg-orange-100 text-orange-500' : 'bg-purple-100 text-purple-700'}` : `${!darkMode ? 'hover:bg-orange-200' : 'hover:bg-purple-200'}`}`}
                                                >
                                                    Delivered
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                                            <div className="space-y-2">
                                                <button
                                                    onClick={() => setTimeFilter('last7days')}
                                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${timeFilter === 'last7days' ? `${!darkMode ? 'bg-orange-100 text-orange-500' : 'bg-purple-100 text-purple-700'}` : `${!darkMode ? 'hover:bg-orange-200' : 'hover:bg-purple-200'}`}`}
                                                >
                                                    Last 7 Days
                                                </button>
                                                <button
                                                    onClick={() => setTimeFilter('last30days')}
                                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${timeFilter === 'last30days' ? `${!darkMode ? 'bg-orange-100 text-orange-500' : 'bg-purple-100 text-purple-700'}` : `${!darkMode ? 'hover:bg-orange-200' : 'hover:bg-purple-200'}`}`}
                                                >
                                                    Last 30 Days
                                                </button>
                                                <button
                                                    onClick={() => setTimeFilter('last90days')}
                                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${timeFilter === 'last90days' ? `${!darkMode ? 'bg-orange-100 text-orange-500' : 'bg-purple-100 text-purple-700'}` : `${!darkMode ? 'hover:bg-orange-200' : 'hover:bg-purple-200'}`}`}
                                                >
                                                    Last 90 Days
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={clearFilters}
                                            className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                                        >
                                            Clear Filters
                                        </button>
                                    </motion.div>
                                )}
                            </div>

                            <div className="relative">
                                <button className="px-4 py-3.5 rounded-xl border border-gray-200 bg-white flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                                    <FiCalendar className={`${!darkMode ? 'text-orange-600' : 'text-purple-600'} `} />
                                    {timeFilter === 'last7days' ? 'Last 7 Days' :
                                        timeFilter === 'last30days' ? 'Last 30 Days' :
                                            'Last 90 Days'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Active filters indicator */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {activeFilter !== 'all' && (
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${!darkMode ? 'bg-orange-100 text-orange-500' : 'bg-purple-100 text-purple-800'} `}>
                                {activeFilter === 'cash' ? 'Cash Payments' :
                                    activeFilter === 'card' ? 'Card Payments' :
                                        activeFilter === 'pending' ? 'Pending Delivery' :
                                            'Delivered'}
                                <button
                                    onClick={() => setActiveFilter('all')}
                                    className={`ml-2 ${!darkMode ? 'text-orange-500 hover:text-orange-600' : 'text-purple-600 hover:text-purple-800'} `}
                                >
                                    &times;
                                </button>
                            </span>
                        )}
                        {searchTerm && (
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${!darkMode ? 'bg-orange-100 text-orange-500' : 'bg-purple-100 text-purple-800'} `}>
                                Search: {searchTerm}
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className={`ml-2 ${!darkMode ? 'text-orange-500 hover:text-orange-600' : 'text-purple-600 hover:text-purple-800'} `}
                                >
                                    &times;
                                </button>
                            </span>
                        )}
                    </div>
                </div>

                {/* Orders Grid */}
                {filteredOrders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center"
                    >
                        <div className="text-6xl mb-4 text-indigo-200">📭</div>
                        <h3 className="text-xl font-semibold text-gray-900">No orders found</h3>
                        <p className="text-gray-600 mt-2 max-w-md">
                            Try adjusting your search or filter criteria. There are no orders matching your current filters.
                        </p>
                        <button
                            className={`mt-4 px-4 py-2.5 bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] shadow-orange-500/20' : 'from-purple-600 to-fuchsia-600 shadow-purple-500/20'}  text-white rounded-xl hover:opacity-90 transition-all shadow-lg `}
                            onClick={clearFilters}
                        >
                            Reset Filters
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {filteredOrders.map((order) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all"
                            >
                                <div
                                    className={`p-5 cursor-pointer ${expandedOrder === order.id ? 'border-b border-gray-200' : ''}`}
                                    onClick={() => toggleOrderDetails(order.id)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                                <span>#{order.id}</span>
                                                <span className={`text-xs px-2 py-1 rounded-full ${order.isDelivered
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.isDelivered ? 'Delivered' : 'In Transit'}
                                                </span>
                                            </h3>
                                            <p className="text-gray-500 text-sm mt-1 mb-2 flex items-center">
                                                <span className="mr-2">👤</span>{order.user.name}
                                            </p>
                                            <div className="flex gap-4 mt-2">
                                                <p className="flex items-center text-sm">
                                                    <span className="mr-1 text-gray-500">Payment:</span>
                                                    <span className={`flex items-center ${order.isPaid
                                                        ? 'text-green-600'
                                                        : 'text-yellow-600'
                                                        }`}>
                                                        {order.isPaid ? 'Paid' : 'Pending'}
                                                        {order.paymentMethodType === 'cash'
                                                            ? <FaRegMoneyBillAlt className="ml-1" />
                                                            : <FaCreditCard className="ml-1" />}
                                                    </span>
                                                </p>
                                                <p className="flex items-center text-sm">
                                                    <span className="mr-1 text-gray-500">Date:</span>
                                                    <span className="text-gray-700">{formatDate(order.createdAt)}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-gray-900 font-bold text-lg">
                                                ${order.totalOrderPrice.toFixed(2)}
                                            </p>
                                            <div className="flex gap-2 mt-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${!darkMode ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}  transition-all`}
                                                >
                                                    <FiEye />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${!darkMode ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}  transition-all`}
                                                >
                                                    <FiEdit />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {expandedOrder === order.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-5 pt-0">
                                                <div className="mt-6 space-y-4">
                                                    {order?.cartItems?.map((item, index) => (
                                                        <div key={index} className="flex items-center gap-4 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                                                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
                                                                <img
                                                                    src={item.product.imageCover}
                                                                    alt={item.product.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-gray-900">{item.product.title}</h4>
                                                                <div className="flex justify-between mt-1">
                                                                    <p className="text-gray-500 text-sm">{item.product.brand.name} • {item.count} {item.count > 1 ? 'items' : 'item'}</p>
                                                                    <p className="text-gray-900 font-bold">${(item.price * item.count).toFixed(2)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                                                    <div className="text-sm text-gray-500">
                                                        Shipping to: {order.shippingAddress?.city || 'N/A'}, {order.shippingAddress?.details || 'N/A'}
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-gray-700 text-sm">Total items: {order.cartItems.reduce((acc, item) => acc + item.count, 0)}</p>
                                                        <p className="text-gray-900 font-bold text-lg mt-1">
                                                            ${order.totalOrderPrice.toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Floating Action Button */}
                <motion.div
                    className="fixed bottom-8 right-8 z-10"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${!darkMode ? 'from-[#ff7f00] to-[#ffcc00] shadow-orange-500/30' : 'from-fuchsia-600 to-purple-600 shadow-purple-500/30'}  flex items-center justify-center shadow-lg `}
                    >
                        <FiShoppingCart className="text-white text-2xl" />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default UserOrders;