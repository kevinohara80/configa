configa
=======

app configuration management for node.js

This is a really simple module. It basically allows you to have a mix of configuration/arguments in the form of CLI arguments, ENV vars, and defaults. The important thing is the priority in case the values are set in multiple ways. The values are returned using the following priority:

1. `CLI Arguments` (argv)
2. `ENV Variable` (process.env)
3. `Default value`

## Usage

Installation:

```js
npm install configa
```

Setup:

```js
var config = require('configa')();

config
  .option({
    name: 'port',
    env: 'PORT',
    alias: 'p', // a cli alias like -p
    type: Number,
    default: 3000
  })
  .option({
    name: 'foo',
    env: 'FOO',
    alias: 'f',
    type: String,
    default: 'bar'
  })
  .option({
    name: 'bar',
    env: 'BAR',
    type: Boolean,
    default: false
  });
```

And the getter:

```js
var val = config.get('port');
```

The `store()` method caches the calculated values for performance:

```js
config
  .option({
    name: 'port',
    env: 'PORT',
    alias: 'p', // a cli alias like -p
    default: 3000
  })
  .store();
```