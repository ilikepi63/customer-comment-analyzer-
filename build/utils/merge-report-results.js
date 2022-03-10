"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Combines to objects with key mapping <string, number>. If matched keys, then adds them.
 *
 * @param source {Object} - Source Object
 * @param target {Object} - Target Object
 * @returns {Object}
 */
function addReportResults(source, target) {
    const addedValues = Object.fromEntries(Object.entries(source)
        // If the target object has the key from the source object, 
        // add the keys together, otherwise return standard.
        .map(([key, value]) => target.hasOwnProperty(key) ? [key, value + target[key]] : [key, value]));
    return {
        ...target,
        ...addedValues
    };
}
exports.default = addReportResults;
