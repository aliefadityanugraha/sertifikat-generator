import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generateCertificate(elementId, student, download = true) {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');
  
  const canvas = await html2canvas(element, { scale: 2, useCORS: true });
  
  if (download) {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Sertifikat_${student.nama}_${student.kelas}.pdf`);
  }
  
  return canvas;
}
