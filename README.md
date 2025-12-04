# Social Media Dashboard

A comprehensive dashboard for managing social media accounts with analytics and scheduling capabilities. Built with Next.js, TypeScript, and Chart.js.

## Features

- **Real-time Analytics**: View statistics from Facebook, Instagram, and Twitter
- **Interactive Charts**: Visualize data with Chart.js (Line, Bar, and Doughnut charts)
- **Post Scheduling**: Schedule posts across multiple platforms
- **Security**: Built-in protection against common web attacks
  - Rate limiting
  - Input validation and sanitization
  - Security headers
  - CORS protection

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Chart.js** - Data visualization
- **Tailwind CSS** - Styling
- **Zod** - Schema validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the root directory:
```env
# Optional: API Keys for social media platforms
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
INSTAGRAM_ACCESS_TOKEN=your_instagram_token
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret

# Security
API_KEYS=your_api_key_1,your_api_key_2
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── stats/        # Statistics endpoint
│   │   ├── posts/        # Posts endpoint
│   │   └── schedule/     # Scheduling endpoint
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Dashboard.tsx     # Main dashboard
│   ├── StatsOverview.tsx # Stats cards
│   ├── AnalyticsCharts.tsx # Chart visualizations
│   ├── RecentPosts.tsx   # Posts list
│   └── PostScheduler.tsx # Post scheduling form
├── lib/                  # Utilities
│   ├── socialMediaAPI.ts # API service
│   ├── security.ts       # Security utilities
│   └── utils.ts          # Helper functions
└── package.json
```

## API Endpoints

### GET /api/stats
Returns statistics for all connected social media platforms.

### GET /api/posts
Returns recent posts. Optional query parameter: `?platform=facebook|instagram|twitter`

### POST /api/schedule
Schedule a new post. Requires:
- `platform`: "facebook" | "instagram" | "twitter"
- `content`: string (1-2000 characters)
- `scheduledTime`: ISO datetime string
- `imageUrl`: optional URL string

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Zod schema validation for all inputs
- **XSS Protection**: Input sanitization
- **Security Headers**: CSP, X-Frame-Options, etc.
- **CORS**: Configurable allowed origins

## Real-time Data

The dashboard automatically refreshes data every 30 seconds. Currently uses mock data for demonstration. To connect to real APIs:

1. Obtain API credentials from Facebook, Instagram, and Twitter
2. Update `lib/socialMediaAPI.ts` with actual API calls
3. Add credentials to `.env.local`

## Building for Production

```bash
npm run build
npm start
```

## License

MIT

