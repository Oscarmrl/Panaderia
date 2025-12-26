import { MdOutlineShoppingCart } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import IconoNav from "../ui/IconoNav";
import { IoHomeOutline } from "react-icons/io5";
import useNavigation from "../../hook/useNavigation";
import { useNavigationContext } from "../../context/useNavigationContext";
import { MdAdminPanelSettings } from "react-icons/md";
import { getAuthUser } from "../../auth/authStorage";
export default function MenuInferior() {
  const { goToCart, gotToHome, goToFavorites, goToAdminDashboard } =
    useNavigation();
  const { activeTab } = useNavigationContext();
  const { role } = getAuthUser();

  return (
    <div className="flex flex-row bg-base-100 bottom-0 fixed w-full justify-evenly py-2 md:hidden">
      <button
        data-tab="home"
        className={
          activeTab === "home"
            ? "Menu_active"
            : "flex flex-col items-center justify-center w-20 md:w-40"
        }
        onClick={gotToHome}
      >
        <IconoNav icon={IoHomeOutline} size="w-4 h-4" label="Inicio" />
      </button>

      <button
        data-tab="favoritos"
        className={
          activeTab === "favoritos"
            ? "Menu_active"
            : "flex flex-col items-center justify-center w-20 md:w-40"
        }
        onClick={goToFavorites}
      >
        <IconoNav icon={MdFavoriteBorder} size="w-4 h-4" label="Favoritos" />
      </button>

      <button
        data-tab="carrito"
        className={
          activeTab === "carrito"
            ? "Menu_active"
            : "flex flex-col items-center justify-center w-20 md:w-40"
        }
        onClick={goToCart}
      >
        <IconoNav icon={MdOutlineShoppingCart} size="w-4 h-4" label="Carrito" />
      </button>
      {/* BOTÓN ADMIN */}
      {role === "admin" && (
        <button
          data-tab="admin"
          className={
            activeTab === "admin"
              ? "Menu_active"
              : "flex flex-col items-center justify-center w-20 md:w-40"
          }
          onClick={goToAdminDashboard}
        >
          <IconoNav icon={MdAdminPanelSettings} size="w-4 h-4" label="Admin" />
        </button>
      )}
    </div>
  );
}
