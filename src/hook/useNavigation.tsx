import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();
  return {
    gotToHome: () => navigate("/Panaderia"),
    goToAdd: (id: string) => navigate(`/Panaderia/product/${id}`),
    goToCart: () => navigate("/Panaderia/cart"),
    goToFavorites: () => navigate("/Panaderia/favoritos"),
  };
}
