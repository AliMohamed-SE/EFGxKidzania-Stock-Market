import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Loading from "../components/Loading";
import AdminNavbar from "../components/admin/AdminNavbar";
import { Stack } from "@mui/material";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminDashboard from "../components/admin/AdminDashboard";
import { AdminCompanies } from "../components/admin/AdminCompanies";
import AdminUsers from "../components/admin/AdminUsers";
import AdminTransactions from "../components/admin/AdminTransactions";
import AdminSettings from "../components/admin/AdminSettings";

const AdminHome = () => {
  const navigate = useNavigate();
  const { admin } = useAuth();
  const [selectedPage, setSelectedPage] = useState("Dashboard"); // Track the selected page

  useEffect(() => {
    if (!admin) {
      navigate("/admin/login");
    }
  }, [navigate, admin]);

  if (!admin) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loading otherClasses={"w-10 h-10"} />
      </div>
    );
  }

  const handlePageChange = (page) => {
    setSelectedPage(page);
  };

  let content;
  switch (selectedPage) {
    case "Dashboard":
      content = <AdminDashboard />;
      break;
    case "Companies":
      content = <AdminCompanies />;
      break;
    case "Users":
      content = <AdminUsers />;
      break;
    case "Transactions":
      content = <AdminTransactions />;
      break;
    case "Settings":
      content = <AdminSettings />;
      break;
    default:
      content = <AdminDashboard />;
  }

  return (
    <section className="overflow-hidden">
      <AdminNavbar />
      <Stack direction={"row"}>
        <AdminSidebar onPageChange={handlePageChange} />
        <div className="flex-1 p-4">
          {content}
        </div>
      </Stack>
    </section>
  );
};

export default AdminHome;
