import FloatingLabelInput from "../components/FloatingLabelInput";
import Navbar from "../components/navbar";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center w-full p-3">
        <div className="bg-textBoxBackground relative shadow rounded-3xl p-8 max-w-2xl w-full mt-10 ">
          <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">Login</h2>
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <FloatingLabelInput id={"email"} label={"Registration number"} required={true} autoComplete="username" />
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <FloatingLabelInput id={"password"} type="password" label={"Password"} required={true}  autoComplete="current-password"/>
            </div>            
            <button type="submit" className="w-full bg-muthootRed text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-4 text-white">
        <Link href="/admin" className="border-white  rounded-sm  p-1 hover:border">Admin Login</Link>
      </div>    </div>
  );
}
