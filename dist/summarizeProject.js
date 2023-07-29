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
exports.summarizeProject = void 0;
const promises_1 = require("fs/promises");
const xlsx_1 = require("xlsx");
const path_1 = require("path");
const namingconfig_json_1 = require("./namingconfig.json");
const latestFileOfToday = (dirPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = yield (0, promises_1.readdir)(dirPath);
        for (const file of files)
            console.log(file);
    }
    catch (err) {
        console.error(err);
    }
});
const summarizeProject = (projectPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dirPath = (0, path_1.join)(projectPath, ...namingconfig_json_1.xlsFileLocation.srcDir);
        const automationSuitePath = (0, path_1.join)(dirPath, namingconfig_json_1.automationSuite.fileName + namingconfig_json_1.automationSuite.ext);
        const buf = yield (0, promises_1.readFile)(automationSuitePath);
        const automationSuiteWb = (0, xlsx_1.read)(buf);
        const automationSuiteSh = automationSuiteWb.Sheets[namingconfig_json_1.automationSuite.sheetName];
        const automationSuiteArr = xlsx_1.utils.sheet_to_json(automationSuiteSh);
        automationSuiteArr.forEach((ele) => {
            if (ele.Runmode.trim() === "Y") {
            }
        });
        yield latestFileOfToday(dirPath);
    }
    catch (err) {
        console.log(err);
    }
});
exports.summarizeProject = summarizeProject;
