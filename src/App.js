import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from './components/ui/Loader';

// Pages with lazy loading
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const WomenShop = lazy(() => import('./pages/WomenShop'));
const AccessoriesShop = lazy(() => import('./pages/AccessoriesShop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Main = styled.main`
  min-height: calc(100vh - var(--header-height) - 300px);
  padding-top: var(--header-height);
`;

function App() {
  return (
    <>
      <Header />
      <Main>
        <Suspense fallback={<Loader />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/women" element={<WomenShop />} />
              <Route path="/accessories" element={<AccessoriesShop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Main>
      <Footer />
    </>
  );
}

export default App; 