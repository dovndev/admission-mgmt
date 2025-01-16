"use client";
import React from "react";

interface TableDisplayContent {
  id: string;
  className?: string;
  rows: [string,string][];
}

const TableDisplayContent: React.FC<TableDisplayContent> = ({ id, rows, className = "" }) => {
  return (
    <div className={`flex flex-col  w-full p-2 rounded-lg shadow-md  border border-background ${className}`} id={id}>
      {rows.map((row,index) => (
        <div key={index} className="flex flex-row justify-between">
          <div className="font-light">{row[0]}:</div>
          <div className="font-bold">{row[1]}</div>
        </div>
      ))}
    </div>
  );
};

export default TableDisplayContent;
