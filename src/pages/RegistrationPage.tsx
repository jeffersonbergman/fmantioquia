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
import { supabase2 } from '../lib/supabaseClient';
import { registerUser } from '../lib/registerUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';


const RegistrationPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [instrumentLimitError, setInstrumentLimitError] = useState('');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const serviceID = 'service_2b8im5d';
  const templateID1 = 'inscricao_obrigado';
  const templateID2 = 'inscricao_admin';
  const userID = 'XjH9qcmxyNSDtZpWu';
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({
  email: '',
  general: ''
});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const updateInstrumentCount = async (instrumentName) => {
    try {
      // Incrementa o count do instrumento
      const { data, error } = await supabase
        .from('instruments')
        .select('count')
        .eq('name', instrumentName)
        .single();

      if (error) {
        console.error('Erro ao buscar contagem do instrumento:', error);
        return;
      }

      const newCount = (data.count || 0) + 1;

      const { error: updateError } = await supabase
        .from('instruments')
        .update({ count: newCount })
        .eq('name', instrumentName);

      if (updateError) {
        console.error('Erro ao atualizar contagem do instrumento:', updateError);
      } else {
        // Atualiza o estado local para refletir a mudança (opcional)
        setInstrumentCounts(prev => ({
          ...prev,
          [instrumentName]: newCount,
        }));
      }
    } catch (err) {
      console.error('Erro na função updateInstrumentCount:', err);
    }
  };

  const checkInstrumentAvailability = async (instrumentName) => {
  const { data, error } = await supabase
    .from('instruments')
    .select('count, max_slots')
    .eq('name', instrumentName)
    .single();

  if (error) {
    console.error('Erro ao verificar instrumento:', error);
    return false;
  }

  return data.count < data.max_slots;
};

  const registrationFee = {
    amount: 30,
    currency: '€',
    description: 'O valor da inscrição cobre os custos de alimentação durante todo o evento.',
  };

const [instrumentsData, setInstrumentsData] = useState([]);

const [instrumentLimits, setInstrumentLimits] = useState({});
const [instrumentCounts, setInstrumentCounts] = useState({});
const [calculatedLimits, setCalculatedLimits] = useState({});

useEffect(() => {
  const fetchInstruments = async () => {
    const { data, error } = await supabase
      .from('instruments')
      .select('name, max_slots, count')
      .order('name');

    if (error) {
      console.error('Error fetching instruments:', error);
    } else {
      setInstrumentsData(data);

      const counts = {};
      const limits = {};
      data.forEach(item => {
        counts[item.name] = item.count;
        limits[item.name] = item.max_slots;
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
    videoFile: Yup.mixed().required('Please upload your audition video'), // mantém validação, mas não envia
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
  setUploadStatus('progress');
  setIsProcessing(true);

  try {
    // 1. Registrar usuário primeiro (no projeto original)
    await registerUser(values);

    // 2. Enviar o vídeo para o NOVO PROJETO (SUPABASE 2)
    if (values.videoFile) {
      setIsUploading(true);
      setUploadProgress(0);

      // Gera um nome único para o arquivo (ex: email + timestamp)
      const fileExt = values.videoFile.name.split('.').pop();
      const fileName = `${values.email.replace(/[@.]/g, '_')}_${Date.now()}.${fileExt}`;

      // Faz o upload para o bucket 'videos' do segundo projeto
      const { data: uploadData, error: uploadError } = await supabase2.storage
        .from('videos') // Nome do bucket no segundo projeto
        .upload(`audicoes/${fileName}`, values.videoFile, {
          cacheControl: '3600',
          contentType: values.videoFile.type,
          upsert: false,
        });

      if (uploadError) throw new Error(`Falha no upload do vídeo: ${uploadError.message}`);

      console.log('Vídeo enviado com sucesso:', uploadData.path);
      setUploadProgress(100);
    }

    // 3. Atualizar contadores de instrumentos (no projeto original)
    const { error: primaryError } = await supabase.rpc('increment_instrument_count', {
      instrument_name: values.instrument,
    });
    if (primaryError) throw primaryError;

    if (values.secondInstrument) {
      const { error: secondaryError } = await supabase.rpc('increment_instrument_count', {
        instrument_name: values.secondInstrument,
      });
      if (secondaryError) throw secondaryError;
    }

    // Sucesso!
    setUploadStatus('success');
    toast.success(t('Inscrição realizada com sucesso!'), {
      position: 'bottom-right',
      autoClose: 5000,
    });
    setTimeout(() => setShowPaymentModal(true), 1000);

    await emailjs.send(serviceID, templateID1, {
  to_name: values.fullName,
  to_email: values.email,
}, userID);

await emailjs.send(serviceID, templateID2, {
  from_name: values.fullName,
  from_email: values.email,
  telefone: values.phone,
  experiencia: values.experience,
  instrumento: values.instrument,
}, userID);

setUploadStatus('success');
toast.success(t('Inscrição realizada com sucesso!'), {
  position: 'bottom-right',
  autoClose: 5000,
});
setTimeout(() => setShowPaymentModal(true), 1000);

  } catch (error) {
    console.error('Erro no processo:', error);
    setUploadStatus('error');

    // Tratamento de erros específicos
    let errorMessage = t('registration.errors.general');
    if (error.message.includes('duplicate key value')) {
      errorMessage = t('Email já está cadastrado');
      setFormErrors({ email: errorMessage, general: '' });
    } else {
      setFormErrors({ email: '', general: error.message || errorMessage });
    }

    toast.error(errorMessage, {
      position: 'bottom-right',
      autoClose: 5000,
    });
  } finally {
    setIsProcessing(false);
    setIsUploading(false);
  }
},
  });
  
  const secondInstrumentOptions = instrumentsData.filter(item => {
  const currentCount = instrumentCounts[item.name] || 0;
  const maxLimit = calculatedLimits[item.name] || 0;
  return currentCount < maxLimit;
});

  return (
    <>
      <section className="pt-32 pb-16 bg-secondary text-white">
        <div className="container">
          <SectionTitle
            title="Inscrição"
            subtitle={`"Vinde, cantemos ao Senhor, com júbilo, celebremos o Rochedo da nossa salvação" \nSalmos 95: 1`}
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
                            const available = instrument.max_slots - instrument.count;
                            const isAvailable = available > 0;
                            
                            return (
                              <option
                                key={instrument.name}
                                value={instrument.name}
                                disabled={!isAvailable}
                              >
                                {instrument.name} {isAvailable 
                                  ? `(${available} vagas restantes)` 
                                  : '(Vagas esgotadas)'}
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
                            {secondInstrumentOptions.map(instr => (
                              <option key={instr.name} value={instr.name}>
                                {instr.name}
                              </option>
                            ))}
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
                          {isUploading ? (
                            <div className="border-2 border-gray-300 rounded-xl p-6 shadow-sm bg-white">
                              <div className="flex items-center gap-4 mb-3">
                                <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                  <div
                                    className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-700 w-12 text-right">{uploadProgress}%</span>
                              </div>

                              {uploadStatus === 'progress' && (
                                <p className="text-sm text-gray-600 text-center mt-2 animate-pulse">
                                  ⏳ Enviando seu vídeo... não feche esta página.
                                </p>
                              )}

                              {uploadStatus === 'success' && (
                                <div className="flex items-center justify-center gap-2 text-green-600 font-medium mt-2">
                                  <Check size={18} />
                                  <span>✅ Vídeo enviado com sucesso!</span>
                                </div>
                              )}

                              {uploadStatus === 'error' && (
                                <div className="flex items-center justify-center gap-2 text-red-600 font-medium mt-2">
                                  <AlertCircle size={18} />
                                  <span>❌ Erro no envio. Tente novamente.</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors duration-300 ${formik.touched.videoFile && formik.errors.videoFile ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}>
                              <input
                                id="videoFile"
                                name="videoFile"
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(event) => {
                                  formik.setFieldValue('videoFile', event.currentTarget.files?.[0]);
                                }}
                                disabled={isUploading}
                              />
                              <label htmlFor="videoFile" className="cursor-pointer flex flex-col items-center">
                                <Upload size={28} className="text-gray-400 mb-2" />
                                <p className="text-sm text-gray-700 font-medium">Clique ou arraste para carregar seu vídeo</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Tamanho máximo: 50MB | Formatos: MP4, MOV
                                </p>
                              </label>
                            </div>
                          )}

                          {/* Erro de validação */}
                          {formik.touched.videoFile && formik.errors.videoFile && (
                            <p className="mt-1.5 text-sm text-red-600">{formik.errors.videoFile}</p>
                          )}
                        
                        {/* Mostrar pré-visualização do nome do arquivo quando selecionado */}
                        {formik.values.videoFile && !isUploading && (
                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                            <Check className="text-success" size={16} />
                            <span>Arquivo selecionado: {formik.values.videoFile.name}</span>
                          </div>
                        )}
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
                        isLoading={isProcessing} // Usa o novo estado
                        disabled={isProcessing}
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

      {showPaymentModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Instruções de Pagamento</h2>
              <p>Para confirmar tua vaga, realize o pagamento de €30 por transferência, não esqueças de identificar o nome do inscrito no pagamento.</p>
              <p><strong>IBAN:</strong> PT50 0010 0000 1321 4360 0016 5 </p>
              <p>Após efetuar a transferência, envie o comprovante de pagamento com o nome do inscrito para o email: festivalantioquia@gmail.com</p>
              <div className="mt-6 text-right">
                <Button
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  onClick={() => {
                    setShowPaymentModal(false);
                    window.location.reload(); // recarrega a página ao fechar
                  }}
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        )}

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
      <ToastContainer />
    </>
  );
};

export default RegistrationPage;