# Asset Trade Tracker

A full-stack application for tracking digital asset trades and visualizing price trends. This project consists of a .NET 8 backend API and a React frontend.

## Project Structure

The solution is organized into two main parts:

### 1. Backend (`DigitalAssets.Api`)
Located in the `DigitalAssets.Api` directory, this is a .NET 8 Web API project.

-   **`Controllers/`**: Contains API controllers.
    -   `DigitalAssetsController.cs`: Handles HTTP requests for asset data (GET /api/assets, POST /api/assets).
-   **`Data/`**: Database context configuration.
    -   `AppDbContext.cs`: Entity Framework Core context for database interaction.
-   **`Models/`**: Data models.
    -   `DigitalAsset.cs`: Represents a digital asset entity (Symbol, Price, MarketCap, etc.).
-   **`Program.cs`**: Application entry point, service configuration (DI, CORS, DB), and middleware setup.
-   **`appsettings.json`**: Configuration file, including the database connection string.

### 2. Frontend (`digital-assets-ui`)
Located in the `digital-assets-ui` directory, this is a React application built with Vite.

-   **`src/`**: Source code.
    -   **`components/`**: Reusable UI components.
        -   `PriceChart.jsx`: Chart.js component for visualizing asset prices.
    -   **`services/`**: API communication.
        -   `api.js`: Axios instance configured with the backend base URL.
    -   `App.jsx`: Main application component containing the dashboard layout, trade form, and state management.
    -   `main.jsx`: Entry point for the React application.
-   **`public/`**: Static assets.
-   **`package.json`**: Node.js dependencies and scripts.

## Prerequisites

-   [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [SQL Server](https://www.microsoft.com/sql-server/sql-server-downloads) (LocalDB or full instance)

## Getting Started

Follow these steps to run the application locally.

### Backend Setup

1.  Navigate to the API directory:
    ```bash
    cd DigitalAssets.Api
    ```
2.  Ensure your `appsettings.json` has a valid connection string for your SQL Server instance.
3.  Start the backend server:
    ```bash
    dotnet run --launch-profile http
    ```
    The API will be available at `http://localhost:5141`.

### Frontend Setup

1.  Open a new terminal and navigate to the UI directory:
    ```bash
    cd digital-assets-ui
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or the port shown in the terminal).

## API Documentation

The backend exposes the following endpoints:

### Base URL
`http://localhost:5141`

### Endpoints

-   **GET `/api/assets`**
    -   Retrieves a list of all digital assets.
    -   **Response**: Array of `DigitalAsset` objects.

-   **POST `/api/assets`**
    -   Adds a new digital asset.
    -   **Body**: JSON object matching `DigitalAsset` schema.
    ```json
    {
      "symbol": "BTC",
      "price": 30000,
      "marketCap": 500000000,
      "timestamp": "2023-10-27T10:00:00Z"
    }
    ```

## Technologies Used

-   **Frontend**: React, Vite, Chart.js, Axios, CSS Modules.
-   **Backend**: ASP.NET Core Web API, Entity Framework Core.
-   **Database**: SQL Server.
