import Image from "next/image";

export default function Gallery() {
  return (
    <section className="mx-auto max-w-screen-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:p-14 p-4">
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato1.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato4.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato8.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato2.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato7.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato10.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato9.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>

          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato11.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato5.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato14.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato12.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>
          <div>
            <Image
              className="h-auto max-w-full rounded-lg"
              src="/img/plato15.jpg"
              alt="img"
              height={300}
              width={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
