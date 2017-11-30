
# babel-plugin-simple-logger

[![npm](https://img.shields.io/npm/dt/babel-plugin-simple-logger.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-simple-logger)
[![npm](https://img.shields.io/npm/v/babel-plugin-simple-logger.svg?style=flat-square)](https://www.npmjs.com/package/babel-plugin-simple-logger)

This loader looks for the string literal `"log"` after the opening bracket of a function and replaces it with `console.log(<function name>, arguments)`.

## Installation & Usage

**Install the package**
```bash
npm i -D babel-plugin-simple-logger

yarn add babel-plugin-simple-logger --dev

```

**Incorporate the loader**

```js
// .babelrc
...
{
	test: /\.(js)$/,
	exclude: /(node_modules)/,
	use: [
		{ loader: 'ng-annotate-loader' },
		{ loader: 'babel-loader', options: { presets: ['es2015', 'stage-0'] } },
		{ loader: 'babel-plugin-simple-logger' }
	]
},
...

```

**Test it out**

```js

function greeter(name) { 'log'
	return `Hello, ${name || 'world'}!`
}

console.log(greeter("Gus"))

// greeter ["Gus", callee: (...), Symbol(Symbol.iterator): ƒ]
// Hello, Gus!

const berater = name => {
	"log"
	return `I'm tired of your shit, ${name || 'world'}.`
}

console.log(berater())

// anonymous [undefined, callee: (...), Symbol(Symbol.iterator): ƒ]
// I'm tired of your shit, world.

```

Keep in mind:
* `"log"` must be the first string literal following the function's opening bracket `{`.
* This loader is best used early on, it cleans up after itself and understands arrow functions.
* This loader is a litle bit brittle at the moment, I'm working on refactoring it as a babel plugin, but do keep an eye out for edge cases where it doesn't work (for example, if you try to destructure an object in the parameters).
