import Layout from "../components/Frontend/layout";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Food {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

function Carta() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");

  const handleCategoryClick = (id: string) => {
    setCategoryId(id);
  };

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await fetch(`/api/food/get?categoryId=${categoryId}`);
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.log(error);
      }
    };
    getFoods();
  }, [categoryId]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(`/api/category/get`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-64">
          {categories.map((category: Category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`py-3 rounded-lg ${category.id === categoryId
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-500 hover:text-gray-900 transition text-base"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="m-10 sm:m-12 md:m-16 md:my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food: Food) => (
            <div key={food.id}>
              <div
                className="
              flex
              flex-col
              justify-center
              items-center
              bg-white
              p-2
              shadow
              rounded-lg
              m-4
            "
              >
                <Image
                  className="rounded-full"
                  src={food.image}
                  alt={food.name}
                  width={200}
                  height={200}
                />
              </div>
              <div className="flex justify-between shadow m-4 p-4">
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  {food.name}
                </h2>
                <p className="mt-1">{food.price} €</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Carta;
