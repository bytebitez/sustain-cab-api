"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
server_1.default.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        server_1.default.log.error(err);
        process.exit(1);
    }
    server_1.default.log.info(`Server listening at ${address}`);
});
