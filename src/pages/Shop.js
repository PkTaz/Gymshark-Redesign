import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProductCard from '../components/shop/ProductCard';

// Sample product data - in a real application this would come from an API
const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Arrival 5" Shorts',
    category: 'Shorts',
    price: 26,
    discount: 0,
    rating: 4.3,
    reviews: 124,
    isNew: false,
    colors: [
      { name: 'Black', colorCode: 'black', hex: '#000000' },
      { name: 'Navy', colorCode: 'navy', hex: '#000080' },
      { name: 'Grey', colorCode: 'grey', hex: '#808080' }
    ],
    images: {
      black: [
        'https://cdn.shopify.com/s/files/1/0156/6146/products/ARRIVAL5SHORTSBLACKA2A1M-BBBB_1920x.jpg?v=1680785741',
        'https://cdn.shopify.com/s/files/1/0156/6146/products/ARRIVAL5SHORTSBLACKA2A1M-BBBB.2_1920x.jpg?v=1680785740'
      ],
      navy: [
        'https://cdn.shopify.com/s/files/1/0156/6146/products/ArrivalSlim5-ShortNavyA1A2H-UBCY.A_ZH_ZH_1920x.jpg?v=1644314143',
        'https://cdn.shopify.com/s/files/1/0156/6146/products/ArrivalSlim5-ShortNavyA1A2H-UBCY.B_ZH_ZH_1920x.jpg?v=1644314144'
      ],
      grey: [
        'https://cdn.shopify.com/s/files/1/0156/6146/products/ArrivalSlim5Short-SilhouetteGreyA2A1M-GBP4_1920x.jpg?v=1660034608',
        'https://cdn.shopify.com/s/files/1/0156/6146/products/ArrivalSlim5Short-SilhouetteGreyA2A1M-GBP42_1920x.jpg?v=1660034608'
      ]
    }
  },
  {
    id: '2',
    name: 'Oversized Crest Zip Up Hoodie',
    category: 'Hoodies',
    price: 48,
    discount: 10,
    rating: 4.4,
    reviews: 98,
    isNew: true,
    colors: [
      { name: 'Light Grey', colorCode: 'light-grey', hex: '#D3D3D3' },
      { name: 'Black', colorCode: 'black', hex: '#000000' }
    ],
    images: {
      'light-grey': [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/CrestOversizedZipUpHoodieLightGreyCoreMarlA5A9T-GBCN0023_68aeef6b-fbfe-4206-8600-03abf5037ea6_1920x.jpg?v=1738170562',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/CrestOversizedZipUpHoodieLightGreyCoreMarlA5A9T-GBCN0025_a68ba450-7571-4ed4-ae78-5039766ad4b6_1920x.jpg?v=1738170562-85cb-7a39b6f7cada_620x.jpg?v=1667400505'
      ],
      'black': [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/EssentialOversizedZipUpHoodieGSBlackA5A9T-BB2J-1354_1920x.jpg?v=1696606434',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/EssentialOversizedZipUpHoodieGSBlackA5A9T-BB2J-1385_1920x.jpg?v=1696606434'
      ]
    }
  },
  {
    id: '3',
    name: 'Sport 5" Shorts',
    category: 'Shorts',
    price: 38,
    discount: 0,
    rating: 4.4,
    reviews: 112,
    isNew: false,
    colors: [
      { name: 'Black', colorCode: 'black', hex: '#000000' },
      { name: 'Dark Grey', colorCode: 'grey', hex: '#808080' }
    ],
    images: {
      black: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5ShortGSBlackA1B3M-BB2J1_8654cff7-5636-4919-92fe-78de8b3788a5_1920x.jpg?v=1722948230',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5ShortGSBlackA1B3M-BB2J2_9f1df999-c5d4-4092-b5f3-b7b12156d369_1920x.jpg?v=1722948230'
      ],
      grey: [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5ShortGSDarkGreyGSBlackA1B3M-GB7X1_019b25d0-a091-4b9a-9b71-6107b4ae0924_1920x.jpg?v=1722948231',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/Sport5ShortGSDarkGreyGSBlackA1B3M-GB7X2_ad57be1b-aa2e-41ae-92b9-d345eab4af95_1920x.jpg?v=1722948231'
      ]
    }
  },
  {
    id: '4',
    name: 'Prime T-Shirt',
    category: 'T-Shirts',
    price: 30,
    discount: 0,
    rating: 5.0,
    reviews: 45,
    isNew: true,
    colors: [
      { name: 'Black/Red', colorCode: 'black-red', hex: '#000000' },
      { name: 'White', colorCode: 'white', hex: '#FFFFFF' }
    ],
    images: {
      'black-red': [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/PrimeT-ShirtGSBlack-GSVividRedA2C5V-RBWN-0964-0091_0615f55d-d71b-4e4c-86a4-c985844b56c4_1920x.jpg?v=1740429535',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/PrimeT-ShirtGSBlack-GSVividRedA2C5V-RBWN-1000-0095_7c261517-554c-49c3-aac7-2a9712a67f16_1920x.jpg?v=1740429535'
      ],
      'white': [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/PrimeT-ShirtGSWhiteA2C5V-WB571650-0079_2f1058c9-db5d-4da7-ad9d-6f1de9b7d6a6_1920x.jpg?v=1740429537',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/PrimeT-ShirtGSWhiteA2C5V-WB571653-0082_3f461428-910c-4f9c-a780-57c40d68a92a_1920x.jpg?v=1740429536'
      ]
    }
  },
  {
    id: '5',
    name: 'Heavy Duty Stringer',
    category: 'Tank Tops',
    price: 28,
    discount: 0,
    rating: 4.7,
    reviews: 32,
    isNew: true,
    colors: [
      { name: 'Black', colorCode: 'black', hex: '#000000' },
      { name: 'White', colorCode: 'white', hex: '#FFFFFF' }
    ],
    images: {
      'black': [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/GFXLifting7StringerGSBlackA2B9K-BB2J1686-0115_1920x.jpg?v=1741794089',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/GFXLifting7StringerGSBlackA2B9K-BB2J1688-0117_1920x.jpg?v=1741794089'
      ],
      'white': [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/GFXLifting7StringerGSWhiteA2B9K-WB571693-0122_1920x.jpg?v=1741794087',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/GFXLifting7StringerGSWhiteA2B9K-WB571694-0123_1920x.jpg?v=1741794087'
      ]
    }
  },
  {
    id: '6',
    name: 'Conditioning Club Tank',
    category: 'Tank Tops',
    price: 30,
    discount: 0,
    rating: 4.8,
    reviews: 21,
    isNew: true,
    colors: [
      { name: 'Trail Green', colorCode: 'green', hex: '#000080' },
      { name: 'Black', colorCode: 'black', hex: '#000000' }
    ],
    images: {
      'green': [
        'https://cdn.shopify.com/s/files/1/0156/6146/files/ConditioningClubTankGSTrailGreenA2B4U-EC2Z-1037-0157_dd92d463-2714-4b01-818b-9dc21257dda0_1920x.jpg?v=174042958988',
        'https://cdn.shopify.com/s/files/1/0156/6146/files/ConditioningClubTankGSTrailGreenA2B4U-EC2Z-1047-0159_a1928dae-3969-489a-9d1e-506b1ea7a1d2_1920x.jpg?v=1740429589'
      ],
      'black': [
        'https://cdn.shopify.com/s/files/1/0156/6146/products/RipstopPumperPantsBlueGSM8784.A-EBW2604-Edit_ZH_620x.jpg?v=1681226288',
        'https://cdn.shopify.com/s/files/1/0156/6146/products/RipstopPumperPantsBlueGSM8784.A-EBW2617-Edit_ZH_620x.jpg?v=1681226288'
      ]
    }
  }
];

// Mock categories
const CATEGORIES = [
  'All',
  'Shorts',
  'Hoodies',
  'T-Shirts',
  'Tank Tops',
  'Pants',
  'Leggings',
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

const Shop = () => {
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
      } else if (formattedCategory === 'Women' || formattedCategory === 'Accessories') {
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
    
    // For demo purposes, we're using the same products regardless of category
  }, [location.search]);
  
  // Apply filters
  useEffect(() => {
    let filtered = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      // For demo purposes, we're not filtering by Women or Accessories categories
      if (selectedCategory !== 'Women' && selectedCategory !== 'Accessories') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
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
    
    navigate(`/shop${params.toString() ? `?${params.toString()}` : ''}`, { replace: true });
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
          src="https://assets.gymshark.com/wl6q2in9o7k3/22tGckrqSPNDLQn1hJ8ers/fbac251883bfd60c7ecd60383024d5c5/March_Core_Products_-_Look_5_-_WEB_BANNER.mp4"  
        >
          <source src="https://cdn.gymshark.com/videos/marketing/V1QG8q7WUqtSzYdQXy2BX.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </BannerVideo>
        <BannerOverlay>
          <BannerContent>
            <BannerTitle>Men's Collection</BannerTitle>
            <BannerDescription>
              Discover high-performance workout clothing designed for peak performance
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

export default Shop; 