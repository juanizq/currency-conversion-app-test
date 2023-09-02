import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { currencies } from "./currencies/index.js";
import { rate } from "./rate/index.js";
import { docs, ui } from "./docs.js";
import { config } from "../../config.js";

export const api = async (app) => {
  if (config.DEBUG) {
    app.register(fastifySwagger, docs);
    app.register(fastifySwaggerUi, ui);
  }
  app.register(currencies, { prefix: "currencies" });
  app.register(rate, { prefix: "rate" });
};
