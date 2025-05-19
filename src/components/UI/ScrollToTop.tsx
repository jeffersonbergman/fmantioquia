import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import clsx from 'clsx';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={clsx(
        'fixed bottom-6 right-6 p-3 bg-primary rounded-full text-white shadow-lg z-40 transition-all duration-300 transform',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      )}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
};

export default ScrollToTop;