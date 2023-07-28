import { readFile } from "fs/promises";
import { join } from "path";
import { ROOTDIR } from "./getRootDir";

export const loadConfig = async () => {
    const configFilePath = join(ROOTDIR, "namingconfig.json");
    const content = await readFile(configFilePath);
    // return content;
    console.log(ROOTDIR, content);
};
loadConfig();
