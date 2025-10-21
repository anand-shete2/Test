# Blogify

Blogify is a modern, interactive blogging platform designed to allow users to create, share, and engage with blog posts. With a sleek UI, secure authentication, and AI-powered features, Blogify offers a seamless experience for both readers and writers.

## System Design

## Live Demo

If you directly want to view this project:
[Blogify](https://blogify.anandshete.online)

## Features

- **Redis**: Used Redis to cache landing page blogs.
- **Blog Creation**: Add blogs using a rich Text Editor and Gemini 2.0 Flash for AI suggestions.
- **Authentication**: Supports both JWT and Google OAuth 2.0 for secure login and registration.
- **Images**: All images stored in S3 Buckets with presigned URLs for uploads.
- **Nginx**: Acts as a reverse proxy for backend APIs and serves static files.

## Tech Stack

- **Frontend**: React, Redux, TailwindCSS, ShadCN
- **Backend**: Express, Passport, JWT, Bcrypt, CORS, Sanitize-HTML, AWS SDK
- **Database**: MongoDB Atlas
- **Caching**: `ioredis`
- **AI Integration**: `@google/generative-ai`

## Local Development

### Pre-requisite

- Node.js (v20+ recommended)
- MongoDB setup locally
- AWS Account (configured IAM and S3 services)
- Redis installed locally
- Google Cloud API key (for Gemini 2.0 Flash)
- Google OAuth Key

#### Follow the below steps to run project locally

1. Clone the repository

```bash
git clone https://github.com/anand-shete/blogify.git
cd blogify
```

2. Install dependencies

```bash
cd frontend
npm install
cd ../backend
npm install
```

3. Set up environment variables

Create a `.env` file in the `backend` directory and add following variables

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.lnd7qzs.mongodb.net/
PORT=3000
NODE_ENV=your_NODE_ENV
JWT_SECRET_KEY=your_JWT_SECRET_KEY
REDIS_URI=your_REDIS_URI
FRONTEND_URL=your_FRONTEND_URL

# AWS IAM
ACCESS_KEY=your_ACCESS_KEY
SECRET_ACCESS_KEY=your_SECRET_ACCESS_KEY
BUCKET_NAME=your_BUCKET_NAME

# Google OAuth
GOOGLE_CLIENT_ID=your_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=your_GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI=your_GOOGLE_REDIRECT_URI
SESSION_KEY=your_SESSION_KEY

# Google Gemini API key
GEMINI_API_KEY=your_GEMINI_API_KEY

```

Create a .env file in the `frontend` directory with following variables

```bash
VITE_BASEURL=http://localhost:3000/api/v1
VITE_TINYMCE_API_KEY=your_TINYMCE_API_KEY
```

4. Start the server

In the `backend` directory, run script

```bash
npm run dev
```

In a new terminal, navigate to `frontend` directory

```bash
npm run dev
```

5. Verify

If you followed all the above steps properly, you should see

```bash
Redis connected successfully
MongoDB connected
🚀 Server started on http://localhost:3000
```

### Future Implementation

- [ ] Containerize application using Docker
- [ ] Scale the system to 1000+ concurrent users using AWS services
- [ ] Create System Design Architecture diagram
- [ ] Make it Mobile Responsive
- [ ] Add GitHub Pipeline