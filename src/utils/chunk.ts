
/** Generator Function that takes in a list and batches them into a specific size
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
 */
export default function* chunk<T>(array: Array<T>, batchSize: number): Generator<Array<T>> {

    let batchMultiplier = 1;

    for (let i = 0; i < array.length; i += batchSize) {
        const subArr = array.slice(i, batchSize * batchMultiplier);
        batchMultiplier++;
        yield subArr;
    }

}