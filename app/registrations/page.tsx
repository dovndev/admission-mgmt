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
} from "@nextui-org/react";

import { Download, Search } from "lucide-react";
import NavbarAdmin from "../components/NavbarAdmin";
import { useState, useMemo } from "react";
import StudentDetails from "../components/StudentDetails";
import { usePrintPDF } from "../hooks/usePrintPDF";

// Define a proper Student interface
interface Student {
  id: string;
  date: string;
  name: string;
  branch: string;
  phone: string;
  email: string;
  avatar: string;
}

export default function RegistrationDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [students] = useState([...studentsData]); // Clone the original data
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { generatePDF, isGenerating } = usePrintPDF();

  // Function to handle opening the student view modal
  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    onOpen();
  };

  // Function to handle printing a student application
  const handlePrintStudent = async (student: Student) => {
    await generatePDF(student.id);
  };

  // Sort and filter students
  const sortedStudents = useMemo(() => {
    let sorted = [...students];

    // Apply sorting
    switch (sortBy) {
      case "newest":
        sorted = sorted.sort((a, b) => {
          const dateA = new Date(a.date.split("/").reverse().join("-"));
          const dateB = new Date(b.date.split("/").reverse().join("-"));
          return dateB.getTime() - dateA.getTime(); // Newest first
        });
        break;

      case "oldest":
        sorted = sorted.sort((a, b) => {
          const dateA = new Date(a.date.split("/").reverse().join("-"));
          const dateB = new Date(b.date.split("/").reverse().join("-"));
          return dateA.getTime() - dateB.getTime(); // Oldest first
        });
        break;

      case "name":
        sorted = sorted.sort((a, b) => a.name.localeCompare(b.name)); // A-Z
        break;

      default:
        break;
    }

    return sorted;
  }, [students, sortBy]);

  const rowsPerPage = 8;
  const pages = Math.ceil(sortedStudents.length / rowsPerPage);

  // Get current page items
  const currentStudents = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedStudents.slice(start, end);
  }, [currentPage, sortedStudents]);

  // Handle page changes
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle sort changes
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="h-20 flex items-center justify-center m-2">
        <NavbarAdmin />
      </div>

      <main className="flex-1 overflow-y-auto p-2 xl:px-10  bg-background">
        <Card className="shadow-sm bg-textBoxBackground p-0 lg:p-5">
          <CardHeader className="flex flex-col bg-textBoxBackground">
            <div className="flex justify-between items-center w-full">
              <div>
                <h2 className="text-lg font-medium">Student Registrations</h2>
                <p className="text-sm text-default-500">Manage all registered students</p>
              </div>
              <div >
                <Button variant="flat" className="bg-muthootRed text-white" startContent={<Download size={18} />}>
                  Export
                </Button>
              </div>
            </div>
            <div className="flex justify-between w-full py-4 gap-4">
              <div className="w-full">
                <Input
                  className="max-w-64"
                  placeholder="Search by name, ID, or email..."
                  startContent={<Search className="text-default-400" size={18} />}
                />
              </div>
              <div>
                <Select
                  defaultSelectedKeys={["newest"]}
                  selectedKeys={[sortBy]}
                  onChange={handleSortChange}
                  className="w-36"
                  aria-label="Sort by"
                >
                  <SelectItem key="newest" value="newest">
                    Newest first
                  </SelectItem>
                  <SelectItem key="oldest" value="oldest">
                    Oldest first
                  </SelectItem>
                  <SelectItem key="name" value="name">
                    Name (A-Z)
                  </SelectItem>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardBody className="py-5 bg-textBoxBackground">
            <Table
              removeWrapper
              isHeaderSticky
              aria-label="Student registrations table"
              bottomContent={
                <div className="flex w-full bg-textBoxBackground justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="warning"
                    page={currentPage}
                    total={pages}
                    onChange={onPageChange}
                  />
                </div>
              }
            >
              <TableHeader className="bg-textBoxBackground">
                <TableColumn>STUDENT</TableColumn>
                <TableColumn>REGISTRATION</TableColumn>
                <TableColumn>PROGRAM</TableColumn>
                <TableColumn>CONTACT</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
                <TableColumn> View</TableColumn>
              </TableHeader>
              <TableBody className="bg-textBoxBackground">
                {currentStudents.map((student) => (
                  <TableRow className="bg-textBoxBackground" key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar src={student.avatar} name={student.name} size="sm" />
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-default-500">{student.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.date}</div>
                        <div className="text-xs text-default-500">{getRegistrationStatus(student.date)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">B.Tech</div>
                        <div className="text-xs text-default-500">{student.branch}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{student.phone}</div>
                        <div className="text-xs text-default-500 truncate max-w-[200px]">{student.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        color="success" 
                        size="sm" 
                        onPress={() => handlePrintStudent(student)}
                        isLoading={isGenerating}
                      >
                        PRINT
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button color="warning" size="sm" onPress={() => handleViewStudent(student)}>
                        VIEW
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </main>

      {/* Modal for Student Verification */}
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
                <StudentDetails studentId={selectedStudent?.id} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

function getRegistrationStatus(date: string) {
  const registrationDate = new Date(date.split("/").reverse().join("-"));
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - registrationDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 7) {
    return "Recently registered";
  } else if (diffDays <= 30) {
    return "Registered";
  } else {
    return "Completed";
  }
}

const studentsData = [
  {
    id: "NBT230002",
    date: "04/09/2024",
    name: "Nandu P N",
    branch: "CY",
    phone: "8848978215",
    email: "nandakrishnanunni01@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "NBT240029",
    date: "28/09/2024",
    name: "Kesiya Dinu",
    branch: "CSE",
    phone: "9447330100",
    email: "dinuthampik@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "NBT250011",
    date: "01/10/2024",
    name: "Ann Maria Tony",
    branch: "CSE",
    phone: "9539067873",
    email: "tonyannbalathinkal@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "NBT250013",
    date: "01/10/2024",
    name: "Abhinav Biju",
    branch: "CSE",
    phone: "7306485285",
    email: "abhinavabhinav74220@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "NBT250014",
    date: "02/10/2024",
    name: "Abhinav J Chemmannoor",
    branch: "CSE",
    phone: "9447768994",
    email: "simyjo10@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "NBT250015",
    date: "03/10/2024",
    name: "Jyothika K R",
    branch: "CSE",
    phone: "9895932204",
    email: "dhanya.rajeshks78@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "NBT250016",
    date: "03/10/2024",
    name: "Jeswin George",
    branch: "CSE",
    phone: "9846053079",
    email: "gjosephu@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "NBT250017",
    date: "02/10/2024",
    name: "Abhinav J Chemmannoor",
    branch: "CSE",
    phone: "9447768994",
    email: "simyjo10@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "NBT250018",
    date: "03/10/2024",
    name: "Jyothika K R",
    branch: "CSE",
    phone: "9895932204",
    email: "dhanya.rajeshks78@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "NBT250019",
    date: "03/10/2024",
    name: "Jeswin George",
    branch: "CSE",
    phone: "9846053079",
    email: "gjosephu@gmail.com",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
