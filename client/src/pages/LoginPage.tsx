import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button, Input, Card, theme } from '../styles/GlobalStyles';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${theme.colors.backgroundGray} 0%, ${theme.colors.background} 100%);
  padding: ${theme.spacing.xl} 0;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: ${theme.spacing['2xl']};
`;

const Title = styled.h1`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const SocialButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: 100%;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${theme.spacing.lg} 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${theme.colors.border};
  }
  
  span {
    padding: 0 ${theme.spacing.md};
    color: ${theme.colors.textLight};
    font-size: ${theme.fontSizes.sm};
  }
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login:', { email, password });
  };

  return (
    <LoginContainer>
      <Container>
        <LoginCard>
          <Title>Welcome Back</Title>
          
          <SocialButton variant="outline">
            🌐 Continue with Google
          </SocialButton>
          
          <SocialButton variant="outline">
            📘 Continue with Facebook
          </SocialButton>
          
          <Divider>
            <span>or sign in with email</span>
          </Divider>
          
          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button type="submit" fullWidth>
              Sign In
            </Button>
          </Form>
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: theme.spacing.lg,
            color: theme.colors.textLight,
            fontSize: theme.fontSizes.sm 
          }}>
            Don't have an account?{' '}
            <Link 
              to="/register" 
              style={{ 
                color: theme.colors.primary,
                textDecoration: 'none',
                fontWeight: theme.fontWeights.medium 
              }}
            >
              Create one
            </Link>
          </div>
        </LoginCard>
      </Container>
    </LoginContainer>
  );
};

export default LoginPage; 