import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

// Mock data (would normally come from context/state)
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

const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: var(--spacing-8);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-8);
`;

const FormSection = styled.section`
  background-color: var(--white);
  border-radius: var(--border-radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: var(--spacing-6);
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  align-items: center;
  
  svg {
    margin-right: var(--spacing-3);
    width: 24px;
    height: 24px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr 1fr'};
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-size: var(--font-size-sm);
    font-weight: 500;
    margin-bottom: var(--spacing-2);
  }
  
  input, select {
    padding: 12px;
    border: 1px solid var(--medium-gray);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-md);
    
    &:focus {
      outline: none;
      border-color: var(--primary);
    }
    
    &::placeholder {
      color: var(--dark-gray);
    }
  }
  
  .error {
    color: var(--error);
    font-size: var(--font-size-xs);
    margin-top: var(--spacing-1);
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-6);
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  padding: var(--spacing-4);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  
  &:hover {
    border-color: var(--primary);
  }
  
  &.selected {
    border-color: var(--primary);
    background-color: rgba(0, 0, 0, 0.02);
  }
  
  input {
    margin-right: var(--spacing-3);
  }
  
  .radio-content {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
  }
  
  .option-title {
    font-weight: 500;
  }
  
  .option-description {
    font-size: var(--font-size-sm);
    color: var(--dark-gray);
    margin-top: var(--spacing-1);
  }
  
  .option-price {
    font-weight: 600;
  }
  
  .card-icons {
    display: flex;
    gap: var(--spacing-2);
    
    img {
      height: 24px;
      width: auto;
    }
  }
`;

const OrderSummary = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: var(--spacing-6);
  height: fit-content;
  position: sticky;
  top: calc(var(--header-height) + var(--spacing-4));
`;

const SummaryTitle = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-6);
  padding-bottom: var(--spacing-4);
  border-bottom: 1px solid var(--light-gray);
`;

const OrderItems = styled.div`
  margin-bottom: var(--spacing-6);
  max-height: 300px;
  overflow-y: auto;
  padding-right: var(--spacing-2);
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: var(--light-gray);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: var(--medium-gray);
    border-radius: 10px;
  }
`;

const OrderItem = styled.div`
  display: flex;
  margin-bottom: var(--spacing-4);
  
  .item-image {
    width: 60px;
    height: 60px;
    border-radius: var(--border-radius-sm);
    overflow: hidden;
    margin-right: var(--spacing-3);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .item-details {
    flex-grow: 1;
    
    .item-name {
      font-weight: 500;
      margin-bottom: var(--spacing-1);
      font-size: var(--font-size-sm);
    }
    
    .item-meta {
      font-size: var(--font-size-xs);
      color: var(--dark-gray);
    }
  }
  
  .item-price {
    text-align: right;
    font-weight: 500;
    font-size: var(--font-size-sm);
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-3);
  font-size: var(--font-size-sm);
  
  .label {
    color: var(--dark-gray);
  }
  
  .value {
    font-weight: ${props => props.isTotal ? '600' : '400'};
    font-size: ${props => props.isTotal ? 'var(--font-size-md)' : 'var(--font-size-sm)'};
  }
`;

const TotalRow = styled(SummaryRow)`
  border-top: 1px solid var(--light-gray);
  padding-top: var(--spacing-4);
  margin-top: var(--spacing-6);
  margin-bottom: var(--spacing-6);
  font-size: var(--font-size-md);
  
  .label, .value {
    font-weight: 600;
  }
`;

const CheckoutSteps = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-10);
  
  @media (max-width: 576px) {
    display: none;
  }
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  
  .step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.active ? 'var(--primary)' : 'var(--light-gray)'};
    color: ${props => props.active ? 'var(--white)' : 'var(--dark-gray)'};
    font-weight: 600;
    margin-right: var(--spacing-2);
  }
  
  .step-label {
    font-weight: ${props => props.active ? '600' : '400'};
    color: ${props => props.active ? 'var(--primary)' : 'var(--dark-gray)'};
  }
  
  .step-divider {
    width: 60px;
    height: 1px;
    background-color: var(--medium-gray);
    margin: 0 var(--spacing-4);
  }
`;

const Agreement = styled.label`
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--spacing-6);
  font-size: var(--font-size-sm);
  color: var(--dark-gray);
  
  input {
    margin-right: var(--spacing-3);
    margin-top: 4px;
  }
  
  a {
    color: var(--primary);
    text-decoration: underline;
    
    &:hover {
      color: var(--secondary);
    }
  }
`;

const Checkout = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(SAMPLE_CART);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zipCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    savePaymentInfo: false,
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Simple validation
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
    }
    
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Process order - in a real app, this would call an API
      alert('Order placed successfully!');
      navigate('/');
    } else {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      document.getElementsByName(firstError)[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
  
  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getShippingCost = () => {
    return formData.shippingMethod === 'express' ? 9.99 : 4.99;
  };
  
  const getTotal = () => {
    return getSubtotal() + getShippingCost();
  };
  
  return (
    <PageContainer>
      <PageTitle>Checkout</PageTitle>
      
      <CheckoutSteps>
        <Step active>
          <div className="step-number">1</div>
          <div className="step-label">Shopping Cart</div>
          <div className="step-divider"></div>
        </Step>
        <Step active>
          <div className="step-number">2</div>
          <div className="step-label">Checkout</div>
          <div className="step-divider"></div>
        </Step>
        <Step>
          <div className="step-number">3</div>
          <div className="step-label">Confirmation</div>
        </Step>
      </CheckoutSteps>
      
      <form onSubmit={handleSubmit}>
        <CheckoutLayout>
          <CheckoutForm>
            <FormSection>
              <SectionTitle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Contact Information
              </SectionTitle>
              
              <FormRow>
                <FormGroup>
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                  />
                  {errors.firstName && <div className="error">{errors.firstName}</div>}
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                  />
                  {errors.lastName && <div className="error">{errors.lastName}</div>}
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                  />
                  {errors.phone && <div className="error">{errors.phone}</div>}
                </FormGroup>
              </FormRow>
            </FormSection>
            
            <FormSection>
              <SectionTitle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Shipping Address
              </SectionTitle>
              
              <FormRow columns="1fr">
                <FormGroup>
                  <label htmlFor="address">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St"
                  />
                  {errors.address && <div className="error">{errors.address}</div>}
                </FormGroup>
              </FormRow>
              
              <FormRow columns="1fr">
                <FormGroup>
                  <label htmlFor="apartment">Apartment, Suite, etc. (optional)</label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    placeholder="Apt #2B"
                  />
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                  />
                  {errors.city && <div className="error">{errors.city}</div>}
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="state">State/Province *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                  />
                  {errors.state && <div className="error">{errors.state}</div>}
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                  />
                  {errors.zipCode && <div className="error">{errors.zipCode}</div>}
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="country">Country *</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                  </select>
                </FormGroup>
              </FormRow>
              
              <SectionTitle style={{ marginTop: 'var(--spacing-8)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="16" height="13" x="4" y="2" rx="2"></rect>
                  <path d="M2 13h20"></path>
                  <path d="M15 16v4"></path>
                  <path d="M9 16v4"></path>
                </svg>
                Shipping Method
              </SectionTitle>
              
              <RadioGroup>
                <RadioOption className={formData.shippingMethod === 'standard' ? 'selected' : ''}>
                  <input
                    type="radio"
                    id="standard-shipping"
                    name="shippingMethod"
                    value="standard"
                    checked={formData.shippingMethod === 'standard'}
                    onChange={handleInputChange}
                  />
                  <div className="radio-content">
                    <div>
                      <div className="option-title">Standard Shipping</div>
                      <div className="option-description">Delivery in 4-6 business days</div>
                    </div>
                    <div className="option-price">$4.99</div>
                  </div>
                </RadioOption>
                
                <RadioOption className={formData.shippingMethod === 'express' ? 'selected' : ''}>
                  <input
                    type="radio"
                    id="express-shipping"
                    name="shippingMethod"
                    value="express"
                    checked={formData.shippingMethod === 'express'}
                    onChange={handleInputChange}
                  />
                  <div className="radio-content">
                    <div>
                      <div className="option-title">Express Shipping</div>
                      <div className="option-description">Delivery in 1-3 business days</div>
                    </div>
                    <div className="option-price">$9.99</div>
                  </div>
                </RadioOption>
              </RadioGroup>
            </FormSection>
            
            <FormSection>
              <SectionTitle>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                  <line x1="2" x2="22" y1="10" y2="10"></line>
                </svg>
                Payment Information
              </SectionTitle>
              
              <RadioGroup>
                <RadioOption className={formData.paymentMethod === 'credit-card' ? 'selected' : ''}>
                  <input
                    type="radio"
                    id="credit-card"
                    name="paymentMethod"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleInputChange}
                  />
                  <div className="radio-content">
                    <div className="option-title">Credit Card</div>
                    <div className="card-icons">
                      <img src="https://cdn.jsdelivr.net/gh/lipis/payment-icons@master/Assets/visa.svg" alt="Visa" />
                      <img src="https://cdn.jsdelivr.net/gh/lipis/payment-icons@master/Assets/mastercard.svg" alt="Mastercard" />
                      <img src="https://cdn.jsdelivr.net/gh/lipis/payment-icons@master/Assets/amex.svg" alt="Amex" />
                    </div>
                  </div>
                </RadioOption>
                
                <RadioOption className={formData.paymentMethod === 'paypal' ? 'selected' : ''}>
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                  />
                  <div className="radio-content">
                    <div className="option-title">PayPal</div>
                    <img src="https://cdn.jsdelivr.net/gh/lipis/payment-icons@master/Assets/paypal.svg" alt="PayPal" width="60" />
                  </div>
                </RadioOption>
              </RadioGroup>
              
              {formData.paymentMethod === 'credit-card' && (
                <>
                  <FormRow columns="1fr">
                    <FormGroup>
                      <label htmlFor="cardNumber">Card Number *</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && <div className="error">{errors.cardNumber}</div>}
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow columns="1fr">
                    <FormGroup>
                      <label htmlFor="cardName">Name on Card *</label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                      {errors.cardName && <div className="error">{errors.cardName}</div>}
                    </FormGroup>
                  </FormRow>
                  
                  <FormRow>
                    <FormGroup>
                      <label htmlFor="expiryDate">Expiry Date *</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && <div className="error">{errors.expiryDate}</div>}
                    </FormGroup>
                    
                    <FormGroup>
                      <label htmlFor="cvv">CVV *</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                      />
                      {errors.cvv && <div className="error">{errors.cvv}</div>}
                    </FormGroup>
                  </FormRow>
                  
                  <Agreement>
                    <input
                      type="checkbox"
                      id="savePaymentInfo"
                      name="savePaymentInfo"
                      checked={formData.savePaymentInfo}
                      onChange={handleInputChange}
                    />
                    <span>Save this card for future purchases</span>
                  </Agreement>
                </>
              )}
              
              <Agreement>
                <input
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                />
                <span>
                  I agree to the <Link to="/terms">Terms & Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>.
                  I confirm that I am aware that my order is subject to Gymshark's Terms and Conditions.
                </span>
              </Agreement>
              {errors.acceptTerms && <div className="error" style={{marginTop: 'var(--spacing-2)'}}>{errors.acceptTerms}</div>}
            </FormSection>
          </CheckoutForm>
          
          <OrderSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            
            <OrderItems>
              {items.map(item => (
                <OrderItem key={item.id}>
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-meta">
                      Color: {item.color} | Size: {item.size} | Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
                </OrderItem>
              ))}
            </OrderItems>
            
            <SummaryRow>
              <span className="label">Subtotal</span>
              <span className="value">${getSubtotal().toFixed(2)}</span>
            </SummaryRow>
            
            <SummaryRow>
              <span className="label">Shipping</span>
              <span className="value">${getShippingCost().toFixed(2)}</span>
            </SummaryRow>
            
            <TotalRow isTotal>
              <span className="label">Total</span>
              <span className="value">${getTotal().toFixed(2)}</span>
            </TotalRow>
            
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
            >
              Place Order
            </Button>
            
            <Button
              as={Link}
              to="/cart"
              variant="ghost"
              size="medium"
              fullWidth
              style={{ marginTop: 'var(--spacing-4)' }}
            >
              Return to Cart
            </Button>
          </OrderSummary>
        </CheckoutLayout>
      </form>
    </PageContainer>
  );
};

export default Checkout; 