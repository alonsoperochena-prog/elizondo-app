import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import SubcategoryPage from './pages/SubcategoryPage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import OtherProductsPage from './pages/OtherProductsPage.jsx';
import MerchPage from './pages/MerchPage.jsx';
import GranosPage from './pages/GranosPage.jsx';
import CartButton from './components/CartButton.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { Toaster } from '@/components/ui/sonner';
import MyOrdersPage from './pages/MyOrdersPage.jsx';

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <ScrollToTop />
                    <CartButton />
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        
                        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                
                        
                        {/* New Menu Flow */}
                        <Route path="/menu/categories" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
                        <Route path="/menu/subcategories/:categoryId" element={<ProtectedRoute><SubcategoryPage /></ProtectedRoute>} />
                        <Route path="/menu/products/:subcategoryId" element={<ProtectedRoute><ProductListPage /></ProtectedRoute>} />
                        
                        <Route path="/cart" element={<ProtectedRoute><ShoppingCart /></ProtectedRoute>} />
                        <Route path="/mis-ordenes" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
                        <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                        <Route path="/otros-productos" element={<ProtectedRoute><OtherProductsPage /></ProtectedRoute>} />
                        <Route path="/merch" element={<ProtectedRoute><MerchPage /></ProtectedRoute>} />
                        <Route path="/granos" element={<ProtectedRoute><GranosPage /></ProtectedRoute>} />
                    </Routes>
                    <Toaster position="bottom-right" />
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;