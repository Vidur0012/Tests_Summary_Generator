import { fileURLToPath } from "url";
import { dirname } from "path";
// getting root directory of project
export const ROOTDIR = dirname(dirname(fileURLToPath(import.meta.url)));
