import { MdOutlineShoppingCart } from "react-icons/md";
import { LuSunMoon, LuSun, LuUserRoundX } from "react-icons/lu";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

import IconoNav from "../ui/IconoNav";
import { UseTheme } from "../../hook";
import useNavigation from "../../hook/useNavigation";
import useMutation from "../../hook/useMutation";
import { getAuthUser } from "../../auth/authStorage";

export default function Navegacion() {
  const { handleTheme } = UseTheme();
  const { goToCart, gotToHome, goToFavorites, gotoLogin, goToAdminLayout } =
    useNavigation();
  const { mutate } = useMutation();

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    const loggedIn = localStorage.getItem("loggedIn");
    return loggedIn === "true" && token !== null;
  };

  const { role } = getAuthUser(); // obtenemos rol del usuario

  // Manejar cierre de sesión
  const handleLogout = async () => {
    try {
      await mutate("/api/logout", "POST");
      localStorage.clear();
      gotToHome();
    } catch (err) {
      console.error("Error al hacer logout:", err);
    }
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 left-0 w-full z-50 shadow-md md:rounded-2xl">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>

      <div className="flex-none">
        {/* ===== MENU DESKTOP ===== */}
        <ul className="menu menu-horizontal px-1 hidden md:flex items-center gap-2">
          {/* Botón admin solo si es admin */}
          {isLoggedIn() && role === "admin" && (
            <li>
              <button onClick={goToAdminLayout}>
                <IconoNav
                  icon={MdAdminPanelSettings}
                  size="w-6 h-6"
                  label="Admin"
                />
              </button>
            </li>
          )}

          <li>
            {isLoggedIn() ? (
              <button onClick={handleLogout}>
                <IconoNav
                  icon={LuUserRoundX}
                  size="w-6 h-6"
                  label="Cerrar sesión"
                />
              </button>
            ) : (
              <button onClick={gotoLogin}>
                <IconoNav
                  icon={AiOutlineUser}
                  size="w-6 h-6"
                  label="Iniciar sesión"
                />
              </button>
            )}
          </li>

          <li>
            <button onClick={goToFavorites}>
              <IconoNav
                icon={MdFavoriteBorder}
                size="w-6 h-6"
                label="Favoritos"
              />
            </button>
          </li>

          <li>
            <button onClick={goToCart}>
              <IconoNav
                icon={MdOutlineShoppingCart}
                size="w-6 h-6"
                label="Carrito"
              />
            </button>
          </li>

          <li>
            <button onClick={gotToHome}>
              <IconoNav icon={IoHomeOutline} size="w-6 h-6" label="Inicio" />
            </button>
          </li>

          {/* 🔆 CAMBIO DE TEMA (DESKTOP) */}
          <li>
            <label className="swap swap-rotate">
              <input type="checkbox" onClick={handleTheme} />
              <LuSun className="swap-on h-8 w-8" />
              <LuSunMoon className="swap-off h-8 w-8" />
            </label>
          </li>
        </ul>

        {/* ===== MENU MOVIL ===== */}
        <ul className="flex gap-2 md:hidden items-center">
          <li>
            {isLoggedIn() ? (
              <button onClick={handleLogout}>
                <IconoNav
                  icon={LuUserRoundX}
                  size="w-6 h-6"
                  label="Cerrar sesión"
                />
              </button>
            ) : (
              <button onClick={gotoLogin}>
                <IconoNav
                  icon={AiOutlineUser}
                  size="w-6 h-6"
                  label="Iniciar sesión"
                />
              </button>
            )}
          </li>

          {/* 🔆 CAMBIO DE TEMA (MÓVIL) */}
          <label className="swap swap-rotate">
            <input type="checkbox" onClick={handleTheme} />
            <LuSun className="swap-on h-8 w-8" />
            <LuSunMoon className="swap-off h-8 w-8" />
          </label>
        </ul>
      </div>
    </div>
  );
}
