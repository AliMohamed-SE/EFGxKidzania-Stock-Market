import React, { memo } from "react";
import Loading from "../components/Loading";
import Grid2 from "@mui/material/Grid2";
import CompanyCard from "./CompanyCard";

const CompanyList = memo(
  ({ companiesLoading, filteredcompanies, handleOpen }) => {
    return (
      <div>
        {companiesLoading ? (
          <div className="flex justify-center items-center h-[24rem]">
            <Loading otherClasses={"w-7 h-7"} />
          </div>
        ) : (
          <div className="overflow-auto max-h-[60vh]">
            <Grid2
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {filteredcompanies.length > 0 ? (
                filteredcompanies.map((company) => (
                  <CompanyCard
                    key={company._id}
                    company={company}
                    handleOpen={() => handleOpen(company)}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center h-[24rem] w-full">
                  <p className="text-xl">No companies available.</p>
                </div>
              )}
            </Grid2>
          </div>
        )}
      </div>
    );
  }
);

export default CompanyList;
