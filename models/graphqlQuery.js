const gql = require("graphql-tag");

function allQuery(model) {
  const pluralLowerModel = `${model.name.toLowerCase()}s`;
  const fieldNames = Object.keys(model.fields);
  return gql(String.raw`{ ${pluralLowerModel} { ${fieldNames.join(" ")} } }`);
}

/*
 * Produces argument strings like `$id: ID!, $completed: Boolean`
 */
function operationArgumentString(fields) {
  return fields
    .map(f => `$${f.name}: ${f.type}${f.required ? "!" : ""}`)
    .join(", ");
}

/*
 * Produces argument strings for create mutations.
 */
function createOperationArguments(model) {
  const fieldNames = Object.keys(model.fields).filter(n => n != "id");
  return operationArgumentString(
    fieldNames.map(name => {
      return {
        name: name,
        type: model.fields[name].graphqlType.name,
        required: true
      };
    })
  );
}

/*
 * Produces argument strings for update mutations.
 */
function updateOperationArguments(model) {
  const fieldNames = Object.keys(model.fields);
  return operationArgumentString(
    fieldNames.map(name => {
      return {
        name: name,
        type: model.fields[name].graphqlType.name,
        required: name == "id"
      };
    })
  );
}

/*
 * Produces arguments like `id: $id, completed: $completed`
 */
function mutationArguments(fieldNames) {
  return fieldNames.map(name => `${name}: $${name}`).join(", ");
}

function createMutationArguments(model) {
  return mutationArguments(Object.keys(model.fields).filter(n => n != "id"));
}

function updateMutationArguments(model) {
  return mutationArguments(Object.keys(model.fields));
}

function createMutation(model) {
  return gql(String.raw`
    mutation Create${model.name}(${createOperationArguments(model)}) {
      create${model.name}(${createMutationArguments(model)}) {
        success
        message
        ${model.lowerName()} {
          ${Object.keys(model.fields).join(" ")}
        }
      }
    }
  `);
}

function updateMutation(model) {
  return gql(String.raw`
    mutation Update${model.name}(${updateOperationArguments(model)}) {
      update${model.name}(${updateMutationArguments(model)}) {
        success
        message
      }
    }
  `);
}

function deleteMutation(model) {
  return gql(String.raw`
    mutation Delete${model.name}($id: ID!) {
      delete${model.name}(id: $id) {
        success
        message
      }
    }
  `);
}

module.exports = {
  allQuery: allQuery,
  createMutation: createMutation,
  updateMutation: updateMutation,
  deleteMutation: deleteMutation
};
