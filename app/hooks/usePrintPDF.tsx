import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import StudentPDF from '../components/StudentPDF';

export const usePrintPDF = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generatePDF = async (studentId: string) => {
    try {
      setIsGenerating(true);
      
      // Create the PDF document
      const blob = await pdf(
        <StudentPDF 
          studentId={studentId}
        />
      ).toBlob();
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `Application_${studentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      setIsGenerating(false);
      
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsGenerating(false);
      return false;
    }
  };
  
  return { generatePDF, isGenerating };
};