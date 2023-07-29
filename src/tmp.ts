import { readFile, readdir } from "fs/promises";
import { read, utils } from "xlsx";
import { join } from "path";
import { xlsFileLocation, automationSuite } from "./namingconfig.json";
import { readAndSummarizeFile } from "./readAndSummarizeFile";

const latestFileOfToday = async (dirPath:string) => {
    try {
        const files = await readdir(dirPath);
          console.log(files);
      } catch (err) {
        console.error(err);
      }  
}
latestFileOfToday(__dirname+"/../"+"sheets");