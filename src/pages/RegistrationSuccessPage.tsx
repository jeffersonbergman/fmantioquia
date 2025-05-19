import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '../components/UI/Button';

const RegistrationSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-32">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full text-white mb-6">
          <Check size={32} />
        </div>
        <h1 className="text-3xl font-bold mb-4">Registration Complete!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for registering for Festival Antioquia 2025. We've sent a confirmation email with your registration details.
        </p>
        <div className="space-y-4">
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate('/program')}
          >
            View Festival Program
          </Button>
          <Button
            variant="outline"
            fullWidth
            onClick={() => navigate('/')}
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessPage;