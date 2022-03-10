import fs from "fs";
import readline from 'readline';
import Matcher from "./utils/matcher";
import {countOccurrences} from "./utils/count-occurrences";

const applyPerLine = (fileName: string) => async (fn: (line: string) => void): Promise<void> => {

    // Readline interface is a stream
    // so we can iterate over each line.
    // https://nodejs.org/api/readline.html#readlinepromisescreateinterfaceoptions
    const rl = readline.createInterface({
        input: getFileStream(fileName),
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        fn(line);
    }

}

// Initially create a read stream from the file.
// This ensure we don't load the entire file into memory.
const getFileStream = (fileName: string) => fs.createReadStream(fileName);

export default class CommentAnalyzer {
    private file: string;

    constructor(file: string) {
        this.file = file;
    }


    async analyze(): Promise<Record<string, number>> {

        let matcher = new Matcher({
            "SHORTER_THAN_15": (line) => line.length < 15  ? 1 : 0 ,
            "MOVER_MENTIONS": (line) =>  countOccurrences(line, "Mover"),
            "SHAKER_MENTIONS": (line) => countOccurrences(line, "Shaker"),
            "QUESTIONS": (line) => line.includes("?") ? 1 : 0,
            "SPAM": (line) => line.match(new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi)) ? 1 : 0
        });

        try {

            await applyPerLine(this.file)((line) => matcher.analyze(line));

        } catch (err) {
            console.error("IO Error processing file: " + this.file);
        }

        return matcher.getResults();
    }


}