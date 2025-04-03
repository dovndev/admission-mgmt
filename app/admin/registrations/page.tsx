"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Select,
  SelectItem,
  Pagination,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Spinner,
  Chip,
} from "@heroui/react";

import { Download, Search } from "lucide-react";
import NavbarAdmin from "../../components/NavbarAdmin";
import { useState, useMemo, useEffect } from "react";
import StudentDetails from "../../components/StudentDetails";
import { usePrintPDF } from "../../hooks/usePrintPDF";
import { getStructuredUsersByYear } from "../../actions/user-Actions";
import useAdminStore from "@/app/store/adminStore";
import { StructuredUserData } from "@/types/userTypes";

// Define interfaces for our data structures

// In the StudentDetails component definition
// type StudentDetailsProps = {
//   student: StructuredUserData | null | undefined;
// };

export default function RegistrationDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<StructuredUserData[]>([]);
  const [, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] =
    useState<StructuredUserData | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { generatePDF, isGenerating } = usePrintPDF();

  // Fetch available academic years on component mount
  const { selectedYear } = useAdminStore();

  // Fetch users when year or page changes
  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);

      try {
        const response = await getStructuredUsersByYear(
          selectedYear.toString(),
          currentPage,
          8
        );

        if (response.success) {
          setUsers(response.users);
          setTotalUsers(response.totalUsers);
          setTotalPages(response.totalPages);
        } else {
          // If no data for 2025 yet, show empty state
          setUsers([]);
          setTotalUsers(0);
          setTotalPages(0);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [selectedYear, currentPage]);

  // Function to handle opening the student view modal
  const handleViewStudent = (student: StructuredUserData) => {
    console.log("Viewing student:", student);
    setSelectedStudent(student);
    onOpen();
  };

  // Function to handle printing a student application
  const handlePrintStudent = async (student: StructuredUserData) => {
    await generatePDF(student);
  };

  // Filter and sort users based on search term and sort option
  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];

    // Filter by search term
    const filtered = users.filter((user) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user["Student Details"].Name.toLowerCase().includes(searchLower) ||
        user["Student Details"].Email.toLowerCase().includes(searchLower) ||
        user["Student Details"].Phone.toLowerCase().includes(searchLower) ||
        user.applicationNo.toLowerCase().includes(searchLower)
      );
    });

    // Sort based on selected sort option
    const sorted = [...filtered];
    switch (sortBy) {
      case "newest":
        // Assuming newer users have more recent IDs
        return sorted.sort((a, b) => b.applicationNo.localeCompare(a.applicationNo));
      case "oldest":
        return sorted.sort((a, b) => a.applicationNo.localeCompare(b.applicationNo));
      case "name":
        return sorted.sort((a, b) =>
          a["Student Details"].Name.localeCompare(b["Student Details"].Name)
        );
      default:
        return sorted;
    }
  }, [users, searchTerm, sortBy]);

  // Get registration status based on creation date
  function getRegistrationStatus(user: StructuredUserData) {
    // Since we don't have the exact date in the structured data,
    // determine status based on seat confirmation
    return user["Student Details"]["Seat Confirmed"] === "Yes"
      ? "Completed"
      : "Registered";
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="h-20 flex items-center justify-center m-2">
        <NavbarAdmin />
      </div>

      <main className="flex-1 overflow-y-auto p-2 xl:px-10 bg-background">
        <Card className="shadow-sm bg-textBoxBackground p-0 lg:p-5">
          <CardHeader className="flex flex-col bg-textBoxBackground">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
              <div>
                <h2 className="text-lg font-medium">Student Registrations</h2>
                <p className="text-sm text-default-500">
                  Manage all registered students
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <Button
                  variant="flat"
                  className="bg-muthootRed text-white"
                  startContent={<Download size={18} />}
                  isDisabled={loading || filteredAndSortedUsers.length === 0}
                >
                  Export
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full py-4 gap-4">
              <div className="w-full">
                <Input
                  className="max-w-md"
                  placeholder="Search by name, ID, or email..."
                  startContent={
                    <Search className="text-default-400" size={18} />
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm whitespace-nowrap">Sort by:</span>
                <Select
                  defaultSelectedKeys={["newest"]}
                  selectedKeys={[sortBy]}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-36"
                  size="sm"
                  aria-label="Sort by"
                >
                  <SelectItem key="newest" >
                    Newest first
                  </SelectItem>
                  <SelectItem key="oldest" >
                    Oldest first
                  </SelectItem>
                  <SelectItem key="name">
                    Name (A-Z)
                  </SelectItem>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardBody className="py-5 bg-textBoxBackground">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Spinner size="lg" color="warning" />
                <p className="ml-4">Loading student data...</p>
              </div>
            ) : filteredAndSortedUsers.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-default-500">
                  {searchTerm
                    ? "No students found matching your search"
                    : `No students registered for the ${selectedYear} academic year`}
                </p>
              </div>
            ) : (
              <Table
                removeWrapper
                isHeaderSticky
                aria-label="Student registrations table"
                bottomContent={
                  totalPages > 0 ? (
                    <div className="flex w-full bg-textBoxBackground justify-center">
                      <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="warning"
                        page={currentPage}
                        total={totalPages}
                        onChange={setCurrentPage}
                      />
                    </div>
                  ) : null
                }
              >
                <TableHeader className="bg-textBoxBackground">
                  <TableColumn>STUDENT</TableColumn>
                  <TableColumn>PROGRAM</TableColumn>
                  <TableColumn>CONTACT</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody className="bg-textBoxBackground">
                  {filteredAndSortedUsers.map((student) => (
                    <TableRow className="bg-textBoxBackground" key={student.applicationNo}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={
                              student.Uploads?.studentPhoto ||
                              "/placeholder.svg?height=40&width=40"
                            }
                            name={student["Student Details"].Name}
                            size="sm"
                          />
                          <div>
                            <div className="font-medium">
                              {student["Student Details"].Name}
                            </div>
                            <div className="text-xs text-default-500">
                              {student.applicationNo}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {student["Student Details"].Course || "B.Tech"}
                          </div>
                          <div className="text-xs text-default-500">
                            {student["Branch Details"].Branch || "Not selected"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {student["Student Details"].Phone}
                          </div>
                          <div className="text-xs text-default-500 truncate max-w-[200px]">
                            {student["Student Details"].Email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          <Chip
                            size="sm"
                            color={
                              student["Student Details"].Quota === "NRI"
                                ? "primary"
                                : "secondary"
                            }
                            variant="flat"
                          >
                            {student["Student Details"].Quota || "N/A"}
                          </Chip>
                          <Chip
                            size="sm"
                            color={
                              student["Student Details"]["Seat Confirmed"] ===
                              "Yes"
                                ? "success"
                                : "warning"
                            }
                            variant="flat"
                          >
                            {getRegistrationStatus(student)}
                          </Chip>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            color="success"
                            size="sm"
                            onPress={() => handlePrintStudent(student)}
                            isLoading={isGenerating}
                          >
                            PRINT
                          </Button>
                          <Button
                            color="warning"
                            size="sm"
                            onPress={() => handleViewStudent(student)}
                          >
                            VIEW
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardBody>
        </Card>
      </main>

      {/* Modal for Student Details */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="5xl"
        scrollBehavior="inside"
        classNames={{
          base: "bg-textBoxBackground",
          header: "border-b-1 border-default",
          body: "p-0",
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody className="p-0">
                {selectedStudent && (
                  <StudentDetails student={selectedStudent} />
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
