# CLI Parser of Exec Arguments #
This module is a tiny library that provides argument parsing logic without further dependencies.

## Install ##
```bash
npm install clipargs
```

## Usage & Example ##
```javascript
// Assume that the script is excuted using following command
//     node _dist/test/test.js -b=fail -b aa --B bb --A "--A= var0" var_k -a var1 --A=  --_ -_ -c -col -dd " space1" --D=" space2"

const parsed_args = require('clipargs')
.flag('cool', '--cool', '-c', '-col')
.variable('var_a', '--A', '-a')
.array('var_b', '--B', '-b', '-bb')
.array('var_d', '--D', '-dd')
.parse(process.argv.slice(2));


console.log(parsed_args);
/*
// The content of the "parsed_args" variable
{
  _: [ '-b=fail', 'bb', 'var_k', '--_', '-_' ],
  var_b: [ 'aa' ],
  var_a: '',
  cool: true,
  var_d: [ 'space1', ' space2' ]
}
*/

```