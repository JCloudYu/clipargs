interface CaptureConf {
	is_array:boolean;
	type:'string'|'number'|'boolean';
	aliases:string[];
}



const AliasFormat = /(^[-]{1,2}[^-]+$)/u;
const OptionFormat = /^(-[^-=]+)$|^((--[^-=]+)(=.*)?)$/u;
const _Captures:WeakMap<CliPArgs, {
	alias_map:Record<string, string>,
	var_map:{[name:string]:CaptureConf}
}> = new WeakMap();

interface UnnamedArgs {_:string[]};
interface NamedArgs {[key:string]:string[]|string|number[]|number|boolean|undefined};

class CliPArgs {
	constructor() {
		_Captures.set(this, {alias_map:{}, var_map:{}});
	}
	string(name:string, ...aliases:string[]):CliPArgs {
		return RegisterVaraible.call(this, name, 'string', aliases);
	}
	stringArray(name:string, ...aliases:string[]):CliPArgs {
		RegisterVaraible.call(this, name, 'string', aliases);
		_Captures.get(this)!.var_map[name].is_array = true;

		return this;
	}
	number(name:string, ...aliases:string[]):CliPArgs {
		return RegisterVaraible.call(this, name, 'number', aliases);
	}
	numberArray(name:string, ...aliases:string[]):CliPArgs {
		RegisterVaraible.call(this, name, 'number', aliases);
		_Captures.get(this)!.var_map[name].is_array = true;

		return this;
	}
	bool(name:string, ...aliases:string[]):CliPArgs {
		return RegisterVaraible.call(this, name, 'boolean', aliases);
	}
	clear():CliPArgs {
		_Captures.set(this, {alias_map:{}, var_map:{}});
		return this;
	}
	parse<ReturnType extends NamedArgs = {}>(args:string[]):ReturnType&UnnamedArgs {
		const {var_map:capture_map, alias_map} = _Captures.get(this)!;
		const return_value:any = { _:[] };

		const _args = args.slice(0).reverse();
		while(_args.length > 0) {
			const arg = _args.pop()!.trim();
			const matches = arg.match(OptionFormat);

			// Not an option
			if ( !matches ) {
				return_value._.push(arg);
				continue;
			}


			const [,short,, long, long_val] = matches;
			const alias = short||long;


			const var_name = alias_map[alias];
			if ( var_name === undefined ) {
				return_value._.push(arg);
				continue;
			}

			const {type, is_array} = capture_map[var_name];
			if ( type === "boolean" ) {
				return_value[var_name] = true;
				continue;
			}



			let value:string|null|number = short ? (_args.pop()?.trim()||null) : (long_val ? long_val.substring(1) : null);
			if ( value === null ) continue;


			if ( type === "number" ) value = Number(value);

			const registered_value = return_value[var_name];
			if ( registered_value === undefined ) {
				return_value[var_name] = is_array ? [value] : value;
			}
			else {
				if ( Array.isArray(registered_value) ) {
					registered_value.push(value);
				}
				else {
					return_value[var_name] = value;
				}
			}
		}

		return return_value;
	}
}

function RegisterVaraible(this:CliPArgs, name:string, type:CaptureConf['type'], aliases:string[]) {
	const {var_map} = _Captures.get(this)!;
	name = name.trim();

	if ( name === '_' ) {
		throw new RangeError("Option \`_\` is a reserved word!");
	}

	if ( !var_map[name] ) {
		var_map[name] = {type, is_array:false, aliases:[]};
	}

	if ( var_map[name].type !== type ) {
		throw new SyntaxError(`Option \"${name}\" has been declared as ${var_map[name].type} already!`);
	}

	RegisterAlias.call(this, name, aliases);
	
	return this;
}


function RegisterAlias(this:CliPArgs, name:string, aliases:string[]) {
	const {var_map:capture_map, alias_map} = _Captures.get(this)!;

	const {aliases:alias_registry} = capture_map[name];
	for(let alias of aliases) {
		alias = (''+alias).trim();
		
		if ( !AliasFormat.test(alias) ) {
			console.error(`Alias should only be started with \"-\" or \"--\"! Skipping \"${alias}\" for option \"${name}\"...`);
			continue;
		}

		if ( alias_map[alias] && alias_map[alias] !== name ) {
			console.error(`Alias \`${alias}\` has been used by option \`${alias_map[alias]}\`! Skipping...`);
			continue;
		}
		
		alias_registry.push(alias);
		alias_map[alias] = name;
	}
}


export = new CliPArgs();