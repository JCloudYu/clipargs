interface UnnamedArgs {
    _: string[];
}
interface NamedArgs {
    [key: string]: string[] | string | number[] | number | boolean | undefined;
}
declare class CliPArgs {
    constructor();
    string(name: string, ...aliases: string[]): CliPArgs;
    stringArray(name: string, ...aliases: string[]): CliPArgs;
    number(name: string, ...aliases: string[]): CliPArgs;
    numberArray(name: string, ...aliases: string[]): CliPArgs;
    bool(name: string, ...aliases: string[]): CliPArgs;
    clear(): CliPArgs;
    parse<ReturnType extends NamedArgs = {}>(args: string[]): ReturnType & UnnamedArgs;
}
declare const _default: CliPArgs;
export = _default;
