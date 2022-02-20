import CMDArgs from "../index.js";

console.log(
	CMDArgs
	.flag('cool', '--cool', '-c', '-col')
	.variable('var_a', '---A', '--A', '-a', 'A')
	.array('var_b', '--B', '-b', '-bb', '-b', '-c')
	.parse<{cool:boolean, var_a:string, var_b:string[]}>(process.argv.slice(2))
);