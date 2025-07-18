# BasketBallers Deployment Guide 🚀

This guide provides instructions for deploying the BasketBallers website to various hosting platforms.

## Prerequisites 📋

- Node.js 16+
- MongoDB database (local or cloud)
- Environment variables configured
- Git repository

## Environment Variables 🔧

Create a `.env` file in the root directory with these variables:

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/basketballers

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Client Configuration
CLIENT_URL=https://your-domain.com

# OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@basketballers.com
```

## Deployment Options

### 1. Vercel (Recommended for Frontend) 🌐

**Deploy Frontend:**
```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to client directory
cd client

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: basketballers-frontend
# - Directory: ./
# - Override settings? No
```

**Deploy Backend (Vercel Functions):**
```bash
# Create vercel.json in root
{
  "functions": {
    "server/index.js": {
      "runtime": "@vercel/node"
    }
  },
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.js"
    }
  ]
}

# Deploy from root
vercel
```

### 2. Netlify (Frontend) 🌍

**Manual Deploy:**
1. Build the client: `cd client && npm run build`
2. Drag the `build` folder to [Netlify](https://netlify.com)

**Git Integration:**
1. Connect GitHub repository
2. Set build command: `cd client && npm run build`
3. Set publish directory: `client/build`
4. Add environment variables in Netlify dashboard

### 3. Heroku (Full Stack) ☁️

**Prerequisites:**
- Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- MongoDB Atlas account

**Deploy Steps:**
```bash
# Login to Heroku
heroku login

# Create app
heroku create basketballers-app

# Add MongoDB Atlas
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-secret
heroku config:set CLIENT_URL=https://basketballers-app.herokuapp.com

# Create Procfile in root
echo "web: node server/index.js" > Procfile

# Modify package.json to build client
# Add to scripts:
"heroku-postbuild": "cd client && npm install && npm run build"

# Deploy
git add .
git commit -m "Configure for Heroku deployment"
git push heroku main
```

### 4. Railway 🚂

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your-secret
railway variables set MONGODB_URI=your-mongodb-uri

# Deploy
railway up
```

### 5. DigitalOcean App Platform 🌊

1. Connect GitHub repository
2. Configure build settings:
   - Build command: `npm run install-all && npm run build`
   - Run command: `npm start`
3. Add environment variables
4. Deploy

### 6. AWS Elastic Beanstalk ☁️

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init

# Create environment
eb create basketballers-prod

# Set environment variables
eb setenv NODE_ENV=production JWT_SECRET=your-secret

# Deploy
eb deploy
```

## Database Setup 🗄️

### MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create new cluster
3. Add database user
4. Whitelist IP addresses
5. Get connection string
6. Set `MONGODB_URI` environment variable

### Local MongoDB
```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Ubuntu
sudo apt install mongodb

# Start service
sudo systemctl start mongod

# Use local URI
MONGODB_URI=mongodb://localhost:27017/basketballers
```

## Production Optimizations ⚡

### 1. Enable Gzip Compression
```javascript
// In server/index.js
const compression = require('compression');
app.use(compression());
```

### 2. Static File Serving
```javascript
// Serve React build files
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
```

### 3. Security Headers
```javascript
// Already included in server/index.js
app.use(helmet());
```

### 4. Rate Limiting
```javascript
// Already configured in server/index.js
const rateLimit = require('express-rate-limit');
```

## Monitoring & Analytics 📊

### 1. Add Google Analytics
```html
<!-- In client/public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
```

### 2. Error Tracking (Sentry)
```bash
npm install @sentry/node @sentry/react
```

### 3. Performance Monitoring
- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Set up uptime monitoring

## SSL/HTTPS 🔒

Most hosting platforms provide free SSL certificates:
- **Vercel**: Automatic SSL
- **Netlify**: Automatic SSL  
- **Heroku**: Free SSL with custom domains
- **Railway**: Automatic SSL

## Custom Domain 🌐

1. Purchase domain from registrar
2. Configure DNS settings:
   - Add CNAME record pointing to hosting platform
   - Add A record if required
3. Update `CLIENT_URL` environment variable
4. Configure OAuth redirect URLs

## Troubleshooting 🔧

### Common Issues:

**Build Failures:**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check environment variables

**Database Connection:**
- Verify MongoDB URI format
- Check network access/IP whitelist
- Ensure database user has correct permissions

**OAuth Issues:**
- Update redirect URLs in OAuth providers
- Verify client IDs and secrets
- Check CORS configuration

**Performance:**
- Optimize images and assets
- Enable caching headers
- Use CDN for static assets

## Support 💬

For deployment issues:
- Check platform-specific documentation
- Review error logs
- Contact platform support
- Open GitHub issue

---

**Happy Deploying! 🚀🏀** 