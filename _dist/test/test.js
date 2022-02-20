"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("../index.js"));
console.log(JSON.stringify(index_js_1.default.parse(process.argv.slice(2)), null, "    "));
console.log(JSON.stringify(index_js_1.default.parse(process.argv.slice(2), false), null, "    "));
