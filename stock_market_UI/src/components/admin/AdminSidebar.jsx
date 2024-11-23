import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  {
    id: 1,
    label: "Dashboard",
    selectedicon: "/images/admin/selected_dashboard.svg",
    icon: "/images/admin/dashboard.svg",
    page: "Dashboard",
  },
  {
    id: 2,
    label: "Companies",
    selectedicon: "/images/admin/selected_companies.svg",
    icon: "/images/admin/companies.svg",
    page: "Companies",
  },
  {
    id: 3,
    label: "Users",
    selectedicon: "/images/admin/selected_users.svg",
    icon: "/images/admin/users.svg",
    page: "Users",
  },
  {
    id: 4,
    label: "Transactions",
    selectedicon: "/images/admin/selected_transactions.svg",
    icon: "/images/admin/transactions.svg",
    page: "Transactions",
  },
  {
    id: 5,
    label: "Settings",
    selectedicon: "/images/admin/selected_settings.svg",
    icon: "/images/admin/settings.svg",
    page: "Settings",
  },
];

const AdminSidebar = ({ onPageChange }) => {
  const [activeItem, setActiveItem] = useState(1); // Default to the first item

  const handleItemClick = (id, page) => {
    setActiveItem(id);
    onPageChange(page);
  };

  return (
    <div className="w-[264px] h-[100vh] bg-white">
      <ul className="flex flex-col p-3">
        {NAV_ITEMS.map((item) => (
          <li
            key={item.id}
            className={`flex items-center gap-4 p-4 mt-3 cursor-pointer rounded-xl ${
              activeItem === item.id
                ? "bg-purple text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => handleItemClick(item.id, item.page)}
          >
            <img
              src={activeItem === item.id ? item.selectedicon : item.icon}
              alt={item.label}
              className="w-6 h-6"
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;
