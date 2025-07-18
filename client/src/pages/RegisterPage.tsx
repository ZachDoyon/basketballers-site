import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button, Input, Card, theme } from '../styles/GlobalStyles';

const RegisterContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${theme.colors.backgroundGray} 0%, ${theme.colors.background} 100%);
  padding: ${theme.spacing.xl} 0;
`;

const RegisterCard = styled(Card)`
  width: 100%;
  max-width: 450px;
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

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
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

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic
    console.log('Register:', formData);
  };

  return (
    <RegisterContainer>
      <Container>
        <RegisterCard>
          <Title>Join BasketBallers</Title>
          
          <SocialButton variant="outline">
            🌐 Sign up with Google
          </SocialButton>
          
          <SocialButton variant="outline">
            📘 Sign up with Facebook
          </SocialButton>
          
          <Divider>
            <span>or create an account</span>
          </Divider>
          
          <Form onSubmit={handleSubmit}>
            <InputRow>
              <Input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </InputRow>
            
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            
            <Button type="submit" fullWidth>
              Create Account
            </Button>
          </Form>
          
          <div style={{ 
            textAlign: 'center', 
            marginTop: theme.spacing.lg,
            color: theme.colors.textLight,
            fontSize: theme.fontSizes.sm 
          }}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: theme.colors.primary,
                textDecoration: 'none',
                fontWeight: theme.fontWeights.medium 
              }}
            >
              Sign in
            </Link>
          </div>
        </RegisterCard>
      </Container>
    </RegisterContainer>
  );
};

export default RegisterPage; 