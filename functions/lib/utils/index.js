"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserModel = exports.formatDateToString = void 0;
function formatDateToString(date) {
    const normalizeValue = (value) => value > 9 ? value.toString() : `0${value}`;
    return `${date.getFullYear()}-${normalizeValue(date.getMonth())}-${normalizeValue(date.getDate())}`;
}
exports.formatDateToString = formatDateToString;
exports.createUserModel = (id) => {
    return {
        id,
        name: null,
        levels: {
            standing: 1,
            sitting: 1,
            balances: 1,
            lying_forward: 1,
            lying_back: 1
        },
        onboardingComplete: {
            concept: false,
            player: false
        },
        recentNotes: [],
        sessions: []
    };
};
//# sourceMappingURL=index.js.map