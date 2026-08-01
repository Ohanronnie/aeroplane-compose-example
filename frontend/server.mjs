import { createServer } from "node:http";

createServer((_request, response) => {
  response.setHeader("content-type", "application/json");
  response.end(
    JSON.stringify({ service: "frontend", revision: process.env.REVISION }),
  );
}).listen(3000, "0.0.0.0");
