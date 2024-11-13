import React, { memo, useCallback, useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Price from "../components/Price";
import Return from "../components/Return";

import Box from "@mui/material/Box";
import DataTable from "../components/DataTable.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 960,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const MetricsItem = memo(
  ({
    title,
    tableHeader,
    icon,
    description,
    name,
    acronym,
    price,
    current_return,
    companyList,
    openCompany,
  }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    const handleViewStock = useCallback((company) => {
      handleClose();
      openCompany(company);
    }, []);

    return (
      <div className="bg-white relative md:w-[51rem] md:h-[10rem] w-full rounded-xl flex flex-row p-4">
        <Stack className="w-[70%] gap-5">
          <h4 className="flex flex-row items-center gap-2 text-lg">
            <img src={`/images/${icon}.svg`} />
            {title}
          </h4>
          <p className="leading-8">
            {description}{" "}
            <button onClick={handleOpen}>
              <p className="flex flex-row gap-2 justify-center items-center underline text-purple">
                View Rankings <img src="/images/expand.svg" alt="Expand" />
              </p>
            </button>
          </p>
        </Stack>

        <div className="relative w-[30%]">
          {/* Background Image */}
          <img
            src={`/images/logos/${acronym}.svg`}
            alt={`${name} logo`}
            className="absolute inset-0 opacity-10 w-full h-full object-contain"
            style={{ right: 0, top: 0 }}
          />

          <Stack className="relative text-right gap-4">
            <p className="text-sm">Last 24h</p>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-semibold">
                {name} ({acronym})
              </p>
              <h1 className="text-3xl flex flex-row gap-4 items-center justify-end">
                <Price price={price} styles="absolute -right-5 -top-1 w-5" />
                <Return
                  type={current_return > 0 ? "positive" : "negative"}
                  number={Math.abs(current_return)}
                />
              </h1>
            </div>
          </Stack>
        </div>

        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-row mb-5">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-3xl">{title}</h3>
                <p className="text-sm text-[#6E7191] pl-1">{description}</p>
              </div>
              <div
                className="flex flex-row items-center text-2xl gap-2 ml-auto"
                onClick={handleClose}
              >
                Close <img src="/images/close.svg" alt="close" />
              </div>
            </div>
            <DataTable
              data={companyList}
              thirdColumn={tableHeader}
              onViewStock={handleViewStock}
            />
          </Box>
        </Modal>
      </div>
    );
  }
);

const MetricsList = React.memo(({ metrics, handleOpen }) => {
  return (
    <Stack spacing={2.5}>
      {metrics.trending_now.length > 0 && (
        <MetricsItem
          title="Trending Now"
          tableHeader="Current Number of Investors"
          icon="trending_now"
          description="A stock that is trending right means that many kids in Kidzania are starting to invest in it right now."
          name={metrics.trending_now[0].name}
          acronym={metrics.trending_now[0].acronym}
          price={metrics.trending_now[0].current_price}
          current_return={metrics.trending_now[0].current_return}
          companyList={metrics.trending_now}
          openCompany={handleOpen}
        />
      )}
      {metrics.most_traded.length > 0 && (
        <MetricsItem
          title="Most Traded"
          tableHeader="Number of Trades"
          icon="most_traded"
          description="A stock that is most traded means that it has received the highest number of trades out all other stocks."
          name={metrics.most_traded[0].name}
          acronym={metrics.most_traded[0].acronym}
          price={metrics.most_traded[0].current_price}
          current_return={metrics.most_traded[0].current_return}
          companyList={metrics.most_traded}
          openCompany={handleOpen}
        />
      )}
      {metrics.highest_return.length > 0 && (
        <MetricsItem
          title="Highest Return"
          tableHeader="Return %"
          icon="highest_return"
          description="A stock with the highest return means that it made made the biggest profit for investors compared to all other stocks."
          name={metrics.highest_return[0].name}
          acronym={metrics.highest_return[0].acronym}
          price={metrics.highest_return[0].current_price}
          current_return={metrics.highest_return[0].current_return}
          companyList={metrics.highest_return}
          openCompany={handleOpen}
        />
      )}
      {metrics.most_visited.length > 0 && (
        <MetricsItem
          title="Most Visited"
          tableHeader="Visitors"
          icon="most_visited"
          description="A stock that is most visited means that it has received has the highest number of visitors to its establishment in Kidzania."
          name={metrics.most_visited[0].name}
          acronym={metrics.most_visited[0].acronym}
          price={metrics.most_visited[0].current_price}
          current_return={metrics.most_visited[0].current_return}
          companyList={metrics.most_visited}
          openCompany={handleOpen}
        />
      )}
    </Stack>
  );
});

export default MetricsList;
