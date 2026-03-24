# Cinevalut - Full Stack Movie Browsing App

A full-stack movie browsing application built with **React, Node.js, Express, and MongoDB**.  
Users can browse and search movies, explore detailed movie information, manage favorites and watchlists, and use secure authentication features including **signup, login, and forgot/reset password**.

## Live Demo

**Live Demo:** https://www.bhargavmoviebrowsingapp.win/
**GitHub Repository:** https://github.com/Bhargav6100/my-movie-app

---

## Features

- Secure user authentication with JWT
- User signup, login, and logout
- Forgot/reset password flow with email integration using Resend
- Browse and search movies
- Filter movies by genre
- Add/remove movies from favorites
- Add/remove movies from watchlist
- Interactive movie details experience
- View trailers, credits, and related/similar content
- TMDB API integration for movie data
- Desktop-first UI
- Full deployment using Vercel and Render

---

## Tech Stack

### Frontend
- React
- React Router
- Context API
- Custom Hooks
- CSS Modules

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Resend

### APIs / Deployment
- TMDB API
- Vercel
- Render

---

## Screenshots

 screenshots:
- Home page
  <img width="1897" height="909" alt="Screenshot 2026-03-24 125442" src="https://github.com/user-attachments/assets/eef79ef4-15c9-4384-9802-ce2d954c7af3" />

- Authentication modal
  <img width="1414" height="835" alt="Screenshot 2026-03-24 125551" src="https://github.com/user-attachments/assets/11d981fb-cafb-457d-981c-d41c98f532c4" />

- Movie details modal
- <img width="1638" height="881" alt="Screenshot 2026-03-24 125512" src="https://github.com/user-attachments/assets/2aca398e-be16-4f5a-87d3-f5deafae49a0" />

- Reset password page
<img width="1188" height="854" alt="Screenshot 2026-03-24 125643" src="https://github.com/user-attachments/assets/6e7601d3-4bb3-4924-a718-edbd68528c54" />

## Environment Variables

Create a .env file inside the backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_TOKEN=your_tmdb_api_token
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=Movie App <your_verified_sender_email>
FRONTEND_URL=your_frontend_url

Create a .env file inside the frontend folder and add:

VITE_API_BASE_URL=your_backend_base_url

## Local Setup

1. Clone the repo

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

2. Install Frontend dependencies

cd frontend
npm install

3. Install Backend dependencies

cd backend
npm install

## Running the project locally

cd backend
npm run dev

cd frontend
npm run dev

## Production Deployment

Frontend
Deployed on Vercel

Backend
Deployed on Render

Email Service
Password reset emails are handled through Resend

## Key Learnings

This project helped me strengthen my skills beyond frontend development and gain hands-on experience with full-stack development, including:

• Building and connecting frontend and backend systems
• Implementing JWT-based authentication
• Working with MongoDB and Mongoose
• Integrating third-party APIs
• Handling forgot/reset password flows securely
• Deploying frontend and backend applications to production
• Debugging real-world issues related to routing, email delivery, and environment configuration

## Challenges solved

Some of the practical challenges I worked through during this project:

• Migrating from Nodemailer to Resend for password reset emails
• Fixing production routing issues for reset-password links
• Managing environment variables across local and production environments
• Handling frontend/backend integration cleanly with deployed services
• Implementing secure token-based password reset flow

## Future Improvements

• Improve mobile responsiveness
• Add email verification during signup
• Add profile management
• Improve filtering and sorting options
• Enhance UI/UX polish and accessibility
• Add better loading states and error handling

## Author

Bhargav Fofandi
https://www.linkedin.com/in/bhargav-fofandi

## Notes

This project is currently desktop-first and optimized mainly for larger screens.
Mobile responsiveness is planned as one of the next improvements.

