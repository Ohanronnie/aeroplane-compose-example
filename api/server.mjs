import { createConnection } from "node:net";
import { createServer } from "node:http";

function databaseReachable() {
  return new Promise((resolve) => {
    const socket = createConnection({ host: process.env.DB_HOST, port: 5432 });
    socket.setTimeout(1000);
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

createServer(async (_request, response) => {
  response.setHeader("content-type", "application/json");
  response.end(
    JSON.stringify({
      service: "api",
      revision: process.env.REVISION,
      databaseReachable: await databaseReachable(),
    }),
  );
}).listen(3001, "0.0.0.0");
