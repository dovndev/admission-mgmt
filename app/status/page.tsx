"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import NavbarAdmin from "../components/NavbarAdmin";
import { BRANCHES as branches } from "../constants/dropdownOptions";
import { SEAT_ALLOCATION as initialAllocations } from "../constants/dropdownOptions";
import YearPopup from "../components/YearPopup";
import {
  ModalHeader,
  ModalBody,
  Modal,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

type Branch = keyof typeof initialAllocations;

interface BranchAllocationProps {
  title: Branch;
  allocations: typeof initialAllocations;
  handleChange: (branch: Branch, type: string, value: number) => void;
  handleSave: (branch: Branch) => void;
}

function BranchAllocation({
  title,
  allocations,
  handleChange,
  handleSave,
}: BranchAllocationProps) {
  return (
    <Card className="shadow-md hover:shadow-sm hover:shadow-muthootRed bg-textBoxBackground">
      <CardHeader className="p-4">
        <h1 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {branches[title]}
        </h1>
        <Button
          size="sm"
          variant="solid"
          className="ml-auto bg-[#be185d] text-white hover:bg-[#9d174d] bg-muthootRed"
          onClick={() => handleSave(title)}
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
              value={allocations[title].NRI.toString()}
              onChange={(e) =>
                handleChange(title, "NRI", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Supernumerary"
              labelPlacement="outside"
              type="number"
              className="h-8"
              value={allocations[title].Supernumerary.toString()}
              onChange={(e) =>
                handleChange(title, "Supernumerary", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              label="MGMT"
              labelPlacement="outside"
              type="number"
              className="h-8"
              value={allocations[title].MGMT.toString()}
              onChange={(e) =>
                handleChange(title, "MGMT", Number(e.target.value))
              }
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default function SeatAllocation() {
  const [allocations, setAllocations] = useState(initialAllocations);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [year, setYear] = useState<number | undefined>(undefined);

  const handleChange = (branch: Branch, type: string, value: number) => {
    setAllocations((prevAllocations) => ({
      ...prevAllocations,
      [branch]: {
        ...prevAllocations[branch],
        [type]: value,
      },
    }));
  };

  const handleSave = (branch: Branch) => {
    console.log(`Saving allocations for ${branch}:`, allocations[branch]);
    const newAllocations = allocations;
    newAllocations[branch] = allocations[branch];
    console.log(newAllocations);
    setAllocations(newAllocations);
  };

  const handleSubmit = () => {
    if (year) {
      console.log(`Year added: ${year}`);
      setYear(undefined);
      onClose();
    } else {
      console.error("Year is required");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <NavbarAdmin />
      <div className="mx-auto max-w-7xl my-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Seat Allocation</h1>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.keys(branches).map((branch) => (
            <BranchAllocation
              key={branch}
              title={branch as Branch}
              allocations={allocations}
              handleChange={handleChange}
              handleSave={handleSave}
            />
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
      <Button className="fixed bottom-4 right-4" onPress={onOpen}>
        Add Year
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <ModalContent>
              <ModalHeader>
                <h2>Add Year</h2>
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Year"
                  value={year?.toString() || ""}
                  onChange={(e) => setYear(Number(e.target.value))}
                  type="number"
                  required
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleSubmit}>Add Year</Button>
                <Button
                  className="ml-auto bg-[#be185d] text-white hover:bg-[#9d174d] bg-muthootRed"
                  variant="bordered"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
