import { MilesServer } from "miles/server";
import Todo from "./models/todo";

const server = new MilesServer();

server.registerModel(Todo);

server.listen().then(({ url }) => {
  console.log(`🎺 Server ready at ${url}`);
});
