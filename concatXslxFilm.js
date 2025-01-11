const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const inputFolder = "./excel_film";
const outputFilm = "combineFile.xlsx";
const margeSheet = [];
let sheetName;

const files = fs.readdirSync(inputFolder);

if (files.length === 0) console.warm("There is no xlsx file in folder");

files.forEach((file, index) => {
  const filePath = path.join(inputFolder, file);

  console.log(`Now is concating film ${file}`);

  const workbook = XLSX.readFile(filePath);

  const sheetNames = workbook.SheetNames;

  const targetSheet = workbook.Sheets[sheetNames[1]];
  sheetName = sheetNames[1];
  const jsonData = XLSX.utils.sheet_to_json(targetSheet, {
    header: 1,
    raw: false,
  });

  if (index > 0) {
    jsonData.shift();
  }

  jsonData.pop();
  jsonData.pop();

  margeSheet.push(...jsonData);
});

console.log("now is finish file read.");

const newWorkBook = XLSX.utils.book_new();
const newSheet = XLSX.utils.aoa_to_sheet(margeSheet);

console.log("now is finish file rebuild.");

XLSX.utils.book_append_sheet(newWorkBook, newSheet, sheetName);
XLSX.writeFile(newWorkBook, outputFilm, { bookType: "xlsx" });
console.log("Now is complete file concat.");
