import React from "react";
import { Chip, Avatar, Box } from "@mui/material";
import { useAuth } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, backendUrl } = useAuth();
  return (
    <div className="flex flex-row justify-between items-center h-24 bg-white w-screen overflow-hidden">
      <div className="w-[58%] flex justify-end">
        <img src="/images/main_logos.jpg" />
      </div>
      {user && (
        <div className="pr-6">
          <div className="h-16 rounded-full bg-white-100 flex flex-row justify-between items-center w-[100%] p-3">
            <div className="flex flex-row justify-center items-center pr-5">
              <div className="bg-[#D88EA9] rounded-full w-12 h-12 flex justify-center items-center">
                <Avatar
                  alt="avatar"
                  src={`${backendUrl}/images/avatars/${user.avatar}.svg`}
                  sx={{ width: 46, height: 46 }}
                />
              </div>

              <div className="m-3 flex flex-col gap-1">
                <h6 className="">
                  Hi, {user.first_name} {user.last_name}!
                </h6>
                <p className="text-sm font-bold">
                  Balance:{" "}
                  <span className="font-normal text-white-200 relative">
                    {user.getTotalBalance().toLocaleString()}{" "}
                    <img
                      src="/images/KidZosicon.svg"
                      alt="Kidzos coins"
                      className="absolute -top-0.5 -right-3"
                    />
                  </span>
                </p>
              </div>
            </div>
            <button>
              {" "}
              <img src="/images/tripledots.svg" className="mr-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
