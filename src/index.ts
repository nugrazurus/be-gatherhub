import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { organizerController } from "./controllers/organizer";

const app = new Elysia()
  .use(swagger())
  .use(organizerController)
  .get("/", () => {return {appName: "GatherHub Backend", version: "1.0.0"}})
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
