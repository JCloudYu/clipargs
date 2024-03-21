"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("../index.js"));
console.log(index_js_1.default
    .bool('cool', '--cool', '-C')
    .string('var_str', '---str', '--str', '-S', 'A')
    .number('var_num', '---num', '--num', '-N', 'A')
    .stringArray('var_str_ary', '--sary', '-SA')
    .numberArray('var_num_ary', '--nary', '-NA')
    .parse(process.argv.slice(2)));
