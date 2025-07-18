import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, theme } from '../styles/GlobalStyles';
import { NewsArticle } from '../types';

const NewsContainer = styled.div`
  padding: ${theme.spacing['2xl']} 0;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.text};
  text-transform: capitalize;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
`;

const NewsCard = styled(Card)`
  cursor: pointer;
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
`;

const NewsTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text};
`;

const NewsSummary = styled.p`
  color: ${theme.colors.textLight};
  line-height: 1.6;
`;

const NewsPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [articles, setArticles] = useState<NewsArticle[]>([]);

  useEffect(() => {
    // Mock articles for demonstration
    const mockArticles: NewsArticle[] = [
      {
        id: '1',
        title: `${category?.toUpperCase() || 'Latest'} News: Major Trade Announcement`,
        summary: 'Breaking news about player movements and team changes.',
        content: '',
        author: 'Sports Reporter',
        source: 'ESPN',
        imageUrl: 'https://via.placeholder.com/400x200/7C3AED/FFFFFF?text=News',
        publishedAt: new Date().toISOString(),
        category: (category as any) || 'General',
        tags: [category || 'general'],
        url: '#',
      },
      // Add more mock articles...
    ];
    setArticles(mockArticles);
  }, [category]);

  return (
    <NewsContainer>
      <Container>
        <PageTitle>{category ? `${category} News` : 'Latest News'}</PageTitle>
        <NewsGrid>
          {articles.map((article) => (
            <NewsCard key={article.id}>
              <NewsImage src={article.imageUrl} alt={article.title} />
              <NewsTitle>{article.title}</NewsTitle>
              <NewsSummary>{article.summary}</NewsSummary>
            </NewsCard>
          ))}
        </NewsGrid>
      </Container>
    </NewsContainer>
  );
};

export default NewsPage; 