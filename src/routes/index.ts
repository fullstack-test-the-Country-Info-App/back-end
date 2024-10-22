import { Router } from "express";
import CountryRoutes from "./Country/route";

const routes = Router();

routes.use(CountryRoutes);

export default routes;
