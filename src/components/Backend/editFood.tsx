import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { toast } from 'sonner';
import axios from 'axios';
import { useEffect } from 'react';

interface EditFoodProps {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
  onUpdate: () => void;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const EditFood: React.FC<EditFoodProps> = ({ id, name, price, categoryId, image, onUpdate }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updateprice, setUpdateprice] = useState(price);
  const [updatedCategoryId, setUpdatedCategoryId] = useState(categoryId);
  const [updatedImage, setUpdatedImage] = useState(image);
  const [categories, setCategories] = useState<Category[]>([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { name: updatedName, price: updateprice, categoryId: updatedCategoryId, image: updatedImage };
      await fetch(`/api/food/put?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      toast.success('Plato actualizada correctamente');
      onUpdate();
      closeModal();
    } catch (error) {
      toast.error('Error al actualizar la plato');
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`/api/category/get`);
        const data = await response.data;
        setCategories(data);
      } catch (error) {
        toast.error('Error al cargar las categorias');
      }
    };
    getCategories();
  }, [])


  return (
    <>
      <button className="text-green-500 mr-5" onClick={openModal}>
        Editar
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
                    Editar plato
                  </Dialog.Title>
                  <form onSubmit={handleSubmit} className="mt-4">
                    <label className="block mb-3">
                      Nombre:
                      <input
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                      />
                    </label>
                    <label className="block mb-3">
                      Precio:
                      <input
                        type="number"
                        value={updateprice}
                        onChange={(e) => setUpdateprice(Number(e.target.value))}

                        className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                      />
                    </label>
                    <label className="block mb-3">
                      Imagen:
                      <input
                        type="text"
                        value={updatedImage}
                        onChange={(e) => setUpdatedImage(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                      />
                    </label>

                    <label className="block mb-3">
                      Categoría:
                      <select
                        value={updatedCategoryId}
                        onChange={(e) => setUpdatedCategoryId(e.target.value)}
                        className="mt-1 block w-full rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-green-300"
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <div className="mt-4">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-5 py-2.5 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 mr-2"
                      >
                        Guardar
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-5 py-2.5 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default EditFood;
