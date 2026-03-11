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
      navigate("/");
    },

    goToAdd: (id: string) => {
      navigate(`/product/${id}`);
      setActiveTab("add");
    },
    goToCart: () => {
      navigate("/cart");
      setActiveTab("carrito");
    },
    goToFavorites: () => {
      navigate("/favoritos");
      setActiveTab("favoritos");
    },
    gotoLogin: () => {
      navigate("/login");
    },
    gotoRegister: () => {
      navigate("/register");
    },
    gotoProfile: () => {
      navigate("/profile");
    },

    // Admin
    goToAdminLayout: () => {
      if (role === "admin") {
        setActiveTab("admin");
        navigate("/admin");
      }
    },
    goToDashboard: () => {
      if (role === "admin") {
        setActiveTab("admin");
        navigate("/admin/Dashboard");
      }
    },
    goToEditProducts: () => {
      if (role === "admin") {
        setActiveTab("admin");
        navigate("/admin/Edit_Products");
      }
    },
    goToAddProducts: () => {
      if (role === "admin") {
        setActiveTab("admin");
        navigate("/admin/Add_Products");
      }
    },

    goToOrders: () => {
      if (role === "admin") {
        setActiveTab("admin");
        navigate("/admin/Orders");
      }
    },
  };
}
