const { readFile } = require("fs/promises");
const { dirname, join } = require("path");
const { ROOTDIR } = require("./getRootDir");

exports.loadConfig = async (): Promise<void> => {
  const configFilePath = join(ROOTDIR, "namingconfig.json");

  const content = await readFile(configFilePath);
  // return content;
  console.log(ROOTDIR, content);
};
loadConfig();
