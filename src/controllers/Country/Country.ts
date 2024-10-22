import { Request, Response } from "express";
import "dotenv/config";

const DATE_NAGER_API_URL = process.env.DATE_NAGER_API_URL;
const COUNTRIES_NOW_API_URL = process.env.COUNTRIES_NOW_API_URL;

class CountryController {
  public async getCountry(req: Request, res: Response): Promise<any> {
    try {
      const response = await fetch(
        `${DATE_NAGER_API_URL}/api/v3/AvailableCountries`
      );
      if (!response.ok) {
        return res.status(response.status).json({
          message: "Failed to fetch available countries",
          error: response.statusText,
        });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
  public async getCountryInfo(req: Request, res: Response): Promise<any> {
    const countryCode = req.params.code;
    try {
      const borderCountriesResponse = await fetch(
        `${DATE_NAGER_API_URL}/api/v3/CountryInfo/${countryCode}`
      );
      if (!borderCountriesResponse.ok) {
        return res
          .status(borderCountriesResponse.status)
          .json({ message: "Failed to fetch border countries" });
      }

      const borderCountriesData = await borderCountriesResponse.json();
      const borderCountries = borderCountriesData.borders || [];

      const populationResponse = await fetch(
        `${COUNTRIES_NOW_API_URL}/api/v0.1/countries/population`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: borderCountriesData.commonName }),
        }
      );

      if (!populationResponse.ok) {
        return res
          .status(populationResponse.status)
          .json({ message: "Failed to fetch population data" });
      }
      const populationData = await populationResponse.json();

      const flagResponse = await fetch(
        `${COUNTRIES_NOW_API_URL}/api/v0.1/countries/flag/images`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: borderCountriesData.commonName }),
        }
      );

      if (!flagResponse.ok) {
        return res
          .status(flagResponse.status)
          .json({ message: "Failed to fetch flag data" });
      }
      const flagData = await flagResponse.json();

      return res.status(200).json({
        country: borderCountriesData.commonName,
        borders: borderCountries,
        populationData: populationData.data,
        flagUrl: flagData.data.flag,
      });
    } catch (error) {
      return res.status(500).json({
        error: "An error occurred while fetching country information",
      });
    }
  }
}

export default new CountryController();
