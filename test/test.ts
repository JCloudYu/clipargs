import CMDArgs from "../index.js";

console.log(JSON.stringify(CMDArgs.parse(process.argv.slice(2)), null, "    "));
console.log(JSON.stringify(CMDArgs.parse(process.argv.slice(2), false), null, "    "));