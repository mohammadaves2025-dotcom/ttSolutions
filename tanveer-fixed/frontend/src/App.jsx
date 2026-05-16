import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext.jsx';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import BuyProductsBanner from './components/BuyProductsBanner.jsx';
import EnquiryButton from './components/EnquiryButton.jsx';

// FIX: lazy-load all page-level components to reduce initial bundle size
const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Support = lazy(() => import('./pages/Support.jsx'));
const Products = lazy(() => import('./pages/Products.jsx'));
const ProductDetail = lazy(() => import('./pages/ProductDetail.jsx'));
const AppShredderDetail = lazy(() => import('./pages/AppShredderDetail.jsx'));
const LaminatorDetail = lazy(() => import('./pages/LaminatorDetail.jsx'));
const AntivaDetail = lazy(() => import('./pages/AntivaDetail.jsx'));
const AvantiDetail = lazy(() => import('./pages/AvantiDetail.jsx'));
const BrandSelection = lazy(() => import('./pages/BrandSelection.jsx'));
const ModelView = lazy(() => import('./pages/ModelView.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'));
const AdminLogin = lazy(() => import('./pages/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'));
const AdminEditProduct = lazy(() => import('./pages/AdminEditProduct.jsx'));
const AdminBlogList = lazy(() => import('./pages/AdminBlogList.jsx'));
const AdminEditBlog = lazy(() => import('./pages/AdminEditBlog.jsx'));
const AdminSettings = lazy(() => import('./pages/AdminSettings.jsx'));

import './App.css';

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ width: 32, height: 32, border: '3px solid var(--emerald-light)', borderTopColor: 'var(--emerald)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
  </div>
);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/admin" replace />;
};

const NotFound = () => (
  <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }}>
    <div style={{ fontFamily: 'var(--font-display)', fontSize: 80, fontWeight: 700, color: 'var(--emerald-light)', lineHeight: 1 }}>404</div>
    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--ink)' }}>Page Not Found</h1>
    <p style={{ color: 'var(--gray-mid)', maxWidth: 400, textAlign: 'center' }}>The page you are looking for does not exist or has been moved.</p>
    <a href="/" className="btn" style={{ marginTop: 8 }}>Go Home</a>
  </div>
);

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<About />} />
                <Route path="/contactus" element={<Contact />} />
                <Route path="/support" element={<Support />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/document-shredders" element={<ProductDetail />} />
                <Route path="/product/app-shredders" element={<AppShredderDetail />} />
                <Route path="/product/laminators" element={<LaminatorDetail />} />
                <Route path="/brand/antiva/:category" element={<AntivaDetail />} />
                <Route path="/brand/avanti/:category" element={<AvantiDetail />} />
                <Route path="/select-brand/:category" element={<BrandSelection />} />
                <Route path="/model/:modelId" element={<ModelView />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
                <Route path="/admin/product/new" element={<ProtectedRoute><AdminEditProduct /></ProtectedRoute>} />
                <Route path="/admin/edit/:modelId" element={<ProtectedRoute><AdminEditProduct /></ProtectedRoute>} />
                <Route path="/admin/blog" element={<ProtectedRoute><AdminBlogList /></ProtectedRoute>} />
                <Route path="/admin/blog/new" element={<ProtectedRoute><AdminEditBlog /></ProtectedRoute>} />
                <Route path="/admin/blog/edit/:id" element={<ProtectedRoute><AdminEditBlog /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <BuyProductsBanner />
          <Footer />
          <EnquiryButton />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
