import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, theme } from '../styles/GlobalStyles';

const FooterContainer = styled.footer`
  background: ${theme.colors.secondary};
  color: ${theme.colors.textWhite};
  padding: ${theme.spacing['4xl']} 0 ${theme.spacing.xl} 0;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing['2xl']};
  margin-bottom: ${theme.spacing['2xl']};

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: ${theme.fontWeights.semibold};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.textWhite};
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: ${theme.spacing.sm};
  transition: color 0.2s ease-in-out;
  font-size: ${theme.fontSizes.sm};

  &:hover {
    color: ${theme.colors.primaryLight};
  }
`;

const ExternalLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: ${theme.spacing.sm};
  transition: color 0.2s ease-in-out;
  font-size: ${theme.fontSizes.sm};

  &:hover {
    color: ${theme.colors.primaryLight};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes.xl};
  font-weight: ${theme.fontWeights.bold};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.textWhite};
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: linear-gradient(45deg, ${theme.colors.accent}, ${theme.colors.primaryLight});
  border-radius: 50%;
  margin-right: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeights.bold};
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.sm};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textWhite};
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: ${theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: ${theme.fontSizes.sm};
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterSection>
            <Logo>
              <LogoIcon>🏀</LogoIcon>
              BasketBallers
            </Logo>
            <Description>
              Your ultimate destination for basketball news, analysis, and community discussions. 
              Stay connected with the latest updates from all major basketball leagues.
            </Description>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                📘
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                🐦
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                📷
              </SocialLink>
              <SocialLink href="#" aria-label="YouTube">
                📺
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Leagues</FooterTitle>
            <FooterLink to="/news/nba">NBA</FooterLink>
            <FooterLink to="/news/wnba">WNBA</FooterLink>
            <FooterLink to="/news/ncaa">NCAA</FooterLink>
            <FooterLink to="/news/international">International</FooterLink>
            <FooterLink to="/news/g-league">G League</FooterLink>
            <FooterLink to="/news/summer-league">Summer League</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Community</FooterTitle>
            <FooterLink to="/blogs">User Blogs</FooterLink>
            <FooterLink to="/forums">Discussion Forums</FooterLink>
            <FooterLink to="/writers">Become a Writer</FooterLink>
            <FooterLink to="/events">Events</FooterLink>
            <FooterLink to="/podcasts">Podcasts</FooterLink>
            <FooterLink to="/predictions">Predictions</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Support</FooterTitle>
            <FooterLink to="/faq">FAQ</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
            <FooterLink to="/support">Help Center</FooterLink>
            <FooterLink to="/feedback">Feedback</FooterLink>
            <ExternalLink href="mailto:support@basketballers.com">
              support@basketballers.com
            </ExternalLink>
            <ExternalLink href="tel:+1-555-HOOPS">
              1-555-HOOPS
            </ExternalLink>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © 2024 BasketBallers. All rights reserved.
          </Copyright>
          <LegalLinks>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/cookies">Cookie Policy</FooterLink>
            <FooterLink to="/accessibility">Accessibility</FooterLink>
          </LegalLinks>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 