import CommentAnalyzer from "./comment-analyzer";
import {Dirent, promises as fs} from "fs";
import { join } from "path";
import addReportResults from "./utils/merge-report-results";
import chunk from "./utils/chunk";

(async function() {


    let totalResults: Record<string, number> = {};

    const fileDir = "docs";
				
    const dirEnts = await fs.readdir(fileDir,   { withFileTypes: true });

    // we will do the files in batches of 4 
    const batchedDirEnts = chunk<Dirent>(dirEnts, 4);

    while(true){

        const currentDirEnts = batchedDirEnts.next();

        if (currentDirEnts.done) break;

        await Promise.all(currentDirEnts.value.map(async (dirEnt:Dirent) => {

            if(dirEnt.isFile() && dirEnt.name.endsWith(".txt")){
    
                const commentAnalyzer = new CommentAnalyzer(join(process.cwd(), fileDir, dirEnt.name));
    
                const results = await commentAnalyzer.analyze();
    
                totalResults = addReportResults(totalResults, results);
    
            }
    
        }));
    

    }


    Object.entries(totalResults).forEach(([key, value]) => console.log(`${key} - ${value}`));
    

})()