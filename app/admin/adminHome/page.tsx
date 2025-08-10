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
  const [usingSampleData, setUsingSampleData] = useState(false);
  const { selectedYear } = useAdminStore();

  const loadData = useCallback(async () => {
    // Generate sample data for demonstration when no real data exists
    const generateSampleData = (): ProgramData[] => [
      { program: "CSE", applications: 0, approved: 0 },
      { program: "ECE", applications: 0, approved: 35 },
      { program: "ME", applications: 0, approved: 0 },
      { program: "CE", applications: 0, approved: 0 },
      { program: "AIDS", applications: 0, approved: 0 },
      { program: "EEE", applications: 0, approved: 0 },
      { program: "CSAI", applications: 0, approved: 0 },
      { program: "CY", applications: 0, approved: 0 },
    ];

    const generateSampleQuotaData = (): QotaData[] => [
      { quota: "NRI", applications: 0 },
      { quota: "OCI", applications: 0 },
      { quota: "CIWG", applications: 0 },
      { quota: "PIO", applications: 0 },
    ];

    setIsLoading(true);
    try {
      console.log('Loading data for year:', selectedYear);
      const result = await getDashboardStats(selectedYear);

      if (result.success && result.totalApplications > 0) {
        console.log('Data loaded successfully:', result);
        setData(result.programData);
        setQuotaData(result.quotaData);
        setTotalApplications(result.totalApplications);
        setTotalApproved(result.totalApproved);
        setUsingSampleData(false);
      } else {
        console.log('No real data found, using sample data for demonstration');
        // Use sample data for demonstration
        const sampleData = generateSampleData();
        const sampleQuotaData = generateSampleQuotaData();
        
        setData(sampleData);
        setQuotaData(sampleQuotaData);
        setTotalApplications(sampleData.reduce((sum, item) => sum + item.applications, 0));
        setTotalApproved(sampleData.reduce((sum, item) => sum + item.approved, 0));
        setUsingSampleData(true);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      // Set fallback data on error as well
      const sampleData = generateSampleData();
      const sampleQuotaData = generateSampleQuotaData();
      
      setData(sampleData);
      setQuotaData(sampleQuotaData);
      setTotalApplications(sampleData.reduce((sum, item) => sum + item.applications, 0));
      setTotalApproved(sampleData.reduce((sum, item) => sum + item.approved, 0));
      setUsingSampleData(true);
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
        {!selectedYear ? (
          <div className="flex-1 bg-textBoxBackground rounded-3xl shadow-xl p-6 h-[400px] lg:h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">No Year Selected</h2>
              <p className="text-gray-600">Please select a year from the navigation to view statistics.</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-textBoxBackground rounded-3xl shadow-xl p-4 h-[400px] lg:h-full lg:p-6 lg:max-w-[50%]">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Registration Statistics for {selectedYear}
                </h2>
                {usingSampleData && (
                  <p className="text-sm text-orange-500 mt-1">
                    ⚠️ Showing sample data (no real data available for {selectedYear})
                  </p>
                )}
              </div>
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
        )}

        {/* Right side - Stats */}
        {selectedYear && (
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
        )}
      </div>
    </div>
  );
}
