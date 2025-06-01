import { Link } from 'react-router-dom';
import { Music, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-900 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/assets/img/Logo-branco.png" 
                alt="Festival moment" 
                className="h-18 transition-all duration-300"></img>
            </div>
            <div className="flex space-x-4" style={{justifyContent: 'center'}}>
              <a href="https://www.facebook.com/profile.php?id=61574532133047" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors duration-300" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/festivalmusicaantioquia" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors duration-300" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@ibaporto" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors duration-300" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-display font-bold mb-4">Links rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-accent transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/program" className="text-gray-300 hover:text-accent transition-colors duration-300">Programa</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-accent transition-colors duration-300">Sobre</Link>
              </li>
              <li>
                <Link to="/venue" className="text-gray-300 hover:text-accent transition-colors duration-300">Local</Link>
              </li>
              {/* <li>
                <Link to="/registration" className="text-gray-300 hover:text-accent transition-colors duration-300">Inscrição</Link>
              </li> */}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-display font-bold mb-4">Envie suas dúvidas</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-accent mt-1 shrink-0" />
                <span className="text-gray-300">Rua Godinho de Faria, <p></p>552
                4465-150 S. Mamede de Infesta</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-accent shrink-0" />
                <span className="text-gray-300">+351 912 292 244</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-accent shrink-0" />
                <a href="mailto:info@festivalantioquia.pt" className="text-gray-300 hover:text-accent transition-colors duration-300">
                  festivalantioquia@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h4 className="text-xl font-display font-bold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for updates on upcoming events and special announcements.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 bg-secondary-800 text-white border border-secondary-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button
                type="submit"
                className="btn bg-accent hover:bg-accent-600 text-secondary-900 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div> */}
        </div>

        <div className="border-t border-secondary-800 pt-8 text-center text-gray-400">
          <p>© {currentYear} Festival de Música Antioquia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;