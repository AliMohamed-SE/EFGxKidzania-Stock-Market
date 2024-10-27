import React from "react";
import { Box, Stack } from "@mui/material";

const RegisterPhase5 = () => {
  return (
    <div className="overflow-hidden">
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: "750px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="text-center">
            <h6 className="font-semibold text-2xl pb-2">
              Congrats! You won some kidZoS!
            </h6>
            <p className="text-white-200">
              You won 15 KidZoS that you can use as a starting balance to trade
              with
            </p>
          </div>

          <img src="images/mobile_money.svg" alt="15 Kidzos Recieved" />
        </Stack>
      </Box>
      <a
        href="/"
        className="border rounded-[100px] p-3 font-poppins text-normal bg-purple text-white w-[245px] absolute right-10 bottom-10 text-center"
      >
        <div className="flex flex-row justify-center items-center gap-2">
          <p>Start Trading</p>
          <img src="/images/back_arrow.svg" alt="back arrow" />
        </div>
      </a>
    </div>
  );
};

export default RegisterPhase5;
