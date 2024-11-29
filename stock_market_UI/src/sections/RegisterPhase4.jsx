import React, { useEffect, useState } from "react";
import { femaleAvatars, maleAvatars } from "../data/constants";
import { Box, Stack } from "@mui/material";
import Button from "../components/Button";
import { userService } from "../services/user.service";
import { useAuth } from "../providers/AuthProvider";

const RegisterPhase4 = ({ data, updateData, onNext, onBack }) => {
  const [gender, setGender] = useState("male");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedList, setSelectedList] = useState(maleAvatars);

  const handleToggle = (selectedGender) => {
    setGender(selectedGender);
  };

  const register = async () => {
    setLoading(true);
    try {
      // First, ensure data is updated with the selected avatar
      await updateData({ ...data, avatar: selectedAvatar });

      // Now that data is updated, call the register function
      await userService.register({
        ...data,
        avatar: selectedAvatar,
      });

      onNext();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gender === "male") {
      setSelectedList(maleAvatars);
    } else {
      setSelectedList(femaleAvatars);
    }
  }, [gender]);
  return (
    <div className="flex flex-col items-center h-[80vh] mt-5 mb-5 overflow-hidden">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            width: "495px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="text-center">
            <h6 className="font-semibold text-2xl pb-2">Choose Your Avatar</h6>
            <p className="text-white-200">
              Please choose an avatar to represent you when trading
            </p>
          </div>

          <div className="flex items-center justify-center bg-white rounded-full w-40 p-1 shadow-md">
            <button
              className={`flex-1 py-2 rounded-full transition-colors duration-300 ${
                gender === "male" ? "bg-purple text-white" : "bg-transparent"
              }`}
              onClick={() => handleToggle("male")}
            >
              Male
            </button>
            <button
              className={`flex-1 py-2 rounded-full transition-colors duration-300 ${
                gender === "female" ? "bg-purple text-white" : "bg-transparent"
              }`}
              onClick={() => handleToggle("female")}
            >
              Female
            </button>
          </div>
        </Stack>
      </Box>
      <div className="grid grid-cols-3 lg:grid-cols-5 md:grid-cols-4 w-[90%] gap-5 mt-5 mb-10 overflow-y-auto max-h-[100%]">
        {selectedList.slice(0, 15).map((avatar, index) => (
          <div
            key={index}
            onClick={() => setSelectedAvatar(avatar)}
            className="relative"
          >
            <img
              key={index}
              src={`/images/avatars/${avatar}.svg`}
              alt={`Avatar ${index + 1}`}
              className={`w-[230px] object-cover rounded-3xl border shadow-md ${
                avatar === selectedAvatar && "border-purple"
              } cursor-pointer`}
            />
            {avatar === selectedAvatar && (
              <img
                src="/images/check.svg"
                alt="selected"
                className="absolute right-7 top-4 w-6"
              />
            )}
          </div>
        ))}
      </div>
      {selectedAvatar && (
        <Button
          name="Continue"
          onClick={register}
          loading={loading}
          otherClasses="bg-purple text-white w-[245px] absolute right-20 bottom-20"
        />
      )}
    </div>
  );
};

export default RegisterPhase4;
