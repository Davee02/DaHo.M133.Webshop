import * as server from "./web/server";

const port: number = 8080;

async function main() {
  await server.start(port);
  console.log(`Server started at http://localhost:${port}`);
}

main().catch(error => console.error(error));
