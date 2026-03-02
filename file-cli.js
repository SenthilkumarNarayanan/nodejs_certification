const fs = require("fs");
const path = require("path");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv));

const RECORD_FILE = path.join(__dirname, "files.json");

if (!fs.existsSync(RECORD_FILE)) {
  fs.writeFileSync(RECORD_FILE, JSON.stringify([]));
}

const getStoredFilenames = () => {
  return JSON.parse(fs.readFileSync(RECORD_FILE, "utf-8"));
};

const saveFilename = (name) => {
  const files = getStoredFilenames();
  files.push(name);
  fs.writeFileSync(RECORD_FILE, JSON.stringify(files, null, 2));
};

const createFile = (filename) => {
  const files = getStoredFilenames();

  if (files.includes(filename) || fs.existsSync(filename)) {
    console.log("File already exists. Provide a new name.");
    return;
  }

  fs.writeFileSync(filename, "You are awesome");
  saveFilename(filename);
  console.log("File created:", filename);
};

argv.command({
  command: "create",
  builder: {
    filename: { demandOption: true, type: "string" }
  },
  handler(argv) {
    createFile(argv.filename);
  }
});

argv.parse();