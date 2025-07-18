import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FireIcon, 
  ClockIcon, 
  ChatBubbleLeftRightIcon,
  HeartIcon,
  ShareIcon 
} from '@heroicons/react/24/outline';
import { Container, Button, Card, theme } from '../styles/GlobalStyles';
import { NewsArticle } from '../types';
import NewsletterSignup from '../components/NewsletterSignup';
import CommentSection from '../components/CommentSection';

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  color: ${theme.colors.textWhite};
  padding: ${theme.spacing['5xl']} 0;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  font-size: ${theme.fontSizes['5xl']};
  font-weight: ${theme.fontWeights.black};
  margin-bottom: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.light};
  margin-bottom: ${theme.spacing['2xl']};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
  }
`;

const Section = styled.section`
  padding: ${theme.spacing['4xl']} 0;
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing['2xl']};
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const BreakingBadge = styled.span`
  background: ${theme.colors.error};
  color: ${theme.colors.textWhite};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: ${theme.fontWeights.bold};
  text-transform: uppercase;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['3xl']};
`;

const NewsCard = styled(Card)`
  cursor: pointer;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const NewsImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin: -${theme.spacing.lg} -${theme.spacing.lg} ${theme.spacing.md} -${theme.spacing.lg};
`;

const NewsMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
`;

const NewsTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text};
  line-height: 1.3;
`;

const NewsSummary = styled.p`
  color: ${theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const NewsActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: transparent;
  border: none;
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const FeaturedSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['3xl']};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedArticle = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const FeaturedContent = styled.div`
  padding: ${theme.spacing.xl};
`;

const FeaturedTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

const SidebarCard = styled(Card)`
  height: fit-content;
`;

// Mock data for demonstration
const mockBreakingNews: NewsArticle[] = [
  {
    id: '1',
    title: 'LeBron James Announces Retirement Plans',
    summary: 'The Lakers superstar hints at potential retirement after this season.',
    content: '',
    author: 'Mike Reporter',
    source: 'ESPN',
    imageUrl: 'https://via.placeholder.com/400x200/7C3AED/FFFFFF?text=Breaking+News',
    publishedAt: '2024-01-15T10:00:00Z',
    category: 'NBA',
    tags: ['Lakers', 'LeBron'],
    url: '#',
    isBreaking: true,
  },
  {
    id: '2',
    title: 'Trade Deadline Shakeup: Multiple All-Stars on the Move',
    summary: 'Several franchise players expected to change teams before deadline.',
    content: '',
    author: 'Sarah Basketball',
    source: 'Bleacher Report',
    imageUrl: 'https://via.placeholder.com/400x200/5B21B6/FFFFFF?text=Trade+News',
    publishedAt: '2024-01-15T09:30:00Z',
    category: 'NBA',
    tags: ['Trade', 'NBA'],
    url: '#',
    isBreaking: false,
  },
];

const HomePage: React.FC = () => {
  const [breakingNews, setBreakingNews] = useState<NewsArticle[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    // Simulate API call
    setBreakingNews(mockBreakingNews);
    setFeaturedArticle(mockBreakingNews[0]);
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div>
      <HeroSection>
        <Container>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to BasketBallers
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your ultimate destination for basketball news, analysis, and community discussions
          </HeroSubtitle>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button size="lg" style={{ marginRight: theme.spacing.md }}>
              Latest News
            </Button>
            <Button variant="outline" size="lg">
              Join Community
            </Button>
          </motion.div>
        </Container>
      </HeroSection>

      <Section>
        <Container>
          <SectionTitle>
            <FireIcon style={{ width: '2rem', height: '2rem', color: theme.colors.error }} />
            Breaking News
          </SectionTitle>

          <FeaturedSection>
            {featuredArticle && (
              <FeaturedArticle>
                <FeaturedImage src={featuredArticle.imageUrl} alt={featuredArticle.title} />
                <FeaturedContent>
                  {featuredArticle.isBreaking && <BreakingBadge>Breaking</BreakingBadge>}
                  <FeaturedTitle>{featuredArticle.title}</FeaturedTitle>
                  <NewsMeta>
                    <ClockIcon style={{ width: '1rem', height: '1rem' }} />
                    {formatTimeAgo(featuredArticle.publishedAt)}
                    <span>•</span>
                    <span>{featuredArticle.source}</span>
                    <span>•</span>
                    <span>{featuredArticle.author}</span>
                  </NewsMeta>
                  <p style={{ color: theme.colors.textLight, lineHeight: 1.6 }}>
                    {featuredArticle.summary}
                  </p>
                </FeaturedContent>
              </FeaturedArticle>
            )}

            <SidebarCard>
              <h3 style={{ marginBottom: theme.spacing.lg }}>Trending Topics</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
                {['#TradeDeadline', '#LeBron', '#PlayoffRace', '#DraftProspects', '#AllStarGame'].map((tag) => (
                  <Link
                    key={tag}
                    to={`/news?tag=${tag.slice(1)}`}
                    style={{ 
                      color: theme.colors.primary,
                      fontSize: theme.fontSizes.sm,
                      fontWeight: theme.fontWeights.medium 
                    }}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </SidebarCard>
          </FeaturedSection>

          <NewsGrid>
            {breakingNews.slice(1).map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <NewsCard>
                  <NewsImage src={article.imageUrl} alt={article.title} />
                  {article.isBreaking && <BreakingBadge>Breaking</BreakingBadge>}
                  <NewsTitle>{article.title}</NewsTitle>
                  <NewsMeta>
                    <ClockIcon style={{ width: '1rem', height: '1rem' }} />
                    {formatTimeAgo(article.publishedAt)}
                    <span>•</span>
                    <span>{article.source}</span>
                  </NewsMeta>
                  <NewsSummary>{article.summary}</NewsSummary>
                  <NewsActions>
                    <ActionGroup>
                      <ActionButton>
                        <HeartIcon style={{ width: '1rem', height: '1rem' }} />
                        Like
                      </ActionButton>
                      <ActionButton>
                        <ChatBubbleLeftRightIcon style={{ width: '1rem', height: '1rem' }} />
                        Comment
                      </ActionButton>
                    </ActionGroup>
                    <ActionButton>
                      <ShareIcon style={{ width: '1rem', height: '1rem' }} />
                      Share
                    </ActionButton>
                  </NewsActions>
                </NewsCard>
              </motion.div>
            ))}
          </NewsGrid>
        </Container>
      </Section>

      <NewsletterSignup />
      <CommentSection articleId="homepage" />
    </div>
  );
};

export default HomePage; 