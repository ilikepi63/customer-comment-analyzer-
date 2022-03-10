"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Matcher {
    constructor(keyMap) {
        this.keyMap = keyMap ?? {};
        this.resultsMap = {};
    }
    addString(str, key) {
        this.keyMap[str] = key;
        return this;
    }
    increment(key, inc) {
        this.incrementOccurence(this.resultsMap, key, inc);
    }
    getResults() {
        return this.resultsMap;
    }
    analyze(line) {
        Object.entries(this.keyMap).forEach(([key, fn]) => {
            this.resultsMap = this.incrementOccurence(this.resultsMap, key, fn(line));
        });
        return this;
    }
    incrementOccurence(map, key, inc) {
        const increment = inc ?? 1;
        if (map.hasOwnProperty(key))
            map[key] = map[key] + increment;
        else
            map[key] = increment;
        return map;
    }
}
exports.default = Matcher;
