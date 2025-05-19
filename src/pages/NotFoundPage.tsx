import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button variant="primary" icon={<Home size={18} />}>
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;