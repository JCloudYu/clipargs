"use strict";
const AliasFormat = /(^[-]{1,2}[^-]+$)/u;
const _Captures = new WeakMap();
class CliPArgs {
    constructor() {
        _Captures.set(this, { alias_map: {}, var_map: {} });
    }
    variable(name, ...aliases) {
        const { var_map } = _Captures.get(this);
        name = name.trim();
        if (name === '_') {
            throw new RangeError("Option \`_\` is a reserved word!");
        }
        if (!var_map[name]) {
            var_map[name] = { is_var: true, is_array: false, aliases: [] };
        }
        if (!var_map[name].is_var) {
            throw new SyntaxError(`Option \"${name}\" has been declared as flag already!`);
        }
        RegisterAlias.call(this, name, aliases);
        return this;
    }
    array(name, ...aliases) {
        this.variable(name, ...aliases);
        _Captures.get(this).var_map[name].is_array = true;
        return this;
    }
    flag(name, ...aliases) {
        const { var_map: capture_map } = _Captures.get(this);
        name = name.trim();
        if (name === '_') {
            throw new RangeError("Option \`_\` is a reserved word!");
        }
        if (!capture_map[name]) {
            capture_map[name] = { is_var: false, is_array: false, aliases: [] };
        }
        if (capture_map[name].is_var) {
            throw new SyntaxError(`Option \"${name}\" has been declared as variable already!`);
        }
        RegisterAlias.call(this, name, aliases);
        return this;
    }
    clear(name) {
        name = name.trim();
        if (name !== "_") {
            const { var_map, alias_map } = _Captures.get(this);
            const { aliases } = var_map[name];
            delete var_map[name];
            for (const alias of aliases) {
                delete alias_map[alias];
            }
        }
        return this;
    }
    reset() {
        _Captures.set(this, { alias_map: {}, var_map: {} });
        return this;
    }
    parse(args) {
        var _a;
        const { var_map: capture_map, alias_map } = _Captures.get(this);
        const return_value = { _: [] };
        const _args = args.slice(0).reverse();
        while (_args.length > 0) {
            const arg = _args.pop().trim();
            const name = alias_map[arg];
            if (name === undefined) {
                return_value._.push(arg);
                continue;
            }
            const { is_var, is_array } = capture_map[name];
            if (!is_var) {
                return_value[name] = true;
                continue;
            }
            const value = ((_a = _args.pop()) === null || _a === void 0 ? void 0 : _a.trim()) || null;
            if (value === null)
                continue;
            const registered_value = return_value[name];
            if (registered_value === undefined) {
                return_value[name] = is_array ? [value] : value;
            }
            else if (Array.isArray(registered_value)) {
                registered_value.push(value);
            }
            else {
                return_value[name] = value;
            }
        }
        return return_value;
    }
}
function RegisterAlias(name, aliases) {
    const { var_map: capture_map, alias_map } = _Captures.get(this);
    const { aliases: alias_registry } = capture_map[name];
    for (let alias of aliases) {
        alias = ('' + alias).trim();
        if (!AliasFormat.test(alias)) {
            console.error(`Alias should only be started with \"-\" or \"--\"! Skipping \"${alias}\" for option \"${name}\"...`);
            continue;
        }
        if (alias_map[alias] && alias_map[alias] !== name) {
            console.error(`Alias \`${alias}\` has been used by option \`${alias_map[alias]}\`! Skipping...`);
            continue;
        }
        alias_registry.push(alias);
        alias_map[alias] = name;
    }
}
module.exports = new CliPArgs();
