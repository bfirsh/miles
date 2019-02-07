const graphql = require("graphql");

function typeFromField(field) {
  switch (field) {
    case "ID":
      return graphql.GraphQLID;
    case "String":
      return graphql.GraphQLString;
    case "Boolean":
      return graphql.GraphQLBoolean;
    default:
      throw new Error(`unknown field type: ${field}`);
  }
}

function fieldsFromModel({ model, required, id }) {
  const fields = {};
  for (let key in model.fields) {
    // Don't include ids
    if (key === "id" && !id) {
      continue;
    }
    const type = typeFromField(model.fields[key]);
    if (required) {
      fields[key] = { type: new graphql.GraphQLNonNull(type) };
    } else {
      fields[key] = { type: type };
    }
  }
  return fields;
}

function typeFromModel(model) {
  return new graphql.GraphQLObjectType({
    name: model.name,
    fields: fieldsFromModel({ model: model, required: true, id: true })
  });
}

function generateModelTypes(models) {
  const types = {};
  for (let model of models) {
    types[model.name] = {
      model: model,
      type: typeFromModel(model)
    };
  }
  return types;
}

function generateQuery(modelTypes) {
  const fields = {};

  for (let modelName in modelTypes) {
    const model = modelTypes[modelName]["model"];
    const type = modelTypes[modelName]["type"];
    const lowerName = model.name.toLowerCase();
    const pluralLowerName = `${lowerName}s`;

    // All objects
    fields[pluralLowerName] = {
      type: new graphql.GraphQLNonNull(new graphql.GraphQLList(type)),
      args: {}
    };

    // Single object
    fields[lowerName] = {
      type: new graphql.GraphQLNonNull(type),
      args: {
        id: { type: new graphql.GraphQLNonNull(graphql.GraphQLID) }
      }
    };
  }

  return new graphql.GraphQLObjectType({
    name: "Query",
    fields: fields
  });
}

function generateMutation(modelTypes) {
  const fields = {};
  for (let modelName in modelTypes) {
    const model = modelTypes[modelName]["model"];
    const type = modelTypes[modelName]["type"];

    const responseType = new graphql.GraphQLObjectType({
      name: `${modelName}Response`,
      fields: {
        success: { type: new graphql.GraphQLNonNull(graphql.GraphQLBoolean) },
        message: { type: graphql.GraphQLString },
        [model.lowerName()]: { type: type }
      }
    });

    fields[`create${modelName}`] = {
      type: responseType,
      args: fieldsFromModel({ model: model, required: true, id: false })
    };
    fields[`update${modelName}`] = {
      type: responseType,
      args: fieldsFromModel({ model: model, required: false, id: true })
    };
  }
  return new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: fields
  });
}

function generateSchema(models) {
  const modelTypes = generateModelTypes(models);

  const schema = graphql.printSchema(
    new graphql.GraphQLSchema({
      query: generateQuery(modelTypes),
      mutation: generateMutation(modelTypes)
    })
  );
  return schema;
}

module.exports = { generateSchema: generateSchema };
