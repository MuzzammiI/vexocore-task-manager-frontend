Task Manager Frontend
This is the frontend for the Task Manager app, built with React and Vite. It provides a responsive UI for user authentication (signup/login) and task management (CRUD operations, status toggling).
Features

User signup and login with JWT authentication.
Task creation, editing, deletion, and status toggling.
Responsive design with Tailwind CSS (or custom CSS).
Deployed on Vercel for free hosting.

Prerequisites

Node.js (v16 or higher)
Vercel account (for deployment)
GitHub account
Backend deployed (e.g., on Render) with an accessible API URL

Setup

Clone the Repository (if not already done):
git clone https://github.com/MuzzammiI/vexocore-Frontend.git
cd frontend


Install Dependencies:
npm install


Configure Environment:Create a .env file in the frontend directory based on .env.example:
VITE_API_URL=http://localhost:5000/api

Replace http://localhost:5000/api with the deployed backend URL (e.g., https://task-manager-backend.onrender.com/api) after backend deployment.

Run Locally:
npm run dev

Open http://localhost:5173 to test the app. Ensure the backend is running.


Deployment (Vercel)

Push to GitHub:
git add .
git commit -m "Initial frontend commit"
git push origin main


Install Vercel CLI:
npm install -g vercel


Deploy:
vercel


Scope: Your Vercel account.
Project Name: vexacore-frontend
Framework: Vite
Root Directory: . (or frontend if in a monorepo)
Build Command: npm run build
Output Directory: dist
Environment Variables: Add VITE_API_URL=https://task-manager-backend.onrender.com/api (use your backend URL).
Select Free plan.


Verify Deployment:

Vercel provides a URL (e.g., https://task-manager-frontend.vercel.app).
Test signup, login, and task management.
Check the browser console for errors (e.g., URI malformed).



Troubleshooting

URI Malformed Error:

Open the browser’s Developer Tools (F12) > Network tab and look for failed requests.
Check the console for Request URL logs from src/services/api.js.
Ensure VITE_API_URL matches the deployed backend URL exactly (no trailing slashes or special characters).
Example: VITE_API_URL=https://task-manager-backend.onrender.com/api
Clear Vite cache:rm -rf node_modules/.vite
npm run dev




CORS Issues:

Ensure the backend allows the frontend URL in its CORS policy (e.g., https://task-manager-frontend.vercel.app).
Redeploy the backend if CORS settings are updated.


Build Issues:

Ensure all JSX files use .jsx extension (e.g., App.jsx, Navbar.jsx).
Run npm run build locally to test the production build:npm run build
npm run preview





Notes

The frontend uses .jsx for all React components, as required by Vite.
Free tier limits: Vercel provides 1 GB bandwidth and 100 GB-hours/month, suitable for low-traffic apps (~50-70k page views).
Monitor browser console logs during testing to catch any API request issues.
