"use client";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/styles/Pedidos.scss";

const Pedidos = () => {
  const { data: session } = useSession()
  const admin = session?.user?.role
  const router = useRouter()
  const [pedidos, setPedidos] = useState([]) 

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/user`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed");
        }

        const data = await res.json();
        const usuariosConPedidos = data.filter(usuario => usuario.orders.length > 0);
      setPedidos(usuariosConPedidos);
        console.log(data, "dddddddd"); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  

  return (
    <div>
      {pedidos.length === 0 ? (
        <Loader /> 
      ) : (
        <ul className="orders">
          {pedidos.map((pedido, index) => (
            <li key={pedido._id} className="order-list">
              <h2>Email: {pedido.email}</h2>
              {pedido.orders.length > 0 && ( 
                <ul>
                  {pedido.orders.map((order, orderIndex) => (
                    <li key={orderIndex}>
                        <h3>{order.orderItems[0].title}</h3>
                      <p>Orden: {order.id}</p>
                      <p>Monto: {order.amountPaid}</p>
                      
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  

};

export default Pedidos;





