const { readFile } = require("fs/promises");
const { read, utils, WorkBook, WorkSheet } = require("xlsx");
const { join } = require("path");


const filePath = join("sheets", "amipa_Sanity1_2023_07_20_06_25_38.xlsx");

// const buf = await readFile(filePath);

// const workbook = read(buf);
// console.log((workbook));
// console.log(workbook.Sheets['Test Steps'].C3);
