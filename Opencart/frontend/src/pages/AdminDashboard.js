import React, { useMemo, useState } from "react";
import {
  FiAlertCircle,
  FiBarChart2,
  FiDollarSign,
  FiMessageCircle,
  FiPackage,
  FiPlus,
  FiShield,
  FiShoppingCart,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";
import { Line, Pie } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useStore } from "../context/StoreContext";
import "./AdminDashboard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const tabs = [
  { id: "analytics", label: "Analytics", icon: <FiBarChart2 /> },
  { id: "products", label: "Products", icon: <FiPackage /> },
  { id: "approvals", label: "Approvals", icon: <FiShield /> },
  { id: "orders", label: "Orders", icon: <FiShoppingCart /> },
  { id: "customers", label: "Customers", icon: <FiUsers /> },
  { id: "staff", label: "Staff Roles", icon: <FiUsers /> },
  { id: "support", label: "Support", icon: <FiMessageCircle /> },
  { id: "notifications", label: "Notifications", icon: <FiAlertCircle /> },
];

const statusOptions = ["Processing", "Packed", "Shipped", "Delivered", "Cancelled"];

export default function AdminDashboard() {
  const {
    orders,
    products,
    pendingChanges,
    employees,
    addProduct,
    updateProduct,
    deleteProduct,
    approveChange,
    rejectChange,
    addEmployee,
    updateEmployee,
    updateOrderStatus,
    notifications,
    markNotificationAsRead,
    messages,
  } = useStore();
  const [activeTab, setActiveTab] = useState("analytics");
  const [productForm, setProductForm] = useState({ name: "", category: "", price: "", stock: "" });
  const [currentAdminId, setCurrentAdminId] = useState("EMP-1");
  const [employeeForm, setEmployeeForm] = useState({ name: "", email: "", role: "Product Manager", permissions: ["products"] });

  const currentAdmin = employees.find((employee) => employee.id === currentAdminId) || employees[0];
  const isSuperAdmin = currentAdmin?.role === "Super Admin" || currentAdmin?.permissions.includes("all");
  const can = (permission) => isSuperAdmin || currentAdmin?.permissions.includes(permission);
  const visibleTabs = tabs.filter((tab) => {
    if (isSuperAdmin) return true;
    if (tab.id === "products") return can("products");
    if (tab.id === "orders") return can("orders");
    if (tab.id === "support") return can("support");
    if (tab.id === "notifications") return true;
    return false;
  });

  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const customers = useMemo(() => {
    const byPhone = new Map();
    orders.forEach((order) => byPhone.set(order.customer.phone, order.customer));
    return Array.from(byPhone.values());
  }, [orders]);
  const lowStock = products.filter((product) => Number(product.stock) <= 10);

  const salesData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 22000, 18000, Math.max(revenue, 8000)],
        borderColor: "#0f766e",
        backgroundColor: "rgba(15, 118, 110, 0.12)",
        tension: 0.35,
      },
    ],
  };

  const categoryTotals = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + Number(product.stock || 0);
    return acc;
  }, {});

  const categoryData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ["#0f766e", "#f59e0b", "#2563eb", "#db2777", "#7c3aed"],
        borderWidth: 0,
      },
    ],
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    addProduct(
      {
        name: productForm.name,
        category: productForm.category,
        price: Number(productForm.price),
        stock: Number(productForm.stock),
      },
      currentAdmin.name,
      !isSuperAdmin
    );
    setProductForm({ name: "", category: "", price: "", stock: "" });
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    addEmployee(employeeForm);
    setEmployeeForm({ name: "", email: "", role: "Product Manager", permissions: ["products"] });
  };

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div>
          <span className="section-eyebrow">Admin</span>
          <h1>Website Manager</h1>
          <p>Super admin approves staff changes before they appear to customers.</p>
          <label className="admin-role-switcher">
            Active role
            <select value={currentAdminId} onChange={(e) => setCurrentAdminId(e.target.value)}>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>{employee.name} - {employee.role}</option>
              ))}
            </select>
          </label>
        </div>

        <nav>
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? "active" : ""}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="admin-content">
        {activeTab === "analytics" && (
          <>
            <div className="admin-metrics">
              <Metric title="Revenue" value={`KSh ${revenue.toLocaleString()}`} icon={<FiDollarSign />} />
              <Metric title="Orders" value={orders.length} icon={<FiShoppingCart />} />
              <Metric title="Customers" value={customers.length} icon={<FiUsers />} />
            <Metric title="Low Stock" value={lowStock.length} icon={<FiPackage />} />
            <Metric title="Pending Approvals" value={pendingChanges.length} icon={<FiShield />} />
            </div>

            <div className="admin-grid two">
              <section className="admin-panel">
                <h2>Sales Analytics</h2>
                <Line data={salesData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </section>
              <section className="admin-panel">
                <h2>Inventory by Category</h2>
                <Pie data={categoryData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
              </section>
            </div>
          </>
        )}

        {activeTab === "products" && (
          <section className="admin-panel">
            <div className="panel-heading">
              <div>
                <h2>Product Management</h2>
                <p>
                  {isSuperAdmin
                    ? "Super admin changes go live immediately."
                    : "Employee product changes are submitted for super admin approval."}
                </p>
              </div>
            </div>

            <form className="admin-form" onSubmit={handleProductSubmit}>
              <input placeholder="Product name" required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} />
              <input placeholder="Category" required value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} />
              <input type="number" placeholder="Price" required value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} />
              <input type="number" placeholder="Stock" required value={productForm.stock} onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })} />
              <button type="submit"><FiPlus /> Add</button>
            </form>

            <AdminTable
              columns={["Product", "Category", "Price", "Stock", "Status", "Action"]}
              rows={products.map((product) => [
                product.name,
                product.category,
                `KSh ${Number(product.price).toLocaleString()}`,
                <input
                  className="stock-input"
                  type="number"
                  value={product.stock}
                  onChange={(e) => updateProduct(product.id, { stock: Number(e.target.value) }, currentAdmin.name, !isSuperAdmin)}
                />,
                product.status,
                isSuperAdmin ? (
                  <button className="danger-action" onClick={() => deleteProduct(product.id)}><FiTrash2 /> Delete</button>
                ) : (
                  "Super admin only"
                ),
              ])}
            />
          </section>
        )}

        {activeTab === "approvals" && isSuperAdmin && (
          <section className="admin-panel">
            <h2>Product Approvals</h2>
            <p className="panel-note">Products or stock changes submitted by employees stay here until approved.</p>
            <AdminTable
              columns={["Request", "Product", "Submitted By", "Date", "Changes", "Action"]}
              rows={pendingChanges.map((change) => [
                change.type,
                change.product?.name || change.changes?.name || "Product update",
                change.submittedBy,
                change.createdAt,
                change.type === "Add Product"
                  ? `Add at KSh ${Number(change.product.price).toLocaleString()}`
                  : Object.entries(change.changes).map(([key, value]) => `${key}: ${value}`).join(", "),
                <div className="approval-actions">
                  <button onClick={() => approveChange(change.id)}>Approve</button>
                  <button onClick={() => rejectChange(change.id)} className="danger-action">Reject</button>
                </div>,
              ])}
            />
          </section>
        )}

        {activeTab === "orders" && (
          <section className="admin-panel">
            <h2>Order Management</h2>
            <p className="panel-note">Update order status here. The customer phone number is shown for tracking updates.</p>
            <AdminTable
              columns={["Order", "Customer", "Phone", "Items", "Total", "Status", "Tracking Note"]}
              rows={orders.map((order) => [
                order.id,
                order.customer.name,
                order.customer.phone,
                order.items.length,
                `KSh ${Number(order.total).toLocaleString()}`,
                <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                  {statusOptions.map((status) => <option key={status}>{status}</option>)}
                </select>,
                order.trackingNote,
              ])}
            />
          </section>
        )}

        {activeTab === "customers" && (
          <section className="admin-panel">
            <h2>Customer Management</h2>
            <AdminTable
              columns={["Name", "Email", "Phone", "Address"]}
              rows={customers.map((customer) => [customer.name, customer.email, customer.phone, customer.address])}
            />
          </section>
        )}

        {activeTab === "staff" && isSuperAdmin && (
          <section className="admin-panel">
            <h2>Staff Roles & Permissions</h2>
            <p className="panel-note">Only the super admin can assign employee roles and decide what each person can manage.</p>
            <form className="admin-form staff-form" onSubmit={handleEmployeeSubmit}>
              <input placeholder="Employee name" required value={employeeForm.name} onChange={(e) => setEmployeeForm({ ...employeeForm, name: e.target.value })} />
              <input type="email" placeholder="Email" required value={employeeForm.email} onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })} />
              <select value={employeeForm.role} onChange={(e) => setEmployeeForm({ ...employeeForm, role: e.target.value })}>
                <option>Product Manager</option>
                <option>Order Support</option>
                <option>Customer Support</option>
                <option>Operations Manager</option>
              </select>
              <select
                value={employeeForm.permissions.join(",")}
                onChange={(e) => setEmployeeForm({ ...employeeForm, permissions: e.target.value.split(",") })}
              >
                <option value="products">Products only</option>
                <option value="orders">Orders only</option>
                <option value="support">Support only</option>
                <option value="products,orders">Products and orders</option>
                <option value="orders,support">Orders and support</option>
              </select>
              <button type="submit"><FiPlus /> Add Staff</button>
            </form>
            <AdminTable
              columns={["Name", "Email", "Role", "Permissions", "Status"]}
              rows={employees.map((employee) => [
                employee.name,
                employee.email,
                employee.role,
                <select
                  value={employee.permissions.join(",")}
                  disabled={employee.role === "Super Admin"}
                  onChange={(e) => updateEmployee(employee.id, { permissions: e.target.value.split(",") })}
                >
                  <option value="all">All access</option>
                  <option value="products">Products only</option>
                  <option value="orders">Orders only</option>
                  <option value="support">Support only</option>
                  <option value="products,orders">Products and orders</option>
                  <option value="orders,support">Orders and support</option>
                </select>,
                employee.status,
              ])}
            />
          </section>
        )}

        {activeTab === "support" && (
          <section className="admin-panel">
            <h2>Customer Chat</h2>
            <div className="admin-chat-log">
              {messages.map((message) => (
                <div key={message.id} className={`admin-chat-message ${message.from}`}>
                  <strong>{message.from === "customer" ? "Customer" : "Support"}</strong>
                  <p>{message.text}</p>
                  <small>{message.time}</small>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "notifications" && (
          <section className="admin-panel">
            <h2>Notifications</h2>
            <div className="notification-list">
              {notifications.map((notification) => (
                <button key={notification.id} onClick={() => markNotificationAsRead(notification.id)}>
                  <span className={notification.read ? "read-dot" : "unread-dot"} />
                  <strong>{notification.message}</strong>
                  <small>{notification.time}</small>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function Metric({ title, value, icon }) {
  return (
    <section className="metric-card">
      <span>{icon}</span>
      <div>
        <p>{title}</p>
        <strong>{value}</strong>
      </div>
    </section>
  );
}

function AdminTable({ columns, rows }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((column) => <th key={column}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
