import React, { useState } from "react";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <ProductManager />;
      case "orders":
        return <OrderManager />;
      case "users":
        return <UserManager />;
      case "categories":
        return <CategoryManager />;
      case "sales":
        return <SalesMonitor />;
      case "content":
        return <ContentManager />;
      case "returns":
        return <ReturnManager />;
      case "security":
        return <SecurityTools />;
      case "settings":
        return <SiteSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside className="w-64 bg-white shadow-md p-4">
          <h2 className="text-xl font-bold mb-6 text-blue-600">Admin Panel</h2>
          <nav className="space-y-2">
            {[
              ["Dashboard", "dashboard"],
              ["Products", "products"],
              ["Orders", "orders"],
              ["Users", "users"],
              ["Categories", "categories"],
              ["Sales Monitor", "sales"],
              ["Content Manager", "content"],
              ["Returns & Refunds", "returns"],
              ["Security Tools", "security"],
              ["Site Settings", "settings"],
            ].map(([label, key]) => (
              <button
                key={key}
                className={`w-full text-left px-3 py-2 rounded hover:bg-blue-100 ${
                  activeTab === key ? "bg-blue-200 font-semibold" : ""
                }`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">{renderTab()}</main>
      </div>
    </div>
  );
};

const Dashboard = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
    <p>Welcome, Admin! Select a module from the sidebar to manage your platform.</p>
  </div>
);

const ProductManager = () => <Section title="Manage Products" />;
const OrderManager = () => <Section title="Manage Orders" />;
const UserManager = () => <Section title="Manage Users" />;
const CategoryManager = () => <Section title="Manage Categories" />;
const SalesMonitor = () => <Section title="Sales Monitoring & Analytics" />;
const ContentManager = () => <Section title="Content Management (e.g. Banners)" />;
const ReturnManager = () => <Section title="Returns & Refunds" />;
const SecurityTools = () => <Section title="Security & Access Control" />;
const SiteSettings = () => <Section title="General Site Settings" />;

const Section = ({ title }) => (
  <div>
    <h2 className="text-xl font-semibold mb-3">{title}</h2>
    <p className="text-gray-600">(Feature UI under construction)</p>
  </div>
);

export default AdminPanel;
