import Layout from "../components/Frontend/layout";
import { getAllFoods } from "../libs/food";
import Image from "next/image";
interface Food {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function Carta({ foods }: { foods: Food[] }) {
  return (
    <Layout>
      <div
        className="
          m-10
          sm:m-12
          md:m-16
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >
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
                width= {200}
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
