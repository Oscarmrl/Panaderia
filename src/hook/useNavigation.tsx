import { useNavigate } from "react-router-dom";
import { useNavigationContext } from "../context/useNavigationContext";
import { getAuthUser } from "../auth/authStorage";

export default function useNavigation() {
  const navigate = useNavigate();
  const { setActiveTab } = useNavigationContext();
  const { role } = getAuthUser();

  return {
    // Usuario
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
    gotoProfile: () => {
      navigate("/Panaderia/profile");
    },

    // Admin
    goToAdminLayout: () => {
      if (role === "admin") {
        setActiveTab("admin");
        navigate("/Panaderia/admin");
      }
    },
    goToDashboard: () => {
      if (role === "admin") {
        setActiveTab("admin");
        navigate("/Panaderia/admin/Dashboard");
      }
    },
    goToEditProducts: () => {
      if (role === "admin") {
        setActiveTab("admin");
        navigate("/Panaderia/admin/Edit_Products");
      }
    },
    goToAddProducts: () => {
      if (role === "admin") {
        setActiveTab("admin");
        navigate("/Panaderia/admin/Add_Products");
      }
    },

    goToOrders: () => {
      if (role === "admin") {
        setActiveTab("admin");
        navigate("/Panaderia/admin/Orders");
      }
    },
  };
}
