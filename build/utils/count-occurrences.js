"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countOccurrences = void 0;
const countOccurrences = (line, str) => line.toLowerCase().split(str.toLowerCase()).length - 1;
exports.countOccurrences = countOccurrences;
