const gql = require("graphql-tag");

function allQuery(model) {
  const pluralLowerModel = `${model.name.toLowerCase()}s`;
  const fieldNames = Object.keys(model.fields);
  return gql(String.raw`{ ${pluralLowerModel} { ${fieldNames.join(" ")} } }`);
}

/*
 * Produces argument strings like `$id: ID!, $completed: Boolean`
 */
function operationArguments(fields) {
  const bits = [];
  for (let name in fields) {
    // Only IDs are non-null
    if (name == "id") {
      bits.push("$id: ID!");
    } else {
      bits.push(`$${name}: ${fields[name]}`);
    }
  }
  return bits.join(", ");
}

/*
 * Produces arguments like `id: $id, completed: $completed`
 */
function mutationArguments(fields) {
  return Object.keys(fields)
    .map(name => `${name}: $${name}`)
    .join(", ");
}

function updateMutation(model) {
  return gql(String.raw`
    mutation Update${model.name}(${operationArguments(model.fields)}) {
      update${model.name}(${mutationArguments(model.fields)}) {
        success
        message
      }
    }
  `);
}

module.exports = {
  allQuery: allQuery,
  updateMutation: updateMutation
};
