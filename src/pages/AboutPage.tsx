import { useTranslation } from 'react-i18next';
import { Music, BookOpen, Users, Mic2, GraduationCap } from 'lucide-react';
import { MapPin, Mail, Calendar, Clock } from 'lucide-react';
import SectionTitle from '../components/UI/SectionTitle';

const AboutPage = () => {
  const { t } = useTranslation();

  const activities = [
    {
      icon: <Music size={24} />,
      title: t('about.activities.masterclasses'),
      description: 'Learn from world-renowned musicians and conductors in intimate masterclass settings.'
    },
    {
      icon: <BookOpen size={24} />,
      title: t('about.activities.workshops'),
      description: 'Participate in specialized workshops focusing on technique, interpretation, and ensemble playing.'
    },
    {
      icon: <Users size={24} />,
      title: t('about.activities.rehearsals'),
      description: 'Join intensive orchestra rehearsals culminating in public performances.'
    },
    {
      icon: <Mic2 size={24} />,
      title: t('about.activities.performances'),
      description: 'Showcase your talent in concert halls and historic venues.'
    },
    {
      icon: <GraduationCap size={24} />,
      title: t('about.activities.lectures'),
      description: 'Attend educational lectures on music history, theory, and performance practice.'
    }
  ];

  const faculty = [
    {
      name: 'Timóteo Figueira',
      role: 'Professor e Percussionista',
      image: '/assets/img/timoteo.jpeg',
      bio: 'Professor de música e ministro de louvor, servindo com dedicação em sua igreja local.'
    },
    {
      name: 'António Neto',
      role: 'Multi-instrumentista',
      image: '/assets/img/antonio.jpg',
      bio: 'Serve há anos em grupos de louvor, contribuindo com sensibilidade musical e versatilidade instrumental.'
    },
    {
      name: 'Jefferson Cavalcanti',
      role: 'Trompista',
      image: '/assets/img/jefferson.jpg',
      bio: 'Músico com conhecimento em instrumentos de sopro a serviço em ministérios de louvor.'
    }
  ];

  // Practical information
  const practicalInfo = [
    {
      title: 'Geral',
      details: [
        'Cada participante deve trazer o seu próprio instrumento.',
        'Todo o material necessário estará disponível, partituras, estantes, equipamentos de som, etc...',
        'Teremos vendas de alguns equipamentos no local do evento',
        'As inscrições são limitadas por instrumento'
      ]
    },
    {
      title: 'Acessibilidade',
      details: [
        'Acessibilidade para cadeiras de rodas',
        'Casa de banho acessível em todos os locais',
        'Lugares reservados para visitantes com mobilidade reduzida.'
      ]
    },
    {
      title: 'Comida e Bebida',
      details: [
        'Toda alimentação incluida no valor da inscrição',
        'Momentos para lanche e café.',
        'Fontes de Água em todos os locais',
        'Não é permitido comer fora do local adequado.'
      ]
    },
    {
      title: 'Instalações',
      details: [
        'Kit primeiros socorros no local.',
        'Voluntários disponíveis em todo o momento do evento.',
        'Próximo de hospitais e centros de saúde',
        'Wi-Fi gratuito em todas as instalações'
      ]
    },
  ];

  return (
    <>
      <section className="pt-32 pb-16 bg-secondary text-white">
        <div className="container">
          <SectionTitle
            title={t('about.title')}
            subtitle={t('about.subtitle')}
            centered={true}
            light={true}
          />
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl font-display font-bold mb-6">{t('about.mission.title')}</h2>
            <p className="text-gray-700 text-lg mb-8">{t('about.mission.description')}</p>
          </div>
        </div>
      </section>

            {/* Practical Information */}
      <section className="py-16 bg-white">
        <div className="container">
          <SectionTitle
            title="Informações Práticas	"
            subtitle="Tudo o que precisas saber para aproveitar ao máximo a tua experiência no festival"
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {practicalInfo.map((info, index) => (
              <div 
                key={info.title}
                className="bg-gray-50 rounded-lg p-6"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  {info.title === 'Geral' && <MapPin size={18} className="mr-2 text-primary" />}
                  {info.title === 'Acessibilidade' && <Calendar size={18} className="mr-2 text-primary" />}
                  {info.title === 'Comida e bebida' && <Clock size={18} className="mr-2 text-primary" />}
                  {info.title === 'Instalações' && <Mail size={18} className="mr-2 text-primary" />}
                  {info.title}
                </h3>
                <ul className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-700 flex items-start">
                      <span className="text-primary mr-2">•</span> 
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Facilitadores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-primary mb-4">{activity.icon}</div>
                <h3 className="text-xl font-bold mb-3">{activity.title}</h3>
                <p className="text-gray-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Organizadores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {faculty.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
};

export default AboutPage;