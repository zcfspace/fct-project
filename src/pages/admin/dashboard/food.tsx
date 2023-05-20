import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';
import CreateFood from '@/components/Backend/createFood';
import { Toaster, toast } from 'sonner'
import axios from 'axios';
import { useState, useEffect } from 'react';
interface Food {
  id: string;
  name: string;
  price: number;
  categoryId: string;
}

function FoodPage() {

  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.get(`/api/food/get`);
        const data = await response.data;
        setFoods(data);
      } catch (error) {
        toast.error('Error al cargar los platos');
      }
    };
    getFoods();
  }, []);


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
                  <button
                    // onClick={() => editFood(food.id)}
                    className="text-green-500 mr-5">
                    Editar
                  </button>
                  <button
                    // onClick={() => deleteFood(food.id)}
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