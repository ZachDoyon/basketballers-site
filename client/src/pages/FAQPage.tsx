import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Container, Input, theme } from '../styles/GlobalStyles';
import { FAQ } from '../types';

const FAQContainer = styled.div`
  padding: ${theme.spacing['4xl']} 0;
  min-height: 100vh;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing['4xl']};
`;

const Title = styled.h1`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.text};

  @media (max-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes['3xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.textLight};
  max-width: 600px;
  margin: 0 auto ${theme.spacing['2xl']};
`;

const SearchContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
`;

const SearchInput = styled(Input)`
  padding-left: 3rem;
`;

const SearchIcon = styled(MagnifyingGlassIcon)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: ${theme.colors.textLight};
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin: ${theme.spacing['2xl']} 0;
`;

const CategoryButton = styled.button<{ isActive: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.full};
  border: 1px solid ${theme.colors.border};
  background: ${({ isActive }) => isActive ? theme.colors.primary : theme.colors.background};
  color: ${({ isActive }) => isActive ? theme.colors.textWhite : theme.colors.text};
  font-weight: ${theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ isActive }) => isActive ? theme.colors.primaryDark : theme.colors.backgroundGray};
  }
`;

const FAQSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled(motion.div)`
  background: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.xl};
  margin-bottom: ${theme.spacing.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.sm};
`;

const QuestionButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.xl};
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: ${theme.colors.backgroundGray};
  }
`;

const Question = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.text};
  margin: 0;
  flex: 1;
`;

const ChevronIcon = styled(motion.div)`
  color: ${theme.colors.primary};
`;

const Answer = styled(motion.div)`
  padding: 0 ${theme.spacing.xl} ${theme.spacing.xl};
  color: ${theme.colors.textLight};
  line-height: 1.6;
`;

const ContactSection = styled.section`
  background: ${theme.colors.backgroundGray};
  padding: ${theme.spacing['3xl']};
  border-radius: ${theme.borderRadius.xl};
  text-align: center;
  margin-top: ${theme.spacing['4xl']};
`;

const ContactTitle = styled.h2`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text};
`;

const ContactText = styled.p`
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.lg};
`;

const ContactLink = styled.a`
  color: ${theme.colors.primary};
  text-decoration: none;
  font-weight: ${theme.fontWeights.medium};

  &:hover {
    text-decoration: underline;
  }
`;

const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'What is BasketBallers and what does it offer?',
    answer: 'BasketBallers is your ultimate destination for basketball news, analysis, and community discussions. We aggregate news from major outlets like ESPN, Bleacher Report, and more, while also providing a platform for users to create their own blogs, engage in discussions, and stay updated with breaking news from all basketball leagues including NBA, WNBA, NCAA, and international basketball.',
    category: 'General',
    order: 1
  },
  {
    id: '2',
    question: 'How do I create an account?',
    answer: 'Creating an account is easy! Click the "Login" button in the top right corner, then select "Create Account". You can sign up using your email address or connect with your existing social media accounts (Google, Facebook). Once registered, you\'ll have access to commenting, blog creation, personalized news feeds, and community features.',
    category: 'Account',
    order: 2
  },
  {
    id: '3',
    question: 'Can I write my own blog posts?',
    answer: 'Absolutely! Once you have an account, you can create your own blog channel. Navigate to the "Blogs" section and click "Create Blog". You can write about your favorite teams, game analysis, predictions, or any basketball-related content. All blog posts are moderated to ensure quality and adherence to our community guidelines.',
    category: 'Blogging',
    order: 3
  },
  {
    id: '4',
    question: 'How do I subscribe to the newsletter?',
    answer: 'You can subscribe to our newsletter at the bottom of the homepage or any article page. Simply enter your email address and select your preferences for the types of basketball news you want to receive (NBA, WNBA, NCAA, International, Breaking News). You can modify your preferences or unsubscribe at any time.',
    category: 'Newsletter',
    order: 4
  },
  {
    id: '5',
    question: 'What basketball leagues do you cover?',
    answer: 'We comprehensively cover all major basketball leagues and competitions including NBA, WNBA, NCAA Division I basketball, international leagues (EuroLeague, FIBA competitions), G League, Summer League, and other professional leagues worldwide. Our coverage includes game recaps, analysis, trade rumors, draft news, and player updates.',
    category: 'Content',
    order: 5
  },
  {
    id: '6',
    question: 'How do I comment on articles?',
    answer: 'To comment on articles, you need to be logged in to your account. Scroll down to the comments section at the bottom of any article and share your thoughts. You can also like other comments and reply to start discussions. Please keep comments respectful and relevant to the article topic.',
    category: 'Community',
    order: 6
  },
  {
    id: '7',
    question: 'Is BasketBallers free to use?',
    answer: 'Yes, BasketBallers is completely free to use! You can access all news articles, create blog posts, comment on articles, and participate in community discussions without any fees. We may introduce premium features in the future, but our core content and community features will always remain free.',
    category: 'General',
    order: 7
  },
  {
    id: '8',
    question: 'How often is the news updated?',
    answer: 'Our news feed is updated continuously throughout the day. We aggregate content from multiple reliable sources and aim to deliver breaking news as quickly as possible. Major stories and game results are typically available within minutes of being reported by our source outlets.',
    category: 'Content',
    order: 8
  },
  {
    id: '9',
    question: 'Can I customize my news feed?',
    answer: 'Yes! Once you create an account, you can customize your news feed based on your favorite teams, leagues, and topics. You can follow specific teams, set up notifications for breaking news, and prioritize content that matters most to you. These preferences can be updated anytime in your account settings.',
    category: 'Account',
    order: 9
  },
  {
    id: '10',
    question: 'How do I report inappropriate content?',
    answer: 'If you encounter inappropriate content, spam, or content that violates our community guidelines, please use the "Report" button found on articles, comments, or blog posts. You can also contact our moderation team directly at moderation@basketballers.com. We take all reports seriously and review them promptly.',
    category: 'Community',
    order: 10
  },
];

const categories = ['All', 'General', 'Account', 'Blogging', 'Newsletter', 'Content', 'Community'];

const FAQPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredFAQs = mockFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <FAQContainer>
      <Container>
        <HeroSection>
          <Title>Frequently Asked Questions</Title>
          <Subtitle>
            Find answers to common questions about BasketBallers, our features, and how to get the most out of our platform.
          </Subtitle>
          
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
        </HeroSection>

        <CategoryFilter>
          {categories.map(category => (
            <CategoryButton
              key={category}
              isActive={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryFilter>

        <FAQSection>
          <AnimatePresence>
            {filteredFAQs.map((faq) => (
              <FAQItem
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuestionButton onClick={() => toggleItem(faq.id)}>
                  <Question>{faq.question}</Question>
                  <ChevronIcon
                    animate={{ rotate: openItems.has(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDownIcon style={{ width: '1.5rem', height: '1.5rem' }} />
                  </ChevronIcon>
                </QuestionButton>

                <AnimatePresence>
                  {openItems.has(faq.id) && (
                    <Answer
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </Answer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
          </AnimatePresence>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                textAlign: 'center', 
                padding: theme.spacing['2xl'],
                color: theme.colors.textLight 
              }}
            >
              No FAQs found matching your search criteria.
            </motion.div>
          )}
        </FAQSection>

        <ContactSection>
          <ContactTitle>Still have questions?</ContactTitle>
          <ContactText>
            Can't find the answer you're looking for? Our support team is here to help!
          </ContactText>
          <div>
            <ContactLink href="mailto:support@basketballers.com">
              Contact Support
            </ContactLink>
            {' • '}
            <ContactLink href="/contact">
              Send Feedback
            </ContactLink>
          </div>
        </ContactSection>
      </Container>
    </FAQContainer>
  );
};

export default FAQPage; 