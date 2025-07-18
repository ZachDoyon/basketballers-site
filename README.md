# BasketBallers 🏀

Your ultimate destination for basketball news, analysis, and community discussions. BasketBallers aggregates news from major sports outlets while providing a platform for users to create blogs, engage in discussions, and stay updated with breaking news from all basketball leagues.

## Features ✨

### 🏀 **Basketball News Aggregation**
- News from ESPN, Bleacher Report, and other major outlets
- Coverage of NBA, WNBA, NCAA, and International basketball
- Breaking news alerts and notifications
- Category-based filtering (NBA, WNBA, NCAA, International, G League, Summer League)

### 👥 **Community Features**
- User registration with email or social media (Google, Facebook)
- Personal blog creation and management
- Comment system with replies and likes
- User profiles and verification system

### 📧 **Newsletter & Notifications**
- Customizable newsletter preferences
- Email notifications for breaking news
- Preference management by league and topic

### 🎨 **Modern UI/UX**
- Purple and black color scheme
- Responsive design for all devices
- Smooth animations with Framer Motion
- Clean, modern interface with excellent typography

### 📱 **Additional Features**
- FAQ section with searchable content
- Search functionality across all content
- Social media integration
- SEO optimized
- Admin and moderation tools

## Technology Stack 🛠️

### Frontend
- **React 18** with TypeScript
- **Styled Components** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hook Form** for form handling
- **Heroicons** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Passport.js** for social authentication
- **Nodemailer** for email functionality
- **Helmet** for security
- **Rate limiting** for API protection

### Development Tools
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code quality
- **Concurrently** for running frontend and backend together

## Getting Started 🚀

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd basketballers
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install all dependencies (root + client)
   npm run install-all
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/basketballers
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # Client Configuration
   CLIENT_URL=http://localhost:3000
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # Facebook OAuth (optional)
   FACEBOOK_CLIENT_ID=your-facebook-client-id
   FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
   
   # Email Configuration (optional)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-email-password
   EMAIL_FROM=noreply@basketballers.com
   ```

4. **Start the application**
   ```bash
   # Development mode (runs both frontend and backend)
   npm run dev
   
   # Or run separately:
   # Backend only
   npm run server
   
   # Frontend only (in another terminal)
   npm run client
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure 📁

```
basketballers/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # Styled components and themes
│   │   ├── types/         # TypeScript type definitions
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   ├── middleware/       # Custom middleware
│   └── index.js          # Server entry point
├── package.json          # Root package.json
└── README.md
```

## API Endpoints 🔌

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/facebook` - Facebook OAuth

### News
- `GET /api/news` - Get all news articles
- `GET /api/news/categories` - Get news categories
- `GET /api/news/breaking` - Get breaking news
- `GET /api/news/search` - Search news articles
- `GET /api/news/:id` - Get single article

### Blogs
- `GET /api/blogs` - Get all blog posts
- `POST /api/blogs` - Create blog post (auth required)
- `GET /api/blogs/:id` - Get single blog post
- `PUT /api/blogs/:id` - Update blog post (auth required)
- `DELETE /api/blogs/:id` - Delete blog post (auth required)

### Comments
- `GET /api/comments/:articleId` - Get comments for article
- `POST /api/comments` - Create comment (auth required)
- `PUT /api/comments/:id` - Update comment (auth required)
- `DELETE /api/comments/:id` - Delete comment (auth required)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `PUT /api/newsletter/preferences` - Update preferences
- `DELETE /api/newsletter/unsubscribe` - Unsubscribe

## Scripts 📜

```bash
# Development
npm run dev          # Run both frontend and backend
npm run server       # Run backend only
npm run client       # Run frontend only

# Installation
npm run install-all  # Install all dependencies

# Production
npm run build        # Build frontend for production
npm start           # Start production server
```

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Design Decisions 🎨

### Color Scheme
- **Primary**: Purple (#7C3AED) - Basketball energy and community
- **Secondary**: Black (#000000) - Elegance and readability
- **Accent**: Orange (#F59E0B) - Basketball color for highlights

### Typography
- **Font**: Inter - Modern, readable, and web-optimized
- **Weights**: 300-900 for versatile text hierarchy

### Architecture
- **Component-based**: Modular React components for reusability
- **API-first**: RESTful backend with clear separation of concerns
- **Mobile-first**: Responsive design starting from mobile viewport

## Future Enhancements 🚀

- [ ] Real-time news updates with WebSockets
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Video content integration
- [ ] Fantasy basketball features
- [ ] Live game scores and updates
- [ ] Advanced analytics dashboard
- [ ] Content recommendation engine

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support 💬

For support, email support@basketballers.com or join our community discussions.

---

**Built with ❤️ for the basketball community** 