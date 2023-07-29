import { readFile } from "fs/promises";
import { read,  utils } from "xlsx";
import { join } from "path";
import { sanity } from "./namingconfig.json"; //naming configurations of workbook

const fileP = join(
  __dirname,
  "..",
  "sheets",
  "amipa_Sanity1_2023_07_20_06_25_38.xlsx"
);

// interface for row of sanity sheet
interface RowSanity {
  TCID: string;
  TSID: string;
  Description: string;
  Keyword: string;
  Object: string;
  Result1: string;
}
interface ResultOfFile {
  project: string;
  suite: string;
  passed: number;
  failed: number;
  skipped: number;
}
export const readAndSummarizeFile = async (
  filePath: string,
  projectName: string,
  suiteName: string
): Promise<ResultOfFile | undefined> => {
  try {
    const result = {
      project: projectName,
      suite: suiteName,
      passed: 0,
      failed: 0,
      skipped: 0,
    };
    const buf = await readFile(filePath);
    const workbook = read(buf);
    const worksheet = workbook.Sheets[sanity.sheetName];
    if (!worksheet) {
      throw new Error("Work sheet not found!");
    }
    const arr: Partial<RowSanity>[] = utils.sheet_to_json(worksheet);
    arr.forEach((ele) => {
      if (ele.Result1?.trim().substring(0, 5) === "PASS") {
        result.passed++;
      } else if (ele.Result1?.trim().substring(0, 5) === "FAIL") {
        result.failed++;
      } else if (ele.Result1?.trim().length === 0) {
        result.skipped++;
      }
    });

    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return;
  }
};
