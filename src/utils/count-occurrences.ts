export const countOccurrences = (line: string, str:string): number =>  line.toLowerCase().split(str.toLowerCase()).length - 1;