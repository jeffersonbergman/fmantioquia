import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Check, AlertCircle, Upload } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { createCheckoutSession } from '../lib/stripe';
import { products } from '../stripe-config';
import SectionTitle from '../components/UI/SectionTitle';
import Button from '../components/UI/Button';

const RegistrationPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [instrumentLimitError, setInstrumentLimitError] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const registrationFee = {
    amount: 30,
    currency: '€',
    description: 'Full Festival Pass including all masterclasses, workshops, and performances',
  };

  const instruments = [
    'Violin', 'Viola', 'Cello', 'Double Bass', 'Flute',
    'Oboe', 'Clarinet', 'Bassoon', 'French Horn', 'Trumpet',
    'Trombone', 'Tuba', 'Percussion', 'Harp',
  ];

  const totalSlots = 40;
  const baseLimit = Math.floor(totalSlots / instruments.length);
  const remainder = totalSlots % instruments.length;

  const instrumentLimits = instruments.reduce((acc, inst, idx) => {
    acc[inst] = baseLimit + (idx < remainder ? 1 : 0);
    return acc;
  }, {});

  const [instrumentCounts, setInstrumentCounts] = useState(
    instruments.reduce((acc, inst) => {
      acc[inst] = 0;
      return acc;
    }, {})
  );

  useEffect(() => {
    // Simulação ou fetch real dos registros por instrumento
    // fetch('/api/registrations/counts')
    //   .then(res => res.json())
    //   .then(data => setInstrumentCounts(data));
  }, []);

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().required('Phone number is required').matches(/^[0-9+\s()-]{8,20}$/, 'Invalid phone number format'),
    instrument: Yup.string().required('Please select your instrument'),
    experience: Yup.string().required('Please describe your orchestral experience'),
    videoFile: Yup.mixed().required('Please upload your audition video'),
    specialRequirements: Yup.string(),
    agreeTerms: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
    agreePrivacy: Yup.boolean().oneOf([true], 'You must agree to the privacy policy'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '',
      instrument: '',
      experience: '',
      videoFile: null,
      specialRequirements: '',
      agreeTerms: false,
      agreePrivacy: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setInstrumentLimitError('');

      const selectedInstrument = values.instrument;
      const currentCount = instrumentCounts[selectedInstrument] || 0;
      const maxAllowed = instrumentLimits[selectedInstrument];

      if (currentCount >= maxAllowed) {
        setInstrumentLimitError(`Sorry, we have reached the limit for ${selectedInstrument}. Please select another instrument or contact us.`);
        return;
      }

      try {
        if (!user) {
          navigate('/login', { state: { from: '/registration' } });
          return;
        }

        const successUrl = `${window.location.origin}/registration/success`;
        const cancelUrl = `${window.location.origin}/registration`;

        const checkoutUrl = await createCheckoutSession(
          products.festival.priceId,
          products.festival.mode,
          user.token,
          successUrl,
          cancelUrl
        );

        window.location.href = checkoutUrl;
      } catch (error) {
        console.error('Error creating checkout session:', error);
      }
    },
  });

  return (
    <>
      <section className="pt-32 pb-16 bg-secondary text-white">
        <div className="container">
          <SectionTitle
            title="Registration"
            subtitle="Join us for a week of orchestral excellence"
            centered={true}
            light={true}
          />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <div 
                className="bg-success/10 border border-success rounded-lg p-8 text-center mb-10"
                data-aos="fade-up"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full text-white mb-6">
                  <Check size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
                <p className="text-gray-700 mb-6">
                  Thank you for registering for Festival Antioquia 2025. We've sent a confirmation email with payment instructions to your email address.
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setIsSubmitted(false);
                    formik.resetForm();
                  }}
                >
                  Register Another Participant
                </Button>
              </div>
            ) : (
              <>
                <div 
                  className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm"
                  data-aos="fade-up"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-primary">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Registration Information</h3>
                      <p className="text-gray-700 mb-4">
                        Please prepare a 30-second video performing a piece that demonstrates your technical ability and musicality. 
                        The video will be reviewed by our artistic committee as part of the selection process.
                      </p>
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Registration Fee: {registrationFee.currency}{registrationFee.amount}</h4>
                        <p className="text-gray-600 text-sm">{registrationFee.description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <h3 className="text-2xl font-display font-bold mb-6">Registration Form</h3>
                  <form onSubmit={formik.handleSubmit}>
                    {/* Personal Information */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Personal Information</h4>
                      
                      <div className="mb-4">
                        <label htmlFor="fullName" className="form-label">
                          Full Name <span className="text-error">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          className={`form-input ${formik.touched.fullName && formik.errors.fullName ? 'border-error' : ''}`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.fullName}
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                          <p className="mt-1.5 text-sm text-error">{formik.errors.fullName}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="email" className="form-label">
                            Email Address <span className="text-error">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            className={`form-input ${formik.touched.email && formik.errors.email ? 'border-error' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                          />
                          {formik.touched.email && formik.errors.email && (
                            <p className="mt-1.5 text-sm text-error">{formik.errors.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="form-label">
                            Phone Number <span className="text-error">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className={`form-input ${formik.touched.phone && formik.errors.phone ? 'border-error' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                          />
                          {formik.touched.phone && formik.errors.phone && (
                            <p className="mt-1.5 text-sm text-error">{formik.errors.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Musical Background */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Musical Background</h4>
                      
                      <div className="mb-4">
                        <label htmlFor="instrument" className="form-label">
                          Primary Instrument <span className="text-error">*</span>
                        </label>
                        <select
                          id="instrument"
                          name="instrument"
                          className={`form-input ${formik.touched.instrument && formik.errors.instrument ? 'border-error' : ''}`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.instrument}
                        >
                          <option value="">Select your instrument</option>
                          {instruments.map((instrument) => (
                            <option key={instrument} value={instrument}>{instrument}</option>
                          ))}
                        </select>
                        {formik.touched.instrument && formik.errors.instrument && (
                          <p className="mt-1.5 text-sm text-error">{formik.errors.instrument}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="experience" className="form-label">
                          Orchestral Experience <span className="text-error">*</span>
                        </label>
                        <textarea
                          id="experience"
                          name="experience"
                          rows={4}
                          className={`form-input ${formik.touched.experience && formik.errors.experience ? 'border-error' : ''}`}
                          placeholder="Please describe your orchestral experience, including ensembles you've played with and relevant achievements"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.experience}
                        />
                        {formik.touched.experience && formik.errors.experience && (
                          <p className="mt-1.5 text-sm text-error">{formik.errors.experience}</p>
                        )}
                      </div>
                    </div>

                    {/* Video Submission */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Video Submission</h4>
                      
                      <div className="mb-4">
                        <label htmlFor="videoFile" className="form-label">
                          Audition Video (30 seconds) <span className="text-error">*</span>
                        </label>
                        <div className={`border-2 border-dashed rounded-lg p-6 text-center ${formik.touched.videoFile && formik.errors.videoFile ? 'border-error' : 'border-gray-300'}`}>
                          <input
                            id="videoFile"
                            name="videoFile"
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(event) => {
                              formik.setFieldValue('videoFile', event.currentTarget.files?.[0]);
                            }}
                          />
                          <label htmlFor="videoFile" className="cursor-pointer">
                            <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              Click to upload or drag and drop your video file here
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Maximum file size: 100MB. Supported formats: MP4, MOV
                            </p>
                          </label>
                        </div>
                        {formik.touched.videoFile && formik.errors.videoFile && (
                          <p className="mt-1.5 text-sm text-error">{formik.errors.videoFile}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Additional Information</h4>
                      
                      <div className="mb-4">
                        <label htmlFor="specialRequirements" className="form-label">
                          Special Requirements or Accessibility Needs
                        </label>
                        <textarea
                          id="specialRequirements"
                          name="specialRequirements"
                          rows={4}
                          className="form-input"
                          placeholder="Please let us know if you have any special requirements or accessibility needs"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.specialRequirements}
                        />
                      </div>
                    </div>
                    
                    {/* Terms and Privacy */}
                    <div className="mb-8">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="agreeTerms"
                            name="agreeTerms"
                            checked={formik.values.agreeTerms}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 mr-3"
                          />
                          <div>
                            <label htmlFor="agreeTerms" className="form-label cursor-pointer">
                              I agree to the Terms and Conditions <span className="text-error">*</span>
                            </label>
                            {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                              <p className="mt-1.5 text-sm text-error">{formik.errors.agreeTerms}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            id="agreePrivacy"
                            name="agreePrivacy"
                            checked={formik.values.agreePrivacy}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="mt-1 mr-3"
                          />
                          <div>
                            <label htmlFor="agreePrivacy" className="form-label cursor-pointer">
                              I agree to the Privacy Policy <span className="text-error">*</span>
                            </label>
                            <p className="text-gray-600 text-sm">
                              <button
                                type="button"
                                className="text-primary hover:underline"
                                onClick={() => setShowPrivacyPolicy(true)}
                              >
                                View Privacy Policy
                              </button>
                            </p>
                            {formik.touched.agreePrivacy && formik.errors.agreePrivacy && (
                              <p className="mt-1.5 text-sm text-error">{formik.errors.agreePrivacy}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="mt-8">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        isLoading={formik.isSubmitting}
                        disabled={formik.isSubmitting}
                      >
                        Complete Registration ({registrationFee.currency}{registrationFee.amount})
                      </Button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
              <div className="prose prose-sm">
                <h3>1. Data Collection</h3>
                <p>We collect personal information including:</p>
                <ul>
                  <li>Name and contact information</li>
                  <li>Musical background and experience</li>
                  <li>Video submissions</li>
                  <li>Payment information</li>
                </ul>

                <h3>2. Use of Information</h3>
                <p>Your information is used for:</p>
                <ul>
                  <li>Processing your registration</li>
                  <li>Evaluating your application</li>
                  <li>Communication about the festival</li>
                  <li>Administrative purposes</li>
                </ul>

                <h3>3. Data Protection</h3>
                <p>We implement appropriate security measures to protect your personal information and ensure compliance with GDPR regulations.</p>

                <h3>4. Video Submissions</h3>
                <p>Your video submission will only be used for evaluation purposes and will not be shared publicly without your explicit consent.</p>

                <h3>5. Your Rights</h3>
                <p>You have the right to:</p>
                <ul>
                  <li>Access your personal data</li>
                  <li>Request corrections or deletion</li>
                  <li>Withdraw consent</li>
                  <li>File a complaint with supervisory authorities</li>
                </ul>
              </div>
              <div className="mt-6 text-right">
                <Button
                  variant="primary"
                  onClick={() => setShowPrivacyPolicy(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationPage;