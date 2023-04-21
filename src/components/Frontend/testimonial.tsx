import Star from "./star";

export default function Testimonial() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl sm:p-14 p-4">
        <h2 className="text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Experiencias de nuestros clientes
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          <blockquote className="rounded-lg bg-gray-100 p-8">
            <div className="flex items-center gap-4">
              <img
                alt="testimonialUser"
                src="./img/user.png"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <Star />
                <p className="mt-1 text-lg font-medium text-gray-700">Mr Cat</p>
              </div>
            </div>

            <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna.
            </p>
          </blockquote>

          <blockquote className="rounded-lg bg-gray-100 p-8">
            <div className="flex items-center gap-4">
              <img
                alt="testimonialUser"
                src="./img/user.png"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <Star />
                <p className="mt-1 text-lg font-medium text-gray-700">Mr Cat</p>
              </div>
            </div>

            <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna.
            </p>
          </blockquote>

          <blockquote className="rounded-lg bg-gray-100 p-8">
            <div className="flex items-center gap-4">
              <img
                alt="testimonialUser"
                src="./img/user.png"
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <Star />
                <p className="mt-1 text-lg font-medium text-gray-700">Mr Cat</p>
              </div>
            </div>

            <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna.
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
