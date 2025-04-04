import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

// Mock data (would normally come from context or redux)
const SAMPLE_CART = [
  {
    id: '4',
    name: 'Prime T-Shirt',
    color: 'Black/Red',
    size: 'M',
    price: 30,
    quantity: 2,
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/products/PrimeTShirtBlackRedGS531BLACKRED-EBW7902_620x.jpg?v=1680097183'
  },
  {
    id: '2',
    name: 'Tech Power Shorts',
    color: 'Navy Blue',
    size: 'L',
    price: 38,
    quantity: 1,
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/products/CriticalShortNavy-EBW6916_620x.jpg?v=1680097183'
  }
];

const PageContainer = styled.div`
  max-width: var(--container-width);
  margin: 0 auto;
  padding: var(--spacing-8) var(--spacing-4);
  
  @media (max-width: 768px) {
    padding: var(--spacing-6) var(--spacing-2);
  }
`;

const PageTitle = styled.h1`
  font-size: var(--font-size-3xl);
  font-weight: 700;
  text-align: center;
  margin-bottom: var(--spacing-10);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-8);
  }
`;

const EmptyCart = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-16) 0;
  
  svg {
    font-size: 64px;
    margin-bottom: var(--spacing-6);
    color: var(--medium-gray);
  }
  
  h2 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-4);
  }
  
  p {
    margin-bottom: var(--spacing-8);
    max-width: 400px;
    color: var(--dark-gray);
  }
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-8);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartItemCard = styled(motion.div)`
  display: flex;
  padding: var(--spacing-6);
  border-radius: var(--border-radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: var(--spacing-4);
  background-color: var(--white);
  
  @media (max-width: 576px) {
    flex-direction: column;
    padding: var(--spacing-4);
  }
`;

const ProductImage = styled.div`
  width: 120px;
  height: 120px;
  margin-right: var(--spacing-4);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--border-radius-sm);
  }
  
  @media (max-width: 576px) {
    width: 100%;
    height: 180px;
    margin-right: 0;
    margin-bottom: var(--spacing-4);
  }
`;

const ProductInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-2);
`;

const ProductAttributes = styled.div`
  font-size: var(--font-size-sm);
  color: var(--dark-gray);
  margin-bottom: var(--spacing-2);
`;

const ProductPrice = styled.div`
  font-size: var(--font-size-md);
  font-weight: 600;
  margin-bottom: var(--spacing-4);
`;

const QuantityActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  
  @media (max-width: 576px) {
    margin-top: var(--spacing-4);
    justify-content: space-between;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  
  .qty-btn {
    width: 32px;
    height: 32px;
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
  }
  
  .qty-input {
    width: 40px;
    height: 32px;
    border: none;
    text-align: center;
    font-size: var(--font-size-sm);
    font-weight: 500;
    
    &:focus {
      outline: none;
    }
  }
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--dark-gray);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: color var(--transition-fast);
  margin-left: var(--spacing-6);
  
  &:hover {
    color: var(--error);
  }
  
  svg {
    margin-right: var(--spacing-2);
  }
`;

const CartSummary = styled.div`
  border-radius: var(--border-radius-md);
  background-color: var(--white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: var(--spacing-6);
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--light-gray);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-4);
  font-size: var(--font-size-md);
  
  .label {
    color: var(--dark-gray);
  }
  
  .value {
    font-weight: ${props => props.isTotal ? '600' : '400'};
    font-size: ${props => props.isTotal ? 'var(--font-size-lg)' : 'var(--font-size-md)'};
  }
`;

const TotalRow = styled(SummaryRow)`
  border-top: 1px solid var(--light-gray);
  padding-top: var(--spacing-4);
  margin-top: var(--spacing-6);
  margin-bottom: var(--spacing-6);
`;

const PromoCode = styled.div`
  margin-bottom: var(--spacing-6);
  
  label {
    display: block;
    margin-bottom: var(--spacing-2);
    font-size: var(--font-size-sm);
    font-weight: 500;
  }
  
  .promo-input {
    display: flex;
    gap: var(--spacing-2);
    
    input {
      flex-grow: 1;
      padding: 8px 12px;
      border: 1px solid var(--medium-gray);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-sm);
      
      &:focus {
        outline: none;
        border-color: var(--primary);
      }
    }
    
    button {
      padding: 8px 16px;
      background-color: var(--light-gray);
      border: 1px solid var(--medium-gray);
      border-radius: var(--border-radius-sm);
      font-size: var(--font-size-sm);
      cursor: pointer;
      transition: all var(--transition-fast);
      
      &:hover {
        background-color: var(--medium-gray);
      }
    }
  }
`;

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  // In a real app, this would come from context or redux
  useEffect(() => {
    // Simulate loading cart data
    setCartItems(SAMPLE_CART);
  }, []);
  
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getTotal = () => {
    const subtotal = getSubtotal();
    const shipping = 4.99;
    return (subtotal + shipping) * (1 - discount / 100);
  };
  
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const handleRemoveItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const handleApplyPromo = () => {
    // In a real app, this would validate with an API
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(10);
    } else {
      // Show error message
      alert('Invalid promo code');
    }
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (cartItems.length === 0) {
    return (
      <PageContainer>
        <PageTitle>Your Cart</PageTitle>
        <EmptyCart
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Button as={Link} to="/shop" variant="primary" size="large">
            Continue Shopping
          </Button>
        </EmptyCart>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <PageTitle>Your Cart ({getTotalItems()} items)</PageTitle>
      <CartLayout>
        <CartItems>
          {cartItems.map((item, index) => (
            <CartItemCard
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProductImage>
                <img src={item.image} alt={item.name} />
              </ProductImage>
              <ProductInfo>
                <ProductName>{item.name}</ProductName>
                <ProductAttributes>
                  Color: {item.color} | Size: {item.size}
                </ProductAttributes>
                <ProductPrice>${item.price.toFixed(2)}</ProductPrice>
                <QuantityActions>
                  <QuantitySelector>
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="qty-input"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                      min="1"
                    />
                    <button 
                      className="qty-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </QuantitySelector>
                  <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Remove
                  </RemoveButton>
                </QuantityActions>
              </ProductInfo>
            </CartItemCard>
          ))}
        </CartItems>
        
        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryRow>
            <span className="label">Subtotal</span>
            <span className="value">${getSubtotal().toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span className="label">Shipping</span>
            <span className="value">$4.99</span>
          </SummaryRow>
          {discount > 0 && (
            <SummaryRow>
              <span className="label">Discount ({discount}%)</span>
              <span className="value">-${((getSubtotal() + 4.99) * discount / 100).toFixed(2)}</span>
            </SummaryRow>
          )}
          <TotalRow isTotal>
            <span className="label">Total</span>
            <span className="value">${getTotal().toFixed(2)}</span>
          </TotalRow>
          
          <PromoCode>
            <label>Promo Code</label>
            <div className="promo-input">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
              />
              <button onClick={handleApplyPromo}>Apply</button>
            </div>
          </PromoCode>
          
          <Button 
            variant="primary" 
            size="large" 
            fullWidth
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
          
          <Button 
            as={Link} 
            to="/shop" 
            variant="link" 
            size="medium" 
            fullWidth
            style={{ marginTop: 'var(--spacing-4)' }}
          >
            Continue Shopping
          </Button>
        </CartSummary>
      </CartLayout>
    </PageContainer>
  );
};

export default Cart; 