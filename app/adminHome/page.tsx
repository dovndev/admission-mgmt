"use client";
import { useState, useEffect, useCallback } from "react";
import NavbarAdmin from "../components/NavbarAdmin";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@nextui-org/react";
import { FiRefreshCw } from "react-icons/fi";

interface ProgramData {
  program: string;
  applications: number;
  aproved: number;
}

interface QotaData {
  quota: string;
  applications: number;
}

export default function AdminHome() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ProgramData[]>([]);
  const [quotaData, setQuotaData] = useState<QotaData[]>([]);
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const newData = [
        { program: "CSE", applications: 200, aproved: 240 },
        { program: "CT", applications: 300, aproved: 260 },
        { program: "CY", applications: 350, aproved: 220 },
        { program: "ECE", applications: 300, aproved: 139 },
        { program: "ME", applications: 200, aproved: 98 },
      ];
      setData(newData);
      const newQuotaData = [
        { quota: "NRI", applications: 200 },
        { quota: "OCI", applications: 300 },
        { quota: "CIWG", applications: 350 },
      ];
      setQuotaData(newQuotaData);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center h-20 w-full">
        <NavbarAdmin />
      </div>

      <div className="flex flex-col xl:flex-row items-center min-h-screen bg-background pb-4 pt-4 p-1">
        {/* Graph Card */}
        <div className="w-full max-w-6xl bg-textBoxBackground rounded-3xl shadow-xl p-4 md:p-6 m-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Registration Statistics</h2>
            <Button isIconOnly color="warning" variant="ghost" onPress={loadData} isLoading={isLoading}>
              <FiRefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          <div className="h-[400px] w-full">
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
                <XAxis dataKey="program" label="Branches" angle={-45} textAnchor="end" height={80} />
                <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="orange" name="Applications" />
                <Bar dataKey="aproved" fill="green" name="Aproved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <div className="flex gap-4">
            <div className="bg-textBoxBackground p-4 text-center shadow-xl rounded-3xl">
              <div className="text-xl">Total Applications</div>
              <div className="text-4xl font-bold">{data.reduce((sum, item) => sum + item.applications, 0)}</div>
            </div>
            <div className="bg-textBoxBackground p-4 text-center shadow-xl rounded-3xl">
              <div className="text-xl">Total Aproved</div>
              <div className="text-4xl font-bold">{data.reduce((sum, item) => sum + item.aproved, 0)}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 my-4 bg-textBoxBackground shadow-xl rounded-3xl items-center justify-center">
            {quotaData.map((option) => (
              <div key={option.quota} className=" p-4 text-center ">
                <div className="text-xl">{option.quota}</div>
                <div className="text-4xl font-bold">{option.applications}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
