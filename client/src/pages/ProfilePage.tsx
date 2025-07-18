import React from 'react';
import styled from 'styled-components';
import { Container, Card, theme } from '../styles/GlobalStyles';

const ProfileContainer = styled.div`
  padding: ${theme.spacing['2xl']} 0;
  min-height: 100vh;
`;

const ProfileCard = styled(Card)`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const ProfilePage: React.FC = () => {
  return (
    <ProfileContainer>
      <Container>
        <ProfileCard>
          <h1>User Profile</h1>
          <p>Profile page coming soon...</p>
        </ProfileCard>
      </Container>
    </ProfileContainer>
  );
};

export default ProfilePage; 