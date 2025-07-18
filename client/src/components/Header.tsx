import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';
import { Container, Button, theme } from '../styles/GlobalStyles';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  box-shadow: ${theme.shadows.lg};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.md} 0;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: ${theme.fontSizes['2xl']};
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.textWhite};
  text-decoration: none;
  
  &:hover {
    color: ${theme.colors.textWhite};
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, ${theme.colors.accent}, ${theme.colors.primaryLight});
  border-radius: 50%;
  margin-right: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${theme.fontWeights.bold};
  color: ${theme.colors.textWhite};
`;

const Navigation = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.lg}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${theme.colors.secondary};
    flex-direction: column;
    padding: ${theme.spacing.lg};
    box-shadow: ${theme.shadows.lg};
  }
`;

const NavItem = styled.div`
  position: relative;
`;

const NavLink = styled(Link)`
  color: ${theme.colors.textWhite};
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.textWhite};
  }
`;

const DropdownButton = styled.button`
  color: ${theme.colors.textWhite};
  font-weight: ${theme.fontWeights.medium};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.xl};
  padding: ${theme.spacing.sm};
  min-width: 200px;
  z-index: 1001;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.text};
  border-radius: ${theme.borderRadius.md};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${theme.colors.backgroundGray};
    color: ${theme.colors.primary};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.full};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  padding-left: 2.5rem;
  color: ${theme.colors.textWhite};
  font-size: ${theme.fontSizes.sm};
  width: 200px;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: ${theme.colors.primaryLight};
    width: 250px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    width: 150px;
    
    &:focus {
      width: 180px;
    }
  }
`;

const SearchIcon = styled(MagnifyingGlassIcon)`
  position: absolute;
  left: ${theme.spacing.sm};
  width: 1rem;
  height: 1rem;
  color: rgba(255, 255, 255, 0.7);
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${theme.colors.textWhite};
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.lg}) {
    display: block;
  }
`;

const leagues = [
  { name: 'NBA', path: '/news/nba' },
  { name: 'WNBA', path: '/news/wnba' },
  { name: 'NCAA', path: '/news/ncaa' },
  { name: 'International', path: '/news/international' },
  { name: 'G League', path: '/news/g-league' },
  { name: 'Summer League', path: '/news/summer-league' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLeaguesOpen, setIsLeaguesOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLeagues = () => setIsLeaguesOpen(!isLeaguesOpen);

  return (
    <HeaderContainer>
      <Container>
        <HeaderContent>
          <Logo to="/">
            <LogoIcon>🏀</LogoIcon>
            BasketBallers
          </Logo>

          <Navigation isOpen={isMenuOpen}>
            <NavLink to="/">Home</NavLink>
            
            <NavItem
              onMouseEnter={() => setIsLeaguesOpen(true)}
              onMouseLeave={() => setIsLeaguesOpen(false)}
            >
              <DropdownButton onClick={toggleLeagues}>
                Leagues
                <ChevronDownIcon style={{ width: '1rem', height: '1rem' }} />
              </DropdownButton>
              
              <AnimatePresence>
                {isLeaguesOpen && (
                  <DropdownMenu
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {leagues.map((league) => (
                      <DropdownItem
                        key={league.name}
                        to={league.path}
                        onClick={() => setIsLeaguesOpen(false)}
                      >
                        {league.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                )}
              </AnimatePresence>
            </NavItem>

            <NavLink to="/blogs">Blogs</NavLink>
            <NavLink to="/faq">FAQ</NavLink>
          </Navigation>

          <UserActions>
            <SearchContainer>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Search news..."
              />
            </SearchContainer>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
              style={{ 
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: theme.colors.textWhite 
              }}
            >
              <UserIcon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
              Login
            </Button>

            <MobileMenuButton onClick={toggleMenu}>
              {isMenuOpen ? (
                <XMarkIcon style={{ width: '1.5rem', height: '1.5rem' }} />
              ) : (
                <Bars3Icon style={{ width: '1.5rem', height: '1.5rem' }} />
              )}
            </MobileMenuButton>
          </UserActions>
        </HeaderContent>
      </Container>
    </HeaderContainer>
  );
};

export default Header; 