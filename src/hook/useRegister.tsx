import axios from "axios";
import { BASE_URL } from "../constants";
import { registerTechnicianType } from "../schemas/registerTechnician";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const navigate = useNavigate();

  const registerTechnician = async (data: registerTechnicianType) => {
    const urlRegisterTechnician = `${BASE_URL}/register/technician`;

    try {
      await axios.post(urlRegisterTechnician, data);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return { registerTechnician };
};

export default useRegister;
