"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDefaultBrowser = void 0;
const child_process_1 = require("child_process");
const openDefaultBrowser = (url) => {
    switch (process.platform) {
        case 'darwin':
            (0, child_process_1.spawn)('open', [url]);
            break;
        case 'win32':
            (0, child_process_1.spawn)('start', [url]);
            break;
        case 'linux':
            (0, child_process_1.spawn)('xdg-open', [url]);
        default:
            break;
    }
};
exports.openDefaultBrowser = openDefaultBrowser;
//# sourceMappingURL=index.js.map