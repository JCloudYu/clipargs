import CMDArgs from "../index.js";

console.log(
	CMDArgs
	.bool('cool', '--cool', '-C')
	.string('var_str', '---str', '--str', '-S', 'A')
	.number('var_num', '---num', '--num', '-N', 'A')
	.stringArray('var_str_ary', '--sary', '-SA')
	.numberArray('var_num_ary', '--nary', '-NA')
	.parse<{cool:boolean, var_str:string, var_num:number; var_str_ary:string[]; var_num_ary:number[]}>(process.argv.slice(2))
);