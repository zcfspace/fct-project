import withAdminAuth from '@/components/Backend/withAdminAuth';
import Layout from '@/components/Backend/layout';
import CreateCategory from '@/components/Backend/createCategory';
import { Toaster, toast } from 'sonner'
import axios from 'axios';
import { useState, useEffect } from 'react';
import EditCategory from '@/components/Backend/editCategory';
interface Category {
  id: string;
  name: string;
  slug: string;
}

function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(`/api/category/get`);
      const data = await response.data;
      setCategories(data);
    } catch (error) {
      toast.error('Error al cargar las categorias');
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`/api/category/delete?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCategories(categories.filter((category) => category.id !== id));
        toast.success('Categoría eliminada correctamente');
      }
    }
    catch (error) {
      toast.error(`Error al eliminar la categoría`);
    }
  };

  const addCategory = (newCategory: Category) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  return (
    <Layout>
      <Toaster richColors closeButton position="top-right" />
      <CreateCategory onAddCategory={addCategory} />
      
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-green-100">
            <tr>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Slug</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className='hover:bg-gray-50 hover:shadow-md even:bg-green-100 odd:bg-white'>
                <td className="px-6 py-3">{category.name}</td>
                <td className="px-6 py-3">{category.slug}</td>
                <td className="px-6 py-3">
                  <EditCategory
                    id={category.id}
                    name={category.name}
                    slug={category.slug}
                    onUpdate={getCategories}
                  />
                  <button
                    className="text-red-500"
                    onClick={() => deleteCategory(category.id)}>
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

export default withAdminAuth(CategoryPage);