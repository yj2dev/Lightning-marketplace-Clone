"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtExtractorFromCookies = void 0;
const jwtExtractorFromCookies = (req) => {
    try {
        return req.cookies['jwt'];
    }
    catch (err) {
        console.error(err);
    }
};
exports.jwtExtractorFromCookies = jwtExtractorFromCookies;
//# sourceMappingURL=jwtExtractorFromCookies.js.map