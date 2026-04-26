import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Header } from '../Header/Header';
import { typesService } from '../../services/typesService';
import { HgsTypes } from '../../models/types';

// Styled Components
const PageWrapper = styled.div`
  height: calc(100vh - 60px);
  margin-top: 60px;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow: auto;

  @media (max-width: 768px) {
    height: auto;
    min-height: calc(100vh - 60px);
    padding: 0.75rem;
    align-items: flex-start;
    padding-top: 1rem;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 2rem;
  width: 100%;
  max-width: 420px;

  @media (max-width: 768px) {
    padding: 1.25rem 1rem;
    border-radius: 10px;
    max-width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 0.3rem;
  text-align: center;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.15rem;
  }
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
`;

const Message = styled.p<{ error?: boolean }>`
  background: ${props => props.error ? '#fee2e2' : '#d1fae5'};
  color: ${props => props.error ? '#dc2626' : '#059669'};
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-weight: 500;
  text-align: center;
  font-size: 0.85rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.4rem 0.6rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Label = styled.label`
  font-size: 0.8rem;
  color: #475569;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const Input = styled.input`
  height: 38px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0 0.8rem;
  font-size: 0.9rem;
  color: #334155;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 768px) {
    height: 36px;
    font-size: 16px; /* Prevents zoom on iOS */
    padding: 0 0.7rem;
  }
`;

const TextArea = styled.textarea`
  min-height: 60px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  font-size: 0.9rem;
  color: #334155;
  resize: none;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 768px) {
    min-height: 50px;
    font-size: 16px;
    padding: 0.5rem 0.7rem;
  }
`;

const Button = styled.button<{ disabled?: boolean }>`
  height: 40px;
  border: none;
  border-radius: 6px;
  background: ${props => props.disabled ? '#94a3b8' : '#3498db'};
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.3rem;

  &:hover {
    background: ${props => props.disabled ? '#94a3b8' : '#2980b9'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
  }

  @media (max-width: 768px) {
    height: 38px;
    font-size: 0.9rem;
  }
`;

const Spinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-right: 8px;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const Edit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<HgsTypes | null>(null);
  const [grievanceMessage, setGrievanceMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<HgsTypes>>({
    name: '',
    grievancetypes: '',
    room: undefined,
    course: '',
    mobile: undefined,
    description: ''
  });

  useEffect(() => {
    if (id) {
      fetchGrievance(id);
    }
  }, [id]);

  const fetchGrievance = async (grievanceId: string) => {
    try {
      const data = await typesService.getGrievance(grievanceId);
      setUserData(data);
      setFormData({
        name: data.name,
        grievancetypes: data.grievancetypes,
        room: data.room,
        course: data.course,
        mobile: data.mobile,
        description: data.description
      });
    } catch (error) {
      console.error('Error fetching grievance:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'room' || name === 'mobile' ? (value ? Number(value) : undefined) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData) return;

    const updatedData: HgsTypes = {
      ...formData as HgsTypes,
      id: userData.id
    };

    setIsLoading(true);
    try {
      const result = await typesService.updateGrievance(updatedData);
      if (result) {
        setGrievanceMessage('Grievance has been updated');
        setTimeout(() => {
          setGrievanceMessage('');
          navigate('/grievanceList');
        }, 1000);
      }
    } catch (error) {
      console.error('Error updating grievance:', error);
      setGrievanceMessage('Failed to update grievance');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <PageWrapper>
        <Card>
          <Title>✏️ Update Grievance</Title>
          <Subtitle>Edit your grievance details</Subtitle>
          
          {grievanceMessage && (
            <Message error={grievanceMessage.includes('Failed')}>
              {grievanceMessage}
            </Message>
          )}
          
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Grievance Type</Label>
              <Input
                type="text"
                placeholder="e.g. Plumbing, Electricity, etc."
                name="grievancetypes"
                value={formData.grievancetypes || ''}
                onChange={handleInputChange}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Room Number</Label>
              <Input
                type="text"
                placeholder="Enter room number"
                name="room"
                value={formData.room || ''}
                onChange={handleInputChange}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Course</Label>
              <Input
                type="text"
                placeholder="Enter your course"
                name="course"
                value={formData.course || ''}
                onChange={handleInputChange}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Mobile Number</Label>
              <Input
                type="text"
                placeholder="10-digit mobile number"
                name="mobile"
                value={formData.mobile || ''}
                onChange={handleInputChange}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Description</Label>
              <TextArea
                placeholder="Describe your grievance..."
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
              />
            </InputGroup>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <><Spinner />Updating...</> : 'Update Grievance'}
            </Button>
          </Form>
        </Card>
      </PageWrapper>
    </>
  );
};
