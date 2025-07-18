import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card, Button, theme } from '../styles/GlobalStyles';
import { BlogPost } from '../types';

const BlogsContainer = styled.div`
  padding: ${theme.spacing['2xl']} 0;
  min-height: 100vh;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing['2xl']};
`;

const PageTitle = styled.h1`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.text};
`;

const BlogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const BlogCard = styled(Card)`
  cursor: pointer;
`;

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Mock blog posts
    const mockBlogs: BlogPost[] = [
      {
        id: '1',
        userId: '1',
        user: {
          id: '1',
          username: 'basketballguru',
          email: 'guru@example.com',
          firstName: 'John',
          lastName: 'Smith',
          joinedAt: '2024-01-01T00:00:00Z',
          isVerified: true,
        },
        title: 'NBA Trade Deadline Predictions',
        content: 'My thoughts on potential trades...',
        summary: 'Analyzing potential moves before the deadline.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        published: true,
        tags: ['NBA', 'trades'],
        likes: 24,
        views: 156,
        comments: [],
      },
    ];
    setBlogs(mockBlogs);
  }, []);

  return (
    <BlogsContainer>
      <Container>
        <PageHeader>
          <PageTitle>Community Blogs</PageTitle>
          <Button>Create Blog</Button>
        </PageHeader>
        <BlogsGrid>
          {blogs.map((blog) => (
            <BlogCard key={blog.id}>
              <h3 style={{ marginBottom: theme.spacing.sm }}>{blog.title}</h3>
              <p style={{ color: theme.colors.textLight, marginBottom: theme.spacing.md }}>
                {blog.summary}
              </p>
              <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textLight }}>
                By {blog.user.username} • {blog.likes} likes • {blog.views} views
              </div>
            </BlogCard>
          ))}
        </BlogsGrid>
      </Container>
    </BlogsContainer>
  );
};

export default BlogsPage; 