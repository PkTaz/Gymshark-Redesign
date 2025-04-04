import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background-color: var(--primary);
  color: var(--white);
  padding: var(--spacing-16) 0 var(--spacing-8);
`;

const FooterContent = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--spacing-6);
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-4);
  }
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: var(--spacing-12);
  margin-bottom: var(--spacing-16);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-8) var(--spacing-4);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  
  h3 {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-4);
    font-weight: 600;
  }
  
  ul {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
  }
  
  a, span {
    font-size: var(--font-size-sm);
    transition: color var(--transition-fast);
    opacity: 0.8;
    
    &:hover {
      opacity: 1;
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  
  p {
    font-size: var(--font-size-sm);
    opacity: 0.8;
    margin-bottom: var(--spacing-2);
  }
  
  .form-group {
    display: flex;
    
    input {
      flex-grow: 1;
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-right: none;
      color: var(--white);
      padding: var(--spacing-3);
      font-size: var(--font-size-sm);
      outline: none;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    
    button {
      background-color: var(--white);
      color: var(--primary);
      font-weight: 600;
      padding: var(--spacing-3) var(--spacing-6);
      font-size: var(--font-size-sm);
      border: 1px solid var(--white);
      transition: all var(--transition-normal);
      
      &:hover {
        background-color: transparent;
        color: var(--white);
      }
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: var(--spacing-6);
  margin-top: var(--spacing-4);
  
  a {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    transition: background-color var(--transition-normal);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    svg {
      width: 16px;
      height: 16px;
      fill: currentColor;
    }
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: var(--spacing-6);
    text-align: center;
  }
`;

const FooterLogo = styled(Link)`
  height: 40px;
  
  img {
    height: 100%;
    width: auto;
  }
`;

const Copyright = styled.p`
  font-size: var(--font-size-xs);
  opacity: 0.6;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: var(--spacing-6);
  
  a {
    font-size: var(--font-size-xs);
    opacity: 0.6;
    transition: opacity var(--transition-fast);
    
    &:hover {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--spacing-4) var(--spacing-6);
  }
`;

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FooterTop>
            <FooterColumn as={motion.div} variants={variants}>
              <h3>About Gymshark</h3>
              <p style={{ fontSize: 'var(--font-size-sm)', opacity: 0.8, lineHeight: 1.6 }}>
                Gymshark creates innovative performance technologies and has become an inspirational brand to a highly engaged global community of conditioning athletes.
              </p>
              <SocialIcons>
                <a href="https://www.instagram.com/gymshark/" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/Gymshark/" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
                  </svg>
                </a>
                <a href="https://twitter.com/Gymshark" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/user/GymsharkTV" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </SocialIcons>
            </FooterColumn>
            
            <FooterColumn as={motion.div} variants={variants}>
              <h3>Shop</h3>
              <ul>
                <li><Link to="/shop">Men</Link></li>
                <li><Link to="/shop?category=women">Women</Link></li>
                <li><Link to="/shop?category=accessories">Accessories</Link></li>
                <li><Link to="/shop?category=new-releases">New Releases</Link></li>
                <li><Link to="/shop?category=sale">Sale</Link></li>
                <li><Link to="/gift-cards">Gift Cards</Link></li>
              </ul>
            </FooterColumn>
            
            <FooterColumn as={motion.div} variants={variants}>
              <h3>Support</h3>
              <ul>
                <li><Link to="/faq">Help / FAQs</Link></li>
                <li><Link to="/returns">Returns & Exchanges</Link></li>
                <li><Link to="/shipping">Shipping Information</Link></li>
                <li><Link to="/order-tracking">Order Tracking</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/accessibility">Accessibility</Link></li>
              </ul>
            </FooterColumn>
            
            <FooterColumn as={motion.div} variants={variants}>
              <h3>Join the Community</h3>
              <p>Sign up for exclusive updates, new arrivals & insider only discounts</p>
              <NewsletterForm>
                <div className="form-group">
                  <input type="email" placeholder="Your email address" />
                  <button type="submit">Subscribe</button>
                </div>
              </NewsletterForm>
            </FooterColumn>
          </FooterTop>
          
          <FooterBottom>
            <FooterLogo to="/">
              <img src="https://cdn.gymshark.com/images/branding/gs-icon-text.svg" alt="Gymshark Logo" style={{ height: '100%', width: 'auto' }} />
            </FooterLogo>
            
            <LegalLinks>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/cookies">Cookie Policy</Link>
              <Link to="/sustainability">Sustainability</Link>
            </LegalLinks>
            
            <Copyright>© {new Date().getFullYear()} Gymshark. All rights reserved.</Copyright>
          </FooterBottom>
        </motion.div>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 