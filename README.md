
# babel-plugin-simple-logger

[![npm](https://img.shields.io/npm/dt/babel-plugin-simple-logger.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-simple-logger)
[![npm](https://img.shields.io/npm/v/babel-plugin-simple-logger.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-simple-logger)

> Special thanks to [Michael Jungo](https://github.com/jungomi) for walking me through putting this together.

This loader looks for the string literal `"log"` after the opening bracket of a function and replaces it with a console log containing the name and arguments of the enclosing function.

```js

const add = (a, b) => { 'log'
	return a + b
}

// becomes...

const add = (a, b) => {
	console.log('add', arguments)
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

function greeter(name) { 'log'
	return `Hello, ${name || 'world'}!`
}

greeter("Gus")

// greeter: ["Gus", callee: (...), Symbol(Symbol.iterator): ƒ]

const berater = name='world' => {
	"log"
	return `I'm tired of your shit, ${name}.`
}

berater()

// anonymous: [undefined, callee: (...), Symbol(Symbol.iterator): ƒ]

```

Note: Arrow functions with implicit returns aren't candidates for logging with this plugin's syntax.
