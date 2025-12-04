# Social Media Dashboard

A comprehensive, real-time dashboard for managing multiple social media accounts with advanced analytics, post scheduling, and performance insights. Built with Next.js 14, TypeScript, and Chart.js, featuring a modern black and silver theme with responsive design.

🌐 **Live Demo**: [View on GitHub Pages](https://yourusername.github.io/social-media-dashboard/)

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
- **Client-Side Security**: 
  - Input validation and sanitization
  - XSS protection
  - URL validation
  - Client-side rate limiting
  - Content length validation
  - Scheduled time validation

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
- **Zod** - Schema validation (available for future use)
- **date-fns** - Modern date utility library for formatting and manipulation
- **clsx & tailwind-merge** - Conditional class name utilities

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/yourusername/social-media-dashboard.git
cd social-media-dashboard
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the development server**:
```bash
npm run dev
```

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deploy to GitHub Pages

This project is configured for GitHub Pages deployment (static export).

### Quick Deploy Steps:

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/social-media-dashboard.git
git push -u origin main
```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch → main → / (root)
   - Save

3. **Enable GitHub Actions**:
   - Settings → Actions → General
   - Workflow permissions: Read and write
   - Save

4. **Your site will be live at**:
   ```
   https://YOUR_USERNAME.github.io/social-media-dashboard/
   ```

**Note**: Update `basePath` in `next.config.mjs` if your repository name is different.

## 📁 Project Structure

```
├── app/
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
│   ├── constants.ts      # Shared platform constants
│   ├── socialMediaAPI.ts # API service with mock data generators
│   ├── clientSecurity.ts # Client-side security utilities
│   └── utils.ts          # Helper functions (class name utilities)
├── .github/
│   └── workflows/
│       ├── ci.yml        # Continuous Integration
│       └── deploy-pages.yml # GitHub Pages deployment
└── tailwind.config.ts    # Tailwind CSS configuration
```

## 🔧 Configuration

### Update Repository Name

If your repository name is different from `social-media-dashboard`, update `next.config.mjs`:

```javascript
const REPO_NAME = 'your-repo-name'; // Change this line (line 4)
```

## 📡 Real-time Data

The dashboard automatically refreshes data every 30 seconds. Currently uses mock data generators for demonstration purposes.

### Connecting to Real APIs

To connect to actual social media APIs:

1. **Obtain API Credentials**:
   - Facebook: Get App ID and App Secret from [Facebook Developers](https://developers.facebook.com/)
   - Instagram: Obtain Access Token from Instagram Basic Display API
   - Twitter: Get API Key and Secret from [Twitter Developer Portal](https://developer.twitter.com/)

2. **Update API Service**: Modify `lib/socialMediaAPI.ts` to replace mock functions with actual API calls

3. **Note**: For GitHub Pages (static hosting), you'll need to use a separate backend service or API proxy for real API calls.

## 🎨 Customization

### Theme Colors

The dashboard uses a black and silver theme. To customize:
- Edit `app/globals.css` for global color variables
- Modify `tailwind.config.ts` to add custom colors
- Update component classes to use your preferred color scheme

### Adding New Platforms

1. Add platform to `lib/constants.ts`
2. Add platform to `SocialMediaStats` interface in `lib/socialMediaAPI.ts`
3. Create fetch function for the new platform
4. Update character limits in `PostScheduler.tsx`

## 📱 Responsive Design

The dashboard is fully responsive and adapts to different screen sizes:
- **Desktop**: Full sidebar navigation with all features
- **Tablet**: Responsive grid layouts (2 columns)
- **Mobile**: Dropdown menu for navigation, single column layouts

## ⚠️ GitHub Pages Limitations

Since GitHub Pages is static hosting:
- ✅ All frontend features work perfectly
- ✅ Mock data works (fetched client-side)
- ✅ Client-side security validation and sanitization
- ❌ No server-side API routes (all data fetching is client-side)
- ❌ Scheduled posts stored in localStorage (demo only - not persistent across devices)

### For Production with Server-Side Features

If you need server-side functionality, consider:
- **Vercel** - Best for Next.js (supports API routes)
- **Netlify** - Good alternative with serverless functions
- **Railway** - Full-stack deployment
- **Separate Backend API** - Use GitHub Pages for frontend + separate API service

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

Built with Next.js, TypeScript, Chart.js, and Tailwind CSS.
