import useNavigation from "../../hook/useNavigation";
import { useParams } from "react-router-dom";
import { useProduct } from "../Data/Data";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Button from "../ui/Button";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineAdd } from "react-icons/md";
import { IoMdRemove } from "react-icons/io";

export default function ProductDetail() {
  const { gotToHome } = useNavigation();
  const { id } = useParams();
  const { products } = useProduct();

  const product = products.find((pro) => pro.idProducts.toString() === id);

  return (
    <div className="lg:flex lg:justify-center">
      <div className="relative w-full max-w-md mx-auto">
        <div className="relative">
          <img
            className="w-full h-auto object-cover rounded-lg"
            src="/Panaderia/Principal.jpeg"
            alt="Product Image"
          />

          <Button
            className="btn btn-circle w-12 absolute left-4 inset-y-1/2 top-9"
            onClick={gotToHome}
          >
            <IoIosArrowBack />
          </Button>

          <Button className="btn btn-circle w-12 absolute right-4 inset-y-1/2 top-9 ">
            <MdOutlineFavoriteBorder />
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-2/3">
        <div className="w-full grid grid-cols-2">
          <h2 className="text-2xl md:text-4xl m-2 font-bold text-accent col-span-1 lg:col-span-2">
            Product Name
          </h2>
          <div className="flex flex-col justify-start items-end lg:items-start m-2 lg:col-span-2 lg:row-start-3">
            <div className="flex justify-between text-white  p-2 mr-2 bg-secondary rounded-badge w-24">
              <Button>
                <IoMdRemove />
              </Button>
              <span>1</span>
              <Button>
                <MdOutlineAdd />
              </Button>
            </div>
          </div>
          <p className="text-lg m-2 col-span-2 col-start-1 row-start-2">
            Product Description Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Esse ducimus eligendi itaque velit quis fugiat
            deserunt, harum excepturi nobis! Neque molestias velit nobis
            perferendis voluptate voluptas inventore reiciendis quas at.
          </p>
        </div>
      </div>
      <div className="product-detail__description">
        <button className="btn btn-outline">agregar a carrito</button>
      </div>
    </div>
  );
}
