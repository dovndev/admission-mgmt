import Contact from "./components/Contact";
import NavbarMain from "./components/NavbarMain";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center relative bg-black">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full opacity-40 object-cover"
        >
          <source src="/landing.mov" type="video/mp4" />
        </video>
        <NavbarMain mode="dark" />
        <div className="relative z-10 flex flex-1 w-full md:max-w-[90%] mt-0 mx-4 items-center justify-center flex-col md:flex-row ">
          <div className="flex-1 p-4 lg:p-20 w-[50%] ">
            <h1 className="text-white font-sans text-[2rem] md:text-[3rem] text-center md:text-justify md:max-w-1">
              <span className="text-muthootRed">Muthoot</span> Institute of
              Technology and Science
            </h1>
          </div>
          <div className="flex-1 p-2 lg:p-20">
            <div className="bg-white bg-opacity-[7%] shadow rounded-3xl p-6 md:max-w-[90%]">
              <h1 className="text-white hidden sm:block">
                Welcome to Muthoot Institute of Technology and Science MITS,
                where excellence meets opportunity and innovation drives the
                future. Located in the vibrant hub of Kochi, MITS provides
                students with a transformative educational experience, featuring
                world-class infrastructure, distinguished faculty, and a
                steadfast commitment to academic and personal growth.{" "}
                <span className="text-muthootRed">Register</span> now for NRI
                admissions and secure your future with a quality education in a
                globally connected environment.
              </h1>
              <h1 className="text-white block sm:hidden">
                Welcome to Muthoot Institute of Technology and Science MITS,
                MITS provides students with a transformative educational
                experience, featuring world-class infrastructure, distinguished
                faculty, and a steadfast commitment to academic and personal
                growth. <span className="text-muthootRed">Register</span> now
                for NRI admissions and secure your future with a quality
                education in a globally connected environment.
              </h1>
            </div>
          </div>
          <Contact className="!text-white" />
        </div>
      </div>
    </>
  );
}
