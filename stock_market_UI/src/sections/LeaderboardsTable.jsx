import React, { useEffect, useState } from "react";
import { userService } from "../services/user.service";
import { Stack } from "@mui/material";
import clsx from "clsx";
import { useAuth } from "../providers/AuthProvider";

const LeaderboardsCard = ({ title, image, description, list }) => {
  const { backendUrl } = useAuth();
  return (
    <div className="w-[445px] h-[645px] bg-white p-5">
      <Stack spacing={4.5}>
        <div className="flex justify-center items-center">
          <img src={`images/${title}.svg`} />
        </div>
        <div className="flex justify-center items-center w-full">
          <img
            src={`/images/${image}.svg`}
            alt="Leaderboard Image"
            className="w-[270px] h-[190px]"
          />
        </div>
        <div className="p-2 gap-y-3 flex flex-col">
          <div className="text-center text-[20px] border-b border-b-black-200 p-2 pb-3">
            {description}
          </div>

          <Stack spacing={2} className="p-3">
            {list[0] && (
              <div className="flex flex-row justify-between">
                <img src="/images/number1.svg" alt="Number 1" />
                <div className="flex flex-row gap-3 items-center justify-start w-[45%]">
                  <img
                    src={`${backendUrl}/images/avatars/${list[0].avatar}.svg`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <p className="">
                    {list[0].first_name} {list[0].last_name}
                  </p>
                </div>
              </div>
            )}
            {list[1] && (
              <div className="flex flex-row justify-between">
                <img src="/images/number2.svg" alt="Number 2" />
                <div className="flex flex-row gap-3 items-center justify-start w-[45%]">
                  <img
                    src={`${backendUrl}/images/avatars/${list[1].avatar}.svg`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <p className="">
                    {list[1].first_name} {list[1].last_name}
                  </p>
                </div>
              </div>
            )}
            {list[2] && (
              <div className="flex flex-row justify-between">
                <img src="/images/number3.svg" alt="Number 3" />
                <div className="flex flex-row gap-3 items-center justify-start w-[45%]">
                  <img
                    src={`${backendUrl}/images/avatars/${list[2].avatar}.svg`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <p className="">
                    {list[2].first_name} {list[2].last_name}
                  </p>
                </div>
              </div>
            )}
            {list[3] && (
              <div className="flex flex-row justify-between">
                <img src="/images/number4.svg" alt="Number 4" />
                <div className="flex flex-row gap-3 items-center justify-start w-[45%]">
                  <img
                    src={`${backendUrl}/images/avatars/${list[3].avatar}.svg`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <p className="">
                    {list[3].first_name} {list[3].last_name}
                  </p>
                </div>
              </div>
            )}
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

const LeaderboardsTable = (styles) => {
  const [leaderboards, setLeaderboards] = useState({
    highestNumberOfTrades: [],
    highestReturn: [],
    biggestInvestment: [],
  });

  const fetchLeaderboards = async () => {
    try {
      const leaderboards = await userService.fetchLeaderboards();
      setLeaderboards(leaderboards);

      // Save the fetched leaderboards and current date to localStorage
      localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
      localStorage.setItem("leaderboardsDate", new Date().toDateString());
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Check if leaderboards are in localStorage and are from today
    const savedLeaderboards = localStorage.getItem("leaderboards");
    const savedDate = localStorage.getItem("leaderboardsDate");
    const today = new Date().toDateString();

    if (savedLeaderboards && savedDate === today) {
      setLeaderboards(JSON.parse(savedLeaderboards));
    } else {
      fetchLeaderboards();
    }
  }, []);

  return (
    <Stack
      direction={"row"}
      spacing={2}
      className={"flex justify-center items-center h-[70vh]"}
    >
      <LeaderboardsCard
        title="trailblazers_title"
        image="trailblazers"
        description="Traders with the highest number of trades"
        list={leaderboards.highestNumberOfTrades}
      />
      <LeaderboardsCard
        title="investment_masters_title"
        image="investment_masters"
        description="Traders with the biggest Investments"
        list={leaderboards.biggestInvestment}
      />
      <LeaderboardsCard
        title="king_of_profits_title"
        image="king_of_profits"
        description="Traders who achieved the most return"
        list={leaderboards.highestReturn}
      />
    </Stack>
  );
};

export default LeaderboardsTable;
