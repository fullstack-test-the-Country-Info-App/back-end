import { Router } from "express";
import Country from "../../controllers/Country/Country";

const CountryRoutes = Router();

CountryRoutes.get("/getAvailableCountries", Country.getCountry.bind(Country));
CountryRoutes.get("/countryInfo/:code", Country.getCountryInfo.bind(Country));

export default CountryRoutes;
