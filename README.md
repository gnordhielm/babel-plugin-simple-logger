
# babel-plugin-simple-logger

[![npm](https://img.shields.io/npm/dt/babel-plugin-simple-logger.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-simple-logger)
[![npm](https://img.shields.io/npm/v/babel-plugin-simple-logger.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-simple-logger)

> Special thanks to [Michael Jungo](https://github.com/jungomi) for helping me put the first version together.

This Babel plugin looks for the string literal `"log"` after the opening bracket of a function and replaces it with `console.log(<function name>, <arg1>, <arg2>, etc...)`.

```js
const add = (a, b) => { 'log'
	return a + b
}

// becomes...

const add = (a, b) => {
	console.log('add', a, b)
	return a + b
}
```

## Installation & Usage

**Install the package**

```bash
yarn add babel-plugin-simple-logger --dev
```

**Incorporate the plugin**

```js
// .babelrc
...
"env": {
	"development": {
		"presets": ["react", "env", "stage-0"],
		"plugins": ["simple-logger"]
	},
...
}
```

**Test it out**

```js
function greeter(name='world') { 'log'
	return `Hello, ${name}!`
}

greeter("Gus")

// logs...

greeter "Gus"
```

Note: Arrow functions with implicit returns (e.g. `(a, b) => a + b`) aren't candidates for logging with this plugin's syntax.
