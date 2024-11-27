import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useAuth } from "../providers/AuthProvider";
import { userProfitService } from "../services/userProfit.service";

const BalanceBreakdown = ({ withdrawHandle }) => {
  const { user } = useAuth();
  const [prevReturn, setPrevReturn] = useState(0);

  const [totalProfit, setTotalProfit] = useState(0);
  const [profitReturn, setProfitReturn] = useState(0);

  const fetchUserProfits = async () => {
    try {
      const userProfits = await userProfitService.fetchUserProfit(user._id);

      // Calculate the total profit and success rate
      let totalProfitCount = 0;
      let positiveProfitCount = 0;
      let totalInvestedAmount = 0;

      userProfits.forEach((element) => {
        totalProfitCount += element.profit;
        totalInvestedAmount += element.investedAmount;

        // Count if profit is positive
        if (element.profit > 0) {
          positiveProfitCount++;
        }
      });

      const totalProfitReturn = (totalProfitCount / totalInvestedAmount) * 100;
      setProfitReturn(totalProfitReturn);

      // Calculate success rate as a percentage
      const successRate = (positiveProfitCount / userProfits.length) * 100;

      setTotalProfit(totalProfitCount);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    user && fetchUserProfits();
    const returnValue = (user.previous_balance / user.getTotalBalance()) * 100;
    setPrevReturn(100 - returnValue);

    return () => {
      controller.abort();
    };
  }, [user]);

  return (
    <div className="relative">
      <Stack direction={"row"} className="flex justify-between ">
        <div className="flex flex-col justify-between">
          <h1 className="text-[44px] text-white tracking-wider">
            Total Balance
          </h1>
          <div className="flex flex-row items-center gap-2">
            <p className="text-white text-[42px]">
              {user.getTotalBalance().toFixed(2)}
            </p>

            <div className="flex flex-col items-start">
              <img
                src="/images/KidZosicon2.svg"
                alt="KidZos Icon"
                className="w-6"
              />
              <div className="text-sm flex flex-row items-center justify-center text-[#00ECA5]">
                {prevReturn >= 0 ? (
                  <img
                    src="/images/return_balance.svg"
                    alt="return balance"
                    className="mr-1 w-4 h-4"
                  />
                ) : (
                  <img
                    src="/images/return_balance.svg"
                    alt="return balance"
                    className="mr-1 w-4 h-4 rotate-90"
                  />
                )}
                {prevReturn >= 0 ? "+" : ""}
                {prevReturn.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </Stack>
      <p className="text-[#31CFCB] pt-1">
        Compare to ${user.previous_balance.toFixed(2)} last month
      </p>
      <Stack direction={"row"} className="pt-5">
        <div className="border-r-white border-r pr-3">
          <h6 className="text-[#31CFCB]">Available Cash Balance</h6>
          <div className="flex items-start gap-1 w-full relative">
            <p className="text-white text-2xl">
              {user.wallet_balance.toFixed(2)}
            </p>
            <img
              src="/images/KidZosicon2.svg"
              alt="KidZos Icon"
              className="w-4 mr-2" // Adjust width as needed
            />
          </div>
        </div>
        <div className="border-r-white border-r pl-3 pr-3">
          <h6 className="text-[#31CFCB]">Invested Amount</h6>
          <div className="flex items-start gap-1 w-full relative">
            <p className="text-white text-2xl">
              {user.total_invested_amount.toFixed(2)}
            </p>
            <img
              src="/images/KidZosicon2.svg"
              alt="KidZos Icon"
              className="w-4 mr-2" // Adjust width as needed
            />
          </div>
        </div>
        <div className="border-r-white border-r pl-3 pr-3">
          <h6 className="text-[#31CFCB]">Profit Made</h6>
          <div className="flex items-start gap-1 w-full relative">
            <p className="text-white text-2xl">{totalProfit}</p>
            <img
              src="/images/KidZosicon2.svg"
              alt="KidZos Icon"
              className="w-4 mr-2" // Adjust width as needed
            />
          </div>
        </div>
        <div className="pl-3">
          <h6 className="text-[#31CFCB]">Value of Stocks Bought</h6>
          <div className="flex items-start gap-1 w-full relative">
            <p className="text-white text-2xl">
              {user.stock_balance.toFixed(2)}
            </p>
            <img
              src="/images/KidZosicon2.svg"
              alt="KidZos Icon"
              className="w-4 mr-2" // Adjust width as needed
            />
          </div>
        </div>
        <img
          src="/images/bag_of_money.svg"
          alt="Bag of Money"
          className="absolute -right-12 -top-2"
          width={310}
        />
      </Stack>
      <Button
        name="Withdraw"
        onClick={withdrawHandle}
        otherClasses="bg-[#31CFCB] text-white w-[175px] tracking-wider my-5"
      />
    </div>
  );
};

export default BalanceBreakdown;
