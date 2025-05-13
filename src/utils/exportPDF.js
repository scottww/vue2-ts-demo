import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function exportToPDF(domId, filename = '书法打卡记录') {
  const element = document.getElementById(domId);
  if (!element) return console.error('无法找到 dom 元素');

  html2canvas(element, {
    scale: 2, // 提高清晰度
    useCORS: true
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/jpeg');
    const pdf = new jsPDF('landscape', 'pt', 'a4'); // 横向
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = canvas.height * (imgWidth / canvas.width);

    let position = 0;
    if (imgHeight <= pageHeight) {
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    } else {
      // 多页处理
      while (position < imgHeight) {
        pdf.addImage(imgData, 'JPEG', 0, -position, imgWidth, imgHeight);
        position += pageHeight;
        if (position < imgHeight) pdf.addPage();
      }
    }
    pdf.save(`${filename}.pdf`);
  });
}
