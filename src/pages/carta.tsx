import Layout from "@/components/Frontend/layout";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
  const [selectedId, setSelectedId] = useState(null)

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

  const categoryVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const foodVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl">
        <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4 m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-64">
          {categories.map((category: Category, index: number) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`py-3 rounded-lg ${category.id === categoryId
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-500 hover:text-gray-900 transition text-base"
                }`}
              variants={categoryVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>
        <motion.div className="m-10 sm:m-12 md:m-16 md:my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food: Food, index: number) => (
            <motion.div
              key={food.id}
              variants={foodVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: index * 0.1 }}>
              <div className="flex flex-col justify-center items-center bg-white p-2 shadow rounded-lg m-4">
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Layout>
  );
}

export default Carta;
