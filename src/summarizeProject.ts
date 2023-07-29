import { readFile, readdir } from "fs/promises";
import { read, utils } from "xlsx";
import { join } from "path";
import { xlsFileLocation, automationSuite } from "./namingconfig.json";
import { readAndSummarizeFile } from "./readAndSummarizeFile";

interface AutomationSuite {
    TSID: string;
    Description: string;
    Runmode: string;
}

const latestFileOfToday = async (dirPath:string) => {
    try {
        const date = new Date();

        const files = await readdir(dirPath);
        for (const file of files)
          console.log(file);
      } catch (err) {
        console.error(err);
      }  
}
export const summarizeProject = async (projectPath: string) => {
    try {
        const dirPath = join(projectPath, ...xlsFileLocation.srcDir);

        const automationSuitePath = join(dirPath, automationSuite.fileName + automationSuite.ext);
        const buf = await readFile(automationSuitePath);
        const automationSuiteWb = read(buf);
        const automationSuiteSh = automationSuiteWb.Sheets[automationSuite.sheetName];
        const automationSuiteArr: AutomationSuite[] = utils.sheet_to_json(automationSuiteSh);
        automationSuiteArr.forEach((ele: AutomationSuite) => {
            if (ele.Runmode.trim() === "Y") {

            }
        });
        await latestFileOfToday(dirPath);
    }
    catch (err) {
        console.log(err);
    }
};
