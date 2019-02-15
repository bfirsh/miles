import { MilesServer } from "miles-prototype/server";
import path from "path";

const server = new MilesServer({
  entry: path.resolve(__dirname, "../client/index.js"),
  public: path.resolve(__dirname, "../public")
});

// Register your models here...
// server.registerModel(Todo);

server.listen({ port: 3000 }, () => {
  console.log(`🎺 Server ready at http://localhost:3000`);
});
