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
    }
    catch (error) {
      toast.error(`Error al eliminar el plato`);
    }
  };

  return (
    <Layout>
      <Toaster richColors closeButton position="top-right" />
      <CreateFood />
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-green-100">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Precio</th>
              <th className="px-6 py-3">Categoría</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>

            {foods.map((food) => (
              <tr key={food.id} className='hover:bg-gray-50 hover:shadow-md even:bg-green-100 odd:bg-white'>
                <td className="px-6 py-3">{food.name}</td>
                <td className="px-6 py-3">{food.price}</td>
                <td className="px-6 py-3">{food.categoryId}</td>
                <td className="px-6 py-3">
                  <EditFood
                    id={food.id}
                    name={food.name}
                    price={food.price}
                    image= {food.image}
                    categoryId={food.categoryId}
                    onUpdate = {getFoods}
                  />
                  
                  <button
                    onClick={() => deleteCategory(food.id)}
                    className="text-red-500">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default withAdminAuth(FoodPage);