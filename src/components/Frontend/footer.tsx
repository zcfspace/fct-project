import Link from "next/link";

export default function Footer() {
  return (
    <footer aria-label="Site Footer" className="bg-gray-100">
      <div className="mx-auto max-w-screen-xl sm:p-14 p-4">
        <div className="flex justify-center lg:justify-end">
          <Link
            className="inline-block rounded-full bg-green-500 p-2 text-white shadow transition hover:bg-green-600 sm:p-3 lg:p-4"
            href="#header">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-green-600 lg:justify-start">
              <Link href="/">
                <strong className="block font-extrabold text-2xl text-green-500">
                  Bamboo Express
                </strong>
              </Link>
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
              Nuestras recetas únicas y de alta calidad te transportarán a un viaje culinario por China.
            </p>
          </div>

          <nav aria-label="Footer Nav" className="mt-12 lg:mt-0">
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12">
              <li>
                <Link
                  className="text-gray-700 transition hover:text-green-500"
                  href="/"
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-700 transition hover:text-green-500"
                  href="/carta"
                >
                  Carta
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-700 transition hover:text-green-500"
                  href="/reserva"
                >
                  Reserva
                </Link>
              </li>

              <li>
                <Link
                  className="text-gray-700 transition hover:text-green-500"
                  href="/contacto"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy; 2023. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
