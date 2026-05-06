import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext();

const defaultProducts = [
  { id: "1", name: "iPhone 16 Pro Max", category: "Phones", price: 80799, stock: 12, status: "Active" },
  { id: "2", name: "Top Fry Cooking Oil - 3L", category: "Home", price: 799, stock: 48, status: "Active" },
  { id: "3", name: "Sofa Set - 5 Seater", category: "Furniture", price: 45000, stock: 5, status: "Active" },
  { id: "4", name: "Men's Sneakers - Black", category: "Fashion", price: 1999, stock: 22, status: "Active" },
  { id: "5", name: "Bluetooth Headphones", category: "Electronics", price: 7999, stock: 8, status: "Active" },
];

const defaultOrders = [
  {
    id: "OC-1001",
    customer: { name: "Alice Wanjiku", email: "alice@example.com", phone: "+254712345678", address: "Westlands, Nairobi" },
    items: [{ id: "5", name: "Bluetooth Headphones", price: 7999, quantity: 1 }],
    status: "Processing",
    paymentMethod: "mpesa",
    total: 8798.9,
    createdAt: "2026-04-28",
    trackingNote: "Payment received. Preparing package.",
  },
  {
    id: "OC-1002",
    customer: { name: "Brian Otieno", email: "brian@example.com", phone: "+254798765432", address: "Kilimani, Nairobi" },
    items: [{ id: "4", name: "Men's Sneakers - Black", price: 1999, quantity: 2 }],
    status: "Shipped",
    paymentMethod: "cod",
    total: 4397.8,
    createdAt: "2026-04-27",
    trackingNote: "Courier assigned. Customer notified by phone.",
  },
];

const defaultMessages = [
  { id: 1, from: "support", text: "Hi, welcome to OpenCart support. How can we help?", time: "Now" },
];

const defaultEmployees = [
  {
    id: "EMP-1",
    name: "Grace Admin",
    email: "grace@admin.com",
    role: "Super Admin",
    permissions: ["all"],
    status: "Active",
  },
  {
    id: "EMP-2",
    name: "Kevin Products",
    email: "kevin@staff.com",
    role: "Product Manager",
    permissions: ["products"],
    status: "Active",
  },
  {
    id: "EMP-3",
    name: "Mary Orders",
    email: "mary@staff.com",
    role: "Order Support",
    permissions: ["orders", "support"],
    status: "Active",
  },
];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => readStorage("cart", []));
  const [orders, setOrders] = useState(() => readStorage("orders", defaultOrders));
  const [products, setProducts] = useState(() => readStorage("adminProducts", defaultProducts));
  const [pendingChanges, setPendingChanges] = useState(() => readStorage("pendingProductChanges", []));
  const [employees, setEmployees] = useState(() => readStorage("employees", defaultEmployees));
  const [customerProfile, setCustomerProfile] = useState(() => readStorage("customerProfile", null));
  const [notifications, setNotifications] = useState(() =>
    readStorage("notifications", [
      { id: 1, type: "order", message: "Welcome. You will receive order updates here.", read: false, time: "Now" },
    ])
  );
  const [messages, setMessages] = useState(() => readStorage("supportMessages", defaultMessages));
  const [discount, setDiscount] = useState(0);
  const [activeCoupon, setActiveCoupon] = useState(null);

  const shippingCost = cartItems.length > 0 ? 0 : 0;
  const taxRate = 0.1;

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cartItems)), [cartItems]);
  useEffect(() => localStorage.setItem("orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("adminProducts", JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem("pendingProductChanges", JSON.stringify(pendingChanges)), [pendingChanges]);
  useEffect(() => localStorage.setItem("employees", JSON.stringify(employees)), [employees]);
  useEffect(() => localStorage.setItem("customerProfile", JSON.stringify(customerProfile)), [customerProfile]);
  useEffect(() => localStorage.setItem("notifications", JSON.stringify(notifications)), [notifications]);
  useEffect(() => localStorage.setItem("supportMessages", JSON.stringify(messages)), [messages]);

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0),
    [cartItems]
  );
  const tax = cartTotal * taxRate;
  const grandTotal = Math.max(cartTotal - discount + shippingCost + tax, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const unreadNotifications = notifications.filter((item) => !item.read).length;

  const addNotification = (message, type = "info") => {
    setNotifications((prev) => [
      { id: Date.now(), type, message, read: false, time: "Just now" },
      ...prev,
    ]);
  };

  const addToCart = (product) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    addNotification(`${product.name} was added to your cart.`, "cart");
  };

  const removeFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setActiveCoupon(null);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const applyCoupon = (code) => {
    const validCoupons = {
      OPEN10: { discount: 0.1, type: "percentage" },
      OPEN20: { discount: 0.2, type: "percentage" },
      FREESHIP: { discount: 5, type: "fixed" },
    };

    const coupon = validCoupons[code.trim().toUpperCase()];
    if (!coupon) return { success: false, message: "Invalid coupon code" };

    setActiveCoupon(code.trim().toUpperCase());
    setDiscount(coupon.type === "percentage" ? cartTotal * coupon.discount : coupon.discount);
    return { success: true, message: "Coupon applied successfully" };
  };

  const removeCoupon = () => {
    setDiscount(0);
    setActiveCoupon(null);
  };

  const placeOrder = (customer, paymentMethod) => {
    const order = {
      id: `OC-${Date.now().toString().slice(-6)}`,
      customer,
      items: cartItems,
      status: "Processing",
      paymentMethod,
      total: grandTotal,
      createdAt: new Date().toISOString().slice(0, 10),
      trackingNote: "Order received. We will update you using your phone number.",
    };

    setCustomerProfile(customer);
    setOrders((prev) => [order, ...prev]);
    clearCart();
    addNotification(`Order ${order.id} placed. Updates will be sent to ${customer.phone}.`, "order");
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status, trackingNote: `Status changed to ${status}. Customer phone update queued.` }
          : order
      )
    );
    addNotification(`Order ${orderId} is now ${status}.`, "order");
  };

  const addProduct = (product, submittedBy = "Super Admin", requiresApproval = false) => {
    const payload = { ...product, id: Date.now().toString(), status: "Active" };
    if (requiresApproval) {
      setPendingChanges((prev) => [
        {
          id: `REQ-${Date.now()}`,
          type: "Add Product",
          product: payload,
          submittedBy,
          status: "Pending",
          createdAt: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
      addNotification(`${submittedBy} submitted ${product.name} for product approval.`, "approval");
      return;
    }
    setProducts((prev) => [payload, ...prev]);
  };

  const updateProduct = (productId, changes, submittedBy = "Super Admin", requiresApproval = false) => {
    if (requiresApproval) {
      const product = products.find((item) => item.id === productId);
      setPendingChanges((prev) => [
        {
          id: `REQ-${Date.now()}`,
          type: "Update Product",
          productId,
          product,
          changes,
          submittedBy,
          status: "Pending",
          createdAt: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
      addNotification(`${submittedBy} submitted product changes for approval.`, "approval");
      return;
    }
    setProducts((prev) => prev.map((product) => (product.id === productId ? { ...product, ...changes } : product)));
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const approveChange = (changeId) => {
    const change = pendingChanges.find((item) => item.id === changeId);
    if (!change) return;

    if (change.type === "Add Product") {
      setProducts((prev) => [{ ...change.product, status: "Active" }, ...prev]);
    }

    if (change.type === "Update Product") {
      setProducts((prev) =>
        prev.map((product) => (product.id === change.productId ? { ...product, ...change.changes } : product))
      );
    }

    setPendingChanges((prev) => prev.filter((item) => item.id !== changeId));
    addNotification(`${change.type} request approved.`, "approval");
  };

  const rejectChange = (changeId) => {
    setPendingChanges((prev) => prev.filter((item) => item.id !== changeId));
    addNotification("A product change request was rejected.", "approval");
  };

  const addEmployee = (employee) => {
    setEmployees((prev) => [
      {
        ...employee,
        id: `EMP-${Date.now().toString().slice(-5)}`,
        status: "Active",
        permissions: employee.permissions.length ? employee.permissions : ["products"],
      },
      ...prev,
    ]);
  };

  const updateEmployee = (employeeId, changes) => {
    setEmployees((prev) => prev.map((employee) => (employee.id === employeeId ? { ...employee, ...changes } : employee)));
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const sendSupportMessage = (text) => {
    if (!text.trim()) return;
    const customerMessage = { id: Date.now(), from: "customer", text: text.trim(), time: "Just now" };
    const reply = {
      id: Date.now() + 1,
      from: "support",
      text: "Thanks. Our team has received your message and will respond with order help shortly.",
      time: "Just now",
    };
    setMessages((prev) => [...prev, customerMessage, reply]);
    addNotification("Support received your chat message.", "chat");
  };

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        discount,
        shippingCost,
        tax,
        grandTotal,
        activeCoupon,
        orders,
        products,
        pendingChanges,
        employees,
        customerProfile,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        approveChange,
        rejectChange,
        addEmployee,
        updateEmployee,
        notifications,
        unreadNotifications,
        markNotificationAsRead,
        messages,
        sendSupportMessage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider");
  return context;
};
