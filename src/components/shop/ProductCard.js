import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const Card = styled(motion.div)`
  border-radius: var(--border-radius-md);
  background-color: var(--white);
  overflow: hidden;
  position: relative;
  
  &:hover {
    .overlay {
      opacity: 1;
    }
    
    .secondary-image {
      opacity: 1;
    }
    
    .primary-image {
      opacity: 0;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
  background-color: var(--light-gray);
  border-radius: var(--border-radius-md);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal), opacity var(--transition-normal);
  }
  
  .primary-image {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
  }
  
  .secondary-image {
    opacity: 0;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
  padding: var(--spacing-4);
  opacity: 0;
  transition: opacity var(--transition-normal);
  display: flex;
  gap: var(--spacing-2);
`;

const ColorOptions = styled.div`
  display: flex;
  gap: var(--spacing-2);
  margin-top: var(--spacing-3);
`;

const ColorOption = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: ${props => props.color};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  transition: transform var(--transition-fast);
  
  &.active {
    transform: scale(1.2);
    box-shadow: 0 0 0 2px var(--white), 0 0 0 3px var(--primary);
  }
  
  &:hover:not(.active) {
    transform: scale(1.1);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: var(--spacing-4);
  left: var(--spacing-4);
  background-color: var(--primary);
  color: var(--white);
  padding: 4px 8px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  border-radius: var(--border-radius-sm);
  z-index: 1;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SaleBadge = styled(Badge)`
  background-color: var(--error);
`;

const NewBadge = styled(Badge)`
  background-color: var(--accent);
`;

const Info = styled.div`
  padding: var(--spacing-4) var(--spacing-2) var(--spacing-2);
`;

const Name = styled(Link)`
  font-weight: 600;
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-2);
  display: block;
  color: var(--primary);
  transition: color var(--transition-fast);
  
  &:hover {
    color: var(--accent);
  }
`;

const Category = styled.p`
  font-size: var(--font-size-xs);
  color: var(--dark-gray);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-2);
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-top: var(--spacing-2);
  
  .current {
    font-weight: 600;
    font-size: var(--font-size-md);
  }
  
  .original {
    font-size: var(--font-size-sm);
    text-decoration: line-through;
    color: var(--dark-gray);
  }
  
  .discount {
    font-size: var(--font-size-xs);
    color: var(--error);
    font-weight: 600;
  }
`;

const Ratings = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  margin-top: var(--spacing-2);
  
  .stars {
    display: flex;
    color: #FFD700;
  }
  
  .count {
    font-size: var(--font-size-xs);
    color: var(--dark-gray);
    margin-left: var(--spacing-1);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: var(--spacing-4);
  right: var(--spacing-4);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  z-index: 2;
  
  &:hover {
    background-color: var(--white);
    transform: scale(1.1);
  }
  
  svg {
    width: 18px;
    height: 18px;
    color: var(--primary);
    fill: ${props => props.isFavorite ? 'var(--primary)' : 'none'};
    transition: fill var(--transition-fast);
  }
`;

const ProductCard = ({ product }) => {
  const [activeColor, setActiveColor] = useState(product.colors[0]);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="none" stroke="currentColor" />
            <path d="M12 2v15.27l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      }
    }
    
    return stars;
  };

  return (
    <Card
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`}>
        <ImageWrapper>
          <img 
            className="secondary-image"
            src={product.images[activeColor.colorCode][1]} 
            alt={`${product.name} - ${activeColor.name}`} 
            loading="lazy"
          />
          <img 
            className="primary-image"
            src={product.images[activeColor.colorCode][0]} 
            alt={`${product.name} - ${activeColor.name}`} 
            loading="lazy"
          />
          
          {product.isNew && <NewBadge>New</NewBadge>}
          {product.discount > 0 && <SaleBadge>{product.discount}% Off</SaleBadge>}
          
          <WishlistButton 
            onClick={handleFavoriteClick}
            isFavorite={isFavorite}
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
              <path d="M4.31802 6.31802C2.56066 8.07538 2.56066 10.9246 4.31802 12.682L12.0001 20.364L19.682 12.682C21.4393 10.9246 21.4393 8.07538 19.682 6.31802C17.9246 4.56066 15.0754 4.56066 13.318 6.31802L12.0001 7.63609L10.682 6.31802C8.92462 4.56066 6.07538 4.56066 4.31802 6.31802Z" />
            </svg>
          </WishlistButton>
          
          <Overlay className="overlay">
            <Button fullWidth>Quick View</Button>
            <Button variant="accent" fullWidth>Add to Cart</Button>
          </Overlay>
        </ImageWrapper>
      </Link>
      
      <Info>
        <Category>{product.category}</Category>
        <Name to={`/product/${product.id}`}>{product.name}</Name>
        
        <ColorOptions>
          {product.colors.map(color => (
            <ColorOption 
              key={color.colorCode}
              color={color.hex}
              className={activeColor.colorCode === color.colorCode ? 'active' : ''}
              onClick={() => setActiveColor(color)}
              aria-label={color.name}
            />
          ))}
        </ColorOptions>
        
        <Ratings>
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="count">({product.reviews})</span>
        </Ratings>
        
        <Price>
          <span className="current">${product.price.toFixed(2)}</span>
          {product.discount > 0 && (
            <>
              <span className="original">${(product.price / (1 - product.discount / 100)).toFixed(2)}</span>
              <span className="discount">{product.discount}% off</span>
            </>
          )}
        </Price>
      </Info>
    </Card>
  );
};

export default ProductCard; 