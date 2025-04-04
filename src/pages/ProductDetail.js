import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import Button from '../components/ui/Button';

// Mock data (would normally come from an API)
const PRODUCT = {
  id: '4',
  name: 'Prime T-Shirt',
  category: 'T-Shirts',
  price: 30,
  discount: 0,
  rating: 5.0,
  reviews: 45,
  isNew: true,
  description: 'Designed for your most intense workouts, the Prime T-Shirt combines premium fabric technology with a muscle-enhancing fit. This performance-driven tee features sweat-wicking technology and strategic ventilation to keep you cool and comfortable during training. The anatomical cut and drop shoulder design allows for a full range of motion while accentuating your physique.',
  features: [
    'Performance stretch fabric',
    'Sweat-wicking technology',
    'Strategic ventilation',
    'Drop shoulder design for enhanced mobility',
    'Muscle-enhancing fit',
    'Flatlock seams to prevent chafing'
  ],
  fitting: 'True to size - order your normal size. Model wears size M and is 6\'1".',
  materials: '92% Polyester, 8% Elastane',
  colors: [
    { name: 'Black/Red', colorCode: 'black-red', hex: '#000000' },
    { name: 'White', colorCode: 'white', hex: '#FFFFFF' }
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  images: {
    'black-red': [
      'https://cdn.shopify.com/s/files/1/0156/6146/products/PrimeTShirtBlackRedGS531BLACKRED-EBW7902_620x.jpg?v=1680097183',
      'https://cdn.shopify.com/s/files/1/0156/6146/products/PrimeTShirtBlackRedGS531BLACKRED-EBW7916_620x.jpg?v=1680097182',
      'https://cdn.shopify.com/s/files/1/0156/6146/products/PrimeTShirtBlackRedGS531BLACKRED-EBW7924_620x.jpg?v=1680097182',
      'https://cdn.shopify.com/s/files/1/0156/6146/products/PrimeTShirtBlackRedGS531BLACKRED-EBW7941_620x.jpg?v=1680097181'
    ],
    'white': [
      'https://cdn.shopify.com/s/files/1/0156/6146/products/PrimeTShirtWhiteGS531WHITE-EBW8078_620x.jpg?v=1680097183',
      'https://cdn.shopify.com/s/files/1/0156/6146/products/PrimeTShirtWhiteGS531WHITE-EBW8084_620x.jpg?v=1680097182',
      'https://cdn.shopify.com/s/files/1/0156/6146/products/PrimeTShirtWhiteGS531WHITE-EBW8092_620x.jpg?v=1680097182',
      'https://cdn.shopify.com/s/files/1/0156/6146/products/PrimeTShirtWhiteGS531WHITE-EBW8114_620x.jpg?v=1680097182'
    ]
  },
  relatedProducts: ['1', '2', '5']
};

const PageContainer = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-2);
  }
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-8);
  font-size: var(--font-size-sm);
  color: var(--dark-gray);
  
  a {
    color: var(--dark-gray);
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--primary);
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  @media (max-width: 768px) {
    margin-bottom: var(--spacing-6);
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-10);
  margin-bottom: var(--spacing-16);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-8);
  }
`;

const GalleryContainer = styled.div`
  position: relative;
  
  .swiper-button-next,
  .swiper-button-prev {
    color: var(--primary);
    
    &:after {
      font-size: 24px;
    }
  }
  
  .swiper-slide-thumb-active {
    opacity: 1;
    border-color: var(--primary);
  }
`;

const MainSwiper = styled(Swiper)`
  width: 100%;
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-4);
  
  img {
    width: 100%;
    height: 600px;
    object-fit: cover;
    cursor: zoom-in;
    
    @media (max-width: 992px) {
      height: 400px;
    }
  }
`;

const ThumbsSwiper = styled(Swiper)`
  height: 90px;
  
  .swiper-slide {
    width: 80px;
    height: 80px;
    opacity: 0.5;
    border: 2px solid transparent;
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    cursor: pointer;
    transition: opacity var(--transition-fast), border-color var(--transition-fast);
    
    &:hover {
      opacity: 0.8;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
  z-index: 10;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const NewBadge = styled(Badge)`
  background-color: var(--accent);
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled(motion.h1)`
  font-size: var(--font-size-3xl);
  font-weight: 700;
  margin-bottom: var(--spacing-2);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
  }
`;

const ProductCategory = styled.p`
  font-size: var(--font-size-sm);
  color: var(--dark-gray);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: var(--spacing-4);
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
  
  .current {
    font-size: var(--font-size-xl);
    font-weight: 600;
  }
  
  .original {
    font-size: var(--font-size-md);
    text-decoration: line-through;
    color: var(--dark-gray);
  }
  
  .discount {
    font-size: var(--font-size-sm);
    color: var(--error);
    font-weight: 600;
    padding: 2px 6px;
    background-color: rgba(211, 47, 47, 0.1);
    border-radius: var(--border-radius-sm);
  }
`;

const Ratings = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-6);
  
  .stars {
    display: flex;
    color: #FFD700;
  }
  
  .count {
    font-size: var(--font-size-sm);
    color: var(--dark-gray);
    text-decoration: underline;
    cursor: pointer;
    
    &:hover {
      color: var(--primary);
    }
  }
`;

const Description = styled.p`
  font-size: var(--font-size-md);
  line-height: 1.6;
  margin-bottom: var(--spacing-6);
  color: var(--dark-gray);
`;

const OptionsContainer = styled.div`
  margin-bottom: var(--spacing-6);
`;

const OptionsTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: 600;
  margin-bottom: var(--spacing-3);
`;

const ColorOptions = styled.div`
  display: flex;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-6);
`;

const ColorOption = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: ${props => props.color};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  transition: transform var(--transition-fast);
  position: relative;
  
  &.active {
    transform: scale(1.1);
    
    &::after {
      content: '';
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      border: 2px solid var(--primary);
      border-radius: 50%;
    }
  }
  
  &:hover:not(.active) {
    transform: scale(1.05);
  }
`;

const ColorName = styled.span`
  font-size: var(--font-size-sm);
  margin-left: var(--spacing-1);
`;

const SizeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-6);
`;

const SizeOption = styled.button`
  min-width: 44px;
  height: 44px;
  padding: 0 var(--spacing-3);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-sm);
  background-color: var(--white);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &.active {
    background-color: var(--primary);
    color: var(--white);
    border-color: var(--primary);
  }
  
  &:hover:not(.active):not(.out-of-stock) {
    border-color: var(--primary);
  }
  
  &.out-of-stock {
    opacity: 0.5;
    cursor: not-allowed;
    text-decoration: line-through;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-6);
  
  .qty-label {
    font-size: var(--font-size-md);
    font-weight: 500;
  }
  
  .qty-controls {
    display: flex;
    align-items: center;
    border: 1px solid var(--medium-gray);
    border-radius: var(--border-radius-sm);
    overflow: hidden;
  }
  
  .qty-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--light-gray);
    border: none;
    cursor: pointer;
    transition: background-color var(--transition-fast);
    
    &:hover {
      background-color: var(--medium-gray);
    }
    
    &:active {
      background-color: var(--dark-gray);
      color: var(--white);
    }
  }
  
  .qty-input {
    width: 40px;
    height: 36px;
    border: none;
    text-align: center;
    font-size: var(--font-size-md);
    font-weight: 500;
    
    &:focus {
      outline: none;
    }
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: var(--spacing-3);
  }
`;

const AdditionalInfo = styled.div`
  border-top: 1px solid var(--medium-gray);
  padding-top: var(--spacing-6);
`;

const Accordion = styled.div`
  border-bottom: 1px solid var(--medium-gray);
`;

const AccordionHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--spacing-4) 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-md);
  font-weight: 600;
  text-align: left;
  
  svg {
    transition: transform var(--transition-normal);
    
    ${props => props.isOpen && `
      transform: rotate(180deg);
    `}
  }
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
  padding-bottom: var(--spacing-4);
  
  ul {
    list-style: disc;
    padding-left: var(--spacing-6);
    
    li {
      margin-bottom: var(--spacing-2);
    }
  }
  
  p {
    line-height: 1.6;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [selectedSize, setSelectedSize] = useState(PRODUCT.sizes[2]); // Default to Medium
  const [quantity, setQuantity] = useState(1);
  const [accordionState, setAccordionState] = useState({
    description: true,
    features: false,
    sizing: false,
    materials: false
  });
  
  // In a real app, we'd fetch the product data based on the ID
  useEffect(() => {
    // This would be an API call in a real app
    if (id !== PRODUCT.id) {
      // If product not found, redirect to shop
      navigate('/shop');
    }
  }, [id, navigate]);
  
  const toggleAccordion = (section) => {
    setAccordionState(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="none" stroke="currentColor" />
            <path d="M12 2v15.27l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      }
    }
    
    return stars;
  };
  
  return (
    <PageContainer>
      <Breadcrumbs>
        <a href="/">Home</a>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <a href="/shop">Shop</a>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <a href="/shop?category=t-shirts">T-Shirts</a>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        <span>{PRODUCT.name}</span>
      </Breadcrumbs>
      
      <ProductLayout>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GalleryContainer>
            {PRODUCT.isNew && <NewBadge>New</NewBadge>}
            <MainSwiper
              modules={[Navigation, Thumbs, Zoom]}
              navigation
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              zoom={true}
              spaceBetween={10}
            >
              {PRODUCT.images[selectedColor.colorCode].map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container">
                    <img src={image} alt={`${PRODUCT.name} ${index + 1}`} />
                  </div>
                </SwiperSlide>
              ))}
            </MainSwiper>
            
            <ThumbsSwiper
              modules={[Thumbs]}
              watchSlidesProgress
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
            >
              {PRODUCT.images[selectedColor.colorCode].map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </SwiperSlide>
              ))}
            </ThumbsSwiper>
          </GalleryContainer>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProductInfo>
            <ProductCategory>{PRODUCT.category}</ProductCategory>
            <ProductName>{PRODUCT.name}</ProductName>
            
            <Ratings>
              <div className="stars">
                {renderStars(PRODUCT.rating)}
              </div>
              <span className="count">{PRODUCT.reviews} Reviews</span>
            </Ratings>
            
            <Price>
              <span className="current">${PRODUCT.price.toFixed(2)}</span>
              {PRODUCT.discount > 0 && (
                <>
                  <span className="original">${(PRODUCT.price / (1 - PRODUCT.discount / 100)).toFixed(2)}</span>
                  <span className="discount">{PRODUCT.discount}% OFF</span>
                </>
              )}
            </Price>
            
            <Description>
              {PRODUCT.description}
            </Description>
            
            <OptionsContainer>
              <OptionsTitle>Color: {selectedColor.name}</OptionsTitle>
              <ColorOptions>
                {PRODUCT.colors.map(color => (
                  <ColorOption
                    key={color.colorCode}
                    color={color.hex}
                    className={selectedColor.colorCode === color.colorCode ? 'active' : ''}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color.name}
                  />
                ))}
              </ColorOptions>
            </OptionsContainer>
            
            <OptionsContainer>
              <OptionsTitle>Size</OptionsTitle>
              <SizeOptions>
                {PRODUCT.sizes.map(size => (
                  <SizeOption
                    key={size}
                    className={selectedSize === size ? 'active' : ''}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeOption>
                ))}
              </SizeOptions>
            </OptionsContainer>
            
            <QuantitySelector>
              <span className="qty-label">Quantity:</span>
              <div className="qty-controls">
                <button className="qty-btn" onClick={decrementQuantity}>-</button>
                <input
                  type="number"
                  className="qty-input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                />
                <button className="qty-btn" onClick={incrementQuantity}>+</button>
              </div>
            </QuantitySelector>
            
            <ActionButtons>
              <Button 
                variant="primary" 
                size="large" 
                fullWidth
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                    <path d="M19 19c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                    <path d="M5 6L3 12v1h16.5a1.5 1.5 0 001.5-1.5v0a1.5 1.5 0 00-1.5-1.5H6.5l.4-2M5 6h2l1.2 6h9.8"></path>
                  </svg>
                }
              >
                Add to Cart
              </Button>
              <Button 
                variant="secondary" 
                size="large"
                fullWidth
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                  </svg>
                }
              >
                Save to Wishlist
              </Button>
            </ActionButtons>
            
            <AdditionalInfo>
              <Accordion>
                <AccordionHeader 
                  onClick={() => toggleAccordion('description')}
                  isOpen={accordionState.description}
                >
                  <span>Description</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </AccordionHeader>
                <AccordionContent
                  initial={false}
                  animate={{ height: accordionState.description ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{PRODUCT.description}</p>
                </AccordionContent>
              </Accordion>
              
              <Accordion>
                <AccordionHeader 
                  onClick={() => toggleAccordion('features')}
                  isOpen={accordionState.features}
                >
                  <span>Features</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </AccordionHeader>
                <AccordionContent
                  initial={false}
                  animate={{ height: accordionState.features ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul>
                    {PRODUCT.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </Accordion>
              
              <Accordion>
                <AccordionHeader 
                  onClick={() => toggleAccordion('sizing')}
                  isOpen={accordionState.sizing}
                >
                  <span>Sizing & Fit</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </AccordionHeader>
                <AccordionContent
                  initial={false}
                  animate={{ height: accordionState.sizing ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{PRODUCT.fitting}</p>
                </AccordionContent>
              </Accordion>
              
              <Accordion>
                <AccordionHeader 
                  onClick={() => toggleAccordion('materials')}
                  isOpen={accordionState.materials}
                >
                  <span>Materials & Care</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </AccordionHeader>
                <AccordionContent
                  initial={false}
                  animate={{ height: accordionState.materials ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{PRODUCT.materials}</p>
                  <p>Machine wash at 30°C with similar colors. Do not bleach. Do not iron. Do not dry clean.</p>
                </AccordionContent>
              </Accordion>
            </AdditionalInfo>
          </ProductInfo>
        </motion.div>
      </ProductLayout>
    </PageContainer>
  );
};

export default ProductDetail; 