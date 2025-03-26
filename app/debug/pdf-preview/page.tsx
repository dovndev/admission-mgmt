"use client";
import { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import StudentPDF from '@/app/components/StudentPDF';


export default function PDFPreviewPage() {
  // To prevent hydration issues with Next.js
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col h-screen">

      
      {isClient ? (
        <PDFViewer
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        >
          <StudentPDF />
        </PDFViewer>
        
      ) : (
        <div className="flex items-center justify-center h-full">
          Loading PDF preview...
        </div>
      )}
    </div>
  );
}