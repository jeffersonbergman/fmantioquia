import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProgramPage from './pages/ProgramPage';
import AboutPage from './pages/AboutPage';
import VenuePage from './pages/VenuePage';
import RegistrationPage from './pages/RegistrationPage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';
import GalleryPage from './pages/GalleryPage';
import ScrollToTop from './pages/ScrollToTop';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './i18n';

function App() {
  useEffect(() => {
    AOS.init({  
      duration: 800,
      once: false,
    });
  }, []);

  return (
    <Router>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/venue" element={<VenuePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;