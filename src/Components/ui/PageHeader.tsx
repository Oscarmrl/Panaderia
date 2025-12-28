import { IoIosArrowBack } from "react-icons/io";

interface PageHeaderProps {
  title: string;
  onBack: () => void;
}

export default function PageHeader({ title, onBack }: PageHeaderProps) {
  return (
    <div className="m-5 md:m-8">
      <div className="relative flex items-center w-full m-1 md:m-5">
        {/* Botón volver */}
        <button
          onClick={onBack}
          className="btn btn-circle absolute left-0 btn-outline"
        >
          <IoIosArrowBack />
        </button>

        {/* Título centrado */}
        <h3 className="text-3xl font-bold mx-auto">{title}</h3>
      </div>
    </div>
  );
}
