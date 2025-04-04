import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 70vh;
  padding: var(--spacing-8);
`;

const ErrorCode = styled(motion.h1)`
  font-size: 120px;
  font-weight: 700;
  margin: 0;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 80px;
  }
`;

const Title = styled(motion.h2)`
  font-size: var(--font-size-3xl);
  font-weight: 600;
  margin: var(--spacing-4) 0 var(--spacing-6);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
  }
`;

const Description = styled(motion.p)`
  font-size: var(--font-size-lg);
  color: var(--dark-gray);
  max-width: 500px;
  margin-bottom: var(--spacing-8);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: var(--spacing-4);
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const NotFound = () => {
  return (
    <PageContainer>
      <ErrorCode
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404
      </ErrorCode>
      
      <Title
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Page Not Found
      </Title>
      
      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </Description>
      
      <ButtonGroup
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button as={Link} to="/" variant="primary" size="large">
          Go Home
        </Button>
        <Button as={Link} to="/shop" variant="secondary" size="large">
          Continue Shopping
        </Button>
      </ButtonGroup>
    </PageContainer>
  );
};

export default NotFound; 