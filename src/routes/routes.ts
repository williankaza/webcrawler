import { Router } from "express";
import appearencesRouter from "./appearences.routes";

const routes = Router();

routes.use('/appearences', appearencesRouter);

export default routes;