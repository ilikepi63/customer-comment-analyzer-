"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Generator Function that takes in a list and batches them into a specific size
 *
 *
 */
function* chunk(array, batchSize) {
    let batchMultiplier = 1;
    for (let i = 0; i < array.length; i += batchSize) {
        const subArr = array.slice(i, batchSize * batchMultiplier);
        batchMultiplier++;
        yield subArr;
    }
}
exports.default = chunk;
