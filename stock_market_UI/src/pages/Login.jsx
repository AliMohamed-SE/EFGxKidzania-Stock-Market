import React, { useEffect, useState } from "react";
import FormField from "../components/FormField.jsx";
import Button from "../components/Button.jsx";
import { userService } from "../services/user.service.js";
import { useAuth } from "../providers/AuthProvider.jsx";
import { useNavigate } from "react-router";
import UserEntity from "../entities/userEntity.js";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser, admin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!username || !password) {
        if (!username) {
          setUsernameError(true);
        }
        if (!password) {
          setPasswordError(true);
        }
        return;
      } else {
        setUsernameError(false);
        setPasswordError(false);
      }

      const user = await userService.login(username, password);
      await setUser(new UserEntity(user));
      sessionStorage.setItem("token", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (admin) {
      navigate("/admin/home");
    }
  }, [navigate, user]);

  return (
    <div className="flex flex-row justify-center items-center font-poppins w-screen h-screen overflow-hidden lg:p-6">
      <div className="flex flex-row w-[100%] h-[100%]">
        <div className="w-[50%] justify-end items-center hidden xl:flex">
          <img src="/images/login.png" alt="Login" className="object-contain" />
        </div>

        <div className="flex flex-col xl:w-[50%] justify-center">
          <div className="bg-white flex flex-col justify-between rounded-xl p-5 m-5 mt-0 min-h-[67%]">
            <div className="flex flex-col justify-center items-center gap-3">
              <div className="flex flex-row justify-center items-center">
                <img src="/images/main_logos.jpg" />
              </div>

              <div className="flex flex-col gap-3">
                <h6 className="font-semibold md:text-2xl text-lg">
                  Welcome Back!
                </h6>
                <p className="text-white-200 leading-loose tracking-wide text-xs md:text-lg">
                  Let's navigate the kidzenia App together - we can't wait to
                  introduce you into a world of limitless possibilities
                </p>
              </div>

              <div className="w-full flex flex-col justify-center items-center gap-2">
                <FormField
                  type="text"
                  startAdornmentUrl="/images/profile.svg"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsernameError(false);
                    setUsername(e.target.value);
                  }}
                  error={usernameError}
                  errorMessage="Please enter your username"
                />

                <FormField
                  type="password"
                  startAdornmentUrl="/images/password.svg"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPasswordError(false);
                    setPassword(e.target.value);
                  }}
                  error={passwordError}
                  errorMessage="Please enter your password"
                />
              </div>
            </div>
            {loginError && (
              <p className="text-red-500 mt-2 ml-2 text-center">{loginError}</p>
            )}

            <div className="w-full flex flex-col justify-center items-center gap-2">
              <Button
                name="Login"
                onClick={handleLogin}
                loading={loading}
                otherClasses="bg-purple text-white w-full"
              />
              <p className="text-sm md:text-lg">
                Doesn’t have an account?{" "}
                <a href="/register" className="text-purple font-semibold">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
          {/* <div className="bg-white flex flex-row items-center md:p-5 m-5 md:px-10 px-4 h-[122px] mt-4 rounded-xl">
            <img src="/images/profilelist.svg" className="max-md:w-20" />
            <div className="md:mr-10 mr-2 ml-6">
              <h6 className="md:text-[16px] text-xs pb-2">
                Join 100k+ happy users!
              </h6>
              <p className="md:text-[16px] text-white-200 text-xs">
                Click the arrow on right to see what our current achieved so
                far.
              </p>
            </div>
            <Link
              to="/leaderboards"
              state={{ from: "/login" }}
              className="bg-purple md:p-5 p-3 rounded-full"
            >
              <img src="/images/rightline.svg" className="w-10" />
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
