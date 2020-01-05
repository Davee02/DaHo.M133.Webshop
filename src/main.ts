import * as web from "./web";

const port: number = 8080;

async function main() {
  await web.start(port);
  console.log(`Server started at http://localhost:${port}`);
}

main().catch(error => console.error(error));
