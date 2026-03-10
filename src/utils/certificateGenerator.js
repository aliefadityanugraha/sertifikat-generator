import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generateCertificate(elementId, student, download = true) {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');
  
  const canvas = await html2canvas(element, { 
    scale: 2, // 3000px (base) * 2 = 6000px (matches original image resolution perfectly)
    useCORS: true,
    logging: false,
    backgroundColor: null,
    allowTaint: true,
    imageTimeout: 0
  });
  
  if (download) {
    const imgData = canvas.toDataURL('image/png', 1.0);
    
    const pdfWidth = 297; 
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [pdfWidth, pdfHeight],
      compress: false // Disable overall PDF compression for clarity
    });
    
    // Use 'NONE' for alias/compression to preserve PNG quality
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'NONE');
    pdf.save(`Sertifikat_${student.nama}_${student.kelas}.pdf`);
  }
  
  return canvas;
}
