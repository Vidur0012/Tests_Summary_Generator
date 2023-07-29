"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAndSummarize = void 0;
const promises_1 = require("fs/promises");
const xlsx_1 = require("xlsx");
const path_1 = require("path");
const namingconfig_json_1 = require("./namingconfig.json"); //naming configurations of workbook
const fileP = (0, path_1.join)(__dirname, "..", "sheets", "amipa_Sanity1_2023_07_20_06_25_38.xlsx");
const readAndSummarize = (filePath = fileP) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = { passed: 0, failed: 0, skipped: 0 };
        const buf = yield (0, promises_1.readFile)(filePath);
        const worksheet = (0, xlsx_1.read)(buf).Sheets[namingconfig_json_1.sanity.sheetName];
        if (!worksheet) {
            throw new Error("Worksheet not found!");
        }
        const arr = xlsx_1.utils.sheet_to_json(worksheet);
        arr.forEach((ele) => {
            var _a, _b, _c;
            if (((_a = ele.Result1) === null || _a === void 0 ? void 0 : _a.trim().substring(0, 5)) === "PASS") {
                result.passed++;
            }
            else if (((_b = ele.Result1) === null || _b === void 0 ? void 0 : _b.trim().substring(0, 5)) === "FAIL") {
                result.failed++;
            }
            else if (((_c = ele.Result1) === null || _c === void 0 ? void 0 : _c.trim().length) === 0) {
                result.skipped++;
            }
        });
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
});
exports.readAndSummarize = readAndSummarize;
console.log((0, exports.readAndSummarize)());
