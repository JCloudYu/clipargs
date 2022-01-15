import CMDArgs from "../index.js";

const result = CMDArgs.parse(process.argv.slice(2));
console.log(result);