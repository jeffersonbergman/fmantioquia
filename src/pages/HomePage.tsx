import { ChevronRight, Music, Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import SectionTitle from '../components/UI/SectionTitle';

const HomePage = () => {
  // Festival dates
  const festivalStart = new Date(2025, 7, 13); // Agosto 13, 2025
  const festivalEnd = new Date(2025, 7, 16); // Agosto 16, 2025

  // Format dates for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Featured artists data
  const featuredArtists = [
    {
      id: 1,
      name: 'Ensaios',
      role: 'Ensaios de nipe conduzidos por orientadores',
      image: '/assets/img/ensaios.jpg',
    },
    {
      id: 2,
      name: 'Palestras',
      role: 'Momentos de reflexão e aprendizado com convidados',
      image: '/assets/img/palestra.jpg',
    },
    {
      id: 3,
      name: 'Comunhão',
      role: 'Convívio, refeições partilhadas e tempo juntos, fortalecendo uns aos outros',
      image: '/assets/img/Comunhao.jpg',
    },
  ];

  // Upcoming events data
  const upcomingEvents = [
    {
      id: 1,
      title: 'Abertura do Evento',
      date: 'Agosto 13, 2025',
      time: '21:00',
      location: 'Salão Principal',
      description: 'Introdução ao festival, divisão dos grupos, programação e breve meditação para dar início à jornada.',
    },
    {
      id: 2,
      title: 'Mesa Redonda',
      date: 'Agosto 15, 2025',
      time: '20:00 - 22:00',
      location: 'Salão Principal',
      description: 'Mesa redonda com perguntas e respostas com os palestrantes. Aberto ao público com reserva antecipada (lotação limitada).',
    },
    {
      id: 3,
      title: 'Concerto Final',
      date: 'Agosto 16, 2025',
      time: '16:00 - 17:30',
      location: 'Salão Principal',
      description: 'Dará encerramento ao festival. Aberto ao público com reserva antecipada (lotação limitada).',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden overflow-x-hidden">

        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/img/orchestra.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-secondary-800/70"></div>
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 text-center px-4">
          <div className="max-w-3xl mx-auto">
            <div 
              className="inline-block mb-4 bg-primary/90 px-4 py-1 rounded-full text-sm font-medium"
              data-aos="fade-down"
            >
              {formatDate(festivalStart)} - {formatDate(festivalEnd)}
            </div>
            <h1 
              className="
                font-display font-black uppercase
                bg-gradient-to-b from-white/90 to-white/0 
                bg-clip-text text-transparent 
                text-[2rem] leading-tight tracking-wide
                sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[6.5rem] 
                text-center break-words
              "
            >
              Festival de Música Antioquia
            </h1>
            <p className="text-lg md:text-xl mb-2 text-gray-400">
              ADORAÇÃO E SERVIÇO
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-400">
              IGREJA BAPTISTA ANTIOQUIA • PORTO
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Link to="/registration">
                <Button size="lg" variant="primary" icon={<ChevronRight size={18} />} iconPosition="right">
                  Inscreva-se!
                </Button>
              </Link>
              <Link to="/program">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                  Programação
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      {/* About Festival Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <SectionTitle
                title="Conhece o Festival de Música Antioquia"
                subtitle={`"Cantai-Lhe um cântico novo; tocai bem e com júbilo."\nSalmos 33:3`}
                centered={false}
              />
              <p className="mb-6 text-gray-700" data-aos="fade-up" data-aos-delay="100">
                De 13 a 16 de Agosto, a Igreja Baptista Antioquia vai transformar-se num espaço de ensaios, aprendizagem, partilha e louvor - tudo com arranjos para música orquestral de músicas cantadas no meio cristão.
              </p>
              <p className="mb-6 text-gray-700" data-aos="fade-up" data-aos-delay="150">
                Haverá a oportunidade de refletir a forma como entendemos o tempo de adoração congregacional, 
                assim como entender a música erudita como uma parte da expressão genuína de louvor a Deus.Durante o Festival de Música, 
                os participantes terão acesso a diversas atividades com outros músicos cristãos, que combinam maturidade espiritual com excelência técnica. 
                Esses momentos proporcionarão aprendizagem, inspiração e conexão com outros músicos que partilham da mesma fé.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8" data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Music className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Música e Adoração</h4>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Users className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Convívio e Conexão</h4>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Ambiente de Serviço</h4>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Calendar className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">4 Dias de Evento</h4>
                  </div>
                </div>
                
              </div>
              <Link to="/program" data-aos="fade-up" data-aos-delay="250">
                <Button variant="primary">
                  Explore o programa completo
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2" data-aos="fade-left">
              <div className="relative">
                <img 
                  src="/assets/img/ibaaw.jpg"
                  alt="Festival performance"
                  className="rounded-lg shadow-xl w-full h-auto"
                />
                {/* <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-sm font-medium text-gray-500">Since</p>
                  <p className="text-3xl font-display font-bold text-primary">2025</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <SectionTitle
            title="Como Funciona o Evento"
            centered={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtists.map((artist, index) => (
              <div 
                key={artist.id} 
                className="card card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{artist.name}</h3>
                  <p className="text-gray-600 mb-4">{artist.role}</p>
                  <Link to="/about" className="text-primary font-medium hover:text-primary-700 inline-flex items-center">
                    Saiba mais
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="text-center mt-10" data-aos="fade-up">
            <Link to="/artists">
              <Button variant="outline">
                View All Artists
              </Button>
            </Link>
          </div> */}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="section bg-secondary-900 text-white">
        <div className="container">
          <SectionTitle
            title="Detalhes do Festival"
            subtitle="Reserva estes eventos na tua agenda para não perderes as principais atividades."
            centered={true}
            light={true}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div 
                key={event.id} 
                className="bg-secondary-800 rounded-lg p-6 hover:bg-secondary-700 transition-colors duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-accent/20 text-accent rounded-lg px-3 py-1 inline-block text-sm font-medium mb-4">
                  {event.date} · {event.time}
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-300 text-sm mb-3 flex items-center">
                  <MapPin size={16} className="mr-1" /> {event.location}
                </p>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <Link to="/program" className="text-accent hover:text-accent-300 font-medium inline-flex items-center">
                  Saiba mais
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-10" data-aos="fade-up">
            <Link to="/program">
              <Button variant="outline" className="border-white text-white hover:bg-secondary hover:text-secondary">
                Veja toda a programação
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-600 text-white">
        <div className="container text-center">
          <h2 
            className="text-3xl md:text-4xl font-display font-bold mb-6"
            data-aos="fade-up"
          >
            Serve com o talento que Deus te deu — Inscreve-te!
          </h2>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >Garante a tua vaga no Festival de Música Antioquia 2025.
          <br />
          Inscrições limitadas por instrumento.
          <br />
          Dúvidas? Contacta-nos: festivalantioquia@gmail.com
          <br />
          As Inscrições estarão disponíveis até 5 de Julho 2025
        </p>
          <Link 
            to="/registration"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-primary hover:text-primary"
            >
              INSCRIÇÃO
            </Button>
          </Link>
        </div>
      </section>

      {/* Gallery Preview Section */}
      {/* <section className="section bg-white">
        <div className="container">
          <SectionTitle
            title="Galeria de Fotos"
            subtitle="Relembre os melhores momentos do Festival de Música Antioquia."
            centered={true}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="overflow-hidden rounded-lg" data-aos="fade-up">
              <img 
                src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Festival moment" 
                className="w-full h-60 object-cover transition-all duration-500 hover:scale-110"
              />
            </div>
            <div className="overflow-hidden rounded-lg" data-aos="fade-up" data-aos-delay="100">
              <img 
                src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Festival moment" 
                className="w-full h-60 object-cover transition-all duration-500 hover:scale-110"
              />
            </div>
            <div className="overflow-hidden rounded-lg" data-aos="fade-up" data-aos-delay="200">
              <img 
                src="https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Festival moment" 
                className="w-full h-60 object-cover transition-all duration-500 hover:scale-110"
              />
            </div>
            <div className="overflow-hidden rounded-lg" data-aos="fade-up" data-aos-delay="300">
              <img 
                src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Festival moment" 
                className="w-full h-60 object-cover transition-all duration-500 hover:scale-110"
              />
            </div>
          </div>
          <div className="text-center mt-10" data-aos="fade-up">
            <Link to="/gallery">
              <Button variant="primary">
                Veja toda a Galeria
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default HomePage;