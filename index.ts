type ParsedArgs = {_:string[];} & { [key:string|number|symbol]:string|null; }
type HybridParsedArgs = {_:string[];} & { [key:string|number|symbol]:string[]|string|null; }


export = class {
	static parse<ParsedType extends object = any>(args:string[]):ParsedArgs&ParsedType;
	static parse<ParsedType extends object = any>(args:string[], overwrite_mode:false):ParsedArgs&ParsedType;
	static parse<ParsedType extends object = any>(args:string[], overwrite_mode:true):HybridParsedArgs&ParsedType;
	static parse<ParsedType extends object = any>(args:string[], overwrite_mode=false):(ParsedArgs&ParsedType)|(HybridParsedArgs&ParsedType) {
		const return_value:any = { _:[] };
		const _args = args.slice(0).reverse();
		while(_args.length > 0) {
			const arg = _args.pop()!.trim();

			let key:string, curr_val:string|string[]|null, next_val:string|null;
			if ( arg.substring(0, 2) === '--' ) {
				key = arg.substring(2);

				const split_idx = key.indexOf('=');
				if ( split_idx < 0 ) {
					next_val = null;
				}
				else {
					next_val = key.substring(split_idx+1);
					key = key.substring(0,split_idx);
				}
			}
			else 
			if ( arg.substring(0, 1) === '-' ) {
				key = arg.substring(1);
				next_val = _args.pop()!.trim()||'';
				if ( next_val[0] === '-' ) {
					_args.push(next_val);
					next_val = null;
				}
			}
			else {
				key = '_';
				next_val = arg;
			}



			if ( key === '_' ) {
				if ( next_val !== null ) {
					return_value._.push(next_val);
				}

				continue;
			}



			curr_val = return_value[key];
			if ( curr_val === undefined ) {
				return_value[key] = next_val;
			}
			else
			if ( overwrite_mode || curr_val === null ) {
				return_value[key] = next_val;
			}
			else 
			if ( next_val !== null ) {
				if ( !Array.isArray(curr_val) ) {
					const new_val = return_value[key] = [ curr_val ];
					new_val.push( next_val )
				}
				else {
					curr_val.push(next_val);
				}
			}
		}

		return return_value;
	}
}