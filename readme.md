Patient Dashboard

A simple patient management dashboard that allows providers to add, view, edit, delete, search, filter, and sort patient records.

⸻

🛠 Tech Stack
• Frontend: React, TypeScript, MUI, React Hook Form, React Query
• Backend: Node.js, Express, Sequelize
• Database: PostgreSQL

⸻

✨ Features
• Add new patients
• Edit and delete existing patients
• Filter by status
• Search by patient name
• Sort by name (A–Z / Z–A toggle)
• Responsive and accessible UI

⸻

🚀 Getting Started

Prerequisites
• Node.js (v18+)
• PostgreSQL

⸻

1. Clone the repository

git clone https://github.com/robin-stewart/patient-dashboard.git
cd patient-dashboard

⸻

2. Backend Setup

cd backend
npm install

Create a .env file in the backend folder with the following content:

DATABASE_URL=postgres://your_user:your_password@localhost:5432/patientdb

Start the backend server:

npx ts-node index.ts

⸻

3. Frontend Setup

cd frontend
npm install
npm run dev

    •	Frontend: http://localhost:5173
    •	Backend: http://localhost:3001
