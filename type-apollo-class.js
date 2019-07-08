var path = require("path");
var changeCase = require("change-case");

const imp = `
    import * as Type from "./types";
    import * as Node from "./nodes";
    import * as ApolloType from "apollo-client";
    import ApolloClient from "apollo-client";
    export interface ClientClass {readonly client: ApolloClient<any>;}        
`;

function makeClassHeader(basename) {
  return `
    export class ${changeCase.pascalCase(
      basename
    )}Client implements ClientClass{
        constructor(readonly client: ApolloClient<any>) {}          
    `;
}

function makeClassMethods(operations) {
  return operations.map(e => {
    const camelName = changeCase.camelCase(e.name);
    const pascalName = changeCase.pascalCase(e.name);
    const pascalOperation = changeCase.pascalCase(e.operation);

    const queryType = `Type.${pascalName + pascalOperation}`;
    const variableType = `Type.${pascalName + pascalOperation + "Variables"}`;
    const optionType = getOptionName(e.operation, queryType, variableType);

    return `
    ${camelName} = (options?:Omit<${optionType},"${operationQueryName[e.operation]}">) => 
        this.client.${operationName[e.operation]}<${queryType},${variableType}>
        ({...options,...{${operationQueryName[e.operation]}:Node.${pascalName}}})    
    `;
  });
}

const operationName = {
  query: "query",
  mutation: "mutate",
  subscription: "subscribe"
};

function getOptionName(operation, query, variable) {
  switch (operation) {
    case "query":
      return `ApolloType.QueryOptions<${variable}>`;
    case "mutation":
      return `ApolloType.MutationOptions<${query},${variable}>`;
    case "subscription":
      return `ApolloType.SubscriptionOptions<${variable}>`;
  }
}

const operationQueryName = {
    query: "query",
    mutation: "mutation",
    subscription: "query"
};

module.exports = {
  plugin: (schema, documents, config) => {
    const classes = documents
      .map(doc => {
        const filePath = doc.filePath;
        const baseName = path.basename(filePath, path.extname(filePath));

        const classHeader = makeClassHeader(baseName);

        const definitions = doc.content.definitions;
        const operations = definitions.map(e => ({
          operation: e.operation,
          name: e.name.value
        }));
        const methods = makeClassMethods(operations);

        return [classHeader, methods.join("\n"), `}`].join("\n");
      })
      .join("\n");

    return [imp, classes].join("\n");
  }
};
