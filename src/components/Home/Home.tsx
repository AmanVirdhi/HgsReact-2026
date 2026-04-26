import React from 'react';
import styled from '@emotion/styled';
import { Header } from '../Header/Header';

// Styled Components
const PageWrapper = styled.div`
  height: calc(100vh - 60px);
  margin-top: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;

  @media (max-width: 768px) {
    height: auto;
    min-height: calc(100vh - 60px);
    padding: 0.5rem;
    align-items: flex-start;
  }
`;

const Container = styled.div`
  max-width: 700px;
  width: 100%;
  padding: 1.5rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 12px;
    margin: 0.5rem 0;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 0.8rem;
  text-align: center;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
`;

const Content = styled.p`
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
  text-align: justify;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.5;
    text-align: left;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
`;

const FeatureCard = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const FeatureIcon = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.4rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const FeatureTitle = styled.h3`
  color: #2c3e50;
  font-size: 0.9rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Highlight = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
    margin-top: 0.8rem;
  }
`;

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <PageWrapper>
        <Container>
          <Title>🏠 Hostel Grievance System</Title>
          <Subtitle>Your voice matters. We're here to listen.</Subtitle>
          
          <Content>
            Welcome to the Hostel Grievance System, a dedicated platform designed to streamline and address the concerns of
            residents efficiently. Our goal is to foster a harmonious living environment by providing students with a
            transparent and user-friendly interface to submit grievances.
          </Content>

          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>📝</FeatureIcon>
              <FeatureTitle>Easy Submission</FeatureTitle>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>✅</FeatureIcon>
              <FeatureTitle>Quick Resolution</FeatureTitle>
            </FeatureCard>
          </FeaturesGrid>

          <Content>
            We empower residents to voice their issues and receive timely support. We believe that every concern matters 
            and strive to ensure that your living experience is comfortable and enjoyable.
          </Content>

          <Highlight>
            🤝 Together, let's build a supportive and responsive hostel community!
          </Highlight>
        </Container>
      </PageWrapper>
    </>
  );
};
