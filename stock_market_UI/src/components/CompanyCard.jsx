import React, { memo } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Price from "../components/Price";
import { useLocation } from "react-router";
import { useAuth } from "../providers/AuthProvider";

const CompanyCard = memo(({ company, handleOpen }) => {
  const { backendUrl } = useAuth();
  const location = useLocation();
  const isAdminHome = location.pathname === "/admin/home";
  return (
    <Grid
      key={company._id}
      size={isAdminHome ? 4 : 6}
      className="bg-white rounded-xl p-3"
    >
      <Stack spacing={1}>
        <div className="flex flex-row justify-between text-sm font-semibold">
          <div
            className="flex flex-row gap-3 justify-center items-center h-12"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              maxWidth: "150px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <img
              src={`${backendUrl}/images/logos/${company.logo}`}
              alt="Logo"
              width="40px"
              height="40px"
            />
            <span style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
              {company.name}
            </span>
          </div>

          {company.current_return >= 0 ? (
            <img src="/images/positive_return.svg" alt="positive return" />
          ) : (
            <img src="/images/negative_return.svg" alt="negative return" />
          )}
        </div>
        <div className="flex flex-row justify-between pr-3 pt-3">
          <div className="flex flex-row gap-2 text-[#6E7191]">
            <img src="/images/stock_price.svg" alt="Stock Price" />
            Stock price
          </div>
          <Price
            price={company.current_price}
            styles="absolute -right-3 top-0 w-3"
          />
        </div>
        <div className="flex flex-row justify-between pr-3">
          <div className="flex flex-row gap-1 text-[#6E7191]">
            <img src="/images/change.svg" alt="Change" />
            Change
          </div>
          <div className="flex flex-row gap-4 justify-center items-center">
            <Price
              price={`${
                company.current_change < 0 ? "" : "+"
              }${company.current_change.toFixed(2)}`}
              styles="absolute -right-3.5 top-0 w-3"
              textStyles={`${
                company.current_change < 0 ? "text-red-600" : "text-green-500"
              }`}
            />
            <p
              className={`text-sm tracking-wider ${
                company.current_return < 0 ? "text-red-600" : "text-green-500"
              }`}
            >
              ({company.current_return >= 0 && "+"}
              {company.current_return.toFixed(2)}%)
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between pr-3">
          <div className="flex flex-row gap-3 justify-center items-center text-[#6E7191]">
            <img src="/images/visitors.svg" alt="Change" />
            Visitors
          </div>
          <p className="font-semibold">
            {company.current_visitors.toLocaleString()}
          </p>
        </div>
        <button
          className="text-sm text-[#0086FF] flex flex-row gap-1 justify-end items-center"
          onClick={() => handleOpen(company)}
        >
          View Company Details{" "}
          <img src="/images/topright_arrow.svg" alt="topright arrow" />
        </button>
      </Stack>
    </Grid>
  );
});

export default CompanyCard;
