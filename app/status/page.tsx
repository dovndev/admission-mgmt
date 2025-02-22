
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import NavbarAdmin from "../components/NavbarAdmin";
import { BRANCHES as branches } from "../constants/dropdownOptions";
interface BranchAllocationProps {
  title: string;
}


function BranchAllocation({ title }: BranchAllocationProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="p-4">
        <h1 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </h1>{" "}
        <Button
          size="sm"
          variant="solid"
          className=" ml-auto bg-[#be185d] text-white hover:bg-[#9d174d]"
        >
          Save
        </Button>
      </CardHeader>
      <CardBody className="p-4 pt-0">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Input
              label="NRI"
              labelPlacement="outside"
              type="number"
              className="h-8"
              defaultValue="9"
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Supernumerary"
              labelPlacement="outside"
              type="number"
              className="h-8"
              defaultValue="9"
            />
          </div>
          <div className="space-y-2">
            <Input
              label="MGMT"
              labelPlacement="outside"
              type="number"
              className="h-8"
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default function SeatAllocation() {


  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
        <NavbarAdmin></NavbarAdmin>
      <div className="mx-auto max-w-7xl my-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold ">Seat Allocation</h1>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {branches.map((branch) => (
            <BranchAllocation key={branch} title={branch} />
          ))}
        </div>
        <div className="mt-8 w-[25%]">
          <Card>
            <CardHeader>Form Activation</CardHeader>
            <CardBody>
              <Button variant="bordered">Activate NRI</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
