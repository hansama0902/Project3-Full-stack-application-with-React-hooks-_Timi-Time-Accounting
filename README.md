# Project3 Timi Time Accounting with React hooks

## Author

**Shuhan Dong**

## Class Link

CS5610 Web_Development [Course Page](https://johnguerra.co/classes/webDevelopment_spring_2025/)

Instructor: John Alexis Guerra Gómez [Profile](https://johnguerra.co/)

---
## Project Objective
**Timi Time Accounting** is a full-stack web application designed for personal and family financial management, built using Node.js, Express 5, and MongoDB for the backend, and React with hooks for the frontend. The system is client-side rendered, using AJAX to asynchronously interact with the backend API, ensuring a responsive and seamless user experience.

---
## Project Screenshot

![Screenshot1](https://raw.githubusercontent.com/hansama0902/Project3-Full-stack-application-with-React-hooks-_Timi-Time-Accounting/1978fc45719c795f8517db4f77c778ff96d647ad/screenshot/screen1.png)

![Screenshot2](https://raw.githubusercontent.com/hansama0902/Project3-Full-stack-application-with-React-hooks-_Timi-Time-Accounting/1978fc45719c795f8517db4f77c778ff96d647ad/screenshot/screen2.png)

![Screenshot3](https://raw.githubusercontent.com/hansama0902/Project3-Full-stack-application-with-React-hooks-_Timi-Time-Accounting/1978fc45719c795f8517db4f77c778ff96d647ad/screenshot/screen3.png)

![Screenshot4](https://raw.githubusercontent.com/hansama0902/Project3-Full-stack-application-with-React-hooks-_Timi-Time-Accounting/1978fc45719c795f8517db4f77c778ff96d647ad/screenshot/screen4.png)

---
## Description

Timi Time Accounting provides users with an intuitive interface to:

- Switch between multiple user accounts.
- Add, edit, and delete financial transactions.
- View a dashboard summarizing total income, expenses, and balance.
- Set and monitor savings goals.
- Visualize financial data through chart Reports.
---
## Features

- **Account Management:** Easily switch between different user accounts.
- **Transaction Tracking:** Add, edit, and delete income and expense entries.
- **Dashboard Overview:** View summaries of financial data, including total income, expenses, and current balance.
- **Savings Goals:** Set and track progress toward savings objectives.
- **Data Visualization:** Interactive charts to analyze financial trends.

---
## Prerequisites 

Before running this project locally, ensure you have the following installed:

- Node.js (v14 or higher)
- React
- mongodb Atlas
- npm 
- Git
- Vercel

---
## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/hansama0902/Project3-Full-stack-application-with-React-hooks-_Timi-Time-Accounting.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd Project3-Full-stack-application-with-React-hooks-_Timi-Time-Accounting
   ```

3. **Install Backend Dependencies**

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the root directory with the following content:

   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB Atlas URI.

5. **Install Frontend Dependencies**

   Navigate to the `frontend` directory and install its dependencies:

   ```bash
   cd frontend
   npm install
   ```

6. **Build the Frontend**

   While in the `frontend` directory, build the React application:

   ```bash
   npm run build
   ```

   This will create a `build` directory containing the production-ready frontend files.

7. **Start the Backend Server**

   Return to the root directory and start the backend server:

   ```bash
   cd ..
   npm start
   ```

   The server will serve both the backend API and the frontend application.


---
## Usage

Once the server is running:

- Open your web browser and navigate to `http://localhost:3000` to access the application.
- Use the interface to manage accounts, add transactions, set savings goals, and visualize financial data.


---
## Technologies Used

- **React (Hooks)**
- **React Bootstrap 5**
- **Recharts**
- **PropTypes**
- **CSS Modules**
- **JavaScript**
- **Node.js**
- **Express**
- **MongoDB**
- **MongoDB Atlas**
- **Bootstrap 5**
- **ESLint6 & Prettier for Code Quality**
- **Vercel**

---
### View the project
Visit the project at: https://project3-full-stack-application-with-reac-hansama0902s-projects.vercel.app/
---
## License

This project is licensed under the **MIT License**.



