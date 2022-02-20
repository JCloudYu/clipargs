# CLI Parser of Exec Arguments #
This module is a tiny library that provides argument parsing logic without further dependencies.

## Install ##
```bash
npm install clipargs
```

## Usage & Example ##
```javascript
// Assume that the script is excuted using following command
//     node _dist/test/test.js -b aa --B bb --A var0 -a var1 --_ -_ -c -col

const parsed_args = require('clipargs')
.flag('cool', '--cool', '-c', '-col')
.variable('var_a', '--A', '-a')
.array('var_b', '--B', '-b', '-bb')
.parse(process.argv.slice(2));


console.log(parsed_args);
/*
// The content of the "parsed_args" variable
{
  _: [ '--_', '-_' ],
  var_b: [ 'aa', 'bb' ],
  var_a: 'var1',
  cool: true
}
*/

```