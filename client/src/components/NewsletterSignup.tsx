import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { EnvelopeIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Container, Button, Input, theme } from '../styles/GlobalStyles';

const NewsletterSection = styled.section`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  padding: ${theme.spacing['4xl']} 0;
  color: ${theme.colors.textWhite};
`;

const NewsletterContent = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const NewsletterTitle = styled.h2`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.md};
`;

const NewsletterDescription = styled.p`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing['2xl']};
  opacity: 0.9;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  max-width: 400px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  position: relative;
`;

const EmailInput = styled(Input)`
  padding-left: 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: ${theme.colors.textWhite};

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }
`;

const EmailIcon = styled(EnvelopeIcon)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: rgba(255, 255, 255, 0.7);
`;

const PreferencesTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing.md};
  text-align: left;
`;

const PreferencesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  font-size: ${theme.fontSizes.sm};
  opacity: 0.9;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

const Checkbox = styled.input`
  appearance: none;
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: ${theme.borderRadius.base};
  background: transparent;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease-in-out;

  &:checked {
    background: ${theme.colors.textWhite};
    border-color: ${theme.colors.textWhite};
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.75rem;
    height: 0.75rem;
    background: ${theme.colors.primary};
    mask: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z'/%3e%3c/svg%3e") no-repeat center;
  }
`;

const SuccessMessage = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.5);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  color: ${theme.colors.textWhite};
  font-weight: ${theme.fontWeights.medium};
`;

interface NewsletterPreferences {
  nba: boolean;
  wnba: boolean;
  ncaa: boolean;
  international: boolean;
  breaking: boolean;
}

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState<NewsletterPreferences>({
    nba: true,
    wnba: false,
    ncaa: false,
    international: false,
    breaking: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePreferenceChange = (key: keyof NewsletterPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
  };

  if (isSubmitted) {
    return (
      <NewsletterSection>
        <Container>
          <NewsletterContent>
            <SuccessMessage
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CheckIcon style={{ width: '1.5rem', height: '1.5rem' }} />
              Thanks for subscribing! Check your email to confirm.
            </SuccessMessage>
          </NewsletterContent>
        </Container>
      </NewsletterSection>
    );
  }

  return (
    <NewsletterSection>
      <Container>
        <NewsletterContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <NewsletterTitle>Stay in the Game</NewsletterTitle>
            <NewsletterDescription>
              Get the latest basketball news, analysis, and breaking updates delivered to your inbox
            </NewsletterDescription>

            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <EmailIcon />
                <EmailInput
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>

              <div>
                <PreferencesTitle>What interests you?</PreferencesTitle>
                <PreferencesGrid>
                  <CheckboxLabel>
                    <Checkbox
                      type="checkbox"
                      checked={preferences.nba}
                      onChange={() => handlePreferenceChange('nba')}
                    />
                    NBA News
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <Checkbox
                      type="checkbox"
                      checked={preferences.wnba}
                      onChange={() => handlePreferenceChange('wnba')}
                    />
                    WNBA News
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <Checkbox
                      type="checkbox"
                      checked={preferences.ncaa}
                      onChange={() => handlePreferenceChange('ncaa')}
                    />
                    College Basketball
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <Checkbox
                      type="checkbox"
                      checked={preferences.international}
                      onChange={() => handlePreferenceChange('international')}
                    />
                    International
                  </CheckboxLabel>
                  <CheckboxLabel>
                    <Checkbox
                      type="checkbox"
                      checked={preferences.breaking}
                      onChange={() => handlePreferenceChange('breaking')}
                    />
                    Breaking News Alerts
                  </CheckboxLabel>
                </PreferencesGrid>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isLoading || !email}
                style={{
                  background: theme.colors.textWhite,
                  color: theme.colors.primary,
                  fontWeight: theme.fontWeights.semibold,
                }}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
              </Button>
            </Form>
          </motion.div>
        </NewsletterContent>
      </Container>
    </NewsletterSection>
  );
};

export default NewsletterSignup; 