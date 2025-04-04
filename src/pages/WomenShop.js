import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProductCard from '../components/shop/ProductCard';

// Sample product data - in a real application this would come from an API
const SAMPLE_PRODUCTS = [
  {
    id: '7',
    name: 'Vital Seamless Sports Bra',
    category: 'Sports Bras',
    price: 38,
    discount: 0,
    rating: 4.8,
    reviews: 156,
    isNew: true,
    colors: [
      { name: 'Black', colorCode: 'black', hex: '#000000' },
      { name: 'Navy', colorCode: 'navy', hex: '#000080' },
      { name: 'Trail Green', colorCode: 'green', hex: '#2F4F4F' }
    ],
    images: {
      black: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/VitalSeamlessMinimalSportsBraBlackMarlB1C5G-BBF3-0647_3f653352-3846-4be8-841f-4807b9af4f83_1920x.jpg?v=1726493445',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/VitalSeamlessMinimalSportsBraBlackMarlB1C5G-BBF3-0657_f00c4501-43fd-44a0-a3d3-45259d894238_1920x.jpg?v=1726493445'
      ],
      navy: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/VitalSeamlessMinimalSportsBraGsHeavyBlue-MarlB1C5G-UCW7-0840_1920x.jpg?v=1726493445',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/VitalSeamlessMinimalSportsBraGsHeavyBlue-MarlB1C5G-UCW7-0845_1920x.jpg?v=1726493445'
      ],
      green: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/VitalSeamlessMinimalSportsBraWoodlandGreen-MarlB1C5G-EBTF-0804_53955612-0cf8-41a9-8c3e-4bc042e30d2a_1920x.jpg?v=1726493447',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/VitalSeamlessMinimalSportsBraWoodlandGreen-MarlB1C5G-EBTF-0814_2a2ae717-e487-4a36-91b9-62446652980d_1920x.jpg?v=1726493446'
      ]
    }
  },
  {
    id: '8',
    name: 'Vital Seamless Leggings',
    category: 'Leggings',
    price: 60,
    discount: 15,
    rating: 4.9,
    reviews: 215,
    isNew: false,
    colors: [
      { name: 'Black', colorCode: 'black', hex: '#000000' },
      { name: 'Navy', colorCode: 'navy', hex: '#000080' }
    ],
    images: {
      black: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/VitalSeamless2.0LeggingsGSBlackB1A2B-BBF311976_948c69f7-cb98-4c83-82a2-5dbcbf6837ab_1920x.jpg?v=1722505083',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/VitalSeamless2.0LeggingsGSBlackB1A2B-BBF311985_001b5c4f-68aa-45d7-8b60-56eca16ce8e6_1920x.jpg?v=1722505083'
      ],
      navy: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/VitalSeamless2.0LeggingsGsHeavyBlueMarlB1A2B-UCW7-0420_a5159fed-2997-49e0-b48a-862acae3277b_1920x.jpg?v=1722504943',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/VitalSeamless2.0LeggingsGsHeavyBlueMarlB1A2B-UCW7-0439_581de71f-ccad-4cb0-865c-9a2702d617ca_1920x.jpg?v=1722504943'
      ]
    }
  },
  {
    id: '9',
    name: 'Everyday Seamless Crop Top',
    category: 'T-Shirts',
    price: 28,
    discount: 0,
    rating: 4.6,
    reviews: 87,
    isNew: true,
    colors: [
      { name: 'Green', colorCode: 'green', hex: '#2F4F4F' },
      { name: 'Black', colorCode: 'black', hex: '#000000' }
    ],
    images: {
      green: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/EverydaySeamlessCropTopGsStrengthGreenB8A4P-ECJH_1920x.jpg?v=1722504980',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/EverydaySeamlessCropTopGsStrengthGreenB8A4P-ECJH2_1920x.jpg?v=1722504979'
      ],
      black: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/EverydaySeamlessCropTopGSBlackB8A4P-BB2J0781_cc21dfbd-16fa-4301-b552-7e133ec6995e_1920x.jpg?v=1710775076',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/EverydaySeamlessCropTopGSBlackB8A4P-BB2J0783_f725393e-85e2-4767-91fc-b9656d61c097_1920x.jpg?v=1710775069'
      ]
    }
  },
  {
    id: '10',
    name: 'Reps Power Tight Shorts',
    category: 'Shorts',
    price: 46,
    discount: 0,
    rating: 4.2,
    reviews: 64,
    isNew: false,
    colors: [
      { name: 'Black', colorCode: 'black', hex: '#000000' },
      { name: 'Grey', colorCode: 'grey', hex: '#808080' }
    ],
    images: {
      black: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/GymsharkPowerTightShortsGSBlackB4A6U-BB2J-0978_1920x.jpg?v=1726493452',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/GymsharkPowerTightShortsGSBlackB4A6U-BB2J-0989_1920x.jpg?v=1726493452'
      ],
      grey: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/GYMSHARKPOWERXTIGHTSHORTSREP-L-A0054GSOnyxGreyB4A6U-GCT9-0512_1920x.jpg?v=1728378736f9fb68b_1920x.jpg?v=1712239261',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/GYMSHARKPOWERXTIGHTSHORTSREP-L-A0054GSOnyxGreyB4A6U-GCT9-0529_1920x.jpg?v=1728378735'
      ]
    }
  },
  {
    id: '11',
    name: 'Everyday Seamless Zip Tracktop',
    category: 'Jackets',
    price: 65,
    discount: 0,
    rating: 4.8,
    reviews: 43,
    isNew: true,
    colors: [
      { name: 'Black', colorCode: 'black', hex: '#000000' },
      { name: 'Navy', colorCode: 'navy', hex: '#000080' }
    ],
    images: {
      black: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/EverydaySeamlessZipTracktopGSBlackB1B7P-BB2J_a4982abb-77c9-4fe2-948b-0f94bdadb8b7_1920x.jpg?v=1722504977',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/EverydaySeamlessZipTracktopGSBlackB1B7P-BB2J2_1f8f41da-2d65-4e51-b084-e4be5b067d25_1920x.jpg?v=1722504977'
      ],
      navy: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/EverydaySeamlessZipTracktopGSNavyB1B7P-UB9P_bdcdab1a-8fbb-46de-b51d-8fdd29e8bda3_1920x.jpg?v=1722504983',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/EverydaySeamlessZipTracktopGSNavyB1B7P-UB9P2_95e6ee16-2b37-475c-b891-004e02a405e7_1920x.jpg?v=1722504983'
      ]
    }
  },
  {
    id: '12',
    name: 'Flex High-Waisted Shorts',
    category: 'Shorts',
    price: 35,
    discount: 0,
    rating: 4.5,
    reviews: 98,
    isNew: false,
    colors: [
      { name: 'Black', colorCode: 'black', hex: '#000000' },
      { name: 'Navy', colorCode: 'navy', hex: '#000080' }
    ],
    images: {
      black: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/FLEXHIGHWAISTEDLEGGINGSBlack-Black-B1A2Q-BBBB-1546_aa4eed7c-0a1b-4d27-b5d1-bc1638734ee1_1920x.jpg?v=1721396317',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/FLEXHIGHWAISTEDLEGGINGSBlack-Black-B1A2Q-BBBB-1559_29f3a36a-b2f8-4c29-875c-79e6509356b2_1920x.jpg?v=1721396318'
      ],
      navy: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/FLEXHIGHWAISTEDLEGGINGS-Navy-DenimBlue-B1A2Q-UCFX-1588_0f8a11f9-a5c4-4a1b-a273-29a678418811_1920x.jpg?v=1690107793',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/FLEXHIGHWAISTEDLEGGINGS-Navy-DenimBlue-B1A2Q-UCFX-1600_d4d1e2d1-20a8-43f8-8c8b-6798ce0f1d5c_1920x.jpg?v=1690107792'
      ]
    }
  }
];

// Mock categories
const CATEGORIES = [
  'All',
  'Leggings',
  'Sports Bras',
  'Shorts',
  'T-Shirts',
  'Jackets',
  'Tank Tops',
  'Accessories'
];

// Available sorting options
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' }
];

const ShopContainer = styled.div`
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-2);
  }
`;

const Banner = styled.div`
  position: relative;
  height: 300px;
  margin-bottom: var(--spacing-12);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 200px;
    margin-bottom: var(--spacing-8);
  }
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BannerVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.2) 100%);
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-10);
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-4);
  }
`;

const BannerContent = styled.div`
  max-width: 600px;
  color: var(--white);
`;

const BannerTitle = styled.h1`
  font-size: var(--font-size-4xl);
  font-weight: 700;
  margin-bottom: var(--spacing-4);
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-2);
  }
`;

const BannerDescription = styled.p`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-4);
  }
`;

const ShopContent = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: var(--spacing-6);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.div`
  @media (max-width: 992px) {
    display: none;
  }
`;

const MobileFilterButton = styled.button`
  display: none;
  width: 100%;
  padding: var(--spacing-3);
  background-color: var(--primary);
  color: var(--white);
  font-weight: 600;
  border-radius: var(--border-radius-md);
  margin-bottom: var(--spacing-6);
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: var(--spacing-8);
`;

const SidebarTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: 600;
  margin-bottom: var(--spacing-4);
  padding-bottom: var(--spacing-2);
  border-bottom: 1px solid var(--medium-gray);
`;

const CategoryList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
`;

const CategoryItem = styled.li`
  padding: var(--spacing-2) 0;
  cursor: pointer;
  transition: color var(--transition-fast);
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--accent);
  }
  
  &.active {
    color: var(--accent);
    font-weight: 600;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  margin-bottom: var(--spacing-2);
  cursor: pointer;
  
  input {
    cursor: pointer;
  }
  
  label {
    cursor: pointer;
    user-select: none;
  }
`;

const PriceRange = styled.div`
  margin-top: var(--spacing-4);
`;

const RangeSlider = styled.input`
  width: 100%;
  margin-bottom: var(--spacing-4);
`;

const PriceInputs = styled.div`
  display: flex;
  gap: var(--spacing-2);
  
  input {
    width: 100%;
    padding: var(--spacing-2);
    border: 1px solid var(--medium-gray);
    border-radius: var(--border-radius-sm);
    
    &:focus {
      outline: none;
      border-color: var(--accent);
    }
  }
`;

const ProductsContainer = styled.div``;

const TopControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-6);
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-4);
  }
`;

const ResultCount = styled.p`
  font-size: var(--font-size-md);
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
`;

const SortLabel = styled.span`
  font-size: var(--font-size-sm);
`;

const SortSelect = styled.select`
  padding: var(--spacing-2) var(--spacing-4);
  border: 1px solid var(--medium-gray);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--accent);
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-6);
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: var(--spacing-4);
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: var(--spacing-10);
  
  h3 {
    font-size: var(--font-size-xl);
    margin-bottom: var(--spacing-4);
  }
  
  p {
    font-size: var(--font-size-md);
    color: var(--dark-gray);
    max-width: 400px;
    margin: 0 auto var(--spacing-6);
  }
`;

const WomenShop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // State
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(SAMPLE_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [filters, setFilters] = useState({
    onSale: false,
    newArrivals: false
  });
  
  // Initialize from URL params
  useEffect(() => {
    const category = queryParams.get('category');
    if (category) {
      const formattedCategory = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      if (CATEGORIES.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
      }
    }
    
    const sort = queryParams.get('sort');
    if (sort && SORT_OPTIONS.some(option => option.value === sort)) {
      setSortOption(sort);
    }
    
    const onSale = queryParams.get('onSale') === 'true';
    const newArrivals = queryParams.get('new') === 'true';
    
    setFilters({
      onSale,
      newArrivals
    });
  }, [location.search]);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply price filter
    filtered = filtered.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Apply other filters
    if (filters.onSale) {
      filtered = filtered.filter(product => product.discount > 0);
    }
    
    if (filters.newArrivals) {
      filtered = filtered.filter(product => product.isNew);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - no specific sorting
        break;
    }
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, filters, sortOption]);
  
  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory !== 'All') {
      params.set('category', selectedCategory.toLowerCase().replace(/\s+/g, '-'));
    }
    
    if (sortOption !== 'featured') {
      params.set('sort', sortOption);
    }
    
    if (filters.onSale) {
      params.set('onSale', 'true');
    }
    
    if (filters.newArrivals) {
      params.set('new', 'true');
    }
    
    navigate(`/women${params.toString() ? `?${params.toString()}` : ''}`, { replace: true });
  }, [selectedCategory, sortOption, filters, navigate]);
  
  // Handlers
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handlePriceChange = (e) => {
    setPriceRange(prev => ({
      ...prev,
      max: parseInt(e.target.value, 10)
    }));
  };
  
  return (
    <ShopContainer>
      <Banner>
        <BannerVideo 
          autoPlay
          muted
          loop
          playsInline
          src="https://assets.gymshark.com/wl6q2in9o7k3/2nNdPLsFC4NjJgo6YHwhe7/31e04ad5c51554e4f0999fbcd792c202/March_Core_Products_-_Look_3_-_Desktop.mp4" // User will add the video URL
        >
          <source src="" type="video/mp4" /> {/* User will add the video URL */}
          Your browser does not support HTML5 video.
        </BannerVideo>
        <BannerOverlay>
          <BannerContent>
            <BannerTitle>Women's Collection</BannerTitle>
            <BannerDescription>
              Discover performance activewear designed to enhance your workout and lifestyle
            </BannerDescription>
          </BannerContent>
        </BannerOverlay>
      </Banner>
      
      <ShopContent>
        <Sidebar>
          <SidebarSection>
            <SidebarTitle>Categories</SidebarTitle>
            <CategoryList>
              {CATEGORIES.map(category => (
                <CategoryItem 
                  key={category}
                  className={selectedCategory === category ? 'active' : ''}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </CategoryItem>
              ))}
            </CategoryList>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle>Filters</SidebarTitle>
            <CheckboxContainer>
              <input 
                type="checkbox" 
                id="onSale" 
                name="onSale"
                checked={filters.onSale}
                onChange={handleFilterChange}
              />
              <label htmlFor="onSale">On Sale</label>
            </CheckboxContainer>
            <CheckboxContainer>
              <input 
                type="checkbox" 
                id="newArrivals" 
                name="newArrivals"
                checked={filters.newArrivals}
                onChange={handleFilterChange}
              />
              <label htmlFor="newArrivals">New Arrivals</label>
            </CheckboxContainer>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarTitle>Price Range</SidebarTitle>
            <PriceRange>
              <RangeSlider 
                type="range" 
                min="0" 
                max="100" 
                value={priceRange.max}
                onChange={handlePriceChange}
              />
              <PriceInputs>
                <div>
                  <label htmlFor="min-price">Min</label>
                  <input 
                    type="number" 
                    id="min-price" 
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value, 10) }))}
                    min="0"
                  />
                </div>
                <div>
                  <label htmlFor="max-price">Max</label>
                  <input 
                    type="number" 
                    id="max-price" 
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value, 10) }))}
                    min="0"
                  />
                </div>
              </PriceInputs>
            </PriceRange>
          </SidebarSection>
        </Sidebar>
        
        <ProductsContainer>
          <MobileFilterButton>Filters & Sort</MobileFilterButton>
          
          <TopControls>
            <ResultCount>
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </ResultCount>
            
            <SortContainer>
              <SortLabel>Sort by:</SortLabel>
              <SortSelect value={sortOption} onChange={handleSortChange}>
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SortSelect>
            </SortContainer>
          </TopControls>
          
          {filteredProducts.length > 0 ? (
            <ProductGrid>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          ) : (
            <NoResults>
              <h3>No products found</h3>
              <p>Try adjusting your filters or browse our categories for more options</p>
            </NoResults>
          )}
        </ProductsContainer>
      </ShopContent>
    </ShopContainer>
  );
};

export default WomenShop; 