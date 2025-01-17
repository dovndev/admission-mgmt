"use client";
import React from "react";
import { DataRow } from "../types/studentData";
interface TableDisplayContent {
  id: string;
  className?: string;
  rows: DataRow[];
}

const TableDisplayContent: React.FC<TableDisplayContent> = ({ id, rows, className = "" }) => {
  return (
    <div className={`flex flex-col  w-full p-2 rounded-lg shadow-md  border border-background ${className}`} id={id}>
      {rows.map((row) => (
        <div key={row.label} className="flex flex-row justify-between">
          <div className="font-light">{row.label}:</div>
          <div className="font-bold">{row.value}</div>
        </div>
      ))}
    </div>
  );
};

export default TableDisplayContent;
