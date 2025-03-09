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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Select,
  SelectItem,
  Chip,
  Pagination,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

import {
  Bell,
  Download,
  Filter,
  LogOut,
  MoreHorizontal,
  Search,
} from "lucide-react";
import NavbarAdmin from "../components/NavbarAdmin";

// import { Sidebar } from "./components/Sidebar"

export default function RegistrationDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col overflow-hidden px-12">
        {/* <Navbar className="border-b" maxWidth="full" isBordered>
          <NavbarContent className="flex items-center gap-3" justify="start">
            <h1 className="text-xl font-semibold">Registration Status</h1>
            <Chip color="primary" variant="flat" size="sm">
              Active
            </Chip>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="flex items-center gap-2">
              <span className="text-sm font-medium text-default-600">Program</span>
              <Select defaultSelectedKeys={["btech"]} className="w-32 min-w-0" size="sm" aria-label="Select program">
                <SelectItem key="btech" value="btech">
                  B.Tech
                </SelectItem>
                <SelectItem key="mtech" value="mtech">
                  M.Tech
                </SelectItem>
                <SelectItem key="phd" value="phd">
                  Ph.D
                </SelectItem>
              </Select>
            </NavbarItem>
            <NavbarItem className="flex items-center gap-2">
              <span className="text-sm font-medium text-default-600">Year</span>
              <Select defaultSelectedKeys={["2024"]} className="w-32 min-w-0" size="sm" aria-label="Select year">
                <SelectItem key="2024" value="2024">
                  2024
                </SelectItem>
                <SelectItem key="2023" value="2023">
                  2023
                </SelectItem>
                <SelectItem key="2022" value="2022">
                  2022
                </SelectItem>
              </Select>
            </NavbarItem>
            <NavbarItem>
              <Button isIconOnly variant="light" aria-label="Notifications">
                <Bell size={20} />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button isIconOnly variant="light" aria-label="Logout">
                <LogOut size={20} />
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar> */}
        <div className="flex items-center justify-center">
          {" "}
          <NavbarAdmin />
        </div>

        <div className="px-6 py-4 border-b bg-white">
          <div className="flex items-center justify-between gap-4">
            <Input
              classNames={{
                base: "max-w-md",
                mainWrapper: "h-10",
              }}
              placeholder="Search by name, ID, or email..."
              startContent={<Search className="text-default-400" size={18} />}
            />
            <div className="flex items-center gap-3">
              <Button
                variant="flat"
                color="default"
                startContent={<Filter size={18} />}
              >
                Filters
              </Button>
              <Button
                variant="flat"
                color="default"
                startContent={<Download size={18} />}
              >
                Export
              </Button>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Card className="shadow-sm">
            <CardHeader className="flex justify-between bg-default-50">
              <div>
                <h2 className="text-lg font-medium">Student Registrations</h2>
                <p className="text-sm text-default-500">
                  Manage all registered students for B.Tech 2024
                </p>
              </div>
              <Select
                defaultSelectedKeys={["newest"]}
                className="w-40"
                size="sm"
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
            </CardHeader>
            <CardBody className="p-0">
              <Table aria-label="Student registrations table" removeWrapper>
                <TableHeader>
                  <TableColumn>STUDENT</TableColumn>
                  <TableColumn>REGISTRATION</TableColumn>
                  <TableColumn>PROGRAM</TableColumn>
                  <TableColumn>CONTACT</TableColumn>
                  <TableColumn>ACTIONS</TableColumn>
                  <TableColumn> ew</TableColumn>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={student.avatar}
                            name={student.name}
                            size="sm"
                          />
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-default-500">
                              {student.id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.date}</div>
                          <div className="text-xs text-default-500">
                            {getRegistrationStatus(student.date)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">B.Tech</div>
                          <div className="text-xs text-default-500">
                            {student.branch}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.phone}</div>
                          <div className="text-xs text-default-500 truncate max-w-[200px]">
                            {student.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button color="success" size="sm">
                          PRINT
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly variant="light" size="sm">
                              <MoreHorizontal size={18} />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Actions">
                            <DropdownItem key="view">View Details</DropdownItem>
                            <DropdownItem key="edit">
                              Edit Registration
                            </DropdownItem>
                            <DropdownItem key="email">Send Email</DropdownItem>
                            <DropdownItem
                              key="delete"
                              className="text-danger"
                              color="danger"
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
            <CardFooter className="flex justify-center">
              <Pagination total={5} initialPage={1} />
            </CardFooter>
          </Card>
        </main>
      </div>
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

const students = [
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
    id: "NBT250010",
    date: "01/10/2024",
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
];
