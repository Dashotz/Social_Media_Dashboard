# Social Media Dashboard

A comprehensive, real-time dashboard for managing multiple social media accounts with advanced analytics, post scheduling, and performance insights. Built with Next.js 14, TypeScript, and Chart.js, featuring a modern black and silver theme with responsive design.

## ✨ Features

### 📊 Dashboard Sections

- **Overview Tab**: Quick stats summary, platform statistics, top performing posts, and recent activity feed
- **Analytics Tab**: Interactive charts (Line, Bar, Doughnut) and detailed performance metrics
- **Posts Tab**: Recent posts displayed in a 4-column grid layout with engagement metrics
- **Schedule Tab**: Advanced post scheduler with live preview, quick time presets, and platform-specific tips
- **Performance Tab**: Detailed performance metrics with visual indicators and engagement rates
- **Insights Tab**: Key insights including best performing platform, total audience, growth trends, and peak engagement

### 🎯 Core Features

- **Real-time Updates**: Automatic data refresh every 30 seconds
- **Multi-Platform Support**: Manage Facebook, Instagram, and Twitter from one dashboard
- **Interactive Analytics**: 
  - Followers growth charts
  - Engagement comparison
  - Platform distribution visualization
  - Performance metrics with progress bars
- **Smart Post Scheduling**:
  - Live post preview
  - Quick time presets (1 hour, 3 hours, tomorrow 9 AM, etc.)
  - Platform-specific character limits
  - Best posting time recommendations
  - Image preview support
- **Activity Tracking**: Recent activity feed showing likes, comments, and shares
- **Top Posts Analysis**: Automatically identifies and displays top performing posts
- **Quick Stats**: At-a-glance metrics for total followers, engagement, reach, and growth
- **Security**: Enterprise-grade security features
  - Rate limiting (100 requests per 15 minutes per IP)
  - Input validation with Zod schemas
  - XSS protection with input sanitization
  - Security headers (CSP, X-Frame-Options, etc.)
  - CORS protection with configurable origins
  - Middleware for request validation

### 🎨 Design Features

- **Modern UI**: Professional black background with silver accents
- **Responsive Design**: Fully responsive with mobile-friendly navigation
- **Sidebar Navigation**: Fixed sidebar with 6 main sections
- **Smooth Animations**: Hover effects and transitions throughout
- **Dark Theme**: Optimized for extended use with reduced eye strain

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router and Server Components
- **TypeScript** - Full type safety and enhanced developer experience
- **Chart.js 4** - Advanced data visualization with React Chart.js 2
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Zod** - Schema validation for type-safe API requests
- **date-fns** - Modern date utility library for formatting and manipulation
- **clsx & tailwind-merge** - Conditional class name utilities

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
├── components/              # React components
│   ├── Dashboard.tsx        # Main dashboard with tab navigation
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── StatsOverview.tsx    # Platform statistics cards
│   ├── QuickStats.tsx       # Quick stats summary cards
│   ├── AnalyticsCharts.tsx  # Chart visualizations (Line, Bar, Doughnut)
│   ├── PerformanceMetrics.tsx # Performance metrics with progress bars
│   ├── RecentPosts.tsx      # Posts grid (4-column layout)
│   ├── TopPosts.tsx         # Top performing posts
│   ├── ActivityFeed.tsx     # Recent activity feed
│   ├── PostScheduler.tsx    # Advanced post scheduler with preview
│   └── Insights.tsx         # Key insights and recommendations
├── lib/                  # Utilities
│   ├── socialMediaAPI.ts # API service with mock data generators
│   ├── security.ts       # Security utilities (rate limiting, validation)
│   └── utils.ts          # Helper functions (class name utilities)
├── middleware.ts         # Next.js middleware for security headers
└── tailwind.config.ts    # Tailwind CSS configuration
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
- `content`: string (platform-specific limits: Facebook 5000, Instagram 2200, Twitter 280)
- `scheduledTime`: ISO datetime string
- `imageUrl`: optional URL string

Returns the scheduled post object with ID and creation timestamp.

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Zod schema validation for all inputs
- **XSS Protection**: Input sanitization
- **Security Headers**: CSP, X-Frame-Options, etc.
- **CORS**: Configurable allowed origins

## 📡 Real-time Data

The dashboard automatically refreshes data every 30 seconds to provide up-to-date statistics. Currently uses mock data generators for demonstration purposes.

### Connecting to Real APIs

To connect to actual social media APIs:

1. **Obtain API Credentials**:
   - Facebook: Get App ID and App Secret from [Facebook Developers](https://developers.facebook.com/)
   - Instagram: Obtain Access Token from Instagram Basic Display API
   - Twitter: Get API Key and Secret from [Twitter Developer Portal](https://developer.twitter.com/)

2. **Update API Service**: Modify `lib/socialMediaAPI.ts` to replace mock functions with actual API calls:
   ```typescript
   // Replace fetchFacebookStats() with actual Facebook Graph API calls
   // Replace fetchInstagramStats() with Instagram API calls
   // Replace fetchTwitterStats() with Twitter API v2 calls
   ```

3. **Add Credentials**: Add your API keys to `.env.local`:
   ```env
   FACEBOOK_APP_ID=your_app_id
   FACEBOOK_APP_SECRET=your_app_secret
   INSTAGRAM_ACCESS_TOKEN=your_token
   TWITTER_API_KEY=your_key
   TWITTER_API_SECRET=your_secret
   TWITTER_BEARER_TOKEN=your_bearer_token
   ```

4. **Update Rate Limits**: Adjust rate limiting in `lib/security.ts` if needed for production use.

## 🚀 Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm start
```

The production build will be optimized and ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

## 📱 Responsive Design

The dashboard is fully responsive and adapts to different screen sizes:
- **Desktop**: Full sidebar navigation with all features
- **Tablet**: Responsive grid layouts (2 columns)
- **Mobile**: Dropdown menu for navigation, single column layouts

## 🎨 Customization

### Theme Colors

The dashboard uses a black and silver theme. To customize:
- Edit `app/globals.css` for global color variables
- Modify `tailwind.config.ts` to add custom colors
- Update component classes to use your preferred color scheme

### Adding New Platforms

1. Add platform to `SocialMediaStats` interface in `lib/socialMediaAPI.ts`
2. Create fetch function for the new platform
3. Add platform icon and colors to component files
4. Update character limits in `PostScheduler.tsx`

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

