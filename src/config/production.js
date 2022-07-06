import helmet from "helmet";
import compression from "compression";

export function production(app) {
  app.use(helmet());
  app.use(compression());
}
