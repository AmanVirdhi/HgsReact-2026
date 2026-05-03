import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { userService } from '../../services/userService';
import { SignUp, Login as LoginType } from '../../models/types';
import { Header } from '../Header/Header';
import { useAuth } from '../../hooks/useAuth';

// Styled Components
const Container = styled.div`
  min-height: calc(100vh - 60px);
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
    align-items: flex-start;
    padding-top: 20px;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  padding: 40px;

  @media (max-width: 768px) {
    padding: 25px 20px;
    border-radius: 12px;
    max-width: 100%;
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px;
  background: none;
  border: none;
  font-size: 1.1em;
  font-weight: 600;
  color: ${props => props.active ? '#667eea' : '#999'};
  cursor: pointer;
  position: relative;
  transition: color 0.3s;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.active ? '#667eea' : 'transparent'};
    transition: background 0.3s;
  }

  &:hover {
    color: #667eea;
  }

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 1em;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #aaa;
  }

  @media (max-width: 768px) {
    padding: 12px 14px;
    margin-bottom: 12px;
    font-size: 16px; /* Prevents zoom on iOS */
  }
`;

const FormButton = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 12px;
    margin-top: 8px;
  }
`;

const ErrorMsg = styled.p`
  color: #e74c3c;
  text-align: center;
  margin-bottom: 16px;
  font-size: 0.9em;

  @media (max-width: 768px) {
    font-size: 0.85em;
    margin-bottom: 12px;
  }
`;

const SuccessMsg = styled.p`
  color: #27ae60;
  text-align: center;
  margin-bottom: 16px;
  font-size: 0.9em;

  @media (max-width: 768px) {
    font-size: 0.85em;
    margin-bottom: 12px;
  }
`;

const ForgotLink = styled.span`
  color: #667eea;
  cursor: pointer;
  display: block;
  text-align: center;
  font-size: 0.9em;
  margin-top: 15px;
  
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 0.85em;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 15px;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 100%;
    border-radius: 10px;
  }
`;

const ModalTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.25rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ModalText = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 0.9em;

  @media (max-width: 768px) {
    font-size: 0.85em;
    margin-bottom: 1rem;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-top: 0.75rem;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #e2e8f0;
  color: #475569;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #cbd5e1;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Login: React.FC = () => {
  const [authError, setAuthError] = useState<string>('');
  const [isLoginActive, setIsLoginActive] = useState<boolean>(true);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [forgotMessage, setForgotMessage] = useState<string>('');
  const [forgotError, setForgotError] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Signup form state
  const [signupData, setSignupData] = useState<SignUp>({
    username: '',
    email: '',
    password: ''
  });

  // Login form state
  const [loginData, setLoginData] = useState<LoginType>({
    email: '',
    password: ''
  });

  useEffect(() => {
    // Reload user - check if already logged in
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [navigate, isAuthenticated]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await userService.signup(signupData);
      if (result) {
        setAuthError('Account created successfully');
        login(result);
        navigate('/home');
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message || 'Signup failed. Please try again.';
      setAuthError(message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await userService.login(loginData);
      if (result && result.token) {
        login(result);
        setAuthError('');
        navigate('/home');
      } else {
        setAuthError('Email or password is invalid');
      }
    } catch (error) {
      setAuthError('Email or password is invalid');
    }
  };

  const switchTab = (toLogin: boolean) => {
    setIsLoginActive(toLogin);
    setAuthError('');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');
    setForgotMessage('');
    
    if (!forgotEmail || !newPassword) {
      setForgotError('Please enter email and new password');
      return;
    }

    setIsResetting(true);
    try {
      await userService.resetPassword(forgotEmail, newPassword);
      setForgotMessage('Password reset successful! You can now login.');
      setForgotEmail('');
      setNewPassword('');
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotMessage('');
      }, 1000);
    } catch (error: any) {
      setForgotError(error.message || 'Failed to reset password. Email not found.');
    } finally {
      setIsResetting(false);
    }
  };

  const closeForgotModal = () => {
    setShowForgotPassword(false);
    setForgotEmail('');
    setNewPassword('');
    setForgotError('');
    setForgotMessage('');
  };

  return (
    <>
      <Header />
      <Container>
        <Card>
          <TabContainer>
            <Tab active={isLoginActive} onClick={() => switchTab(true)}>
              Login
            </Tab>
            <Tab active={!isLoginActive} onClick={() => switchTab(false)}>
              Sign Up
            </Tab>
          </TabContainer>

          {authError && <ErrorMsg>{authError}</ErrorMsg>}

          {isLoginActive ? (
            <form onSubmit={handleLogin}>
              <FormInput
                type="email"
                placeholder="Email"
                required
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
              <FormInput
                type="password"
                placeholder="Password"
                required
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <FormButton type="submit">Login</FormButton>
              <ForgotLink onClick={() => setShowForgotPassword(true)}>
                Forgot Password?
              </ForgotLink>
            </form>
          ) : (
            <form onSubmit={handleSignUp}>
              <FormInput
                type="text"
                placeholder="Username"
                required
                value={signupData.username}
                onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
              />
              <FormInput
                type="email"
                placeholder="Email"
                required
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              />
              <FormInput
                type="password"
                placeholder="Password"
                required
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              />
              <FormButton type="submit">Sign Up</FormButton>
            </form>
          )}
        </Card>
      </Container>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ModalOverlay onClick={closeForgotModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Reset Password</ModalTitle>
            <ModalText>Enter your email and new password</ModalText>
            
            {forgotError && <ErrorMsg>{forgotError}</ErrorMsg>}
            {forgotMessage && <SuccessMsg>{forgotMessage}</SuccessMsg>}
            
            <form onSubmit={handleForgotPassword}>
              <FormInput
                type="email"
                placeholder="Email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <FormInput
                type="password"
                placeholder="New Password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <ModalButtons>
                <CancelButton type="button" onClick={closeForgotModal}>
                  Cancel
                </CancelButton>
                <FormButton type="submit" disabled={isResetting}>
                  {isResetting ? 'Resetting...' : 'Reset Password'}
                </FormButton>
              </ModalButtons>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};
