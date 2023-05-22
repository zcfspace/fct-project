import { useState, useEffect } from "react";

interface Food {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
}

function Order() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [cart, setCart] = useState<Record<string, { food: Food; quantity: number }>>({});
  const [table, setTable] = useState("");

  const addToCart = (food: Food) => {
    setCart((prevCart) => {
      const existingItem = prevCart[food.id];
      if (existingItem) {
        return {
          ...prevCart,
          [food.id]: { food, quantity: existingItem.quantity + 1 },
        };
      } else {
        return { ...prevCart, [food.id]: { food, quantity: 1 } };
      }
    });
  };

  const finalizeOrder = async () => {
    console.log(Object.values(cart));
    try {
      const response = await fetch("/api/order/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: Number(table),
          foods: Object.values(cart),
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCart({});
        setTable("");
        alert("Pedido finalizado con éxito");
      } else {
        alert("Error al finalizar el pedido");
      }
    } catch (error) {
      console.log(error);
      alert("Error al finalizar el pedido");
    }
  };

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await fetch(`/api/food/get`);
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFoods();
  }, []);

  return (
    <div>
      <label htmlFor="table">Número de mesa:</label>
      <select id="table" value={table} onChange={(e) => setTable(e.target.value)}>
        <option value="">Seleccionar mesa</option>
        <option value="1">Mesa 1</option>
        <option value="2">Mesa 2</option>
        <option value="3">Mesa 3</option>
        <option value="4">Mesa 4</option>
      </select>
      {foods.map((food: Food) => (
        <div key={food.id}>
          <h2>{food.name}</h2>
          <p>{food.price}</p>
          <p>{cart[food.id]?.quantity || 0}</p>
          <p>{cart[food.id]?.quantity * food.price || 0}</p>
          <button onClick={() => addToCart(food)}>Añadir al carrito</button>
        </div>
      ))}
      <button onClick={finalizeOrder} disabled={!table}>Finalizar pedido</button>
    </div>
  );
}

export default Order;
