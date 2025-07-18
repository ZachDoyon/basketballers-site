import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon, 
  HeartIcon, 
  UserCircleIcon,
  ArrowUturnRightIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Container, Button, TextArea, theme } from '../styles/GlobalStyles';
import { Comment, User } from '../types';

const CommentsSection = styled.section`
  background: ${theme.colors.backgroundGray};
  padding: ${theme.spacing['4xl']} 0;
`;

const SectionTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing['2xl']};
  color: ${theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const CommentForm = styled.form`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['2xl']};
  box-shadow: ${theme.shadows.sm};
`;

const FormTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing.md};
  }
`;

const LoginPrompt = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  margin-bottom: ${theme.spacing['2xl']};
  text-align: center;
  border: 2px dashed ${theme.colors.border};
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const CommentCard = styled(motion.div)`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.border};
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textWhite};
  font-weight: ${theme.fontWeights.semibold};
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
`;

const CommentTime = styled.div`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
`;

const CommentContent = styled.p`
  color: ${theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const ActionButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: transparent;
  border: none;
  color: ${({ isActive }) => isActive ? theme.colors.error : theme.colors.textLight};
  font-size: ${theme.fontSizes.sm};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${theme.colors.backgroundGray};
    color: ${({ isActive }) => isActive ? theme.colors.error : theme.colors.primary};
  }
`;

const ReplySection = styled.div`
  margin-top: ${theme.spacing.lg};
  padding-left: ${theme.spacing['2xl']};
  border-left: 3px solid ${theme.colors.border};
`;

interface CommentSectionProps {
  articleId: string;
}

// Mock data
const mockUser: User = {
  id: '1',
  username: 'basketballfan',
  email: 'fan@example.com',
  firstName: 'John',
  lastName: 'Doe',
  joinedAt: '2024-01-01T00:00:00Z',
  isVerified: false,
};

const mockComments: Comment[] = [
  {
    id: '1',
    userId: '1',
    user: mockUser,
    articleId: 'homepage',
    content: 'Great analysis! This really puts things into perspective. I\'ve been following the league for years and this is spot on.',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    likes: 12,
    replies: [
      {
        id: '2',
        userId: '2',
        user: { ...mockUser, id: '2', username: 'hoopsdreams', firstName: 'Jane' },
        articleId: 'homepage',
        content: 'Totally agree! The stats back this up completely.',
        createdAt: '2024-01-15T11:00:00Z',
        updatedAt: '2024-01-15T11:00:00Z',
        likes: 5,
        parentId: '1',
      }
    ]
  },
  {
    id: '3',
    userId: '3',
    user: { ...mockUser, id: '3', username: 'courtside', firstName: 'Mike' },
    articleId: 'homepage',
    content: 'Interesting take, but I think we need to consider the defensive improvements as well. The numbers don\'t tell the whole story.',
    createdAt: '2024-01-15T09:45:00Z',
    updatedAt: '2024-01-15T09:45:00Z',
    likes: 8,
  }
];

const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading comments
    setComments(mockComments.filter(comment => comment.articleId === articleId));
  }, [articleId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: mockUser.id,
      user: mockUser,
      articleId,
      content: newComment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const handleLike = (commentId: string) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });

    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: likedComments.has(commentId) ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <CommentsSection>
      <Container>
        <SectionTitle>
          <ChatBubbleLeftRightIcon style={{ width: '2rem', height: '2rem' }} />
          Discussion ({comments.length})
        </SectionTitle>

        {isAuthenticated ? (
          <CommentForm onSubmit={handleSubmitComment}>
            <FormTitle>Join the conversation</FormTitle>
            <TextArea
              placeholder="Share your thoughts on this article..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
            />
            <FormActions>
              <div style={{ fontSize: theme.fontSizes.sm, color: theme.colors.textLight }}>
                Be respectful and constructive in your comments
              </div>
              <Button type="submit" disabled={!newComment.trim()}>
                Post Comment
              </Button>
            </FormActions>
          </CommentForm>
        ) : (
          <LoginPrompt>
            <UserCircleIcon style={{ 
              width: '3rem', 
              height: '3rem', 
              margin: '0 auto ' + theme.spacing.md,
              color: theme.colors.textLight 
            }} />
            <h3 style={{ marginBottom: theme.spacing.sm }}>Join the discussion</h3>
            <p style={{ 
              color: theme.colors.textLight, 
              marginBottom: theme.spacing.lg 
            }}>
              Sign in to share your thoughts and engage with the community
            </p>
            <div style={{ display: 'flex', gap: theme.spacing.md, justifyContent: 'center' }}>
              <Button onClick={() => setIsAuthenticated(true)}>
                Sign In
              </Button>
              <Button variant="outline">
                Create Account
              </Button>
            </div>
          </LoginPrompt>
        )}

        <CommentsList>
          <AnimatePresence>
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CommentHeader>
                  <UserAvatar>
                    {comment.user.firstName[0]}
                  </UserAvatar>
                  <UserInfo>
                    <UserName>{comment.user.username}</UserName>
                    <CommentTime>{formatTimeAgo(comment.createdAt)}</CommentTime>
                  </UserInfo>
                </CommentHeader>

                <CommentContent>{comment.content}</CommentContent>

                <CommentActions>
                  <ActionButton
                    isActive={likedComments.has(comment.id)}
                    onClick={() => handleLike(comment.id)}
                  >
                    {likedComments.has(comment.id) ? (
                      <HeartSolidIcon style={{ width: '1rem', height: '1rem' }} />
                    ) : (
                      <HeartIcon style={{ width: '1rem', height: '1rem' }} />
                    )}
                    {comment.likes}
                  </ActionButton>

                  <ActionButton onClick={() => setReplyingTo(comment.id)}>
                    <ArrowUturnRightIcon style={{ width: '1rem', height: '1rem' }} />
                    Reply
                  </ActionButton>
                </CommentActions>

                {comment.replies && comment.replies.length > 0 && (
                  <ReplySection>
                    {comment.replies.map((reply) => (
                      <div key={reply.id} style={{ marginBottom: theme.spacing.md }}>
                        <CommentHeader>
                          <UserAvatar style={{ width: '32px', height: '32px' }}>
                            {reply.user.firstName[0]}
                          </UserAvatar>
                          <UserInfo>
                            <UserName>{reply.user.username}</UserName>
                            <CommentTime>{formatTimeAgo(reply.createdAt)}</CommentTime>
                          </UserInfo>
                        </CommentHeader>
                        <CommentContent>{reply.content}</CommentContent>
                      </div>
                    ))}
                  </ReplySection>
                )}
              </CommentCard>
            ))}
          </AnimatePresence>
        </CommentsList>
      </Container>
    </CommentsSection>
  );
};

export default CommentSection; 