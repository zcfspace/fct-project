import Image from "next/image";

export default function Gallery() {
  return (
    <section className="mx-auto max-w-screen-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:p-14 p-4">
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato1.jpg"
              alt="Image"
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato4.jpg"
              alt="Image"
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato8.jpg"
              alt="Image"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato2.jpg"
              alt="Image"
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato7.jpg"
              alt="Image"
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato10.jpg"
              alt="Image"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato9.jpg"
              alt="Image"
            />
          </div>

          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato11.jpg"
              alt="Image"
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato5.jpg"
              alt="Image"
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato14.jpg"
              alt="Image"
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato12.jpg"
              alt="Image"
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="./Image/plato15.jpg"
              alt="Image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
