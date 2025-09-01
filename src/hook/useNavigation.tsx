import { useNavigate } from "react-router-dom";
import { useNavigationContext } from "../context/useNavigationContext";

export default function useNavigation() {
  const navigate = useNavigate();
  const { setActiveTab } = useNavigationContext();

  return {
    gotToHome: () => {
      setActiveTab("home");
      navigate("/Panaderia");
    },

    goToAdd: (id: string) => {
      navigate(`/Panaderia/product/${id}`);
      setActiveTab("add");
    },
    goToCart: () => {
      navigate("/Panaderia/cart");
      setActiveTab("carrito");
    },
    goToFavorites: () => {
      navigate("/Panaderia/favoritos");
      setActiveTab("favoritos");
    },
    gotoLogin: () => {
      navigate("/Panaderia/login");
    },
    gotoRegister: () => {
      navigate("/Panaderia/register");
    },
  };
}
