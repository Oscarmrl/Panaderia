import { MdOutlineShoppingCart } from "react-icons/md";
import { LuSunMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import useMutation from "../../hook/useMutation";
import { MdFavoriteBorder } from "react-icons/md";
import { LuUserRoundX } from "react-icons/lu";
import { AiOutlineUser } from "react-icons/ai";
import IconoNav from "../ui/IconoNav";
import { IoHomeOutline } from "react-icons/io5";
import { UseTheme } from "../../hook";
import useNavigation from "../../hook/useNavigation";
export default function Navegacion() {
  const { handleTheme } = UseTheme();
  const { goToCart, gotToHome, goToFavorites, gotoLogin } = useNavigation();
  const { mutate } = useMutation();
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    const loggedIn = localStorage.getItem("loggedIn");
    return loggedIn === "true" && token !== null;
  };

  // Manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await mutate("http://localhost:3000/api/logout", "POST");
      localStorage.clear();
      gotToHome();
    } catch (err) {
      console.error("Error al hacer logout:", err);
    }
  };

  return (
    <div className="navbar bg-base">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 hidden md:flex">
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
        </ul>

        <ul className="flex gap-2">
          <li className="md:hidden">
            {isLoggedIn() ? (
              <button className="text-xs" onClick={handleLogout}>
                <IconoNav
                  icon={LuUserRoundX}
                  size="w-6 h-6"
                  label="Cerrar sesión"
                />
              </button>
            ) : (
              <button className="text-xs" onClick={gotoLogin}>
                <IconoNav
                  icon={AiOutlineUser}
                  size="w-6 h-6"
                  label="Iniciar sesión"
                />
              </button>
            )}
          </li>
          <label className="swap swap-rotate">
            {/* Checkbox para cambiar el tema */}

            <input type="checkbox" onClick={handleTheme} />
            {/* Icono del sol */}
            <LuSun className="swap-on h-8 w-8 " />

            {/* Icono de la luna */}
            <LuSunMoon className="swap-off h-8 w-8 " />
          </label>
        </ul>
      </div>
    </div>
  );
}
