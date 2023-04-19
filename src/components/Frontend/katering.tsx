export default function Katering() {
  return (
    <section className="overflow-hidden sm:grid sm:grid-cols-2 sm:items-center mb-16">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-xl text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Servicio Catering
          </h2>

          <p className="text-gray-500 md:mt-4 md:block">
            Planeando una fiesta o reunión? Deja que nuestro servicio de
            catering de comida china se encargue de todo. ¡Reserva ahora y
            disfruta de una experiencia culinaria única!
          </p>

          <div className="mt-4 md:mt-8">
            <a
              href="#"
              className="inline-block rounded bg-green-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Reservar
            </a>
          </div>
        </div>
      </div>

      <img
        alt="katering_img"
        src="./img/katering.jpg"
        className="h-full w-full object-cover sm:h-[calc(100%_-_2rem)] sm:self-end sm:rounded-tl-[30px] md:h-[calc(100%_-_4rem)] md:rounded-tl-[60px]"
      />
    </section>
  );
}
