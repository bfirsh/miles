require("@babel/register")({
  extends: "./.babelrc",
  ignore: [/node_modules/, /server/]
});

const { MilesServer } = require("miles/server");
const Todo = require("./models/todo").default;

const server = new MilesServer();

server.registerModel(Todo);

server.listen().then(({ url }) => {
  console.log(`🎺 Server ready at ${url}`);
});
