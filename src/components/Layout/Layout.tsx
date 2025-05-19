import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../UI/ScrollToTop';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header isScrolled={isScrolled} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;