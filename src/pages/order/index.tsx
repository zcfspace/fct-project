import { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner'
import Image from "next/image";
interface Food {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
}

interface CartItem {
  food: Food;
  quantity: number;
}

function Order() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [table, setTable] = useState("");
  const [showCart, setShowCart] = useState(false);

  const addToCart = (food: Food) => {
    const existingItem = cartItems.find(item => item.food.id === food.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => {
        if (item.food.id === food.id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      }));
    } else {
      setCartItems([...cartItems, { food, quantity: 1 }]);
    }
  };

  const finalizeOrder = async () => {
    try {
      const response = await fetch("/api/order/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table: Number(table),
          foods: cartItems,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setCartItems([]);
        setTable("");
        toast.success('Pedido finalizado', {
          duration: Infinity,
        });
      } else {
        toast.error('Error al finalizar el pedido');
      }
    } catch (error) {
      toast.error('Error al finalizar el pedido');
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
    <>
      <Toaster richColors closeButton position="top-right" />
      <div className="flex flex-wrap m-10">
        {foods.map((food: Food) => (
          <div key={food.id} className="lg:w-1/4 md:w-1/2 p-4">
            <div className="block relative h-36 shadow-xl">
              <Image
                alt="food"
                width={300}
                height={300}
                className="object-cover object-center w-full h-full block rounded-lg"
                src={food.image}
              />
            </div>
            <div className="mt-4 gap-2 flex justify-between">
              <div>
                <h2 className="text-gray-900 title-font text-lg font-medium">{food.name}</h2>
                <button onClick={() => addToCart(food)}>Añadir al carrito</button>
              </div>

              <div>
                <p className="mt-1">{food.price} €</p>
                <span>{cartItems.find(item => item.food.id === food.id)?.quantity || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 z-50 w-full h-24 bg-white border-t border-gray-200 dark:bg-gray-100">
        <div className="mx-10 flex justify-between items-center h-full">
          <div>
            <select id="table"
              className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
              value={table} onChange={(e) => setTable(e.target.value)}>
              <option value="">Seleccionar la mesa:</option>
              <option value="1">Mesa 1</option>
              <option value="2">Mesa 2</option>
              <option value="3">Mesa 3</option>
            </select>
          </div>
          <div>
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              onClick={() => setShowCart(!showCart)}>Mostrar carrito</button>
            {showCart && (
              <div>
                <h2>Carrito</h2>
                {cartItems.map((item: CartItem) => (
                  <div key={item.food.id}>
                    <p>{item.food.name} - {item.quantity}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <button
              className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              onClick={finalizeOrder} disabled={!table}>Finalizar pedido</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
