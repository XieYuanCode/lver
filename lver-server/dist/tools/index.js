"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHash = void 0;
const crypto_1 = require("crypto");
const calculateHash = (buffer) => {
    const hash = (0, crypto_1.createHash)('md5');
    hash.update(buffer);
    return hash.digest('hex');
};
exports.calculateHash = calculateHash;
//# sourceMappingURL=index.js.map