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
    alias: 'p',
    default: 3000
  })
  .option({
    name: 'foo',
    env: 'FOO',
    alias: 'f',
    default: 'bar'
  });
```

And the getter:

```js
var val = config.get('port');
```