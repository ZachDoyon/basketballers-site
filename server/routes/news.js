const express = require('express');
const axios = require('axios');
const router = express.Router();

// Mock news data for demonstration
const mockNews = [
  {
    id: '1',
    title: 'LeBron James Reaches Historic Milestone',
    summary: 'The Lakers superstar becomes the all-time leading scorer in NBA history.',
    content: 'In a historic moment for basketball...',
    author: 'ESPN Staff',
    source: 'ESPN',
    imageUrl: 'https://via.placeholder.com/600x300/7C3AED/FFFFFF?text=NBA+News',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    category: 'NBA',
    tags: ['LeBron', 'Lakers', 'Record'],
    url: 'https://example.com/lebron-milestone',
    isBreaking: true,
  },
  {
    id: '2',
    title: 'WNBA Season Preview: Top Contenders',
    summary: 'Analysis of the top teams heading into the new WNBA season.',
    content: 'As the WNBA season approaches...',
    author: 'Sarah Basketball',
    source: 'Bleacher Report',
    imageUrl: 'https://via.placeholder.com/600x300/5B21B6/FFFFFF?text=WNBA+News',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    category: 'WNBA',
    tags: ['WNBA', 'Preview', 'Season'],
    url: 'https://example.com/wnba-preview',
    isBreaking: false,
  },
  {
    id: '3',
    title: 'March Madness Bracket Predictions',
    summary: 'Expert predictions for the upcoming NCAA tournament.',
    content: 'The NCAA tournament is upon us...',
    author: 'College Basketball Insider',
    source: 'The Athletic',
    imageUrl: 'https://via.placeholder.com/600x300/A855F7/FFFFFF?text=NCAA+News',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    category: 'NCAA',
    tags: ['NCAA', 'March Madness', 'Tournament'],
    url: 'https://example.com/march-madness',
    isBreaking: false,
  },
  {
    id: '4',
    title: 'EuroLeague Final Four Set',
    summary: 'The four teams that will compete for the EuroLeague championship.',
    content: 'After intense playoff action...',
    author: 'International Basketball Reporter',
    source: 'FIBA',
    imageUrl: 'https://via.placeholder.com/600x300/F59E0B/FFFFFF?text=International',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    category: 'International',
    tags: ['EuroLeague', 'International', 'Playoffs'],
    url: 'https://example.com/euroleague-final-four',
    isBreaking: false,
  },
  {
    id: '5',
    title: 'Trade Deadline Shakeup: Multiple Stars Move',
    summary: 'Several All-Star players change teams in blockbuster trades.',
    content: 'The NBA trade deadline delivered...',
    author: 'Trade Expert',
    source: 'The Ringer',
    imageUrl: 'https://via.placeholder.com/600x300/EF4444/FFFFFF?text=Breaking+Trade',
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    category: 'NBA',
    tags: ['Trade', 'NBA', 'Breaking'],
    url: 'https://example.com/trade-deadline',
    isBreaking: true,
  }
];

// @route   GET /api/news
// @desc    Get all news articles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, limit = 20, page = 1, breaking } = req.query;
    let filteredNews = [...mockNews];

    // Filter by category
    if (category && category !== 'all') {
      filteredNews = filteredNews.filter(article => 
        article.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter breaking news
    if (breaking === 'true') {
      filteredNews = filteredNews.filter(article => article.isBreaking);
    }

    // Sort by publish date (newest first)
    filteredNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    res.json({
      articles: paginatedNews,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(filteredNews.length / limit),
        hasNext: endIndex < filteredNews.length,
        hasPrev: page > 1
      },
      total: filteredNews.length
    });
  } catch (error) {
    console.error('News fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/news/categories
// @desc    Get available news categories
// @access  Public
router.get('/categories', (req, res) => {
  try {
    const categories = [
      { id: 'nba', name: 'NBA', description: 'National Basketball Association' },
      { id: 'wnba', name: 'WNBA', description: 'Women\'s National Basketball Association' },
      { id: 'ncaa', name: 'NCAA', description: 'College Basketball' },
      { id: 'international', name: 'International', description: 'Global Basketball Leagues' },
      { id: 'g-league', name: 'G League', description: 'NBA Development League' },
      { id: 'summer-league', name: 'Summer League', description: 'NBA Summer League' }
    ];

    res.json(categories);
  } catch (error) {
    console.error('Categories fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/news/breaking
// @desc    Get breaking news
// @access  Public
router.get('/breaking', async (req, res) => {
  try {
    const breakingNews = mockNews
      .filter(article => article.isBreaking)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 5);

    res.json(breakingNews);
  } catch (error) {
    console.error('Breaking news fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/news/search
// @desc    Search news articles
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { q, category } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    let filteredNews = [...mockNews];

    // Filter by category if specified
    if (category && category !== 'all') {
      filteredNews = filteredNews.filter(article => 
        article.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Search in title, summary, and tags
    const searchResults = filteredNews.filter(article => {
      const searchText = q.toLowerCase();
      return (
        article.title.toLowerCase().includes(searchText) ||
        article.summary.toLowerCase().includes(searchText) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchText)) ||
        article.author.toLowerCase().includes(searchText)
      );
    });

    // Sort by relevance (for now, just by date)
    searchResults.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    res.json({
      results: searchResults,
      query: q,
      total: searchResults.length
    });
  } catch (error) {
    console.error('News search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/news/:id
// @desc    Get single news article
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const article = mockNews.find(article => article.id === req.params.id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    console.error('Article fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 