# Technical Assessment – Product & Sales Dashboard

## 📋 Overview

This project is a full-stack web application designed as a technical assessment. It features a .NET 8 API backend and a modern frontend built with React, TypeScript, and Vite. The system fetches and stores product and sales data from an external API into a local in-memory database and displays it in a user-friendly interface with filtering, pagination, and reporting features.

---

## 💠 Tech Stack

### Backend

* **C# / .NET 8**
* **ASP.NET Core Web API**
* **HttpClient** – for external API integration
* **Entity Framework Core InMemory** – for temporary data storage

### Frontend

* **React** (with Vite)
* **TypeScript**
* **React DOM**
* **Axios** – for HTTP requests
* **Bootstrap** – for UI styling and layout

---

## 🔗 API Endpoints

The backend exposes and consumes the following endpoints:

### Internal API Integration

* `GET api/products` – Retrieves the list of products
* `GET api/sales?productId=1&startDate=2025-04-24&endDate=2025-04-29&page=1&pageSize=5` – Retrieves sales data for a specific product with filters

### External API Integration

The application calls singular systems API to get products and Sales and store into Local memory

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

### Prerequisites

* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Node.js](https://nodejs.org/) (v18 or above recommended)
* [npm](https://www.npmjs.com/)

---

### 1. Run the Backend (API)

```bash
cd .\ProductSalesDashboard.API\
dotnet run
```

* The backend will launch on **HTTPS port 7229**.
* Make sure this port is accessible and not blocked by firewall settings.

---

### 2. Run the Frontend (Client)

Open another terminal:

```bash
cd .\ProductSalesDashboard.Client\
npm install
npm run dev
```

* This will launch the Vite-powered React app.
* By default, it runs on `http://localhost:300/`.

---

## 🧹 Application Features

### ✅ Product Screen

* Displays all available products in a responsive grid.
* Pulls data from the local API (which mirrors the external source).
* Uses Bootstrap for clean, consistent UI.

### ✅ Sales Dashboard Screen

* Lists sales associated with clicked product.
* Includes:

  * Filtering by **product**
  * Filtering by **date range**
  * **Pagination** (max 50 records per page)

