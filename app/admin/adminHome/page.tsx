"use client";
import { useState, useEffect, useCallback } from "react";
import NavbarAdmin from "../../components/NavbarAdmin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@heroui/react";
import { FiRefreshCw } from "react-icons/fi";
import useAdminStore from "@/app/store/adminStore";
import { getDashboardStats } from "@/app/actions/adminDashboard-actions";

interface ProgramData {
  program: string;
  applications: number;
  approved: number;
}

interface QotaData {
  quota: string;
  applications: number;
}

export default function AdminHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ProgramData[]>([]);
  const [quotaData, setQuotaData] = useState<QotaData[]>([]);
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalApproved, setTotalApproved] = useState(0);
  const { selectedYear } = useAdminStore();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getDashboardStats(selectedYear);

      if (result.success) {
        setData(result.programData);
        setQuotaData(result.quotaData);
        setTotalApplications(result.totalApplications);
        setTotalApproved(result.totalApproved);
      } else {
        console.error("Error loading dashboard data:", result.error);
        // Fallback to empty data
        setData([
          { program: "CSE", applications: 0, approved: 0 },
          { program: "ECE", applications: 0, approved: 0 },
          { program: "EEE", applications: 0, approved: 0 },
          { program: "ME", applications: 0, approved: 0 },
          { program: "CE", applications: 0, approved: 0 },
          { program: "IT", applications: 0, approved: 0 },
        ]);
        setQuotaData([
          { quota: "NRI", applications: 0 },
          { quota: "OCI", applications: 0 },
          { quota: "CIWG", applications: 0 },
        ]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    loadData();
  }, [loadData, selectedYear]);

  return (
    <div className="flex flex-col h-screen">
      <div className="h-20 flex items-center justify-center">
        <NavbarAdmin />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden lg:items-center justify-center">
        <div className="flex-1 bg-textBoxBackground rounded-3xl shadow-xl p-4 h-[400px] lg:h-full lg:p-6 lg:max-w-[50%]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Registration Statistics for {selectedYear}
            </h2>
            <Button
              isIconOnly
              color="warning"
              variant="ghost"
              onPress={loadData}
              isLoading={isLoading}
            >
              <FiRefreshCw
                className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
          <div className="h-[calc(100%-3rem)]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="program"
                  label="Branches"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis
                  label={{ value: "Count", angle: -90, position: "insideLeft" }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="orange" name="Applications" />
                <Bar dataKey="approved" fill="green" name="Approved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right side - Stats */}
        <div className="lg:w-80 flex flex-col gap-4 ">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-textBoxBackground p-4 text-center shadow-xl rounded-3xl">
              <div className="text-xl">Applications</div>
              <div className="text-4xl font-bold">{totalApplications}</div>
            </div>
            <div className="bg-textBoxBackground p-4 text-center shadow-xl rounded-3xl">
              <div className="text-xl">Approved</div>
              <div className="text-4xl font-bold">{totalApproved}</div>
            </div>
          </div>

          <div className="flex-1 bg-textBoxBackground p-4 shadow-xl rounded-3xl">
            <div className="flex gap-4 items-center justify-center">
              {quotaData.map((option) => (
                <div key={option.quota} className="text-center">
                  <div className="text-xl">{option.quota}</div>
                  <div className="text-4xl font-bold">
                    {option.applications}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
