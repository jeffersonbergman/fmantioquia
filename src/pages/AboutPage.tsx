import { useTranslation } from 'react-i18next';
import { Music, BookOpen, Users, Mic2, GraduationCap } from 'lucide-react';
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
      name: 'Maestro António Silva',
      role: 'Principal Conductor',
      image: 'https://images.pexels.com/photos/7594067/pexels-photo-7594067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Internationally acclaimed conductor with over 25 years of experience leading major orchestras.'
    },
    {
      name: 'Dr. Maria Santos',
      role: 'Strings Program Director',
      image: 'https://images.pexels.com/photos/7594344/pexels-photo-7594344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Renowned violinist and educator, former concertmaster of the London Symphony Orchestra.'
    },
    {
      name: 'Prof. João Oliveira',
      role: 'Woodwinds Specialist',
      image: 'https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Principal clarinetist and distinguished educator with extensive chamber music experience.'
    }
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

      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Festival Activities</h2>
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
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">Festival Faculty</h2>
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
      </section>
    </>
  );
};

export default AboutPage;