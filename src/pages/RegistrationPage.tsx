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
import { supabase } from '../lib/supabaseClient';

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

const [instrumentsData, setInstrumentsData] = useState([]);

const [instrumentLimits, setInstrumentLimits] = useState({});
const [instrumentCounts, setInstrumentCounts] = useState({});
const [calculatedLimits, setCalculatedLimits] = useState({});

useEffect(() => {
  const fetchInstruments = async () => {
    const { data, error } = await supabase
      .from('instruments')
      .select('name, limit, count')
      .order('name');

    if (error) {
      console.error('Error fetching instruments:', error);
    } else {
      setInstrumentsData(data);

      const counts = {};
      const limits = {};
      data.forEach(item => {
        counts[item.name] = item.count;
        limits[item.name] = item.limit;
      });

      setInstrumentCounts(counts);
      setInstrumentLimits(limits);
    }
  };

  fetchInstruments();
}, []);

useEffect(() => {
  if (instrumentsData.length > 0) {
    const totalSlots = 40;
    const baseLimit = Math.floor(totalSlots / instrumentsData.length);
    const remainder = totalSlots % instrumentsData.length;

    const distributedLimits = {};
    instrumentsData.forEach((item, index) => {
      distributedLimits[item.name] = baseLimit + (index < remainder ? 1 : 0);
    });

    setCalculatedLimits(distributedLimits);
    console.log('Distribuição de vagas:', distributedLimits);
  }
}, [instrumentsData]);

  const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required').min(2, 'Name must be at least 2 characters'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required').matches(/^[0-9+\s()-]{8,20}$/, 'Invalid phone number format'),
  instrument: Yup.string().required('Please select your instrument'),
  secondInstrument: Yup.string().test(
    'not-same-as-instrument',
    'Primary and secondary instruments cannot be the same',
    function (value) {
      const { instrument } = this.parent;
      return !value || value !== instrument;
    }
  ),
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
  secondInstrument: '',
  experience: '',
  videoFile: null,
  specialRequirements: '',
  agreeTerms: false,
  agreePrivacy: false,
},
    validationSchema,
    onSubmit: async (values) => {
  setInstrumentLimitError('');
  const selected = values.instrument;
  const second = values.secondInstrument;
  const currentCount = instrumentCounts[selected] || 0;
  const maxAllowed = instrumentLimits[selected];

  if (currentCount >= maxAllowed) {
    if (!second || instrumentCounts[second] >= instrumentLimits[second]) {
      setInstrumentLimitError(`Desculpe, atingimos o limite para o instrumento ${selected}${second ? ` e ${second}` : ''}. Por favor entre em contacto conosco.`);
      return;
    }
  }

  try {
    // Aqui você salva os dados no Supabase
    const { data, error } = await supabase.from('registrations').insert([
      {
        full_name: values.fullName,
        email: values.email,
        phone: values.phone,
        instrument: selected,
        second_instrument: second,
        experience: values.experience,
        special_requirements: values.specialRequirements,
        // opcional: pode incluir o nome do arquivo de vídeo
      },
    ]);

    if (error) {
      console.error('Erro ao salvar registro:', error);
      alert('Erro ao enviar sua inscrição. Tente novamente mais tarde.');
      return;
    }

    // Exibe modal com instruções de pagamento
    setShowPaymentModal(true);
  } catch (error) {
    console.error('Erro ao enviar formulário:', error);
    alert('Erro inesperado. Tente novamente mais tarde.');
  }
}
});

const [showPaymentModal, setShowPaymentModal] = useState(false);
{showPaymentModal && (
  <div className="modal">
    <h2>Instruções de Pagamento</h2>
    <p>Para confirmar tua vaga, realize o pagamento de €30 por transferencia, não esqueças de Identificar o nome do inscrito no pagamento.</p>
    <p><strong>IBAN:</strong> PT50 </p>
    <p>Após efetuar a transferência, envie o comprovante de pagamento com o nome do inscrito para o email: festivalantioquia@gmail.com</p>
    <button onClick={() => setShowPaymentModal(false)}>Fechar</button>
  </div>
)}
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
                      <h3 className="text-lg font-semibold mb-2">Informação sobre a inscrição</h3>
                      <p className="text-gray-700 mb-4">
                        Grave um vídeo de 30 segundos tocando seu instrumento para que possamos conhecer melhor sua habilidade musical.
                        Este não é um processo eliminatório, mas sim uma oportunidade para entendermos seu nível, integrá-lo da melhor forma possível e definir as posições na orquestra.
                        O valor da inscrição cobre os custos de alimentação durante todo o evento.
                      </p>
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Valor da Inscrição: {registrationFee.currency}{registrationFee.amount}</h4>
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
                  <h3 className="text-2xl font-display font-bold mb-6">Inscrição</h3>
                  <form onSubmit={formik.handleSubmit}>
                    {/* Personal Information */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Informação Pessoal</h4>
                      
                      <div className="mb-4">
                        <label htmlFor="fullName" className="form-label">
                          Nome Completo <span className="text-error">*</span>
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
                            Email <span className="text-error">*</span>
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
                            Telemóvel <span className="text-error">*</span>
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
                      <h4 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Tua Experiência Musical</h4>

                      {/* Primary Instrument */}
                      <div className="mb-4">
                        <label htmlFor="instrument" className="form-label">
                          Instrumento Primário <span className="text-error">*</span>
                        </label>
                        <select
                            id="instrument"
                            name="instrument"
                            className={`form-input ${formik.touched.instrument && formik.errors.instrument ? 'border-error' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.instrument}
                          >
                            <option value="">Selecione seu instrumento principal</option>
                            {instrumentsData.map((instrument) => {
                              const available = instrument.limit - instrument.count;
                              return (
                                <option
                                  key={instrument.name}
                                  value={instrument.name}
                                  disabled={available <= 0}
                                >
                                  {instrument.name} ({available} slots left)
                                </option>
                              );
                            })}
                          </select>
                        {formik.touched.instrument && formik.errors.instrument && (
                          <p className="mt-1.5 text-sm text-error">{formik.errors.instrument}</p>
                        )}
                      </div>

                      {/* Secondary Instrument (optional) */}
                      <div className="mb-4">
                        <label htmlFor="secondaryInstrument" className="form-label">
                          Instrumento Secundário (optional)
                        </label>
                        <select
                            id="secondInstrument"
                            name="secondInstrument"
                            className={`form-input ${formik.touched.secondInstrument && formik.errors.secondInstrument ? 'border-error' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.secondInstrument}
                          >
                            <option value="">Selecione seu instrumento secundário (opcional)</option>
                            {instrumentsData.map((instrument) => {
                              const available = instrument.limit - instrument.count;
                              return (
                                <option key={instrument.name} value={instrument.name} disabled={available <= 0}>
                                  {instrument.name} ({available} slots left)
                                </option>
                              );
                            })}
                          </select>
                        {formik.touched.secondaryInstrument && formik.errors.secondaryInstrument && (
                          <p className="mt-1.5 text-sm text-error">{formik.errors.secondaryInstrument}</p>
                        )}
                      </div>

                      {/* Orchestral Experience */}
                      <div className="mb-4">
                        <label htmlFor="experience" className="form-label">
                          Fala um pouco sobre tua experiência <span className="text-error">*</span>
                        </label>
                        <textarea
                          id="experience"
                          name="experience"
                          rows={4}
                          className={`form-input ${formik.touched.experience && formik.errors.experience ? 'border-error' : ''}`}
                          placeholder="Ex: Já tocou em alguma orquestra? Grupo de Louvor? Conta tuas experiências!"
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
                      <h4 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Upload do teu vídeo</h4>
                      
                      <div className="mb-4">
                        <label htmlFor="videoFile" className="form-label">
                          Vídeo de Apresentação (30 seconds) <span className="text-error">*</span>
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
                              Clique para carregar ou arraste e solte seu arquivo aqui
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Tamanho máximo do arquivo: 50 MB. Formatos suportados: MP4, MOV
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
                      <h4 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">Informações Adicionais</h4>
                      
                      <div className="mb-4">
                        <label htmlFor="specialRequirements" className="form-label">
                          Requisitos especiais ou necessidades de acessibilidade
                        </label>
                        <textarea
                          id="specialRequirements"
                          name="specialRequirements"
                          rows={4}
                          className="form-input"
                          placeholder="Por favor, informe-nos se você tiver alguma necessidade especial ou de acessibilidade"
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
                              Concordo com os Termos e Condições <span className="text-error">*</span>
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
                            Concordo com a Política de Privacidade <span className="text-error">*</span>
                            </label>
                            <p className="text-gray-600 text-sm">
                              <button
                                type="button"
                                className="text-primary hover:underline"
                                onClick={() => setShowPrivacyPolicy(true)}
                              >
                                Ver Política de Privacidade
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
                        Finalize sua Inscrição ({registrationFee.currency}{registrationFee.amount})
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
              <h2 className="text-2xl font-bold mb-4">Política de Privacidade</h2>
              <div className="prose prose-sm">
                <h3>1. Recolha de Dados</h3>
                <p>Recolhemos informações pessoais incluindo:</p>
                <ul>
                  <li>Nome e informações de contacto</li>
                  <li>Formação musical e experiência</li>
                  <li>Envio de vídeos</li>
                  <li>Informações de pagamento</li>
                </ul>

                <h3>2. Utilização da Informação</h3>
                <p>A tua informação é utilizada para:</p>
                <ul>
                  <li>Processar a tua inscrição</li>
                  <li>Avaliar a tua candidatura</li>
                  <li>Comunicação relativa ao festival</li>
                  <li>Fins administrativos</li>
                </ul>

                <h3>3. Proteção dos Dados</h3>
                <p>Implementamos medidas de segurança adequadas para proteger os teus dados pessoais e garantir o cumprimento do RGPD.</p>

                <h3>4. Envio de Vídeos</h3>
                <p>O vídeo que enviares será usado apenas para fins de avaliação e não será partilhado publicamente sem o teu consentimento explícito.</p>

                <h3>5. Os Teus Direitos</h3>
                <p>Tem o direito de:</p>
                <ul>
                  <li>Aceder aos teus dados pessoais</li>
                  <li>Solicitar correções ou eliminação</li>
                  <li>Retirar o consentimento</li>
                  <li>Apresentar uma reclamação às autoridades competentes</li>
                </ul>
              </div>
              <div className="mt-6 text-right">
                <Button
                  variant="primary"
                  onClick={() => setShowPrivacyPolicy(false)}
                >
                  Fechar
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