
const plugin = require("../dist/index.js").default

test("empty function", () => {

    function myFunction(arg1) { "log" }

    function myFunction(arg1) {
      console.log("myFunction", arguments)
    }

})

test("function with console log", () => {

    function myFunction(arg1) { console.log("don't") }
    function myFunction(arg1) { console.log("don't") }

})



test("log as an argument", () => {
    function myFunction(log) { log("don't") }
    function myFunction(log) { log("don't") }
})

test("log as a variable assignment", () => {
    function myFunction(arg1) { const someVar = "log" }
    function myFunction(arg1) { const someVar = "log" }
})

test("with another directive", () => {
    function myFunction(arg1) { "use strict" }
    function myFunction(arg1) { "use strict" }
})

test("with log and another directive", () => {
    function myFunction(arg1) {
        "use strict"
        "log"
    }
    function myFunction(arg1) {
      "use strict"
      console.log("myFunction", arguments);
    }
})

test("with complex arguments", () => {
    function complexArgsFunction(
        { "log": arg }={ defaultMethod() { "log" }, "log": 42 }
    ) { "log"
        return arg
    }

    function complexArgsFunction({ "log": arg } = { defaultMethod() {
      console.log("defaultMethod", arguments)
    }, "log": 42 }) {
      console.log("complexArgsFunction", arguments)
      return arg
    }

})

test("in function declaration", () => {
    const namedFunctionExpression = function(arg1) { "log" }
    const namedFunctionExpression = function(arg1) {
      console.log("namedFunctionExpression", arguments)
    }

})

test("in arrow function declaration", () => {
    const namedArrowFunction = arg1 => { "log" }
    const namedArrowFunction = arg1 => {
      console.log("namedArrowFunction", arguments)
    }
})

test("ignores implicit return arrow with log", () => {
    const namedArrowFunctionWithoutBlock = arg1 => "log"
    const namedArrowFunctionWithoutBlock = arg1 => "log"

})

test("within object methods", () => {
    const obj = {
        myMethod: function(arg1) { "log" },
        arrowFnMethod: arg1 => { "log" },
        methodShorthand(arg1) { "log" },
    }

    const obj = {
      myMethod: function(arg1) {
        console.log("myMethod", arguments)
      },
      arrowFnMethod: arg1 => {
        console.log("arrowFnMethod", arguments)
      },
      methodShorthand(arg1) {
        console.log("methodShorthand", arguments)
      },
    }
})

test("within anonymous functions", () => {
    [1, 2, 3].map(arg => { "log" return arg * 2 })
    [1, 2, 3].map(function(arg) { "log" return arg * 2 })

    [1, 2, 3].map(arg => {
      console.log("anonymous", arguments)
      return arg * 2
    })
    [1, 2, 3].map(function(arg) {
      console.log("anonymous", arguments)
      return arg * 2
    })
})
