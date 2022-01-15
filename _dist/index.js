"use strict";
module.exports = class {
    static parse(args) {
        const return_value = { _: [] };
        const _args = args.slice(0).reverse();
        while (_args.length > 0) {
            const arg = _args.pop().trim();
            if (arg[0] !== '-') {
                return_value._.push(arg.trim());
                continue;
            }
            let key, curr_val, next_val;
            if (arg.substring(0, 2) === '--') {
                key = arg.substring(2);
                const split_idx = key.indexOf('=');
                if (split_idx < 0) {
                    next_val = '';
                }
                else {
                    next_val = key.substring(split_idx + 1);
                    key = key.substring(0, split_idx);
                }
            }
            else {
                key = arg.substring(1);
                next_val = _args.pop() || '';
            }
            curr_val = return_value[key];
            if (curr_val === undefined) {
                return_value[key] = next_val;
            }
            else {
                if (!Array.isArray(curr_val)) {
                    const new_val = return_value[key] = [curr_val];
                    new_val.push(next_val);
                }
                else {
                    curr_val.push(next_val);
                }
            }
        }
        return return_value;
    }
};
