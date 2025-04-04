import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.9);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
`;

const LogoLoader = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
  animation: ${pulse} 1.2s ease-in-out infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <LogoLoader>
        <svg viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
          <path d="M1013.33 0H66.67C29.87 0 0 29.87 0 66.67v946.66C0 1050.13 29.87 1080 66.67 1080h946.66c36.8 0 66.67-29.87 66.67-66.67V66.67C1080 29.87 1050.13 0 1013.33 0zM647.86 324.12v92.57h-191.1v104.41h163.8v91.36H456.77v105.61h191.1v92.57H363V324.12h284.86z" />
        </svg>
      </LogoLoader>
    </LoaderContainer>
  );
};

export default Loader; 