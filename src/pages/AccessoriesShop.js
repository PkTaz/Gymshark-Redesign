import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';

// Accessory categories
const ACCESSORY_CATEGORIES = [
  {
    id: 1,
    name: 'Bags',
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/EverydayMiniHoldallBlack-I2A5Q-BBBB231_1920x.jpg?v=1729175197',
    description: 'Gym bags and backpacks with dedicated compartments for all your workout essentials',
    link: '/accessories/bags',
    size: 'large'
  },
  {
    id: 2,
    name: 'Water Bottles',
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/products/1LWaterBottleBlack-I2A6T-BBBB-0714.67_1920x.jpg?v=1673514746',
    description: 'Stay hydrated with our range of premium water bottles and shakers',
    link: '/accessories/bottles',
    size: 'medium'
  },
  {
    id: 3,
    name: 'Headwear',
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/products/SharkheadCapBlack-I1A6R-BBF72_1920x.jpg?v=1668069598',
    description: 'Caps, beanies and headbands designed for your workout and lifestyle',
    link: '/accessories/headwear',
    size: 'small'
  },
  {
    id: 4,
    name: 'Gloves',
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/LegacyLiftingGlovesBlackI1A2S-BBBB151-Edit_BK_3f3191ba-58fc-40ec-92e4-f41e64d5e9e0_640x.jpg?v=1740429595',
    description: 'Get a better grip with our range of lifting gloves and grips',
    link: '/accessories/gloves',
    size: 'small'
  },
  {
    id: 5,
    name: 'Socks',
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/LiteCrewSock3pkGSWhiteI1B3L-WB57_e3cef56c-0f0c-420c-81c9-c59e6de53b82_1920x.jpg?v=1730199427',
    description: 'Keep your feet comfortable with our performance socks',
    link: '/accessories/socks',
    size: 'medium'
  },
  {
    id: 6,
    name: 'Lifting Straps',
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/LiftingStraps_StrongmanEtc_BlackI1A5A.B_ZH_ZH_1920x.jpg?v=17397806693a21ddb_1920x.jpg?v=1664191982',
    description: 'Take your workout to the next level with our range of lifting straps',
    link: '/accessories/bands',
    size: 'large'
  },
  {
    id: 7,
    name: 'Equipment',
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/LEWIS-0114_PDPCrop_3515e0df-fb74-48d5-839d-1d8e704b2a3f_640x.jpg?v=1735645455',
    description: 'Essential workout equipment for the gym or at home',
    link: '/accessories/equipment',
    size: 'medium'
  }
];

const PageContainer = styled.div`
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-2);
  }
`;

const MainTitle = styled(motion.h1)`
  text-align: center;
  font-size: var(--font-size-5xl);
  font-weight: 700;
  margin: var(--spacing-16) 0 var(--spacing-8);
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--primary);
    transition: width 0.6s ease-in-out;
  }
  
  &:hover::after {
    width: 120px;
  }
  
  @media (max-width: 768px) {
    font-size: var(--font-size-3xl);
    margin: var(--spacing-10) 0 var(--spacing-6);
  }
`;

const IntroText = styled(motion.p)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto var(--spacing-12);
  font-size: var(--font-size-lg);
  line-height: 1.6;
  color: var(--dark-gray);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-8);
  }
`;

const MasonryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-template-areas: 
    "area1 area1 area2 area2"
    "area1 area1 area3 area4"
    "area5 area6 area6 area7"
    "area5 area6 area6 area7";
  gap: var(--spacing-6);
  margin-bottom: var(--spacing-20);
  position: relative;
  width: 90%;
  max-width: 1200px;
  aspect-ratio: 1 / 1;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
    grid-template-areas: 
      "area1 area1"
      "area1 area1"
      "area2 area2"
      "area3 area4"
      "area5 area6"
      "area7 area7";
    gap: var(--spacing-5);
    width: 95%;
    aspect-ratio: 1 / 1.5;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    aspect-ratio: 1 / 2;
  }
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  height: 100%;
  
  &:nth-child(1) {
    grid-area: area1;
  }
  
  &:nth-child(2) {
    grid-area: area2;
  }
  
  &:nth-child(3) {
    grid-area: area3;
  }
  
  &:nth-child(4) {
    grid-area: area4;
  }
  
  &:nth-child(5) {
    grid-area: area5;
  }
  
  &:nth-child(6) {
    grid-area: area6;
  }
  
  &:nth-child(7) {
    grid-area: area7;
  }
`;

const CategoryImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const CategoryOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-4);
  transition: all 0.4s ease;
  class-name: category-overlay;
`;

const CategoryName = styled(motion.h2)`
  color: var(--white);
  font-size: var(--font-size-3xl);
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: var(--font-size-xl);
  }
`;

const CategoryDescription = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: var(--spacing-4);
  transform: translateY(100%);
  transition: transform 0.4s ease;
  
  p {
    color: var(--white);
    font-size: var(--font-size-sm);
    margin: 0;
  }
  
  @media (max-width: 768px) {
    padding: var(--spacing-2);
  }
`;

// Animation variants
const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    } 
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      delay: 0.3,
      ease: "easeOut"
    } 
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 12,
      stiffness: 100
    }
  },
  hover: { 
    scale: 1.03,
    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 200
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      type: "spring",
      damping: 5,
      stiffness: 300
    }
  }
};

const imageVariants = {
  hover: { 
    scale: 1.05,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const overlayVariants = {
  hover: { 
    backgroundColor: "rgba(0,0,0,0.5)",
    transition: { 
      duration: 0.3
    }
  }
};

const nameVariants = {
  hover: { 
    y: -8, 
    scale: 1.05,
    textShadow: "0 4px 8px rgba(0,0,0,0.5)",
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 200
    }
  }
};

const descriptionVariants = {
  initial: { y: "100%", opacity: 0.8 },
  hover: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 200
    }
  }
};

// Click animation variants
const clickVariants = {
  clicked: (i) => ({
    scale: [1, 1.1, 1],
    rotate: [0, i % 2 === 0 ? 5 : -5, 0],
    boxShadow: [
      "0 8px 16px rgba(0,0,0,0.1)",
      "0 16px 32px rgba(0,0,0,0.15)",
      "0 8px 16px rgba(0,0,0,0.1)"
    ],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  })
};

// Section for scroll animation hooks
const AnimatedSection = ({ children }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    threshold: 0.2,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
};

const AccessoriesShop = () => {
  const [clickedId, setClickedId] = useState(null);
  
  const handleCardClick = (id) => {
    setClickedId(id);
    // Reset after animation completes
    setTimeout(() => setClickedId(null), 500);
  };
  
  return (
    <PageContainer>
      <MainTitle
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Accessories
      </MainTitle>
      
      <IntroText
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        Elevate your training with our range of premium accessories, designed for performance, 
        durability and style. From gym bags to water bottles, we've got everything you need to 
        complement your workout gear.
      </IntroText>
      
      <AnimatedSection>
        <MasonryGrid>
          {ACCESSORY_CATEGORIES.map((category, index) => (
            <CategoryCard 
              key={category.id}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              animate={clickedId === category.id ? "clicked" : "visible"}
              custom={index}
              onClick={() => handleCardClick(category.id)}
              layoutId={`card-${category.id}`}
            >
              <Link to={category.link} style={{ display: 'block', height: '100%' }}>
                <CategoryImage 
                  src={category.image} 
                  alt={category.name}
                  variants={imageVariants}
                  layoutId={`image-${category.id}`}
                />
                
                <CategoryOverlay 
                  className="category-overlay"
                  variants={overlayVariants}
                  layoutId={`overlay-${category.id}`}
                >
                  <CategoryName 
                    variants={nameVariants}
                    layoutId={`name-${category.id}`}
                  >
                    {category.name}
                  </CategoryName>
                </CategoryOverlay>
              </Link>
            </CategoryCard>
          ))}
        </MasonryGrid>
      </AnimatedSection>
    </PageContainer>
  );
};

export default AccessoriesShop; 