import { product } from "./DataProducts"
export default function Products() {
  return (
    <div className=" bg-red-600 h-auto py-5">

        <h2 className=" text-center text-3xl md:text-5xl ">Hasta aqui mi reporte joakin</h2>


  <div className="grid grid-cols-2 m-1  text-center gap-2 md:gap-4 md:grid-cols-3 last:mb-16 ">


  {product.map((pro,index)=>{

return (

  <div key={index} className="Product">
  <img className="img" src="/Panaderia/Principal.jpeg" alt={pro.name} />
  
  <div className="flex flex-col flex-grow sm:p-2 md:p-6">
    <h3 className="name">{pro.name}</h3>
    <p className="description">
      {pro.description}
    </p>

    <div className="actions">
      <span className="price">{pro.price}</span>
      <button className="button">
        Comprar Ahora
      </button>
    </div>
  </div>
</div>

)
  })}

        </div>


    </div>
  )
}
