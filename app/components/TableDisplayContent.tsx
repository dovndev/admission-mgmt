"use client";
import React from "react";

interface TableDisplayContentProps {
  id: string;
  className?: string;
  rows: { [field: string]: string };
}

const TableDisplayContent: React.FC<TableDisplayContentProps> = ({ id, rows, className = "" }) => {
  return (
    <div className={`flex flex-col w-full p-2 rounded-lg shadow-md border border-background ${className}`} id={id}>
      {Object.entries(rows).map(([key,value]) => (
        <div key={key} className="flex flex-row justify-between">
          <div className="font-light">{key}:</div>
          <div className="font-bold">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default TableDisplayContent;
