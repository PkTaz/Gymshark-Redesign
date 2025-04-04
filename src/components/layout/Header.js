import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-6);
  z-index: 1000;
  transition: box-shadow var(--transition-normal), 
              background-color var(--transition-normal);
  
  &.scrolled {
    box-shadow: var(--shadow-md);
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(8px);
  }
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-4);
  }
`;

const Logo = styled(Link)`
  height: 30px;
  display: block;
  
  img {
    width: 140px;
    height: auto;
  }
`;

const Nav = styled.nav`
  @media (max-width: 992px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  gap: var(--spacing-8);
`;

const NavItem = styled.li`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary);
    transition: width var(--transition-normal);
  }
  
  &:hover::after,
  &.active::after {
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  font-weight: 500;
  font-size: var(--font-size-md);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-6);
`;

const IconButton = styled.button`
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary);
  color: var(--white);
  border-radius: 50%;
  font-size: 10px;
  font-weight: 600;
`;

const MobileMenuButton = styled.button`
  display: none;
  width: 24px;
  height: 24px;
  flex-direction: column;
  justify-content: space-between;
  
  @media (max-width: 992px) {
    display: flex;
  }
  
  span {
    width: 100%;
    height: 2px;
    background-color: var(--primary);
    transition: transform var(--transition-normal), 
                opacity var(--transition-normal);
  }
  
  &.open {
    span:first-child {
      transform: translateY(10px) rotate(45deg);
    }
    
    span:nth-child(2) {
      opacity: 0;
    }
    
    span:last-child {
      transform: translateY(-10px) rotate(-45deg);
    }
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--white);
  z-index: 999;
  padding: var(--spacing-8);
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ul {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
    margin-top: var(--spacing-10);
    width: 100%;
    text-align: center;
  }
  
  li {
    padding: var(--spacing-4) 0;
    border-bottom: 1px solid var(--medium-gray);
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  a {
    font-size: var(--font-size-xl);
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  background-color: var(--light-gray);
  border-radius: var(--border-radius-md);
  padding: 0 var(--spacing-3);
  height: 40px;
  
  input {
    background: none;
    border: none;
    outline: none;
    font-size: var(--font-size-sm);
    width: 200px;
    
    &::placeholder {
      color: var(--dark-gray);
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: var(--dark-gray);
  }
  
  @media (max-width: 992px) {
    display: none;
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Animation variants for header
  const headerVariants = {
    hidden: { 
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <HeaderContainer
      className={isScrolled ? 'scrolled' : ''}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <Logo to="/">
        <img src="https://cdn.gymshark.com/images/branding/gs-icon-text.svg" alt="Gymshark Logo" style={{ width: '140px', height: 'auto' }} />
      </Logo>
      
      <Nav>
        <NavList>
          <NavItem className={isActive('/') ? 'active' : ''}>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem className={isActive('/shop') ? 'active' : ''}>
            <NavLink to="/shop">Men</NavLink>
          </NavItem>
          <NavItem className={isActive('/women') ? 'active' : ''}>
            <NavLink to="/women">Women</NavLink>
          </NavItem>
          <NavItem className={isActive('/accessories') ? 'active' : ''}>
            <NavLink to="/accessories">Accessories</NavLink>
          </NavItem>
        </NavList>
      </Nav>
      
      <RightSection>
        <SearchBar>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input type="text" placeholder="Search" />
        </SearchBar>
        
        <IconButton>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19C11.4477 19 11 19.4477 11 20C11 20.5523 11.4477 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 3C14.7614 3 17 5.23858 17 8C17 9.6569 16.3284 11.1569 15.2426 12.2426C14.1569 13.3284 13 15.0572 13 17H11C11 15.0572 9.84315 13.3284 8.75736 12.2426C7.67157 11.1569 7 9.6569 7 8C7 5.23858 9.23858 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </IconButton>
        
        <IconButton>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </IconButton>
        
        <Link to="/cart">
          <IconButton>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <CartCount>3</CartCount>
          </IconButton>
        </Link>
        
        <MobileMenuButton 
          className={isMobileMenuOpen ? 'open' : ''} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>
      </RightSection>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Men</Link></li>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header; 