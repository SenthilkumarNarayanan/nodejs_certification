const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

// Initialize yargs properly
const argv = yargs(hideBin(process.argv));

// File that stores filenames
const RECORD_FILE = "recordfiles.txt";

// Ensure record file exists
if (!fs.existsSync(RECORD_FILE)) {
    fs.writeFileSync(RECORD_FILE, JSON.stringify([]));
}

// Read stored filenames
const getStoredFilenames = () => {
    const data = fs.readFileSync(RECORD_FILE, "utf-8");
    return JSON.parse(data);
};

// Save filename
const saveFilename = (name) => {
    const files = getStoredFilenames();
    files.push(name);
    fs.writeFileSync(RECORD_FILE, JSON.stringify(files, null, 2));
};

// Create new file
const createFile = (filename) => {
    const files = getStoredFilenames();

    if (files.includes(filename) || fs.existsSync(filename)) {
        console.log("this file already exists. Provide a new filename.");
        return;
    }

    fs.writeFileSync(filename, "You are awesome");
    saveFilename(filename);

    console.log("File created:", filename);
};

// Command
argv.command({
    command: "create",
    describe: "Create a new file",
    builder: {
        filename: {
            describe: "File name",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        createFile(argv.filename);
    }
});

argv.parse();