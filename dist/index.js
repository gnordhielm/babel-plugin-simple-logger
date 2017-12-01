"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_ref) {
    var t = _ref.types;

    return {
        visitor: {
            Directive: function Directive(path) {
                if (t.isDirectiveLiteral(path.node.value, { value: "log" })) {

                    var func = path.getFunctionParent();

                    // check every plausible location for function name
                    var name = "anonymous";
                    if (t.isFunctionDeclaration(func.node)) {
                        name = func.node.id.name;
                    } else if (t.isVariableDeclarator(func.parent)) {
                        name = func.parent.id.name;
                    } else if (t.isObjectMethod(func.node)) {
                        name = func.node.key.name;
                    } else if (t.isObjectProperty(func.parent)) {
                        name = func.parent.key.name;
                    }

                    // create node representing log statement
                    var logNode = t.expressionStatement(t.callExpression(t.identifier("console.log"), [t.stringLiteral("> " + name), t.identifier("arguments")]));

                    // insert node
                    func.get("body").unshiftContainer("body", logNode);

                    // clean up directive
                    path.remove();
                }
            }
        }
    };
};
