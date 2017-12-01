
import fs from 'fs'
import { parse, transform, traverse } from 'babel-core'
import plugin from "../dist/index.js"

const fnName = "fnName"
const fnNameWithStylePrefix = `%c${fnName}`
const anonymousWithStylePrefix = `%canonymous`
const styleColor = "color: #0077cc"
const styleGray = "color: gray"

function load(str='') {
    const result = transform(str, {
      presets: ["env", "stage-0"],
      plugins: [plugin]
    })

    return result.code
}

function transformAndCall(code, invocation) {
  eval(`
    ${load(code)}
    ${invocation}
  `)
}

beforeEach(() => {
  console.log = jest.fn()
})

test("function delcarations", () => {

  const code = `
    function ${fnName}(foo, bar) {
      "log";
    }
  `

  const call = `
    ${fnName}("foo", "bar")
  `

  transformAndCall(code, call)

  expect(console.log).toHaveBeenCalledWith(
    fnNameWithStylePrefix, styleColor, "foo", "bar"
  )

})

test("function expressions", () => {

  const code = `
    const ${fnName} = function(foo, bar) {
      "log";
    }
  `

  const call = `
    ${fnName}("foo", "bar")
  `

  transformAndCall(code, call)

  expect(console.log).toHaveBeenCalledWith(
    fnNameWithStylePrefix, styleColor, "foo", "bar"
  )
})

test("arrow function expressions", () => {

  const code = `
    const ${fnName} = arg => { "log"; };
  `
  const call = `
    ${fnName}("foo")
  `

  transformAndCall(code, call)

  expect(console.log).toHaveBeenCalledWith(
    fnNameWithStylePrefix, styleColor, "foo"
  )
})

test("ignore implicit return arrow functions", () => {

  const code = `
    const ${fnName} = arg1 => "log";
  `

  const call = `
    ${fnName}("foo")
  `

  transformAndCall(code, call)

  expect(console.log).not.toHaveBeenCalled()
})

test("object methods", () => {

  const code = `
    const foo = {
      ${fnName}: function(arg1) { "log"; },
      ${fnName}Arrow: arg1 => { "log"; }
    }
  `

  const call = `
    foo.${fnName}("bar")
  `

  transformAndCall(code, call)

  expect(console.log).toHaveBeenLastCalledWith(
    fnNameWithStylePrefix, styleColor, "bar"
  )

  const callArrow = `
    foo.${fnName}Arrow("baz")
  `

  transformAndCall(code, callArrow)

  expect(console.log).toHaveBeenLastCalledWith(
    fnNameWithStylePrefix.replace("Name", "NameArrow"), styleColor, "baz"
  )

})

test("object properties", () => {

  const code = `
    const foo = {
      ${fnName}(arg1, arg2) { "log"; }
    }
  `

  const call = `
    foo.${fnName}("foo", "bar")
  `

  transformAndCall(code, call)

  expect(console.log).toHaveBeenCalledWith(
    fnNameWithStylePrefix, styleColor, "foo", "bar"
  )
})

test("anonymous cases", () => {

  const codeAndCall = `
    ["foo", "bar", "baz"].map(item => { "log"; return item; });
  `
  transformAndCall(codeAndCall)

  expect(console.log).toHaveBeenCalledTimes(3)
  expect(console.log).toHaveBeenLastCalledWith(
    anonymousWithStylePrefix, styleGray, "baz"
  )

  const arrowCodeAndCall = `
  ["foo", "bar"].map(function(item, idx) { "log"; return item; });
  `
  transformAndCall(arrowCodeAndCall)

  expect(console.log).toHaveBeenCalledTimes(5)
  expect(console.log).toHaveBeenLastCalledWith(
    anonymousWithStylePrefix, styleGray, "bar", 1
  )

})

test("class methods", () => {

  const code = `
    class Foo {
      ${fnName}(arg) {
        "log"
        return arg
      }
    }
  `

  const call = `
    const fooInstance = new Foo()
    fooInstance.${fnName}("bar")
  `

  transformAndCall(code, call)

  expect(console.log).toHaveBeenCalledWith(
    fnNameWithStylePrefix, styleColor, "bar"
  )

})

test("class properties", () => {

  const code = `
    class Foo {
      ${fnName} = arg => {
        "log"
        return arg
      }
    }
  `

  const call = `
    const fooInstance = new Foo()
    fooInstance.${fnName}("bar")
  `

  transformAndCall(code, call)

  expect(console.log).toHaveBeenCalledWith(
    fnNameWithStylePrefix, styleColor, "bar"
  )

})

test("complex arguments", () => {

  const code = `
    function ${fnName}(
      { "log": arg } = { defaultMethod() { "log" }, "log": 42 }
    ) {
      "log"
      return arg;
    }
  `

  const call = `
    ${fnName}({ log: _ => _ })
  `

  transformAndCall(code, call)
  expect(console.log).toHaveBeenCalledTimes(1)

  const callWithoutArg = `
    ${fnName}()
  `

  transformAndCall(code, callWithoutArg)
  expect(console.log).toHaveBeenCalledTimes(2)

})

test("ignore non-directive usages", () => {

  const code = `
    function ${fnName}1(log) { log("don't"); }
    function ${fnName}2(arg1) { const someVar = "log"; }
  `

  const call = `
    ${fnName}1(_ => _)
    ${fnName}2("foo")
  `

  const logCode = `
  function ${fnName}3(arg1) { console.log("foo"); }
  `

  const callLog = `
    ${fnName}3("foo")
  `

  transformAndCall(code, call)
  expect(console.log).not.toHaveBeenCalled()

  transformAndCall(logCode, callLog)
  expect(console.log).toHaveBeenCalledWith("foo")

})

test("play well with other directives", () => {

  const otherDirective = `
    function ${fnName}(arg1, arg2) { "directive"; }
  `
  const withOtherDirective = `
    function ${fnName}(arg1, arg2) { "directive"; "log"; }
  `
  const call = `
    ${fnName}("foo", "bar")
  `

  transformAndCall(otherDirective, call)
  expect(console.log).not.toHaveBeenCalled()

  transformAndCall(withOtherDirective, call)
  expect(console.log).toHaveBeenCalledWith(
    fnNameWithStylePrefix, styleColor, "foo", "bar"
  )

})

test("different colors for anonymous functions", () => {

  const code = `
    function ${fnName}(foo) {
      "log";
    }
  `

  const call = `
    ${fnName}("foo")
  `

  transformAndCall(code, call)

  expect(console.log).toHaveBeenCalledWith(
    fnNameWithStylePrefix, styleColor, "foo"
  )

  const codeAndCall = `
    (function(arg1){
      'log'
    })("foo")
  `

  transformAndCall(codeAndCall)

  expect(console.log).toHaveBeenCalledWith(
    anonymousWithStylePrefix, styleGray, "foo"
  )

})
