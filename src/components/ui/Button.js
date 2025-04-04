import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 600;
  border-radius: var(--border-radius-sm);
  transition: var(--transition-normal);
  font-family: inherit;
  cursor: pointer;
  outline: none;
  border: 2px solid transparent;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ButtonSizes = {
  small: css`
    padding: 8px 16px;
    font-size: var(--font-size-xs);
    height: 36px;
  `,
  medium: css`
    padding: 10px 20px;
    font-size: var(--font-size-sm);
    height: 44px;
  `,
  large: css`
    padding: 14px 28px;
    font-size: var(--font-size-md);
    height: 52px;
  `
};

const ButtonVariants = {
  primary: css`
    background-color: var(--primary);
    color: var(--white);
    border-color: var(--primary);
    
    &:hover:not(:disabled) {
      background-color: var(--secondary);
      border-color: var(--secondary);
    }
  `,
  secondary: css`
    background-color: transparent;
    color: var(--primary);
    border-color: var(--primary);
    
    &:hover:not(:disabled) {
      background-color: var(--primary);
      color: var(--white);
    }
  `,
  accent: css`
    background-color: var(--accent);
    color: var(--white);
    border-color: var(--accent);
    
    &:hover:not(:disabled) {
      background-color: var(--accent-hover);
      border-color: var(--accent-hover);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: var(--primary);
    
    &:hover:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `
};

const StyledButton = styled(motion.button)`
  ${baseButtonStyles}
  ${props => ButtonSizes[props.size || 'medium']}
  ${props => ButtonVariants[props.variant || 'primary']}
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const StyledLink = styled(motion(Link))`
  ${baseButtonStyles}
  ${props => ButtonSizes[props.size || 'medium']}
  ${props => ButtonVariants[props.variant || 'primary']}
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  text-decoration: none;
`;

const StyledAnchor = styled(motion.a)`
  ${baseButtonStyles}
  ${props => ButtonSizes[props.size || 'medium']}
  ${props => ButtonVariants[props.variant || 'primary']}
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  text-decoration: none;
`;

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  to,
  href,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  animate = true,
  ...props
}) => {
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="icon icon-left">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="icon icon-right">{icon}</span>}
    </>
  );
  
  const motionProps = animate ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 500, damping: 30 }
  } : {};

  if (to) {
    return (
      <StyledLink 
        to={to}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        {...motionProps}
        {...props}
      >
        {content}
      </StyledLink>
    );
  }

  if (href) {
    return (
      <StyledAnchor 
        href={href}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        {...motionProps}
        {...props}
      >
        {content}
      </StyledAnchor>
    );
  }

  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...motionProps}
      {...props}
    >
      {content}
    </StyledButton>
  );
};

export default Button; 