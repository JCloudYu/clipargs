# CLI Parser of Exec Arguments #
This module is a tiny library that provides argument parsing logic without further dependencies.

## Install ##
```bash
npm install clipargs
```

## Usage ##
```javascript
const parsed_args = require('clipargs').parse(process.argv.slice(2));

const parsed_args = require('clipargs').parse(process.argv.slice(2), true);
```

## Api ##
### Clipargs.parse(args:string[], overwrite_mode:boolean) ###
The sole api available for developers, the first argument are the received cli args and the second argument controls whether the repeated variables' values are collected as arrays.

## Example with overwrite_mode is set to true or omitted ##
### Arguments
```
node _dist/test/test.js --a=b --k -_ -c -d 456 -a str val1 val2
```
### Result
```javascript
{
	// property "_" is an array of unnamed values
    "_": [
        "val1",
        "val2"
    ],

	// repetitive variables will be overwritten
    "a": "str",

    "c": null,
    "d": "456"
}
```


## Example with overwrite_mode is set to false ##
### Arguments
```
node _dist/test/test.js --a=b --k -_ -c -d 456 -a str val1 val2
```
### Result
```javascript
{
	// property "_" is an array of unnamed values
    "_": [
        "val1",
        "val2"
    ],

	// variables represetned multiple times will be collected into an array
    "a": [
        "b",
        "str"
    ],

    "c": null,
    "d": "456"
}
```