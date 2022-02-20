"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("../index.js"));
console.log(index_js_1.default
    .flag('cool', '--cool', '-c', '-col')
    .variable('var_a', '---A', '--A', '-a', 'A')
    .array('var_b', '--B', '-b', '-bb', '-b', '-c')
    .array('var_d', '--D', '-dd')
    .parse(process.argv.slice(2)));
