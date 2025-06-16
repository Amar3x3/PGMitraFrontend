# 🏠 PGMitraFrontend — PG Management System Frontend

Welcome to the **PGMitraFrontend**, a responsive and modern web application built using **React.js** for managing PG (Paying Guest) accommodations efficiently. This frontend complements the backend of the PGMitra system, providing intuitive interfaces for property owners or managers to handle tenants, rooms, and payments.

---

## 📑 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Test Credentials](#test-credentials)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 📌 About the Project

**PGMitraFrontend** is the client-facing part of a full-stack PG Management System designed to simplify property operations. The frontend allows users to manage room details, track member activity, handle payments, and maintain PG occupancy—all from a centralized dashboard.

---

## 🚀 Features

### 🔐 Authentication
- Secure Login and Registration
- Client-side validation
- Placeholder for Forgot Password

### 📊 Dashboard
- Visual summary of key PG stats (occupancy, payments)
- Quick links to core modules

### 👥 Member Management
- View/search member details
- Edit profiles (UI-level)
- Payment history preview

### 💸 Payment Tracking
- Overview of all payments received
- Placeholder for adding new transactions

### 🏘️ Room Management
- Room overview (capacity, rent, status)
- Edit/add room details (UI)

### 🌐 UI/UX
- Responsive layout using **Tailwind CSS**
- Navigation with **React Router DOM**
- Icons from **Lucide React**

---

## 🛠 Tech Stack

| Technology        | Purpose                              |
|------------------|--------------------------------------|
| React.js          | Frontend framework                   |
| Tailwind CSS      | Styling                              |
| React Router DOM  | Routing                              |
| Lucide React      | Iconography                          |
| Create React App  | Project scaffolding & tooling        |

---

## ⚙️ Getting Started

### ✅ Prerequisites

Ensure the following are installed:

- Node.js (v16 or later recommended)
- npm or Yarn

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/PGMitraFrontend.git
cd PGMitraFrontend

# Install dependencies
npm install
# or
yarn install
🧪 Running the Application
bash
Copy
Edit
npm start
# or
yarn start
Visit http://localhost:3000 in your browser.

🗂️ Project Structure
php
Copy
Edit
PGMitraFrontend/
├── public/
│   ├── assets/            # Images, icons
│   └── avatars/           # Placeholder images
├── src/
│   ├── components/        # Reusable components
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── MyPG.js
│   │   ├── Members.js
│   │   ├── MemberProfile.js
│   │   ├── Payments.js
│   │   ├── RoomDetails.js
│   │   └── SplashScreen.js
│   ├── App.js             # Main component and router
│   ├── App.css
│   ├── index.js           # App entry point
│   └── ...                # Other configuration files
📖 Usage Guide
Launch the app (npm start or yarn start).

You'll land on the SplashScreen, with options to:

Get Started → Navigate to /signup

Sign In → Navigate to /login

Use test credentials or create a new user.

Navigate through:

Dashboard (/mypg)

Rooms (/rooms)

Members (/members)

Payments (/payments)

Use the bottom navigation bar for easy access between sections.

🧪 Test Credentials
plaintext
Copy
Edit
Email:    admin@example.com
Password: admin123
🔮 Future Enhancements
🔗 Backend API Integration (Spring Boot)

✅ Full CRUD for Members, Rooms, Payments

🔐 Forgot Password + Password Reset Flow

🧍 Room assignment/unassignment to Members

🧾 Payment Receipts with date & method

👥 User Roles (Admin, Manager)

🔔 Notification System (due payments, alerts)

🧠 Smart Filtering, Search & Sort

⚠️ Better error handling & UX feedback

🤝 Contributing
Contributions are welcome! 💡
Please fork the repo, create a branch, and submit a pull request with improvements or new features.

📄 License
This project is licensed under the MIT License — see the LICENSE file for details.


