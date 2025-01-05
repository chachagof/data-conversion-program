const fs = require('fs')
const path = require('path')

const jsonData = require('./output.json')

function jsonToCSV(jsonArray) {
  if (!jsonArray || jsonArray.length === 0) {
    return '';
  }

  // 提取所有的標頭（物件的鍵）
  const headers = Object.keys(jsonArray[0]);

  // 提取每一行的數據
  const rows = jsonArray.map(obj =>
    headers.map(header => `"${obj[header] || ''}"`).join(',')
  );

  // 合併標頭和數據行
  return [headers.join(','), ...rows].join('\n');
}

// 轉換為 CSV 格式
const csvData = jsonToCSV(jsonData);

// 將結果輸出到檔案
const outputPath = './output.csv';
fs.writeFileSync(outputPath, csvData, 'utf-8');

console.log(`CSV 檔案已生成: ${outputPath}`);
