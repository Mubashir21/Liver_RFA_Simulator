import Navbar from "./Navbar";

function Hero() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col justify-end">
        <div className=" px-6 lg:px-8 pb-10">
          <div className="mx-8 max-w-2xl">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Liver Cancer Just Got A Lot More Curable
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-800">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Excepturi alias cumque explicabo labore cum blanditiis eius
                quidem, vitae laudantium. Harum soluta asperiores minus delectus
                quo recusandae? Necessitatibus quae numquam temporibus!
              </p>
              <div className="mt-10 gap-x-6">
                <button className="border border-solid border-black bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded">
                  Learn more about RFA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
