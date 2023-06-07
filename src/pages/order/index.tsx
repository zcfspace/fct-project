import { Fragment, useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner'
import Image from "next/image";
import { Dialog, Transition } from '@headlessui/react';

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
  let [isOpenCart, setIsOpenCart] = useState(false)
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeCart() {
    setIsOpenCart(false)
  }

  function openCart() {
    setIsOpenCart(true)
  }

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
        closeModal();
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
    <div className="mx-auto max-w-screen-xl">
      <Toaster richColors closeButton position="top-right" />
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-8 p-8 pb-24">
        {foods.map((food: Food) => (
          <div key={food.id}>
            <div className="block relative h-44 shadow-xl">
              <Image
                alt="food"
                width={300}
                height={300}
                className="object-cover object-center w-full h-full block rounded-lg"
                src={food.image}
              />
            </div>
            <div className="mt-4 gap-2 flex justify-between">
              <h2 className="text-gray-900 title-font text-lg font-medium">{food.name}</h2>
              <p className="mt-1">{food.price} €</p>
            </div>
            <div className='flex items-center mt-2'>
              <button className="text-red-500 mr-1"
                onClick={() => {
                  const delCartItems = cartItems.map((cartItem) => {
                    if (cartItem.food.id === food.id && cartItem.quantity > 0) {
                      return { ...cartItem, quantity: cartItem.quantity - 1 };
                    } else {
                      return cartItem;
                    }
                  }).filter((cartItem) => cartItem.quantity > 0);
                  setCartItems(delCartItems);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                </svg>
              </button>
              <span className='text-gray-900 font-bold'>
                {cartItems.find(item => item.food.id === food.id)?.quantity || 0}
              </span>
              <button className="text-green-500 ml-1" onClick={() => addToCart(food)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 z-50 flex justify-center items-center w-full h-16 border-gray-200 bg-gray-100 rounded-full shadow-lg">
        <div className="flex justify-between items-center h-full">
          <div>
            <button className="text-green-500 mr-3" onClick={openCart}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>
            <Transition appear show={isOpenCart} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeCart}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >

                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Carrito
                        </Dialog.Title>
                        <table className="w-full text-sm text-left text-gray-500 my-3 ">
                          <thead className="text-xs text-gray-700 uppercase bg-green-100">
                            <tr>
                              <th className="px-6 py-3">Nombre</th>
                              <th className="px-6 py-3">Cantidad</th>
                              <th className="px-6 py-3"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems.filter((item) => item.quantity > 0).map((item: CartItem) => (
                              <tr key={item.food.id} className='hover:bg-gray-50 hover:shadow-md even:bg-green-100 odd:bg-white'>
                                <td className="px-6 py-3">{item.food.name}</td>
                                <td className="px-6 py-3">{item.quantity}</td>
                                <td className="px-6 py-3 text-right">
                                  <button
                                    className="text-red-500"
                                    onClick={() => setCartItems(cartItems.map((cartItem) => {
                                      if (cartItem.food.id === item.food.id) {
                                        return { ...cartItem, quantity: cartItem.quantity - 1 };
                                      } else {
                                        return cartItem;
                                      }
                                    }))}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                    </svg>
                                  </button>
                                  <button
                                    className="text-green-500"
                                    onClick={() => setCartItems(cartItems.map((cartItem) => {
                                      if (cartItem.food.id === item.food.id) {
                                        return { ...cartItem, quantity: cartItem.quantity + 1 };
                                      } else {
                                        return cartItem;
                                      }
                                    }))}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className='mt-6 text-right'>
                          <p className='text-red-500'>
                            {cartItems.length === 0 && 'No hay platos en el carrito'}
                          </p>

                          <p className='font-semibold text-green-500'>
                            {cartItems.length > 0 && 'Total: ' + cartItems.reduce((acc, item) => acc + item.food.price * item.quantity, 0) + ' €'}
                          </p>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>

          <div>
            <button className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
              onClick={openModal}>
              Finalizar pedido
            </button>
            <Transition appear show={isOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >

                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Finalizar pedido
                        </Dialog.Title>

                        <div className='my-3'>
                          <select id="table"
                            className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                            value={table} onChange={(e) => setTable(e.target.value)}>
                            <option value="">Seleccionar la mesa:</option>
                            {
                              Array.from({ length: 20 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>Mesa {i + 1}</option>
                              ))
                            }
                          </select>
                        </div>

                        <div className='my-3'>
                          <p className='text-red-500'>
                            {cartItems.length === 0 && 'No hay platos en el carrito'}
                          </p>
                          <p className='text-red-500'>
                            {!table && 'Por favor, selecciona una mesa para finalizar el pedido'}
                          </p>
                        </div>

                        <div className='flex justify-between items-center mt-6'>
                          <div>
                            <p className='font-semibold text-green-500'>
                              {cartItems.length > 0 && 'Total: ' + cartItems.reduce((acc, item) => acc + item.food.price * item.quantity, 0) + ' €'}
                            </p>
                          </div>
                          <div>
                            <button
                              className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                              onClick={finalizeOrder}
                              disabled={cartItems.length === 0 || !table}>
                              Finalizar pedido
                            </button>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;

