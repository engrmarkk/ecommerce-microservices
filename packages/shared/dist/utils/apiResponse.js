"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRes = void 0;
const apiRes = (res, message, statCode, statMsg, data = null) => {
    return res.status(statCode).json({
        message,
        status: statMsg,
        data
    });
};
exports.apiRes = apiRes;
