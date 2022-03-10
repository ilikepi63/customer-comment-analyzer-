"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const matcher_1 = __importDefault(require("./utils/matcher"));
const count_occurrences_1 = require("./utils/count-occurrences");
const applyPerLine = (fileName) => async (fn) => {
    // Readline interface is a stream
    // so we can iterate over each line.
    // https://nodejs.org/api/readline.html#readlinepromisescreateinterfaceoptions
    const rl = readline_1.default.createInterface({
        input: getFileStream(fileName),
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        fn(line);
    }
};
// Initially create a read stream from the file.
// This ensure we don't load the entire file into memory.
const getFileStream = (fileName) => fs_1.default.createReadStream(fileName);
class CommentAnalyzer {
    constructor(file) {
        this.file = file;
    }
    async analyze() {
        let matcher = new matcher_1.default({
            "SHORTER_THAN_15": (line) => line.length < 15 ? 1 : 0,
            "MOVER_MENTIONS": (line) => (0, count_occurrences_1.countOccurrences)(line, "Mover"),
            "SHAKER_MENTIONS": (line) => (0, count_occurrences_1.countOccurrences)(line, "Shaker"),
            "QUESTIONS": (line) => line.includes("?") ? 1 : 0,
            "SPAM": (line) => line.match(new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)) ? 1 : 0
        });
        try {
            await applyPerLine(this.file)((line) => matcher.analyze(line));
        }
        catch (err) {
            console.error("IO Error processing file: " + this.file);
        }
        return matcher.getResults();
    }
}
exports.default = CommentAnalyzer;
