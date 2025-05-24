import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Music, Menu, X, Calendar, Users, MapPin, Image, ClipboardSignature, User2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'pt' : 'en');
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
  if (isMenuOpen) {
    const timeout = setTimeout(() => {
      setShowMenu(true);
    }, 50); // tempo suficiente para aplicar CSS
    return () => clearTimeout(timeout);
  } else {
    setShowMenu(false);
  }
}, [isMenuOpen]);

const { user, signOut } = useAuth();

const handleLogout = async () => {
  try {
    await signOut();
    // Se quiser, redirecione:
    // navigate('/login');
  } catch (err) {
    console.error('Erro ao fazer logout:', err);
  }
};

  const navLinks = [
    { name: t('navigation.program'), path: '/program', icon: <Calendar size={18} /> },
    { name: t('navigation.about'), path: '/about', icon: <Users size={18} /> },
    { name: t('navigation.venue'), path: '/venue', icon: <MapPin size={18} /> },
    // { name: t('navigation.registration'), path: '/registration', icon: <ClipboardSignature size={18} /> },
    // { name: t('navigation.gallery'), path: '/gallery', icon: <Image size={18} /> },
  ];

  return (
    <header
      className={clsx(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent md:bg-transparent bg-primary-500 py-5'
  )}
>
      <div className="w-full max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 z-20">
          <img
            src={isScrolled ? "/assets/img/logo-azul.png" : "/assets/img/logobranco.png"}
            alt="Festival Antioquia Logo"
            className="h-16 max-w-[150px] w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  clsx(
                    'nav-link flex items-center space-x-1 px-3 py-2 rounded-md transition-colors duration-300',
                    isActive ? 'nav-link-active' : '',
                    isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-accent'
                  )
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>
          {user && (
            <details className="relative group">
              <summary className="cursor-pointer list-none">
                <User2 className={isScrolled ? 'w-8 h-8 rounded-full border-2 border-primary text-secundary' : 'w-8 h-8 rounded-full border-2 border-secundary text-white'} size={24} />
              </summary>
              <ul className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md text-sm z-50">
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </details>
          )}

          {/* <button
            onClick={toggleLanguage}
            className={clsx(
              'px-3 py-1 rounded-md border transition-colors duration-300',
              isScrolled
                ? 'border-primary text-primary hover:bg-primary hover:text-white'
                : 'border-white text-white hover:bg-white hover:text-primary'
            )}
          >
            {i18n.language === 'en' ? 'PT' : 'EN'}
          </button> */}
        </div>

        <button
          className="md:hidden z-20 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className={isScrolled ? 'text-foreground' : 'text-white'} size={24} />
          ) : (
            <Menu className={isScrolled ? 'text-foreground' : 'text-white'} size={24} />
          )}
        </button>

        {isMenuOpen && showMenu &&(
          <div className="md:hidden fixed inset-0 bg-primary-500 w-full overflow-x-hidden flex flex-col items-center justify-center animate-fade-in">
            <nav className="flex flex-col items-center space-y-6 py-8">
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-white text-xl flex items-center space-x-2 hover:underline"
                >
                  <span>Logout</span>
                </button>
              )},
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    clsx(
                      'text-white text-xl flex items-center space-x-2',
                      isActive ? 'font-bold' : ''
                    )
                  }
                >
                  {link.icon}
                  <span>{link.name}</span>
                </NavLink>
              ))}
              {/* <button
                onClick={toggleLanguage}
                className="px-4 py-2 border border-white text-white rounded-md hover:bg-white hover:text-primary transition-colors duration-300"
              >
                {i18n.language === 'en' ? 'PT' : 'EN'}
              </button> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;