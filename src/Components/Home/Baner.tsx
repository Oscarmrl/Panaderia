export default function Baner() {
  return (
    <div className="bg-base flex justify-center items-center mt-0 md:mt-2">
      <div className=" w-full h-60 lg:h-96 bg-base-100 md:rounded-badge md:w-2/3">
        <img
          src="/Panaderia/Principal.jpeg"
          alt="Imagen principal"
          className="w-full h-full object-cover md:rounded-badge opacity-90"
        />
      </div>
    </div>
  );
}
