import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../../hooks/useAuth';

// Styled Components
const Nav = styled.nav`
  background-color: #2c3e50;
  padding: 0.8rem 2rem;
  height: 60px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const LeftSection = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    flex: none;
  }
`;

const CenterSection = styled.div`
  flex: 1;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavTitle = styled.h1`
  color: #ecf0f1;
  font-size: 1.5rem;
  margin: 0;

  a {
    color: #ecf0f1;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #3498db;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonStyle = styled(Link)`
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const Welcome = styled.span`
  color: #bdc3c7;
  font-size: 0.9rem;
`;

// Mobile Menu Components
const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 25px;
  }
`;

const HamburgerLine = styled.span<{ isOpen: boolean }>`
  width: 100%;
  height: 3px;
  background-color: #ecf0f1;
  border-radius: 2px;
  transition: all 0.3s ease;

  &:nth-of-type(1) {
    transform: ${props => props.isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0)'};
  }

  &:nth-of-type(2) {
    opacity: ${props => props.isOpen ? '0' : '1'};
  }

  &:nth-of-type(3) {
    transform: ${props => props.isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'rotate(0)'};
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: #2c3e50;
    padding: ${props => props.isOpen ? '1rem' : '0'};
    max-height: ${props => props.isOpen ? '300px' : '0'};
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: ${props => props.isOpen ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
    gap: 10px;
    z-index: 999;
  }
`;

const MobileWelcome = styled.span`
  color: #bdc3c7;
  font-size: 0.9rem;
  padding: 10px 0;
  border-bottom: 1px solid #34495e;
  margin-bottom: 5px;
`;

const MobileButton = styled(Link)`
  padding: 12px 16px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const MobileLogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 12px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c0392b;
  }
`;

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <LeftSection>
            <NavTitle>
              <Link to="/" onClick={closeMobileMenu}>Hostel Grievance System</Link>
            </NavTitle>
          </LeftSection>
          
          <CenterSection>
            {isAuthenticated ? (
              <Welcome>Welcome, {user?.username || user?.email}</Welcome>
            ) : (
              <Welcome>Welcome, Guest</Welcome>
            )}
          </CenterSection>

          <RightSection>
            {isAuthenticated && (
              <>
                <ButtonStyle to="/types">Add Grievance</ButtonStyle>
                <ButtonStyle to="/grievanceList">Grievance List</ButtonStyle>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </>
            )}
          </RightSection>

          {isAuthenticated && (
            <HamburgerButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <HamburgerLine isOpen={isMobileMenuOpen} />
              <HamburgerLine isOpen={isMobileMenuOpen} />
              <HamburgerLine isOpen={isMobileMenuOpen} />
            </HamburgerButton>
          )}
        </NavContainer>
      </Nav>

      <MobileMenu isOpen={isMobileMenuOpen}>
        {isAuthenticated && (
          <>
            <MobileWelcome>Welcome, {user?.username || user?.email}</MobileWelcome>
            <MobileButton to="/types" onClick={closeMobileMenu}>Add Grievance</MobileButton>
            <MobileButton to="/grievanceList" onClick={closeMobileMenu}>Grievance List</MobileButton>
            <MobileLogoutButton onClick={handleLogout}>Logout</MobileLogoutButton>
          </>
        )}
      </MobileMenu>
    </>
  );
};
