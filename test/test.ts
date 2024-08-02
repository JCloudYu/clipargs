import CMDArgs from "../index.js"; 


type ArgType = {
	cool:boolean;
	var_str:string;
	var_num:number;
	var_str_ary:string[];
	var_num_ary:number[];
};

console.log(
	CMDArgs
	.bool('cool', '--cool', '-C')
	.string('hot_weather', '--hot-weather', '-HW')
	.string('var_str', '---str', '--str', '-S', 'A')
	.number('var_num', '---num', '--num', '-N', 'A')
	.stringArray('var_str_ary', '--sary', '-SA')
	.numberArray('var_num_ary', '--nary', '-NA')
	.parse<ArgType>(process.argv.slice(2))
);