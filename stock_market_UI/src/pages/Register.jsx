import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../providers/AuthProvider";

import RegisterPhase1 from "../sections/RegisterPhase1";
import RegisterPhase2 from "../sections/RegisterPhase2";
import RegisterPhase3 from "../sections/RegisterPhase3";
import RegisterPhase4 from "../sections/RegisterPhase4";
import RegisterPhase5 from "../sections/RegisterPhase5";
import Navbar from "../components/Navbar";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [registerationPhase, setRegisterationPhase] = useState(4);
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: format(new Date(), "yyyy/MM/dd"),
    username: "",
    password: "",
    avatar: "",
  });

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      const user = JSON.parse(token);
      setUser(user);
      navigate("/");
    }
  }, [navigate, setUser]);

  const handleNextPhase = () => {
    setRegisterationPhase((prev) => prev + 1);
  };

  const handleBackPhase = () => {
    setRegisterationPhase((prev) => prev - 1);
  };

  const updateData = (newData) => {
    setRegisterData(newData);
  };

  return (
    <div className="min-w-[100vw] min-h-[100vh]">
      {registerationPhase === 1 && (
        <RegisterPhase1
          data={registerData}
          updateData={updateData}
          onNext={handleNextPhase}
        />
      )}
      {registerationPhase !== 1 && <Navbar />}
      {registerationPhase === 2 && (
        <RegisterPhase2
          data={registerData}
          updateData={updateData}
          onNext={handleNextPhase}
          onBack={handleBackPhase}
        />
      )}
      {registerationPhase === 3 && (
        <RegisterPhase3
          data={registerData}
          updateData={updateData}
          onNext={handleNextPhase}
          onBack={handleBackPhase}
        />
      )}
      {registerationPhase === 4 && (
        <RegisterPhase4
          data={registerData}
          updateData={updateData}
          onNext={handleNextPhase}
          onBack={handleBackPhase}
        />
      )}
      {registerationPhase === 5 && <RegisterPhase5 />}
    </div>
  );
};

export default Register;
