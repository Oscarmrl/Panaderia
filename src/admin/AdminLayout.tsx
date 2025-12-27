import Button from "../Components/ui/Button";
import useNavigation from "../hook/useNavigation";
import { MdDashboard, MdAddBox, MdInventory, MdListAlt } from "react-icons/md";

export default function AdminLayout() {
  const { goToDashboard, goToEditProducts, goToAddProducts, goToOrders } =
    useNavigation();

  return (
    <div className="min-h-screen flex justify-center items-start bg-base-100 mt-10 px-4 ">
      <div className="w-full max-w-4xl bg-base-200 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Panel de Administración
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Button
            className="
              btn
              btn-outline
              flex
              items-center
              gap-4
              justify-start
              h-20
              md:justify-center md:h-48
              text-lg
              md:text-2xl
              shadow-2xl
            "
            onClick={goToDashboard}
          >
            <MdDashboard size={32} />
            Dashboard
          </Button>

          <Button
            className="
              btn
              btn-outline

              flex
              items-center
              md:justify-center md:h-48
              gap-4
              justify-start
              h-20
              text-lg
              md:text-2xl
              shadow-2xl
            "
            onClick={goToAddProducts}
          >
            <MdAddBox size={32} />
            Añadir productos
          </Button>

          <Button
            className="
              btn
              btn-outline
              flex
              items-center
              gap-4
              justify-start
              h-20
              text-lg
              md:text-2xl
              shadow-2xl
              md:justify-center md:h-48
              
            "
            onClick={goToEditProducts}
          >
            <MdInventory size={32} />
            Ver productos
          </Button>

          <Button
            className="
              btn
              btn-outline
              flex
              items-center
              gap-4
              justify-start
              h-20
              text-lg
              md:text-2xl
              shadow-2xl
              md:justify-center md:h-48

            "
            onClick={goToOrders}
          >
            <MdListAlt size={32} />
            Ver órdenes
          </Button>
        </div>
      </div>
    </div>
  );
}
