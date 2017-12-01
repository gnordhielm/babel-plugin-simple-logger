
export default function({ types: t }) {
    return {
        visitor: {
            Directive(path) {
                if (t.isDirectiveLiteral(
                    path.node.value, { value: "log" }
                )) {

                    const func = path.getFunctionParent()

                    // check every plausible location for function name
                    let name = "anonymous"
                    if (t.isFunctionDeclaration(func.node)) {
                        name = func.node.id.name
                    } else if (t.isVariableDeclarator(func.parent)) {
                        name = func.parent.id.name
                    } else if (t.isObjectMethod(func.node)) {
                        name = func.node.key.name
                    } else if (t.isObjectProperty(func.parent)) {
                        name = func.parent.key.name
                    } else if (t.isClassMethod(func.node)) {
                        name = func.node.key.name
                    } else if (t.isClassProperty(func.parent)) {
                        name = func.parent.key.name
                    }

                    // create node representing log statement
                    const color = name === "anonymous" ? "gray" : "#0077cc"
                    const logNode = t.expressionStatement(
                        t.callExpression(t.identifier("console.log"), [
                            t.stringLiteral(`%c${name}`),
                            t.stringLiteral(`color: ${color}`),
                            t.identifier("arguments")
                        ])
                    )

                    // insert node
                    func.get("body").unshiftContainer("body", logNode)

                    // clean up directive
                    path.remove()


                }
            }
        }
    }
}

// export default function({}) {
//     return {
//         visitor: {
//             ExpressionStatement(path)
//         }
//     }
// }
