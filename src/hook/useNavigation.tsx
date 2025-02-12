import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();
  return {
    gotToHome: () => navigate("/Panaderia"),
    goToAdd: (id) => navigate(`/Panaderia/product/${id}`),
  };
}
