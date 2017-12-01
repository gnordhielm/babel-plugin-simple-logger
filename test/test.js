
import fs from 'fs'
import { parse, transform, traverse } from 'babel-core'
import plugin from "../dist/index.js"

function load(str='') {
    const result = transform(str, { plugins: [plugin] })
    console.log("load", result)
    return result.code
}

// const strip = str => str
//     .replace(/\s/g,'')
//     .replace(/;/g,'')
//     .replace(/\"usestrict\"/g,'')

// test("in function", () => {
//
//     const input = `function myFunction(arg1) { "log" }`
//     const output = `
//         function myFunction(arg1) {
//             console.log("myFunction", arguments)
//         }
//     `
//     expect(strip(load(input))).toBe(strip(output))
//
// })
//
// test("ignore function with console log", () => {
//
//     const input = `function myFunction(arg1) { console.log("don't") }`
//
//     expect(strip(load(input))).toBe(strip(input))
//
// })
//
//
// test("ignore log as an argument", () => {
//
//     const input = `function myFunction(log) { log("don't") }`
//
//     expect(strip(load(input))).toBe(strip(input))
//
// })
//
// test("ignore log as a variable assignment", () => {
//
//     const input = `function myFunction(arg1) { var someVar = "log" }`
//
//     expect(strip(load(input))).toBe(strip(input))
//
// })
//
// test("ignore other directives", () => {
//
//     const input = `function myFunction(arg1) { "directive" }`
//
//     expect(strip(load(input))).toBe(strip(input))
//
// })
//
// test("with log and another directive", () => {
//
//     const input = `function myFunction(arg1) {
//         "directive"
//         "log"
//     }`
//
//     const output = `function myFunction(arg1) {
//       "directive"
//       console.log("myFunction", arguments)
//     }`
//
//     expect(strip(load(input))).toBe(strip(output))
//
// })
//
// test("with complex arguments", () => {
//
//     const input = `function complexArgsFunction(
//         { "log": arg }={ defaultMethod() { "log" }, "log": 42 }
//     ) { "log"
//         return arg
//     }`
//
//     const output = `function complexArgsFunction({ "log": arg } = { defaultMethod() {
//       console.log("defaultMethod", arguments)
//     }, "log": 42 }) {
//       console.log("complexArgsFunction", arguments)
//       return arg
//     }`
//
//     expect(strip(load(input))).toBe(strip(output))
//
// })
//
// test("in function declaration", () => {
//
//     const input = `const namedFunctionExpression = function(arg1) { "log" }`
//
//     const output = `const namedFunctionExpression = function(arg1) {
//       console.log("namedFunctionExpression", arguments)
//     }`
//
//     expect(strip(load(input))).toBe(strip(output))
//
// })
//
// test("in arrow function declaration", () => {
//
//     const input = `const namedArrowFunction = arg1 => { "log" }`
//     const output = `
//         var_arguments = arguments
//         const namedArrowFunction = arg1 => {
//             console.log("namedArrowFunction", _arguments)
//         }`
//
//     expect(strip(load(input))).toBe(strip(output))
//
// })
//
// test("ignores implicit return arrow with log", () => {
//
//     const input = `const namedArrowFunctionWithoutBlock = arg1 => "log"`
//
//     expect(strip(load(input))).toBe(strip(input))
//
// })
//
// test("within object methods", () => {
//
//     const input = `const obj = {
//         myMethod: function(arg1) { "log" },
//         arrowFnMethod: arg1 => { "log" },
//         methodShorthand(arg1) { "log" }
//     }`
//     const output = `
//     var _arguments = arguments
//     const obj = {
//       myMethod: function(arg1) {
//         console.log("myMethod", arguments)
//       },
//       arrowFnMethod: arg1 => {
//         console.log("arrowFnMethod", _arguments)
//       },
//       methodShorthand(arg1) {
//         console.log("methodShorthand", arguments)
//       }
//     }`
//
//     expect(strip(load(input))).toBe(strip(output))
//
// })
//
// test("within anonymous functions", () => {
//
//     let input = `[1, 2, 3].map(arg => { "log"
//         return arg * 2
//     })`
//     let output = `
//     var _arguments = arguments
//     [1, 2, 3].map(arg => {
//       console.log("anonymous", _arguments)
//       return arg * 2
//     })`
//
//     expect(strip(load(input))).toBe(strip(output))
//
//     input = `[1, 2, 3].map(function(arg) {
//         "log"
//         return arg * 2
//     })`
//     output = `[1, 2, 3].map(function(arg) {
//       console.log("anonymous", arguments)
//       return arg * 2
//     })`
//
//     expect(strip(load(input))).toBe(strip(output))
//
// })

// describe("function types - classes", () => {
//
//   test("property ", () => {
//
//     let input = `[1, 2, 3].map(arg => { "log"
//     return arg * 2
//     })`
//     let output = `
//     var _arguments = arguments
//     [1, 2, 3].map(arg => {
//     console.log("anonymous", _arguments)
//     return arg * 2
//     })`
//
//
//     expect(true).toBe(true)
//
//   })
//
//   test("arrow function", () => {
//
//   })
//
// })
