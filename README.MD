# Country Information API

This project provides an API endpoint to retrieve detailed information about a specific country. The API collects data such as border countries, historical population data, and the URL of the country’s flag from external sources.

## Features

- **Border Countries**: A list of countries that share a border with the selected country.
- **Population Data**: Historical population data suitable for plotting on a chart.
- **Flag URL**: A URL to the country’s flag image.

## Endpoints

### 1. Get Country Info

**URL**: `/countryInfo/:code`

Retrieves detailed information about a country, including border countries, population data, and flag URL.

- **Method**: GET
- **Path Parameter**:
  - `:code`: The country code (e.g., `UA` for Ukraine).
- **Response**:
  - `country`: Name of the country.
  - `borders`: List of countries sharing a border with the country.
  - `populationData`: Historical population data for the country.
  - `flagUrl`: The URL of the country's flag image.

### Example Request

```
GET /countryInfo/UA
```

### Example Response

```json
{
  "country": "Ukraine",
  "borders": ["Poland", "Romania", "Hungary"],
  "populationData": [
    { "year": 2020, "population": 44134693 },
    { "year": 2019, "population": 44222947 }
  ],
  "flagUrl": "https://example.com/flags/ukraine.png"
}
```

## Installation

To install and run this project locally, follow these steps:

### Running Locally

1. Clone the repository:

```bash
git clone https://github.com/yourusername/country-info-api.git
```

2. Navigate to the project directory:

```bash
cd country-info-api
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and add the following variables:

```
PORT=8000
DATE_NAGER_API_URL="https://date.nager.at"
COUNTRIES_NOW_API_URL="https://countriesnow.space"
```

5. Start the server:

```bash
npm run dev
```

The server will start at `http://localhost:8000`.

### Running with Docker

Alternatively, you can run the project using Docker.

1. **Build and run the container**:

```bash
docker-compose up --build
```

This will build the Docker image and start the server inside a container.

2. **Access the API**:

Once the container is up and running, you can access the API at `http://localhost:8000`.

To stop the containers, run:

```bash
docker-compose down
```

### Docker Environment

The `docker-compose.yml` file will automatically set the necessary environment variables, but you can adjust them if needed by editing the `.env` file.

## Usage

To get information about a country, send a `GET` request to:

```
http://localhost:8000/countryInfo/:code
```

Replace `:code` with the country code of your choice (e.g., `UA` for Ukraine).

## Dependencies

- **Express**: Web framework for Node.js.
- **dotenv**: Loads environment variables from a `.env` file.
- **Docker**: Containerization platform to run the project in an isolated environment.

## License

This project is licensed under the MIT License.
