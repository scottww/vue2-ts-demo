import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * 导出为 Excel
 * @param {Array} jsonData - 要导出的数据（对象数组）
 * @param {String} filename - 文件名
 */
export function exportToExcel(jsonData, filename = '练字打卡记录') {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook = {
    SheetNames: ['打卡记录'],
    Sheets: {
      打卡记录: worksheet
    }
  };

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, `${filename}.xlsx`);
}
