
import Navbar from "./components/navbar";

export default function Home() 
{
  return (
    <div className="min-h-screen flex flex-col items-center relative">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full opacity-20 object-cover">
        <source src="/landing.mov" type="video/mp4" />
      </video>
      <Navbar />
      <div className="relative z-10 flex flex-1 w-full max-w-[90%] mt-0 mx-4 items-center flex-col sm:flex-row">
        <div className="flex-1 p-4 lg:p-20 w-[100%] ">
          <h1 className="text-white font-['Anta'] text-[2rem] md:text-[3rem] max-w-1">
            <span className="text-muthootRed">Muthoot</span> Institute of Technology and Science
          </h1>
        </div>
        <div className="flex-1 p-2 lg:p-20">
          <div className="bg-white bg-opacity-[7%] shadow rounded-3xl p-6 max-w-[90%]">
            <h1 className="text-white hidden md:block">
              Welcome to Muthoot Institute of Technology and Science MITS, where excellence meets opportunity and innovation drives the future. Located in the vibrant hub of Kochi, MITS provides students with a transformative educational experience, featuring world-class infrastructure, distinguished faculty, and a steadfast commitment to academic and personal growth. <span className="text-muthootRed">Register</span> now for NRI admissions and secure your future with a quality education in a
              globally connected environment.
            </h1>
            <h1 className="text-white block md:hidden">
              Welcome to Muthoot Institute of Technology and Science MITS, MITS provides students with a transformative educational experience, featuring world-class infrastructure, distinguished faculty, and a steadfast commitment to academic and personal growth. <span className="text-muthootRed">Register</span> now for NRI admissions and secure your future with a quality education in a globally connected environment.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
