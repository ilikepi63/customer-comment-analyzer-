export default class Matcher {
    private keyMap: Record<string, (s: string) => number>;
    private resultsMap: Record<string, number>;


    constructor(keyMap?: Record<string, (s: string) => number>) {
        this.keyMap = keyMap ?? {};
        this.resultsMap = {};
    }

    addString(str: string, key: (s: string) => number): Matcher {
        this.keyMap[str] = key;

        return this;
    }

    increment(key: string, inc?: number){
        this.incrementOccurence(this.resultsMap, key, inc); 
    }

    getResults() {
        return this.resultsMap;
    }

    analyze(line: string): Matcher {
        Object.entries(this.keyMap).forEach(([key, fn]) => {
            this.resultsMap = this.incrementOccurence(this.resultsMap, key, fn(line)); 
        });

        return this;
    }

    incrementOccurence(map: Record<string, number>, key: string, inc?: number): Record<string, number> {

        const increment = inc ?? 1;

        if (map.hasOwnProperty(key)) map[key] = map[key] + increment;
        else map[key] = increment;

        return map;
    }

} 