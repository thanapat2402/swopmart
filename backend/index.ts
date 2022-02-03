import { FastifyServerOptions } from "fastify";
import buildApp from "./src/app";
import config from "./src/config";
import mongoose from "mongoose";

const options: FastifyServerOptions = {
  logger: true,
};
const app = buildApp(options);

//console.log(mongoose);

mongoose.connect(config.mongodb.uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => app.log.error(error));
mongoose.connection.once("open", () =>
  app.log.info("MongoDB has been connected")
);

app.listen(config.port);
