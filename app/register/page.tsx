import FloatingLabelInput from "../components/FloatingLabelInput";
import Navbar from "../components/navbar";
import DropDownInput from "../components/DropDownInput";
import DateInput from "../components/DateInput";

export default function Register() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-col items-center w-full p-3">
        <div className="bg-textBoxBackground relative shadow rounded-3xl p-8 max-w-2xl w-full mt-10 ">
          <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">Registration</h2>
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <FloatingLabelInput id={"firstName"} label={"First Name"} autoComplete="password" required={true} />
              <FloatingLabelInput id={"middleName"} label={"Middle Name"} autoComplete="password" />
              <FloatingLabelInput id={"lastName"} label={"Last Name"} required={true} autoComplete="password" />
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <FloatingLabelInput id={"email"} label={"Email"} required={true} autoComplete="email" />
              <FloatingLabelInput id={"mobileNumber"} label={"Mobile Number"} required={true} />
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <DropDownInput id={"gender"} label={"Gender"} required={true} options={["Male", "Female", "Other"]} />
              <DateInput id={"dob"} label={"Date of Birth"} required={true} />
              <DropDownInput id={"applyingYear"} label={"Applying Year"} required={true} options={["2025", "2026"]} />
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <DropDownInput id={"quota"} label={"Quota"} required={true} options={["NRI", "OCI/PIO/CIWG"]} />
              <DropDownInput id={"program"} label={"Program"} required={true} options={["BTech", "Mtech", "MCA"]} />
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <FloatingLabelInput id={"aadharNo"} label={"Aadhar No."} autoComplete="password" />
            </div>
            <button type="submit" className="w-full bg-muthootRed text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
