import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade, Navigation, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import '../styles/swiper-custom.css';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

// Define fresh spring color scheme for Gymshark
const COLORS = {
  springSage: '#C3D7AE',      // Soft sage green - primary
  springSageDark: '#A7BD8E',  // Deeper sage for accents
  springBlush: '#F4CBC6',     // Soft pink for contrast elements
  springCoral: '#F8AFA6',     // Coral for warm accents
  springButter: '#F3E9C6',    // Soft buttercream for highlights
  springWhite: '#FAFDF7',     // Clean white with hint of green
  springBlack: '#1A1A1A',     // Soft black
  springGray: '#E9EDE4',      // Light gray with warm undertone
  springDarkGray: '#A5A99A'   // Darker gray with warm undertone
};

// Loading overlay component
const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LogoContainer = styled(motion.div)`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = styled(motion.div)`
  margin-top: 20px;
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${COLORS.springSage};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Animation variants for sections
const sectionVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

// Animation variants with pop effect
const popUpVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 30
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
      duration: 0.5
    }
  }
};

// Animation variants for staggered children
const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// Animation variants for items within staggered container
const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

// Mock data for front page
const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F5gbnhBI27FCcJ27YpFpu5V%2F6d4e144ebbfdd1ce67e3d884e8182eb5%2FHeadless_Desktop_-_22106031__1_.png&w=1920&q=85',
    title: 'WOMEN\'S PERFORMANCE COLLECTION',
    subtitle: 'Designed to enhance your workout with style and comfort',
    buttonText: 'Shop Women',
    buttonLink: '/shop?category=women'
  },
  {
    id: 2,
    image: 'https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F7jVjM4Ub6hpI2q5VdpVx6T%2F0227dffc2fe0e24f9f8e8bf44c357e80%2FPower_Originals_Zip_Up_Hoodie_Charcoal_Core_Marl_A2C9J-GBBB-1455.jpg&w=1920&q=85',
    title: 'CLASSIC BODYBUILDING SHAPES',
    subtitle: 'Physique-accentuating designs & the perfect pump covers',
    buttonText: 'Shop Men',
    buttonLink: '/shop'
  },
  {
    id: 3,
    image: 'https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2F8urtyqugdt2l%2F729dU8jmb58qkj9j0hulCu%2Febb4e35929839869d8b948cf8ed26db0%2FCentral_Promotional_Banner_Desktop_3.jpg&w=1920&q=85',
    title: 'ENGINEERED FOR ATHLETES',
    subtitle: 'Precision fabrics and designs for training at your best',
    buttonText: 'Shop Training',
    buttonLink: '/shop?category=training'
  },
  {
    id: 4,
    image: 'https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F2gG2Xol73s5cviC3wdv49j%2F5b7b1a79dedbc05ea52ea30e8130bddf%2FHeadless_Desktop_-_22106069__1_.png&w=1920&q=85',
    title: 'DISCOVER SUMMER ESSENTIALS',
    subtitle: 'High-performance workout clothing for peak performance',
    buttonText: 'Shop Collection',
    buttonLink: '/shop?category=summer-essentials'
  }
];

const CATEGORIES = [
  {
    id: 1,
    name: 'Men',
    image: 'https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2FiGqgaP8hJK1kqdXKY6jSX%2F0c2d2a0ce579801267bc9e9e0bd94e23%2FHeadless_Cards_-_22176648.png&w=1664&q=85',
    link: '/shop'
  },
  {
    id: 2,
    name: 'Women',
    image: 'https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F52DnR2ZB8dhcX1kXnSU0Ru%2F4c97e05de22189d87de2c49b25c7f2b1%2FHeadless_Cards_-_22141281.png&w=1664&q=85',
    link: '/shop?category=women'
  },
  {
    id: 3,
    name: 'Accessories',
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/CrewSocks3pkGSCelesteBlue-GSMetalPurple-GSSoftWhiteI3A3P-UDGR_1_1664x.jpg?v=1739358638',
    link: '/shop?category=accessories'
  }
];

const FEATURED_SECTION = {
  title: 'STRONG LOOKS, STRONGER LIFTS',
  description: 'Classic bodybuilding shapes, physique-accentuating designs & the perfect pump covers',
  image: 'https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F3hCM3GUtsn773orZd6pjlG%2F5875149e37f9c1209eec8df28c91a585%2FArtboard_1-1.png&w=1920&q=85',
  buttonText: 'Shop Strong Lifts Collection',
  buttonLink: '/shop?category=strong-lifts'
};

// Add Best Sellers mock data
const BEST_SELLERS = [
  {
    id: '1',
    name: 'Arrival 5" Shorts',
    price: 40,
    discount: 0,
    isNew: false,
    rating: 4.8,
    reviews: 346,
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/ArrivalSlim5-ShortCoreOliveA2A1M-EBF1.A_1920x.jpg?v=1738170598',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0156/6146/files/ArrivalSlim5-ShortCoreOliveA2A1M-EBF1.B_1920x.jpg?v=1738170598',
    colors: ['Dark Green', 'Black', 'Navy'],
    badge: 'Bestseller',
    link: '/product/1'
  },
  {
    id: '2',
    name: 'Elevated Power Shirt',
    price: 38,
    discount: 0,
    isNew: true,
    rating: 4.9,
    reviews: 219,
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/GYMSHARKELEVATEDPOWERT-SHIRTGSBlackACIDWASHSMALLBALLB9A6Z-BB4V-1644_dcae385e-cd3f-450f-bbdb-8b49bac70894_1920x.jpg?v=1728490654',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0156/6146/files/GYMSHARKELEVATEDPOWERT-SHIRTGSBlackACIDWASHSMALLBALLB9A6Z-BB4V-1656_071500ef-4f7a-4fec-93bc-dd4cf6fb2f3d_1920x.jpg?v=1728490654',
    colors: ['Black', 'Depth Purple'],
    badge: 'New',
    link: '/product/2'
  },
  {
    id: '3',
    name: 'Premium Legacy Tank',
    price: 25,
    discount: 10,
    isNew: false,
    rating: 4.7,
    reviews: 502,
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/PREMIUMLEGACYTANKGSBlack_PIGMENTDYEB1C5Q-BB67-0231_1920x.jpg?v=1725290121',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0156/6146/files/PREMIUMLEGACYTANKGSBlack_PIGMENTDYEB1C5Q-BB67-0247_1920x.jpg?v=1725290121',
    colors: ['Grey', 'Black', 'White'],
    badge: 'Sale',
    link: '/product/3'
  },
  {
    id: '4',
    name: 'Prime T-Shirt',
    price: 30,
    discount: 0,
    isNew: false,
    rating: 5.0,
    reviews: 45,
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/PrimeT-ShirtGSBlack-GSVividRedA2C5V-RBWN-0964-0091_0615f55d-d71b-4e4c-86a4-c985844b56c4_1664x.jpg?v=1740429535',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0156/6146/files/PrimeT-ShirtGSBlack-GSVividRedA2C5V-RBWN-1000-0095_7c261517-554c-49c3-aac7-2a9712a67f16_1664x.jpg?v=1740429535',
    colors: ['Black/Red', 'White'],
    badge: 'Top Rated',
    link: '/product/4'
  },
  {
    id: '5',
    name: 'Sharkhead Backpack',
    price: 45,
    discount: 0,
    isNew: true,
    rating: 4.6,
    reviews: 78,
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/files/SharkheadBackpackGSBlackI3A4R-BB2J8408_1920x.jpg?v=1723476161',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0156/6146/files/Sharkhead_Backback_Black_I3A4R-BB2J_-1019_1920x.jpg?v=1723476161',
    colors: ['Black', 'Gray'],
    badge: 'New',
    link: '/product/5'
  },
  {
    id: '6',
    name: 'Essential Zip Hoodie',
    price: 50,
    discount: 15,
    isNew: false,
    rating: 4.8,
    reviews: 326,
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/products/EssentialZipHoodieNavy-EBX3832_620x.jpg?v=1680097184',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0156/6146/products/EssentialZipHoodieNavy-EBX3846_620x.jpg?v=1680097184',
    colors: ['Navy', 'Black', 'Gray'],
    badge: 'Sale',
    link: '/product/6'
  },
  {
    id: '7',
    name: 'Vital Seamless T-Shirt',
    price: 35,
    discount: 0,
    isNew: false,
    rating: 4.9,
    reviews: 418,
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/products/VitalSeamlessSSBlue-EBW8123_620x.jpg?v=1680097183',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0156/6146/products/VitalSeamlessSSBlue-EBW8136_620x.jpg?v=1680097183',
    colors: ['Blue', 'Black', 'Green'],
    badge: 'Bestseller',
    link: '/product/7'
  },
  {
    id: '8',
    name: 'Workout Mat',
    price: 60,
    discount: 0,
    isNew: false,
    rating: 4.7,
    reviews: 112,
    image: 'https://cdn.shopify.com/s/files/1/0156/6146/products/WorkoutMatGS5026Black-EBX3910_620x.jpg?v=1680097184',
    hoverImage: 'https://cdn.shopify.com/s/files/1/0156/6146/products/WorkoutMatGS5026Black-EBX3916_620x.jpg?v=1680097184',
    colors: ['Black'],
    badge: null,
    link: '/product/8'
  }
];

// Add blog posts data after BEST_SELLERS
const BLOG_POSTS = [
  {
    id: 1,
    title: "5 Essential Exercises for Building Core Strength",
    excerpt: "Discover the most effective movements to develop a rock-solid core that improves stability and athletic performance.",
    image: "https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Training",
    date: "May 10, 2023",
    link: "/blog/core-strength"
  },
  {
    id: 2,
    title: "What to Eat Before and After Your Workout",
    excerpt: "Optimize your nutrition timing to maximize performance and recovery with these evidence-based recommendations.",
    image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Nutrition",
    date: "April 28, 2023",
    link: "/blog/workout-nutrition"
  },
  {
    id: 3,
    title: "How to Create a Balanced Weekly Training Split",
    excerpt: "Build an effective training plan that balances muscle groups, intensity, and recovery for optimal results.",
    image: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Training",
    date: "May 15, 2023",
    link: "/blog/training-split"
  },
  {
    id: 4,
    title: "The Mental Benefits of Regular Exercise",
    excerpt: "Exercise isn't just for your body - learn how consistent training improves mental health and cognitive function.",
    image: "https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Lifestyle",
    date: "May 2, 2023",
    link: "/blog/mental-benefits"
  },
  {
    id: 5,
    title: "Sustainable Fitness: Building Habits That Last",
    excerpt: "Move beyond quick fixes and create a sustainable fitness routine that becomes a natural part of your lifestyle.",
    image: "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Lifestyle",
    date: "April 15, 2023",
    link: "/blog/sustainable-fitness"
  },
  {
    id: 6,
    title: "Beginner's Guide to Strength Training",
    excerpt: "Everything you need to know to start your strength training journey safely and effectively.",
    image: "https://images.pexels.com/photos/3837757/pexels-photo-3837757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "Training",
    date: "March 30, 2023",
    link: "/blog/beginners-strength"
  }
];

// Outfit Products for the outfit builder
const OUTFIT_PRODUCTS = {
  men: {
    tops: [
      {
        id: "m-top-1",
        name: "Training T-Shirt",
        price: 35,
        image: "https://cdn.shopify.com/s/files/1/0156/6146/files/PrimeT-ShirtGSBlack-GSVividRedA2C5V-RBWN-0964-0091_0615f55d-d71b-4e4c-86a4-c985844b56c4_1664x.jpg?v=1740429535"
      },
      {
        id: "m-top-2",
        name: "Performance Tank",
        price: 30,
        image: "https://cdn.shopify.com/s/files/1/0156/6146/files/PREMIUMLEGACYTANKGSBlack_PIGMENTDYEB1C5Q-BB67-0231_1920x.jpg?v=1725290121"
      },
      {
        id: "m-top-3",
        name: "Elevated Power Shirt",
        price: 38,
        image: "https://cdn.shopify.com/s/files/1/0156/6146/files/GYMSHARKELEVATEDPOWERT-SHIRTGSBlackACIDWASHSMALLBALLB9A6Z-BB4V-1644_dcae385e-cd3f-450f-bbdb-8b49bac70894_1920x.jpg?v=1728490654"
      }
    ],
    bottoms: [
      {
        id: "m-bottom-1",
        name: "Arrival 5\" Shorts",
        price: 40,
        image: "https://cdn.shopify.com/s/files/1/0156/6146/files/ArrivalSlim5-ShortCoreOliveA2A1M-EBF1.A_1920x.jpg?v=1738170598"
      },
      {
        id: "m-bottom-2",
        name: "Training Joggers",
        price: 55,
        image: "https://cdn.shopify.com/s/files/1/0156/6146/products/EssentialZipHoodieNavy-EBX3832_620x.jpg?v=1680097184"
      },
      {
        id: "m-bottom-3",
        name: "Performance Shorts",
        price: 45,
        image: "https://cdn.shopify.com/s/files/1/0156/6146/products/VitalSeamlessSSBlue-EBW8123_620x.jpg?v=1680097183"
      }
    ]
  },
  women: {
    tops: [
      {
        id: "w-top-1",
        name: "Training Sports Bra",
        price: 35,
        image: "https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F5gbnhBI27FCcJ27YpFpu5V%2F6d4e144ebbfdd1ce67e3d884e8182eb5%2FHeadless_Desktop_-_22106031__1_.png&w=1920&q=85"
      },
      {
        id: "w-top-2",
        name: "Seamless Crop Top",
        price: 30,
        image: "https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F52DnR2ZB8dhcX1kXnSU0Ru%2F4c97e05de22189d87de2c49b25c7f2b1%2FHeadless_Cards_-_22141281.png&w=1664&q=85"
      },
      {
        id: "w-top-3",
        name: "Performance T-Shirt",
        price: 32,
        image: "https://cdn.shopify.com/s/files/1/0156/6146/files/GYMSHARKELEVATEDPOWERT-SHIRTGSBlackACIDWASHSMALLBALLB9A6Z-BB4V-1644_dcae385e-cd3f-450f-bbdb-8b49bac70894_1920x.jpg?v=1728490654"
      }
    ],
    bottoms: [
      {
        id: "w-bottom-1",
        name: "Training Leggings",
        price: 50,
        image: "https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F5gbnhBI27FCcJ27YpFpu5V%2F6d4e144ebbfdd1ce67e3d884e8182eb5%2FHeadless_Desktop_-_22106031__1_.png&w=1920&q=85"
      },
      {
        id: "w-bottom-2",
        name: "Performance Shorts",
        price: 40,
        image: "https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F52DnR2ZB8dhcX1kXnSU0Ru%2F4c97e05de22189d87de2c49b25c7f2b1%2FHeadless_Cards_-_22141281.png&w=1664&q=85"
      },
      {
        id: "w-bottom-3",
        name: "Training Joggers",
        price: 45,
        image: "https://cdn.shopify.com/s/files/1/0156/6146/products/VitalSeamlessSSBlue-EBW8123_620x.jpg?v=1680097183"
      }
    ]
  }
};

// Add spring fitness animation keyframes
const AnimationKeyframes = styled.div`
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  @keyframes strengthLine {
    0% { width: 0%; opacity: 0.6; }
    100% { width: 100%; opacity: 1; }
  }
  
  @keyframes fadeInRotate {
    0% { opacity: 0; transform: rotate(-5deg); }
    100% { opacity: 1; transform: rotate(0deg); }
  }
  
  @keyframes energyWave {
    0% { transform: translateY(0) scaleX(1); }
    50% { transform: translateY(-10px) scaleX(1.03); }
    100% { transform: translateY(0) scaleX(1); }
  }
  
  @keyframes springBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
    75% { transform: translateY(-5px); }
    90% { transform: translateY(-2px); }
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--spacing-4);
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-2);
  }
`;

const HeroSection = styled.section`
  position: relative;
  height: 90vh;
  min-height: 600px;
  max-height: 900px;
  margin-bottom: var(--spacing-16);

  @media (max-width: 768px) {
    height: 70vh;
    min-height: 500px;
    margin-bottom: var(--spacing-12);
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  
  .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    opacity: 0.7;
    background-color: var(--white);
    transition: all var(--transition-normal);
    
    &-active {
      opacity: 1;
      width: 30px;
      border-radius: 6px;
    }
  }
  
  .swiper-pagination {
    bottom: 40px !important;
  }
  
  .swiper-slide {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
`;

const SlideContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 var(--spacing-16);
  z-index: 10;
  color: var(--white);
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 0 var(--spacing-4);
  }
`;

const SlideTitle = styled(motion.h1)`
  font-size: var(--font-size-5xl);
  font-weight: 700;
  margin-bottom: var(--spacing-4);
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-3xl);
    margin-bottom: var(--spacing-3);
  }
`;

const SlideSubtitle = styled(motion.p)`
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-8);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-6);
  }
`;

const SlideOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.4) 100%);
  z-index: 1;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CategoriesSection = styled.section`
  margin-bottom: var(--spacing-20);
`;

const SectionTitle = styled.h2`
  font-size: var(--font-size-3xl);
  font-weight: 700;
  text-align: center;
  margin-bottom: var(--spacing-10);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-8);
  }
`;

const CategoriesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-6);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
`;

const CategoryCard = styled(motion.div)`
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  aspect-ratio: 1;
  cursor: pointer;
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform, box-shadow;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: radial-gradient(circle at center, ${COLORS.springSage}00 0%, ${COLORS.springSage}00 50%);
    border-radius: var(--border-radius-lg);
    z-index: -1;
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0;
    transform: translateZ(-100px) scale(0.9);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 100%);
    z-index: 1;
    transition: background 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  &:hover {
    transform: translateY(-15px) translateZ(30px) rotateX(5deg);
    box-shadow: 
      0 30px 40px -15px rgba(0, 0, 0, 0.2),
      0 25px 20px -20px rgba(0, 0, 0, 0.1),
      0 60px 50px -30px ${COLORS.springSage}60;
    
    &::before {
      opacity: 0.7;
      transform: translateZ(-80px) scale(1.1);
      background: radial-gradient(circle at center, ${COLORS.springSage}40 0%, ${COLORS.springSage}10 60%);
      filter: blur(20px);
    }
    
    &::after {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%);
    }
    
    img {
      transform: scale(1.08) translateZ(0);
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateZ(0);
  }
`;

const CategoryImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const CategoryName = styled(motion.h3)`
  position: absolute;
  bottom: var(--spacing-6);
  left: 0;
  right: 0;
  text-align: center;
  color: var(--white);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  z-index: 2;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FeaturedSection = styled.section`
  margin-bottom: var(--spacing-20);
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(90deg, ${COLORS.springSage}, ${COLORS.springSage});
    z-index: 10;
    transform: scaleX(0);
    transform-origin: left;
    animation: strengthLine 1.5s ease-out 0.5s forwards;
  }
  
  @media (max-width: 768px) {
    border-radius: var(--border-radius-md);
    margin-bottom: var(--spacing-16);
  }
`;

const FeaturedImage = styled(motion.img)`
  width: 100%;
  height: 600px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const FeaturedContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  color: var(--white);
  text-align: center;
  padding: 0 var(--spacing-10);
`;

const FeaturedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 1;
`;

const FeaturedTitle = styled(motion.h2)`
  font-size: var(--font-size-4xl);
  font-weight: 700;
  margin-bottom: var(--spacing-4);
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(135deg, ${COLORS.springSage}, ${COLORS.springSage});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-2xl);
  }
`;

const FeaturedDescription = styled(motion.p)`
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-8);
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-6);
  }
`;

const TrendsSection = styled.section`
  margin-bottom: var(--spacing-20);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, ${COLORS.springSage}, ${COLORS.springSage});
    border-radius: 2px;
  }
`;

const TrendsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-6);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-4);
  }
`;

const TrendCard = styled(motion.div)`
  position: relative;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  aspect-ratio: 1.5;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.1) 100%);
    z-index: 1;
    transition: background var(--transition-normal);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, ${COLORS.springSage}, ${COLORS.springSage});
    z-index: 3;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.6s ease-out;
  }
  
  &:hover {
    &::after {
      background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%);
    }
    
    &::before {
      transform: scaleX(1);
    }
    
    img {
      transform: scale(1.1);
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-normal);
  }
`;

const TrendContent = styled.div`
  position: absolute;
  bottom: var(--spacing-8);
  left: var(--spacing-8);
  right: var(--spacing-8);
  z-index: 2;
  color: var(--white);
  
  @media (max-width: 768px) {
    bottom: var(--spacing-6);
    left: var(--spacing-6);
    right: var(--spacing-6);
  }
`;

const TrendTitle = styled.h3`
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin-bottom: var(--spacing-2);
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-xl);
  }
`;

const TrendDescription = styled.p`
  font-size: var(--font-size-md);
  margin-bottom: var(--spacing-4);
  max-width: 400px;
  
  @media (max-width: 768px) {
    font-size: var(--font-size-sm);
    margin-bottom: var(--spacing-3);
  }
`;

// Define animations
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Best Sellers section restyled as "Spring Essentials"
const BestSellersSection = styled.section`
  margin: var(--spacing-20) 0;
  position: relative;
  overflow: hidden;
  padding: var(--spacing-12) 0;
  background: ${COLORS.springWhite};
  border-radius: var(--border-radius-lg);
  box-shadow: 
    0 40px 80px rgba(0,0,0,0.12),
    0 30px 40px rgba(0,0,0,0.06),
    0 15px 15px rgba(0,0,0,0.03);
  transform: translateZ(0);
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
  
  &:hover {
    box-shadow: 
      0 50px 100px rgba(0,0,0,0.16),
      0 40px 50px rgba(0,0,0,0.08),
      0 20px 20px rgba(0,0,0,0.04);
  }
`;

const CollectionWrapper = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${COLORS.springSage}, transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${COLORS.springSage}, transparent);
  }
`;

const CollectionHeader = styled.div`
  margin-bottom: var(--spacing-8);
  position: relative;
  text-align: center;
`;

const CollectionSubtitle = styled.span`
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${COLORS.springSageDark};
  display: block;
  margin-bottom: var(--spacing-2);
`;

const CollectionTitle = styled.h2`
  font-size: var(--font-size-4xl);
  font-weight: 700;
  margin-bottom: var(--spacing-3);
  text-transform: uppercase;
  color: ${COLORS.springBlack};
  letter-spacing: 3px;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 60%;
    height: 2px;
    background: ${COLORS.springSage};
    transform: translateX(-50%);
  }
`;

const CollectionDescription = styled.p`
  font-size: var(--font-size-md);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  color: ${COLORS.springDarkGray};
`;

const MagazineLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto;
  grid-gap: var(--spacing-4);
  margin-top: var(--spacing-8);
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedProduct = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  position: relative;
  box-shadow: 0 15px 30px rgba(0,0,0,0.05);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
  
  @media (max-width: 992px) {
    grid-column: 1 / span 2;
    grid-row: 1;
  }
  
  @media (max-width: 768px) {
    grid-column: 1;
  }
`;

const ProductCard = styled(motion.div)`
  height: 100%;
  background-color: white;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    
    .product-hover {
      opacity: 1;
    }
  }
  
  ${props => props.isFeatured && `
    height: 100%;
    
    .product-image-container {
      height: 70%;
    }
    
    .product-content {
      padding: var(--spacing-6);
    }
    
    h3 {
      font-size: var(--font-size-2xl);
    }
  `}
`;

const ProductImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 65%;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.05) 100%);
    z-index: 1;
    pointer-events: none;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductHoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.6s ease;
  
  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

const ProductContent = styled.div`
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: white;
`;

const ProductName = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-2);
  color: ${COLORS.springBlack};
  transition: color 0.3s ease;
  
  ${ProductCard}:hover & {
    color: ${COLORS.springSageDark};
  }
`;

const ProductPrice = styled.div`
  margin-bottom: var(--spacing-2);
  display: flex;
  align-items: baseline;
  gap: var(--spacing-2);
  
  .current {
    font-size: var(--font-size-md);
    font-weight: 700;
    color: ${COLORS.springSageDark};
  }
  
  .original {
    font-size: var(--font-size-sm);
    text-decoration: line-through;
    color: ${COLORS.springDarkGray};
  }
  
  .discount {
    font-size: var(--font-size-xs);
    color: white;
    font-weight: 600;
    background: linear-gradient(135deg, ${COLORS.springCoral}, #F08F85);
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const ProductColorOptions = styled.div`
  display: flex;
  gap: var(--spacing-1);
  margin-bottom: var(--spacing-3);
`;

const ColorOption = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  cursor: pointer;
  border: 1px solid #eee;
  transition: transform 0.2s ease;
  
  &.active {
    border: 2px solid ${COLORS.springSageDark};
  }
  
  &:hover {
    transform: scale(1.2);
  }
  
  &.black {
    background-color: #000000;
  }
  
  &.white {
    background-color: #ffffff;
  }
  
  &.gray {
    background-color: #808080;
  }
  
  &.navy {
    background-color: #000080;
  }
  
  &.trail-green {
    background-color: #000080;
  }
  
  &.red {
    background-color: #8B0000;
  }
  
  &.blue {
    background-color: #0000CD;
  }
  
  &.purple {
    background-color: #800080;
  }
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  margin-top: auto;
  
  .stars {
    display: flex;
    color: #FFD700;
  }
  
  .rating-count {
    font-size: var(--font-size-xs);
    color: ${COLORS.springDarkGray};
  }
`;

const ProductBadge = styled.span`
  position: absolute;
  top: var(--spacing-3);
  left: var(--spacing-3);
  padding: 4px 12px;
  font-size: var(--font-size-xs);
  font-weight: 600;
  border-radius: 20px;
  z-index: 5;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  
  ${props => props.type === 'sale' && `
    background-color: ${COLORS.springCoral};
    color: white;
  `}
  
  ${props => props.type === 'new' && `
    background-color: ${COLORS.springSage};
    color: ${COLORS.springBlack};
  `}
  
  ${props => props.type === 'bestseller' && `
    background-color: ${COLORS.springButter};
    color: ${COLORS.springBlack};
  `}
  
  ${props => props.type === 'top-rated' && `
    background-color: ${COLORS.springBlush};
    color: ${COLORS.springBlack};
  `}
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: var(--spacing-10) auto 0;
  padding: 12px 30px;
  background: white;
  color: ${COLORS.springBlack};
  font-weight: 600;
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 2px solid ${COLORS.springSage};
  border-radius: 3px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: ${COLORS.springSage};
    transition: width 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    color: ${COLORS.springBlack};
    
    &::before {
      width: 100%;
    }
    
    svg {
      transform: translateX(4px);
    }
  }
  
  svg {
    margin-left: var(--spacing-2);
    transition: transform 0.3s ease;
  }
`;

const FeatureTag = styled(motion.div)`
  position: absolute;
  bottom: var(--spacing-3);
  right: var(--spacing-3);
  background: ${props => props.type === 'comfort' ? `linear-gradient(135deg, ${COLORS.springSage}, ${COLORS.springSage})` : 
    props.type === 'performance' ? `linear-gradient(135deg, ${COLORS.springSage}, #A7BD8E)` : 
    props.type === 'style' ? `linear-gradient(135deg, ${COLORS.springCoral}, #F8AFA6)` : 
    `linear-gradient(135deg, ${COLORS.springButter}, #F3E9C6)`};
  color: ${props => props.type === 'comfort' || props.type === 'style' ? COLORS.springBlack : 'white'};
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  z-index: 3;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const FitnessDivider = styled.div`
  margin: var(--spacing-8) 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before, &::after {
    content: '';
    height: 2px;
    flex-grow: 1;
    background: linear-gradient(90deg, transparent, ${COLORS.springSage}50);
  }
  
  &::after {
    background: linear-gradient(90deg, ${COLORS.springSage}50, transparent);
  }
  
  svg {
    margin: 0 var(--spacing-4);
    width: 30px;
    height: 30px;
    color: ${COLORS.springSage};
  }
`;

// Enhanced animation variants for categories
const categoryCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      delay: i * 0.1
    }
  }),
  hover: {
    y: -15,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 300
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 400
    }
  }
};

const categoryNameVariants = {
  hover: {
    y: -8,
    textShadow: "0px 5px 10px rgba(0,0,0,0.3)",
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 300
    }
  }
};

const BlogSection = styled.section`
  margin: var(--spacing-20) 0;
  
  &::before {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background: ${COLORS.springSage};
    margin: 0 auto var(--spacing-6);
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-8);
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--spacing-6);
  }
`;

const BlogCard = styled(motion.div)`
  background: white;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  transition: all 0.4s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
    
    img {
      transform: scale(1.05);
    }
    
    .blog-title {
      color: ${COLORS.springSageDark};
    }
  }
`;

const BlogImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
`;

const BlogCategory = styled.span`
  position: absolute;
  top: var(--spacing-4);
  left: var(--spacing-4);
  background: ${COLORS.springSage}CC;
  color: ${COLORS.springBlack};
  font-size: var(--font-size-xs);
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(4px);
`;

const BlogContent = styled.div`
  padding: var(--spacing-5);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const BlogDate = styled.span`
  font-size: var(--font-size-xs);
  color: ${COLORS.springDarkGray};
  margin-bottom: var(--spacing-2);
`;

const BlogTitle = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-3);
  transition: color 0.3s ease;
  line-height: 1.4;
  class-name: blog-title;
`;

const BlogExcerpt = styled.p`
  font-size: var(--font-size-sm);
  color: ${COLORS.springDarkGray};
  margin-bottom: var(--spacing-4);
  line-height: 1.6;
`;

const ReadMoreLink = styled.span`
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: ${COLORS.springSageDark};
  display: inline-flex;
  align-items: center;
  margin-top: auto;
  
  svg {
    margin-left: var(--spacing-1);
    transition: transform 0.3s ease;
  }
  
  ${BlogCard}:hover & svg {
    transform: translateX(4px);
  }
`;

const Home = () => {
  const featuredRef = useRef(null);
  const [selectedGender, setSelectedGender] = useState('men');
  const [selectedOutfit, setSelectedOutfit] = useState({ top: null, bottom: null });
  
  // Get scroll position for parallax effect
  const { scrollYProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  
  const getOutfitProducts = (category) => {
    if (!OUTFIT_PRODUCTS || !OUTFIT_PRODUCTS[selectedGender] || !OUTFIT_PRODUCTS[selectedGender][category]) {
      return [];
    }
    return OUTFIT_PRODUCTS[selectedGender][category];
  };
  
  const getOutfitItemById = (category, id) => {
    const items = getOutfitProducts(category);
    return items.find(item => item.id === id) || { price: 0 };
  };
  
  const handleOutfitSelection = (part, id) => {
    setSelectedOutfit(prev => ({
      ...prev,
      [part]: prev[part] === id ? null : id
    }));
  };
  
  const calculateOutfitTotal = () => {
    let total = 0;
    
    if (selectedOutfit.top) {
      total += getOutfitItemById('tops', selectedOutfit.top).price;
    }
    
    if (selectedOutfit.bottom) {
      total += getOutfitItemById('bottoms', selectedOutfit.bottom).price;
    }
    
    return total.toFixed(2);
  };
  
  const hasCompleteOutfit = () => {
    return selectedOutfit.top && selectedOutfit.bottom;
  };
  
  const handleAddOutfitToCart = () => {
    // Implement cart functionality
    console.log('Added outfit to cart:', selectedOutfit);
    alert('Outfit added to cart!');
  };

  // Function to handle badge types
  const getBadgeType = (badge) => {
    if (!badge) return null;
    
    switch(badge.toLowerCase()) {
      case 'sale':
        return 'sale';
      case 'new':
        return 'new';
      case 'bestseller':
        return 'bestseller';
      case 'top rated':
        return 'top-rated';
      default:
        return null;
    }
  };

  // Function to get appropriate color class
  const getColorClass = (color) => {
    const colorMap = {
      'black': 'black',
      'white': 'white',
      'gray': 'gray',
      'grey': 'gray',
      'navy': 'navy',
      'dark green': 'trail-green',
      'green': 'trail-green',
      'trail green': 'trail-green',
      'red': 'red',
      'blue': 'blue',
      'black/red': 'red',
      'depth purple': 'purple'
    };
    
    return colorMap[color.toLowerCase()] || 'black';
  };

  // Function to render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg key={i} width="12" height="12" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="none" stroke="currentColor" />
            <path d="M12 2v15.27l-6.18 3.73 1.64-7.03L2 9.24l7.19-.61L12 2z" fill="currentColor" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} width="12" height="12" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      }
    }
    
    return stars;
  };

  return (
    <>
      <HeroSection as={motion.section} 
        initial="hidden" 
        animate="visible" 
        variants={sectionVariants}
      >
        <StyledSwiper
          modules={[Autoplay, Pagination, EffectFade]}
          slidesPerView={1}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <img
                src={slide.image}
                alt={slide.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 100%)'
                }}
              />
              <SlideContent>
                <SlideTitle
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {slide.title}
                </SlideTitle>
                <SlideSubtitle
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {slide.subtitle}
                </SlideSubtitle>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <Button variant="primary" size="large" to={slide.buttonLink}>
                    {slide.buttonText}
                  </Button>
                </motion.div>
              </SlideContent>
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </HeroSection>

      <Container>
        <CategoriesSection
          as={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={popUpVariants}
        >
          <SectionTitle>Shop Categories</SectionTitle>
          <CategoriesGrid
            as={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariants}
          >
            {CATEGORIES.map((category) => (
              <CategoryCard 
                key={category.id}
                as={motion.div}
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <Link to={category.link}>
                  <CategoryImageContainer>
                    <img src={category.image} alt={category.name} />
                  </CategoryImageContainer>
                  <CategoryName>{category.name}</CategoryName>
                </Link>
              </CategoryCard>
            ))}
          </CategoriesGrid>
        </CategoriesSection>
        
        <FitnessDivider
          as={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={popUpVariants}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8M8 12h8" />
          </svg>
        </FitnessDivider>
        
        <BestSellersSection
          as={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <Container>
            <CollectionWrapper>
              <CollectionHeader
                as={motion.div}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={popUpVariants}
              >
                <CollectionSubtitle>Featured Collection</CollectionSubtitle>
                <CollectionTitle>Spring Essentials</CollectionTitle>
                <CollectionDescription>
                  Our most popular pieces designed for comfort, performance and style this season
                </CollectionDescription>
              </CollectionHeader>
              
              <MagazineLayout
                as={motion.div}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainerVariants}
              >
                <FeaturedProduct>
                  <ProductCard 
                    isFeatured={true}
                    as={motion.div}
                    variants={itemVariants}
                    whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  >
                    <ProductImageContainer className="product-image-container">
                      <ProductImage 
                        src={BEST_SELLERS[0].image} 
                        alt={BEST_SELLERS[0].name} 
                      />
                      <ProductHoverImage 
                        src={BEST_SELLERS[0].hoverImage} 
                        alt={BEST_SELLERS[0].name}
                        className="product-hover" 
                      />
                      {BEST_SELLERS[0].badge && (
                        <ProductBadge type={getBadgeType(BEST_SELLERS[0].badge)}>
                          {BEST_SELLERS[0].badge}
                        </ProductBadge>
                      )}
                    </ProductImageContainer>
                    
                    <ProductContent className="product-content">
                      <ProductName>{BEST_SELLERS[0].name}</ProductName>
                      
                      <ProductColorOptions>
                        {BEST_SELLERS[0].colors.map((color, index) => (
                          <ColorOption 
                            key={index}
                            className={`${getColorClass(color)} ${index === 0 ? 'active' : ''}`}
                            onClick={(e) => e.stopPropagation()}
                          />
                        ))}
                      </ProductColorOptions>
                      
                      <ProductPrice>
                        <span className="current">${BEST_SELLERS[0].price.toFixed(2)}</span>
                        {BEST_SELLERS[0].discount > 0 && (
                          <>
                            <span className="original">
                              ${((BEST_SELLERS[0].price / (1 - BEST_SELLERS[0].discount / 100)).toFixed(2))}
                            </span>
                            <span className="discount">{BEST_SELLERS[0].discount}% OFF</span>
                          </>
                        )}
                      </ProductPrice>
                      
                      <ProductRating>
                        <div className="stars">
                          {renderStars(BEST_SELLERS[0].rating)}
                        </div>
                        <span className="rating-count">({BEST_SELLERS[0].reviews})</span>
                      </ProductRating>
                    </ProductContent>
                  </ProductCard>
                </FeaturedProduct>
                
                {BEST_SELLERS.slice(1, 5).map((product, index) => (
                  <ProductCard
                    key={product.id}
                    as={motion.div}
                    variants={itemVariants}
                    whileHover={{ y: -10, boxShadow: '0 15px 20px -5px rgba(0, 0, 0, 0.1)' }}
                  >
                    <ProductImageContainer>
                      <ProductImage 
                        src={product.image} 
                        alt={product.name} 
                      />
                      <ProductHoverImage 
                        src={product.hoverImage} 
                        alt={product.name}
                        className="product-hover" 
                      />
                      {product.badge && (
                        <ProductBadge type={getBadgeType(product.badge)}>
                          {product.badge}
                        </ProductBadge>
                      )}
                    </ProductImageContainer>
                    
                    <ProductContent>
                      <ProductName>{product.name}</ProductName>
                      
                      <ProductColorOptions>
                        {product.colors.map((color, index) => (
                          <ColorOption 
                            key={index}
                            className={`${getColorClass(color)} ${index === 0 ? 'active' : ''}`}
                            onClick={(e) => e.stopPropagation()}
                          />
                        ))}
                      </ProductColorOptions>
                      
                      <ProductPrice>
                        <span className="current">${product.price.toFixed(2)}</span>
                        {product.discount > 0 && (
                          <>
                            <span className="original">
                              ${((product.price / (1 - product.discount / 100)).toFixed(2))}
                            </span>
                            <span className="discount">{product.discount}% OFF</span>
                          </>
                        )}
                      </ProductPrice>
                      
                      <ProductRating>
                        <div className="stars">
                          {renderStars(product.rating)}
                        </div>
                        <span className="rating-count">({product.reviews})</span>
                      </ProductRating>
                    </ProductContent>
                  </ProductCard>
                ))}
              </MagazineLayout>
              
              <ViewAllButton to="/shop?sort=best-selling">
                Shop All Essentials
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </ViewAllButton>
            </CollectionWrapper>
          </Container>
        </BestSellersSection>
        
        <FitnessDivider>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 4l-6 6m0 0L6 4m6 6v10" />
          </svg>
        </FitnessDivider>
        
        <FeaturedSection 
          ref={featuredRef}
          as={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <FeaturedImage 
            src={FEATURED_SECTION.image} 
            alt={FEATURED_SECTION.title}
            style={{ scale }}
          />
          <FeaturedOverlay />
          <FeaturedContent>
            <FeaturedTitle
              initial={{ opacity: 0, y: 30, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {FEATURED_SECTION.title}
            </FeaturedTitle>
            <FeaturedDescription
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {FEATURED_SECTION.description}
            </FeaturedDescription>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <Button 
                variant="primary" 
                size="large" 
                to={FEATURED_SECTION.buttonLink}
              >
                {FEATURED_SECTION.buttonText}
              </Button>
            </motion.div>
          </FeaturedContent>
        </FeaturedSection>
        
        <FitnessDivider>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </FitnessDivider>
        
        <TrendsSection
          as={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <SectionTitle>Trending Right Now</SectionTitle>
          <TrendsGrid
            as={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainerVariants}
          >
            <TrendCard 
              whileHover={{ y: -15 }} 
              variants={itemVariants}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <img 
                src="https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2FdXkmLjhZKp9rPhaNxkOFl%2F82b3c211ad1c30fb5c2e3e045c4bbd0f%2F5x4_Advert_-_C320-LOOK-17-APEX-1850-B1B7K-BCJJ-B1B7O-BCJJ.jpg.png&w=640&q=90" 
                alt="New Arrivals" 
              />
              <TrendContent>
                <TrendTitle>New Arrivals</TrendTitle>
                <TrendDescription>
                  The latest drops, including new colorways of your favorites.
                </TrendDescription>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Button variant="secondary" size="medium" to="/shop?category=new-arrivals">
                    Shop Now
                  </Button>
                </motion.div>
              </TrendContent>
            </TrendCard>
            
            <TrendCard 
              whileHover={{ y: -15 }} 
              variants={itemVariants}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <img 
                src="https://www.gymshark.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwl6q2in9o7k3%2F5Za3MMW9qdhrjDQMBGGVQW%2F474e5198ca709dcf8825ef4bd3abb2e7%2FHero_Desktop_-_21667891.png&w=1920&q=85" 
                alt="Shorts Guide" 
              />
              <TrendContent>
                <TrendTitle>Shorts Guide</TrendTitle>
                <TrendDescription>
                  Find your perfect pair for gymming, for living, for literally everything.
                </TrendDescription>
                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <Button variant="secondary" size="medium" to="/shop?category=shorts">
                    Explore Shorts
                  </Button>
                </motion.div>
              </TrendContent>
            </TrendCard>
          </TrendsGrid>
        </TrendsSection>
        
        <FitnessDivider>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </FitnessDivider>
        
        <BlogSection
          as={motion.section}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <SectionTitle>Training & Lifestyle Tips</SectionTitle>
          <BlogGrid
            as={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainerVariants}
          >
            {BLOG_POSTS.map((post, index) => (
              <BlogCard 
                key={post.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BlogImageContainer>
                  <BlogImage src={post.image} alt={post.title} />
                  <BlogCategory>{post.category}</BlogCategory>
                </BlogImageContainer>
                <BlogContent>
                  <BlogDate>{post.date}</BlogDate>
                  <BlogTitle className="blog-title">{post.title}</BlogTitle>
                  <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                  <ReadMoreLink>
                    Read Article
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </ReadMoreLink>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogGrid>
          
          <ViewAllButton 
            to="/blog" 
            style={{ marginTop: 'var(--spacing-12)' }}
            as={motion.div}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5 }}
          >
            View All Articles
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </ViewAllButton>
        </BlogSection>
      </Container>
    </>
  );
};

export default Home; 