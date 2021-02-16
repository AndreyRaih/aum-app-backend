"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildResultObject = exports.formatDateToString = void 0;
function formatDateToString(date) {
    const normalizeValue = (value) => value > 9 ? value.toString() : `0${value}`;
    return `${date.getFullYear()}-${normalizeValue(date.getMonth())}-${normalizeValue(date.getDate())}`;
}
exports.formatDateToString = formatDateToString;
function buildResultObject(user, estimation) {
    const { recentResults: existRecentResults, levels: existLevels } = user;
    const { name, block, result } = estimation;
    // Build level updates
    const updatedBlockName = Object.keys(existLevels).find(level => block.includes(level));
    const isShouldUpdate = result.every(chain => chain.isDone);
    const levels = Object.assign(Object.assign({}, existLevels), { [updatedBlockName]: isShouldUpdate ? existLevels[updatedBlockName] + 1 : existLevels[updatedBlockName] });
    // Build recent results updates
    const newResult = {
        asana: name,
        block: block,
        doneEntries: result.filter(entry => entry.isDone),
        failures: result.filter(entry => !entry.isDone)
    };
    const recentResults = [...existRecentResults];
    recentResults.push(newResult);
    return {
        recentResults,
        levels
    };
}
exports.buildResultObject = buildResultObject;
//# sourceMappingURL=index.js.map