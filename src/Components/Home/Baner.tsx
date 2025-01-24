export default function Baner() {
  return (
    <div className=" flex justify-center items-center">
      <div className=" w-full h-60 lg:h-96 bg-base-100 md:rounded-badge md:w-2/3 shadow-2xl">
        <img
          src="/Panaderia/Principal.jpeg"
          alt="Imagen principal"
          className="w-full h-full object-cover md:rounded-badge"
        />
      </div>
    </div>
  );
}
