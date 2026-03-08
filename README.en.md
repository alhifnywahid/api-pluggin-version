# Multi-Feature REST API

A Node.js and Express-based REST API that provides a wide range of services including social media downloaders, AI-powered tools, data search utilities, user management, and content scraping from various platforms. This API can be deployed directly to Vercel and uses MongoDB as its database.

---

[Versi Indonesia](./README.md)

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [API Key Authentication](#api-key-authentication)
- [Deploy to Vercel](#deploy-to-vercel)
- [License](#license)

---

## Features

### Downloader
- TikTok (video & slideshow)
- Instagram (posts, stories, reels) - versions 1, 2, and 3
- YouTube (convert to MP3 & MP4, search, play audio/video)
- Twitter / X
- Facebook
- Spotify (download & search)
- Terabox
- MediaFire
- SfilesMobi
- Threads
- All-in-One Downloader (multi-platform support)

### AI Tools
- ChatGPT (multiple versions)
- Google Bard
- Character AI
- GPT image-based responses
- GPT logic-based responses
- Image Generator
- Cartoonify (convert photos to cartoons)
- ESRGAN (AI image upscaler)
- Remini (photo enhancement)
- Virtual Girlfriends
- Dystopia AI
- Waifu Generator

### Stalker & Info
- GitHub stalk (profile & repositories)
- npm stalk (package information)
- Instagram stalk (profile info)
- TikTok stalk (profile info)
- Indonesian Postal Code lookup
- National holiday schedule
- Football match schedule

### Search
- YouTube search
- Pinterest search
- Spotify search
- BukaLapak search
- Song chord search
- Random short story (cerpen)
- Growtopia items

### User Management (MongoDB)
- User registration
- User login
- Address management
- Shopping cart
- Product data (CRUD)

### Other Tools
- Website screenshot
- Text style converter
- NGL (anonymous message sender)
- Email subscription
- Photo upscaling & editing
- Mystery house & haunted house (entertainment content)

---

## Technologies Used

| Technology      | Description                                      |
|-----------------|--------------------------------------------------|
| Node.js         | Server-side JavaScript runtime                   |
| Express.js      | Minimal web framework for Node.js                |
| MongoDB         | Document-based NoSQL database                    |
| Mongoose        | ODM for MongoDB                                  |
| Axios           | HTTP client for external API requests            |
| Cheerio         | HTML scraping with jQuery-like syntax            |
| EJS             | Template engine for HTML pages                   |
| Nodemailer      | Email sending                                    |
| dotenv          | Environment variable management                  |
| CORS            | Cross-Origin Resource Sharing middleware         |
| yt-search       | YouTube content search                           |
| ytdl-core       | YouTube video downloader                         |
| Vercel          | Serverless deployment platform                   |

---

## Installation

Make sure **Node.js** (v18 or later) and **npm** or **yarn** are installed.

```bash
# Clone the repository
git clone https://github.com/username/multi-feature-rest-api.git

# Navigate to the project directory
cd multi-feature-rest-api

# Install dependencies
npm install
# or using yarn
yarn install
```

---

## Environment Configuration

Create a `.env` file in the root of the project and fill in the following variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

> Make sure MongoDB Atlas or a local MongoDB instance is running before starting the server.

---

## Running the Server

```bash
# Development mode (with auto-reload using nodemon)
npm run dev

# Production mode
node server.js
```

The server will run at `http://localhost:3000` by default.

---

## Project Structure

```
.
├── config/
│   └── db.js                 # MongoDB connection setup
├── lib/
│   └── scrappers/
│       ├── index.js           # Exports all scraper functions
│       ├── scraper1.js        # Scraper functions - part 1
│       ├── scraper2.js        # Scraper functions - part 2
│       └── scraper3.js        # Scraper functions - part 3
├── middleware/
│   └── authApiKey.js          # API Key authentication middleware
├── models/
│   ├── ApiKey.js              # API Key model
│   ├── Product.js             # Product model
│   └── User.js                # User model
├── routers/
│   ├── index.js               # Automatic router loader
│   ├── User/                  # User management endpoints
│   ├── Products/              # Product management endpoints
│   ├── downloader/            # Downloader endpoints
│   ├── tools/                 # Tools endpoints
│   └── email/                 # Email endpoints
├── views/
│   └── index.ejs              # API documentation page
├── server.js                  # Application entry point
├── vercel.json                # Vercel deployment configuration
├── package.json
└── .gitignore
```

---

## API Endpoints

All available endpoints can be viewed directly on the home page (`/`) after the server is started. The page displays a full list of all registered routes along with their parameters.

**Example endpoints:**

| Method | Path                     | Description                      |
|--------|--------------------------|----------------------------------|
| GET    | `/`                      | API documentation page           |
| GET    | `/authorization`         | Verify API Key                   |
| POST   | `/user/register`         | Register a new user              |
| POST   | `/user/login`            | User login                       |
| GET    | `/downloader/tiktok`     | Download TikTok video            |
| GET    | `/downloader/youtube`    | Download YouTube video/audio     |
| GET    | `/downloader/instagram`  | Download Instagram content       |

---

## API Key Authentication

Some endpoints require an API Key sent through the request header:

```
api-key: YOUR_API_KEY_HERE
```

The API Key is validated against the MongoDB database. Each key has a usage limit. If the limit is reached, the request will be rejected.

---

## Deploy to Vercel

This project is already configured for Vercel via the `vercel.json` file.

```bash
# Install Vercel CLI
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy
vercel --prod
```

Make sure environment variables (`MONGO_URI`, `PORT`) are configured in the Vercel dashboard before deploying.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for more details.
