import { MilesServer } from "miles/server";
import path from "path";

import Todo from "../client/models/todo";

const server = new MilesServer({
  entry: path.resolve(__dirname, "../client/index.js"),
  public: path.resolve(__dirname, "../public")
});

server.registerModel(Todo);

server.listen({ port: 3000 }, () => {
  console.log(`🎺 Server ready at http://localhost:3000`);
});
