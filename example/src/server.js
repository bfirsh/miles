import { MilesServer } from "miles/server";
import Todo from "./models/todo";

const server = new MilesServer();

server.registerModel(Todo);

server.listen({ port: 3000 }, () => {
  console.log(`🎺 Server ready at http://localhost:3000`);
});
