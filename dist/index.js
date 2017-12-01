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
                    var params = [];
                    if (t.isFunctionDeclaration(func.node)) {
                        name = func.node.id.name;
                        params = func.node.params.map(function (param) {
                            return param.name;
                        });
                    } else if (t.isFunctionExpression(func.node) && func.node.id) {
                        name = func.node.id.name;
                        params = func.node.params.map(function (param) {
                            return param.name;
                        });
                    } else if (t.isVariableDeclarator(func.parent)) {
                        name = func.parent.id.name;
                        params = func.node.params.map(function (param) {
                            return param.name;
                        });
                    } else if (t.isObjectMethod(func.node)) {
                        name = func.node.key.name;
                        params = func.node.params.map(function (param) {
                            return param.name;
                        });
                    } else if (t.isObjectProperty(func.parent)) {
                        name = func.parent.key.name;
                        params = func.node.params.map(function (param) {
                            return param.name;
                        });
                    } else if (t.isClassMethod(func.node)) {
                        name = func.node.key.name;
                        params = func.node.params.map(function (param) {
                            return param.name;
                        });
                    } else if (t.isClassProperty(func.parent)) {
                        name = func.parent.key.name;
                        params = func.node.params.map(function (param) {
                            return param.name;
                        });
                    } else if (t.isAssignmentExpression(func.parent)) {
                        name = func.parent.left.property.name;
                        params = func.node.params.map(function (param) {
                            return param.name;
                        });
                    } else if (t.isFunctionExpression(func.node)) {
                        params = func.node.params.map(function (param) {
                            return param.name;
                        });
                    }

                    // create node representing log statement
                    var color = name === "anonymous" ? "gray" : "#0077cc";
                    var logArgs = ["\"%c" + name + "\"", "\"color: " + color + "\""].concat(_toConsumableArray(params));

                    var logNode = t.expressionStatement(t.callExpression(t.identifier("console.log"), [t.identifier(logArgs.join(", "))]));

                    // insert node
                    func.get("body").unshiftContainer("body", logNode);

                    // clean up directive
                    path.remove();
                }
            }
        }
    };
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
