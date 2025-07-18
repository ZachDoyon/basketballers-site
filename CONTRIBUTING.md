# Contributing to BasketBallers 🏀

Thank you for your interest in contributing to BasketBallers! This document provides guidelines and information for contributors.

## Code of Conduct 📜

We are committed to providing a welcoming and inclusive experience for everyone. Please be respectful and professional in all interactions.

## How to Contribute 🤝

### 1. Fork the Repository
```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/basketballers-site.git
cd basketballers-site
git remote add upstream https://github.com/ZachDoyon/basketballers-site.git
```

### 2. Set Up Development Environment
```bash
# Install dependencies
npm run install-all

# Copy environment file
cp .env.example .env

# Start development servers
npm run dev
```

### 3. Create a Branch
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Or bug fix branch
git checkout -b fix/bug-description
```

### 4. Make Changes
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 5. Test Your Changes
```bash
# Run tests (when available)
npm test

# Test both frontend and backend
npm run dev
```

### 6. Commit and Push
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add: New feature description"

# Push to your fork
git push origin feature/your-feature-name
```

### 7. Create Pull Request
1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill out PR template
5. Submit for review

## Development Guidelines 💻

### Code Style
- **TypeScript**: Use strict typing, avoid `any`
- **React**: Functional components with hooks
- **Styling**: Styled Components with theme system
- **Backend**: RESTful API design
- **Database**: Mongoose schemas with validation

### Naming Conventions
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Components**: PascalCase
- **API routes**: kebab-case

### Folder Structure
```
client/src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── styles/        # Global styles and themes

server/
├── routes/        # API route handlers
├── models/        # Database models
├── middleware/    # Express middleware
└── utils/         # Server utilities
```

## Feature Ideas 💡

### High Priority
- [ ] Real-time notifications
- [ ] Advanced search functionality
- [ ] User profile customization
- [ ] Mobile app (React Native)
- [ ] Performance optimizations

### Medium Priority
- [ ] Video content integration
- [ ] Social sharing features
- [ ] Advanced analytics
- [ ] Content moderation tools
- [ ] API rate limiting improvements

### Low Priority
- [ ] Dark mode toggle
- [ ] Internationalization (i18n)
- [ ] Offline functionality
- [ ] Progressive Web App features
- [ ] Advanced SEO optimizations

## Bug Reports 🐛

When reporting bugs, please include:
- **Environment**: OS, browser, Node.js version
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Console errors**: Copy any error messages

### Bug Report Template
```markdown
**Environment:**
- OS: [e.g., Windows 10, macOS Big Sur, Ubuntu 20.04]
- Browser: [e.g., Chrome 91, Firefox 89, Safari 14]
- Node.js: [e.g., 16.14.0]

**Steps to Reproduce:**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior:**
A clear description of what you expected to happen.

**Actual Behavior:**
A clear description of what actually happened.

**Screenshots:**
If applicable, add screenshots to help explain your problem.

**Console Errors:**
```
Any console error messages
```
```

## Pull Request Guidelines 📝

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated if needed
- [ ] No merge conflicts
- [ ] Descriptive commit messages
- [ ] Tests pass (when available)

### PR Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Unit tests added/updated
- [ ] Integration tests pass

## Screenshots (if applicable)
Add screenshots of the changes.

## Additional Notes
Any additional information or context.
```

## Development Setup 🛠️

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- Git
- Code editor (VS Code recommended)

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- TypeScript Hero
- Styled Components
- GitLens
- Prettier
- ESLint

### Environment Variables
```env
# Required for development
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/basketballers
JWT_SECRET=your-development-secret
CLIENT_URL=http://localhost:3000

# Optional for full functionality
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## Release Process 🚀

### Version Numbers
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create release branch
4. Test thoroughly
5. Merge to main
6. Create GitHub release
7. Deploy to production

## Community 👥

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Pull Requests**: Code contributions and reviews

### Recognition
Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## Questions? 🤔

If you have questions about contributing:
- Check existing GitHub issues
- Read the documentation
- Ask in GitHub Discussions
- Contact maintainers

---

**Thank you for contributing to BasketBallers! 🏀✨** 