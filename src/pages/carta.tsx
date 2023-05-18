import Layout from "../components/Frontend/layout";
import { getAllFoods } from "./api/food";
import Image from "next/image";
import { useState } from "react";
interface Food {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function Carta({ foods }: { foods: Food[] }) {

  const [category, setCategory] = useState("");

  const handleCategoryClick = (category: string) => {
    setCategory(category);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 m-10 sm:mx-16 md:mx-24 lg:mx-32 xl:mx-64">
          <button
            className={`${category === "Entrantes" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500 hover:text-gray-900 transition text-base"
              }  py-3 rounded-lg `}
            onClick={() => handleCategoryClick("Entrantes")}
          >
            Entrantes
          </button>
          <button
            className={`${category === "Platos principales" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500 hover:text-gray-900 transition  text-base "
              }  py-3 rounded-lg`}
            onClick={() => handleCategoryClick("Platos principales")}
          >
            Platos principales
          </button>
          <button
            className={`${category === "Dim sum" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500 hover:text-gray-900 transition  text-base "
              }  py-3 rounded-lg`}
            onClick={() => handleCategoryClick("Dim sum")}
          >
            Dim sum
          </button>
          <button
            className={`${category === "Postres" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500 hover:text-gray-900 transition  text-base "
              }  py-3 rounded-lg`}
            onClick={() => handleCategoryClick("Postres")}
          >
            Postres
          </button>
        </div>

        <div
          className="m-10 sm:m-12 md:m-16 md:my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food: any) => (
            <div
              key={food.id}
            >
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

export async function getStaticProps() {
  const foods = await getAllFoods();
  return {
    props: {
      foods,
    },
  };
}

