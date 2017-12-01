
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
                    let params = []
                    if (t.isFunctionDeclaration(func.node)) {
                        name = func.node.id.name
                      	params = func.node.params.map(param => param.name)
                    } else if (t.isFunctionExpression(func.node) &&
                       func.node.id) {
                        name = func.node.id.name
                      	params = func.node.params.map(param => param.name)
                    } else if (t.isVariableDeclarator(func.parent)) {
                        name = func.parent.id.name
                      	params = func.node.params.map(param => param.name)
                    } else if (t.isObjectMethod(func.node)) {
                        name = func.node.key.name
                        params = func.node.params.map(param => param.name)
                    } else if (t.isObjectProperty(func.parent)) {
                        name = func.parent.key.name
                      	params = func.node.params.map(param => param.name)
                    } else if (t.isClassMethod(func.node)) {
                        name = func.node.key.name
                        params = func.node.params.map(param => param.name)
                    } else if (t.isClassProperty(func.parent)) {
                        name = func.parent.key.name
                      	params = func.node.params.map(param => param.name)
                    } else if (t.isAssignmentExpression(func.parent)) {
                        name = func.parent.left.property.name
                      	params = func.node.params.map(param => param.name)
                    } else if (t.isFunctionExpression(func.node)) {
                      	params = func.node.params.map(param => param.name)
                    }

                    // create node representing log statement
                    const color = name === "anonymous" ? "gray" : "#0077cc"
                    const logArgs = [
                      `"%c${name}"`,
                      `"color: ${color}"`,
                      ...params
                    ]

                    const logNode = t.expressionStatement(
                        t.callExpression(t.identifier("console.log"), [
                            t.identifier(logArgs.join(", "))
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
