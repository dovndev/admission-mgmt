"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import NavbarAdmin from "../../components/NavbarAdmin";
import {
  ModalHeader,
  ModalBody,
  Modal,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { addYear, getAllBreanchesByYear } from "../../actions/branch-Actions";
import useAdminStore from "@/app/store/adminStore";
import { updateBranchAllocation } from "@/app/actions/seat-Management-Actions";

// Use string union type to match both your API and component needs
type BranchCode = "CSE" | "ECE" | "ME" | "CE" | "AIDS" | "EEE" | "CSAI" | "CY";

// Define a type for seat allocation data structure
type SeatAllocation = {
  mngtSeats: number;
  nriSeats: number;
  superSeats: number;
  waitingList: number;
};

// Define the props interface with specific types
interface BranchAllocationProps {
  title: BranchCode;
  allocations: Record<BranchCode, SeatAllocation>;
  handleChange: (
    branch: BranchCode,
    type: keyof SeatAllocation,
    value: number
  ) => void;
  handleSave: (branch: BranchCode) => void;
  isSaving: boolean;
  savedBranches: BranchCode[];
}

const branchNameMap: Record<BranchCode, string> = {
  CSE: "Computer Science and Engineering",
  ECE: "Electronics and Communication Engineering",
  ME: "Mechanical Engineering",
  CE: "Civil Engineering",
  EEE: "Electrical and Electronics Engineering",
  CSAI: "Computer Science and Engineering (AI)",
  AIDS: "Artificial Intelligence and Data Science",
  CY: "Computer Science and Cyber Security",
};

function BranchAllocation({
  title,
  allocations,
  handleChange,
  handleSave,
  isSaving,
  savedBranches,
}: BranchAllocationProps) {
  const isRecentlySaved = savedBranches.includes(title);

  return (
    <Card
      className={`shadow-md hover:shadow-sm ${
        isRecentlySaved ? "border-green-500 border-2" : ""
      } bg-textBoxBackground`}
    >
      <CardHeader className="p-4">
        <h1 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {branchNameMap[title]}
        </h1>
        <Button
          size="sm"
          variant="solid"
          className={`ml-auto ${
            isRecentlySaved ? "bg-green-600" : "bg-muthootRed"
          } text-white hover:opacity-90`}
          onClick={() => handleSave(title)}
          isDisabled={isSaving}
        >
          {isSaving ? "Saving..." : isRecentlySaved ? "Saved ✓" : "Save"}
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
              value={allocations[title]?.nriSeats?.toString() || "0"}
              onChange={(e) =>
                handleChange(title, "nriSeats", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              label="Supernumerary"
              labelPlacement="outside"
              type="number"
              className="h-8"
              value={allocations[title]?.superSeats?.toString() || "0"}
              onChange={(e) =>
                handleChange(title, "superSeats", Number(e.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Input
              label="MGMT"
              labelPlacement="outside"
              type="number"
              className="h-8"
              value={allocations[title]?.mngtSeats?.toString() || "0"}
              onChange={(e) =>
                handleChange(title, "mngtSeats", Number(e.target.value))
              }
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default function SeatAllocation() {
  // Initialize with all branch codes
  const initialAllocationsState: Record<BranchCode, SeatAllocation> = {
    CSE: { mngtSeats: 0, nriSeats: 0, superSeats: 0, waitingList: 0 },
    ECE: { mngtSeats: 0, nriSeats: 0, superSeats: 0, waitingList: 0 },
    ME: { mngtSeats: 0, nriSeats: 0, superSeats: 0, waitingList: 0 },
    CE: { mngtSeats: 0, nriSeats: 0, superSeats: 0, waitingList: 0 },
    AIDS: { mngtSeats: 0, nriSeats: 0, superSeats: 0, waitingList: 0 },
    EEE: { mngtSeats: 0, nriSeats: 0, superSeats: 0, waitingList: 0 },
    CSAI: { mngtSeats: 0, nriSeats: 0, superSeats: 0, waitingList: 0 },
    CY: { mngtSeats: 0, nriSeats: 0, superSeats: 0, waitingList: 0 },
  };

  const [allocations, setAllocations] = useState<
    Record<BranchCode, SeatAllocation>
  >(initialAllocationsState);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { years, selectedYear, setYears } = useAdminStore();
  const [year, setYear] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [savedBranches, setSavedBranches] = useState<BranchCode[]>([]);

  // Handle input change for each field
  const handleChange = (
    branch: BranchCode,
    type: keyof SeatAllocation,
    value: number
  ) => {
    setAllocations((prev) => ({
      ...prev,
      [branch]: {
        ...prev[branch],
        [type]: value,
      },
    }));

    // Remove from saved branches when changed
    if (savedBranches.includes(branch)) {
      setSavedBranches((prev) => prev.filter((b) => b !== branch));
    }
  };

  // Save a single branch allocation
  const handleSave = async (branch: BranchCode) => {
    if (!selectedYear) {
      console.error("No year selected for saving allocations");
      return;
    }

    try {
      setIsSaving(true);
      console.log(`Saving allocations for ${branch}:`, allocations[branch]);

      // Call the API to save branch data
      const result = await updateBranchAllocation({
        year: selectedYear,
        branchName: branch,
        nriSeats: allocations[branch].nriSeats,
        superSeats: allocations[branch].superSeats,
        mngtSeats: allocations[branch].mngtSeats,
        waitingList: allocations[branch].waitingList,
      });

      if (result.success) {
        // Add to saved branches list for visual feedback
        setSavedBranches((prev) => [
          ...prev.filter((b) => b !== branch),
          branch,
        ]);
        console.log(
          `Branch ${branch} allocation saved successfully for year ${selectedYear}`
        );
      } else {
        console.error(`Failed to save ${branch}: ${result.message}`);
      }
    } catch (error) {
      console.error("Error saving branch allocation:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Save all branches at once
  const handleSaveAll = async () => {
    if (!selectedYear) {
      console.error("Please select a year first");
      return;
    }

    setIsSaving(true);
    try {
      const branchCodes = Object.keys(allocations) as BranchCode[];
      let successCount = 0;

      for (const branch of branchCodes) {
        try {
          const result = await updateBranchAllocation({
            year: selectedYear,
            branchName: branch,
            nriSeats: allocations[branch].nriSeats,
            superSeats: allocations[branch].superSeats,
            mngtSeats: allocations[branch].mngtSeats,
            waitingList: allocations[branch].waitingList,
          });

          if (result.success) {
            successCount++;
          }
        } catch (err) {
          console.error(`Error saving ${branch}:`, err);
        }
      }

      if (successCount === branchCodes.length) {
        console.log("All branch allocations saved successfully");
        setSavedBranches(branchCodes);
      } else {
        console.log(`Saved ${successCount} of ${branchCodes.length} branches`);
      }
    } catch (error) {
      console.error("Error in save all operation:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Add a new year
  const handleSubmit = async () => {
    if (!year) {
      setErrorMsg("Year is required");
      return;
    }

    try {
      setLoading(true);
      const result = await addYear(year);

      if (result.success) {
        console.log("Year added successfully:");
        setYear(undefined);

        // Update years list in the store
        const updatedYears = years
          ? [...years, year].sort((a, b) => b - a)
          : [year];
        setYears(updatedYears);

        onClose();
      } else {
        console.error("Failed to add year:", result.message);
      }
    } catch (err) {
      console.error("Error adding year:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load branch allocations when selected year changes
  useEffect(() => {
    async function loadBranchData() {
      if (!selectedYear) return;

      try {
        setLoading(true);
        setSavedBranches([]);

        const branches = await getAllBreanchesByYear();
        console.log(
          "Branches data for year",
          selectedYear,
          ":",
          branches?.[selectedYear]
        );

        if (branches && branches[selectedYear]) {
          // Map from API format to component format
          const branchData = branches[selectedYear];

          // Create new allocations object with data from API
          const newAllocations = { ...initialAllocationsState };

          // For each branch in our predefined list, pull data from API if available
          Object.keys(newAllocations).forEach((branchKey) => {
            const branch = branchKey as BranchCode;
            if (branchData[branch]) {
              newAllocations[branch] = {
                mngtSeats: branchData[branch].mngtSeats || 0,
                nriSeats: branchData[branch].nriSeats || 0,
                superSeats: branchData[branch].superSeats || 0,
                waitingList: branchData[branch].waitingList || 0,
              };
            }
          });

          setAllocations(newAllocations);
        } else {
          // Reset to initial state if no data for this year
          setAllocations(initialAllocationsState);
        }
      } catch (err) {
        console.error("Error loading branch data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadBranchData();
  }, [selectedYear]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAdmin />
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-2xl font-bold">Seat Allocation</h1>
            {selectedYear && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                Year: {selectedYear}
              </span>
            )}
          </div>

          <Button
            className="bg-muthootRed text-white"
            onClick={handleSaveAll}
            isDisabled={isSaving || !selectedYear}
          >
            Save All Allocations
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-10 w-10 border-4 border-muthootRed border-t-transparent rounded-full"></div>
          </div>
        ) : errorMsg ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
            {errorMsg}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {Object.keys(allocations).map((branch) => (
              <BranchAllocation
                key={branch}
                title={branch as BranchCode}
                allocations={allocations}
                handleChange={handleChange}
                handleSave={handleSave}
                isSaving={isSaving}
                savedBranches={savedBranches}
              />
            ))}
          </div>
        )}

        <div className="mt-8 w-full md:w-[25%]">
          <Card>
            <CardHeader>Form Activation</CardHeader>
            <CardBody>
              <Button
                variant="bordered"
                className="w-full"
                isDisabled={!selectedYear}
              >
                Activate NRI
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      <Button
        className="fixed bottom-4 right-4 bg-muthootRed text-white"
        onPress={onOpen}
        isDisabled={loading || isSaving}
      >
        Add Year
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
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
              min={2020}
              max={2050}
              required
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-muthootRed text-white"
              onClick={handleSubmit}
              isDisabled={!year || loading}
            >
              {loading ? "Adding..." : "Add Year"}
            </Button>
            <Button variant="bordered" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
