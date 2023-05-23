import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';
import CreateFood from '@/components/Backend/createFood';
import { Toaster, toast } from 'sonner'
import axios from 'axios';
import { useState, useEffect } from 'react';
import EditFood from '@/components/Backend/editFood';
interface Food {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
}

function FoodPage() {

  const [foods, setFoods] = useState<Food[]>([]);

  const getFoods = async () => {
    try {
      const response = await axios.get(`/api/food/get`);
      const data = await response.data;
      setFoods(data);
    } catch (error) {
      toast.error('Error al cargar los platos');
    }
  };

  useEffect(() => {

    getFoods();
  }, []);

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/food/delete?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFoods(foods.filter((food) => food.id !== id));
        toast.success('Plato eliminado correctamente');
      }
    } catch (error) {
      toast.error('Error al eliminar el plato');
    }
  };

  const addFood = (newFood: Food) => {
    setFoods((prevFoods) => [...prevFoods, newFood]);
  };

  return (
    <Layout>
      <div className='p-4'>
        <Toaster richColors closeButton position="top-right" />
        <CreateFood onAddFood={addFood} />
        <div className="w-full relative lg:h-[77vh] overflow-y-scroll rounded-lg shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-green-100">
              <tr>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Precio</th>
                <th className="px-6 py-3">Categoría</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food.id} className='hover:bg-gray-50 hover:shadow-md even:bg-green-100 odd:bg-white'>
                  <td className="px-6 py-3">{food.name}</td>
                  <td className="px-6 py-3">{food.price}</td>
                  <td className="px-6 py-3">{food.categoryId}</td>
                  <td className="px-6 py-3 text-right">
                    <EditFood
                      id={food.id}
                      name={food.name}
                      price={food.price}
                      image={food.image}
                      categoryId={food.categoryId}
                      onUpdate={getFoods}
                    />
                    <button
                      onClick={() => deleteCategory(food.id)}
                      className="text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default withAdminAuth(FoodPage);