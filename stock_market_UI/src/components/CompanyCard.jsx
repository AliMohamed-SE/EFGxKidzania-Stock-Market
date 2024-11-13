import React, { memo } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Price from "../components/Price";

const CompanyCard = memo(({ company, handleOpen }) => {
  return (
    <Grid key={company._id} size={6} className="bg-white rounded-xl p-3">
      <Stack spacing={1}>
        <div className="flex flex-row justify-between text-sm font-semibold">
          <div className="flex flex-row gap-3 justify-center items-center h-12">
            <img
              src={`/images/logos/${company.acronym}.svg`}
              alt="Logo"
              width="40px"
              height="40px"
            />
            {company.name}
          </div>

          {company.current_return > 0 ? (
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
          <Price
            price={`${company.current_change < 0 ? "-" : "+"}${
              company.current_change
            }`}
            styles="absolute -right-3 top-0 w-3"
            textStyles={`${
              company.current_change < 0 ? "text-red-600" : "text-green-500"
            }`}
          />
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
