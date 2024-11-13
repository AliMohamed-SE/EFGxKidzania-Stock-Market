import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Checkbox,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const DataTable = ({ data, thirdColumn, onViewStock }) => {
  // Define the header labels based on the third column prop
  const headers = ["Company", "Current Price", thirdColumn, "Action"];

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
            <TableCell
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#9AA0A6",
                zIndex: 1,
                fontWeight: "bold",
                border: "none",
              }}
            >
              <Checkbox />
            </TableCell>
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
          {data.map((company) => (
            <TableRow key={company.id || company._id}>
              <TableCell sx={{ border: "none" }}>
                <Checkbox />
              </TableCell>
              <TableCell
                align="left"
                sx={{
                  border: "none",
                  maxWidth: 150,
                }}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={`images/logos/${company.acronym}.svg`}
                    className="w-10 h-10"
                  />
                  {company.name}
                </div>
              </TableCell>
              <TableCell align="center" sx={{ border: "none" }}>
                <div className="flex gap-1 justify-center items-center font-semibold">
                  {company.current_price}
                  <img
                    src="images/KidZosicon.svg"
                    alt="Kidzos Icon"
                    width={13}
                    height={13}
                  />
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
                      src={`images/${
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
