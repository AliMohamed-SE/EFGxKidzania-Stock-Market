import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const DataTable = ({ data, thirdColumn, onViewStock }) => {
  const location = useLocation();
  const { backendUrl } = useAuth();

  // Define the header labels based on the third column prop
  const headers = [
    "#",
    "Company",
    "Current Price",
    thirdColumn,
    ...(location.pathname !== "/admin/home" ? ["Action"] : []),
  ];

  return (
    <TableContainer
      sx={{
        maxHeight: "470px",
        overflowY: "auto",
      }}
    >
      <Table sx={{ borderCollapse: "collapse" }}>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                key={header}
                align={"center"}
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#9AA0A6",
                  zIndex: 1,
                  fontWeight: "bold",
                  border: "none",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((company, index) => (
            <TableRow key={company.id || company._id}>
              <TableCell
                align="center"
                sx={{ border: "none", fontWeight: "bold" }}
              >
                {index + 1}
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  border: "none",
                  maxWidth: 150, // Adjust as needed for your layout
                }}
              >
                <div
                  className="flex items-center gap-2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    maxWidth: "150px", // Ensure maxWidth is applied
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis", // Adds the "..." for overflow
                  }}
                >
                  <img
                    src={`${backendUrl}/images/logos/${company.logo}`}
                    className="w-10 h-10"
                    alt={`${company.name} logo`}
                  />
                  <span
                    style={{ textOverflow: "ellipsis", overflow: "hidden" }}
                  >
                    {company.name}
                  </span>
                </div>
              </TableCell>

              <TableCell align="center" sx={{ border: "none" }}>
                <div className="flex gap-1 justify-center items-center font-semibold">
                  <div className="relative">
                    {company.current_price}
                    <img
                      src="/images/KidZosicon.svg"
                      alt="Kidzos Icon"
                      width={13}
                      height={13}
                      className="absolute -right-4 -top-0.5"
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell align="center" sx={{ border: "none" }}>
                {thirdColumn === "Current Number of Investors" &&
                  company.number_of_buys}
                {thirdColumn === "Number of Trades" && company.number_of_trades}
                {thirdColumn === "Return %" && (
                  <p
                    className={`${
                      company.current_return > 0
                        ? "text-green-500"
                        : "text-red-600"
                    } flex gap-1 justify-center`}
                  >
                    {company.current_return}%
                    <img
                      src={`/images/${
                        company.current_return > 0
                          ? "return_positive"
                          : "return_negative"
                      }.svg`}
                      alt="positive_return"
                    />
                  </p>
                )}
                {thirdColumn === "Visitors" && company.current_visitors}
              </TableCell>
              {location.pathname !== "/admin/home" && (
                <TableCell align="center" sx={{ border: "none" }}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<img src="/images/white_profile.svg" />}
                    onClick={() => onViewStock(company)}
                    style={{ borderRadius: "20px", backgroundColor: "#31CFCB" }}
                  >
                    View Stock
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
