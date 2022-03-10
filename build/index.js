"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_analyzer_1 = __importDefault(require("./comment-analyzer"));
const fs_1 = require("fs");
const path_1 = require("path");
const merge_report_results_1 = __importDefault(require("./utils/merge-report-results"));
const chunk_1 = __importDefault(require("./utils/chunk"));
(async function () {
    let totalResults = {};
    const fileDir = "docs";
    const dirEnts = await fs_1.promises.readdir(fileDir, { withFileTypes: true });
    // we will do the files in batches of 4 
    const batchedDirEnts = (0, chunk_1.default)(dirEnts, 4);
    while (true) {
        const currentDirEnts = batchedDirEnts.next();
        if (currentDirEnts.done)
            break;
        await Promise.all(currentDirEnts.value.map(async (dirEnt) => {
            if (dirEnt.isFile() && dirEnt.name.endsWith(".txt")) {
                const commentAnalyzer = new comment_analyzer_1.default((0, path_1.join)(process.cwd(), fileDir, dirEnt.name));
                const results = await commentAnalyzer.analyze();
                totalResults = (0, merge_report_results_1.default)(totalResults, results);
            }
        }));
    }
    Object.entries(totalResults).forEach(([key, value]) => console.log(`${key} - ${value}`));
})();
