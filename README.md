# Sales Free

This is a React-based web application designed to calculate product prices, manage products, and track sales. The app is fully functional for local use with caching, dynamic data handling, and export/import capabilities, and it is free to use under the MIT license.

## Features

### 1. Product Management
- Add, edit, or delete products.
- View a paginated list of products (25 items per page).
- Includes fields for:
  - Name
  - Purchase Price
  - Taxes
  - Pricing Type (Margin or Markup)
  - Pricing Value
  - Unit (kg, ml, etc.)
  - Stock quantity

### 2. Pricing Calculation
- Real-time product price calculation based on:
  - Margin or Markup.
  - Purchase price and taxes.
- Dynamic labels to display calculated product prices.
- Handles invalid inputs (e.g., negative numbers) with error messages.
- Resets form inputs to default values.

### 3. Sales Management
- Placeholder menu for "Sell Now" and "My Sales."

### 4. Export and Import
- Export product data to a CSV file.
- Import product data from a CSV file.

### 5. Sidebar Navigation
- A responsive sidebar menu that adapts to mobile and desktop views.
- Includes navigation for:
  - Products (with submenus: Calculate Price, Products)
  - Sales (with submenus: Sell Now, My Sales)
  - Export and Import

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/product-pricing-app.git
```

2. Navigate to the project directory:
```bash
cd product-pricing-app
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open the app in your browser:
```
http://localhost:3000
```

## Usage

- Navigate to **Products** to manage and view your product list.
- Use **Calculate Price** to calculate product prices dynamically.
- Access **Export and Import** to save or load product data.

## Technologies Used

- **React**: Frontend framework.
- **React Router**: For navigation and routing.
- **Tailwind CSS**: For UI styling.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for suggestions and fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

