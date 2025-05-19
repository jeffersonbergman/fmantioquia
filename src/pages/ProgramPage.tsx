import { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import SectionTitle from '../components/UI/SectionTitle';
import Button from '../components/UI/Button';

const ProgramPage = () => {
  const [activeDay, setActiveDay] = useState('day1');
  const [activeFilter, setActiveFilter] = useState('all');

  // Festival dates
  const festivalDays = [
    { id: 'day1', date: 'Agosto 13', day: 'Quarta-feira' },
    { id: 'day2', date: 'Agosto 14', day: 'Quinta-feira' },
    { id: 'day3', date: 'Agosto 15', day: 'Sexta-feira' },
    { id: 'day4', date: 'Agosto 16', day: 'Sábado' }
  ];

  // Event categories
  const eventCategories = [
    { id: 'all', name: 'Todos os eventos' },
    { id: 'public', name: 'Aberto ao Público' }
  ];

  // Program data structure - organized by days
  const programData = {
    day1: [
      {
        id: 1,
        title: 'Abertura do Festival de Música Antioquia',
        time: '20:30 - 22:00',
        location: 'Salão Principal',
        category: 'all',
        description: 'Abertura oficial do evento, com programação completa do evento, horários das atividades e apresentação dos professores e palestrantes.',
        highlight: true,
      }
    ],
    day2: [
      {
        id: 1,
        title: 'Welcome',
        time: '08:00 - 09:30',
        location: 'Entrada Principal',
        category: 'all',
        description: 'Estaremos prontos para receber-te e entregar o teu kit de participante, e junte-se a nós no pequeno almoço.',
      },
      {
        id: 2,
        title: 'Devocional matinal',
        time: '09:30 - 10:00',
        location: 'Salão Principal',
        category: 'all',
        description: 'Teremos todos os dias pela manhã o nosso devocional diário após o pequeno almoço, para começar bem o dia.',
      },
      {
        id: 4,
        title: 'Divisão de nipes',
        time: '10:00 - 11:30',
        location: 'Salas de instrumento',
        category: 'all',
        description: 'Os músicos serão direcionados as salas de instrumento para poderem ter o primeiro contacto com o seu professor, onde irá guiar os ensaios e tirar suas dúvidas.',
      },
      {
        id: 5,
        title: 'Palestra',
        time: '12:00 - 13:00',
        location: 'Salão principal',
        category: 'all',
        description: 'As palestras serão ministradas com os temas desta edição do Festival. Tomem nota para fazerem perguntas aos ministro.',
        highlight: true,
      },
      {
        id: 6,
        title: 'Convívio/Almoço',
        time: '13:00 - 15:00',
        location: 'EMU - Espaço Multi-uso',
        category: 'all',
        description: 'Teremos bons momentos juntos, compartilhando experiências e degustando uma boa refeição',
        highlight: true,
      },{
        id: 7,
        title: 'Ensaios de nipe',
        time: '15:00 - 16:00',
        location: 'Salas de instrumentos',
        category: 'all',
        description: 'Os alunos devem ir até as salas de seu nipe, para os ensaios do dia.',
      },
      {
        id: 8,
        title: 'Convívio',
        time: '16:00 - 17:00',
        location: 'All Space',
        category: 'all',
        description: 'Learn to prepare traditional dishes from the Antioquia region with local chefs.',
      },
      {
        id: 9,
        title: 'Ensaios Gerais',
        time: '17:15 - 19:00',
        location: 'Salão Principal',
        category: 'all',
        description: 'Momentos em que reunimos toda a malta para o ensaio geral.',
        highlight: true
      },
      {
        id: 10,
        title: 'Jantar',
        time: '19:00 - 21:00',
        location: 'EMU- Espaço Multi-uso',
        category: 'all',
        description: 'Estaremos reunidos no EMU para desfrutar de mais uma refeição.',
      },
      {
        id: 11,
        title: 'Palestra',
        time: '21:00 - 22:00',
        location: 'Salão principal',
        category: 'all',
        description: 'As palestras serão ministradas com os temas desta edição do Festival. Tomem nota para fazerem perguntas aos ministro.',
        highlight: true,
      }
    ],
    day3: [
      {
        id: 1,
        title: 'Pequeno Almoço',
        time: '08:00 - 09:30',
        location: 'Entrada Principal',
        category: 'all',
        description: 'Estaremos prontos para receber-te e entregar o teu kit de participante, e junte-se a nós no pequeno almoço.',
      },
      {
        id: 2,
        title: 'Devocional matinal',
        time: '09:30 - 10:00',
        location: 'Salão Principal',
        category: 'all',
        description: 'Teremos todos os dias pela manhã o nosso devocional diário após o pequeno almoço, para começar bem o dia.',
      },
      {
        id: 4,
        title: 'Divisão de nipes',
        time: '10:00 - 11:30',
        location: 'Salas de instrumento',
        category: 'all',
        description: 'Os músicos serão direcionados as salas de instrumento para poderem ter o primeiro contacto com o seu professor, onde irá guiar os ensaios e tirar suas dúvidas.',
      },
      {
        id: 5,
        title: 'Palestra',
        time: '12:00 - 13:00',
        location: 'Salão principal',
        category: 'all',
        description: 'As palestras serão ministradas com os temas desta edição do Festival. Tomem nota para fazerem perguntas aos ministro.',
        highlight: true,
      },
      {
        id: 6,
        title: 'Convívio/Almoço',
        time: '13:00 - 15:00',
        location: 'EMU - Espaço Multi-uso',
        category: 'all',
        description: 'Teremos bons momentos juntos, compartilhando experiências e degustando uma boa refeição',
        highlight: true,
      },{
        id: 7,
        title: 'Ensaios de nipe',
        time: '15:00 - 16:00',
        location: 'Salas de instrumentos',
        category: 'all',
        description: 'Os alunos devem ir até as salas de seu nipe, para os ensaios do dia.',
      },
      {
        id: 8,
        title: 'Convívio',
        time: '16:00 - 17:00',
        location: 'All Space',
        category: 'all',
        description: 'Learn to prepare traditional dishes from the Antioquia region with local chefs.',
      },
      {
        id: 9,
        title: 'Ensaios Gerais',
        time: '17:15 - 19:00',
        location: 'Salão Principal',
        category: 'all',
        description: 'Momentos em que reunimos toda a malta para o ensaio geral.',
        highlight: true
      },
      {
        id: 10,
        title: 'Jantar',
        time: '19:00 - 21:00',
        location: 'EMU- Espaço Multi-uso',
        category: 'all',
        description: 'Estaremos reunidos no EMU para desfrutar de mais uma refeição.',
      },
      {
        id: 11,
        title: 'Mesa Redonda',
        time: '21:00 - 22:00',
        location: 'Salão principal',
        category: 'public',
        description: 'Este evento é público a quem quiser assistir, porém requer reserva antecipada, pois temos limitações de capacidade e um custo de 1€ por pessoa.',
        highlight: true,
      }
    ],
    day4: [
      {
        id: 1,
        title: 'Pequeno Almoço',
        time: '08:00 - 09:30',
        location: 'Entrada Principal',
        category: 'all',
        description: 'Estaremos prontos para receber-te e entregar o teu kit de participante, e junte-se a nós no pequeno almoço.',
      },
      {
        id: 2,
        title: 'Devocional matinal',
        time: '09:30 - 10:00',
        location: 'Salão Principal',
        category: 'all',
        description: 'Teremos todos os dias pela manhã o nosso devocional diário após o pequeno almoço, para começar bem o dia.',
      },
      {
        id: 4,
        title: 'Ensaio Geral',
        time: '10:00 - 12:00',
        location: 'Salão Principal',
        category: 'all',
        description: 'Ensaios gerais para alinhar o que foi estudado por nipes.',
      },
      {
        id: 5,
        title: 'Convívio/Almoço',
        time: '12:00 - 14:00',
        location: 'EMU - Espaço Multi-uso',
        category: 'all',
        description: 'Teremos bons momentos juntos, compartilhando experiências e degustando uma boa refeição',
        highlight: true,
      },
      {
        id: 6,
        title: 'Passagem de Som',
        time: '14:00 - 15:00',
        location: 'EMU - Espaço Multi-uso',
        category: 'all',
        description: 'Para que esteja tudo certinho para o concerto, teremos a passagem de Som após o almoço.',
        highlight: true,
      },{
        id: 7,
        title: 'Tempo Livre - Preparação para o concerto',
        time: '15:00 - 17:00',
        location: 'All Space',
        category: 'all',
        description: 'Os inscritos estaram a vontade para se preparar para o concerto.',
      },{
        id: 8,
        title: 'Concerto e encerramento do Festival de Música Antioquia 2025',
        time: '17:00 - 18:00',
        location: 'Salão Principal',
        category: 'public',
        description: 'Este evento é público a quem quiser assistir, porém requer reserva antecipada, pois temos limitações de capacidade.',
        highlight: true,
      },
    ],
  };

  // Filter events based on active category
  const getFilteredEvents = () => {
    const dayEvents = programData[activeDay] || [];
    if (activeFilter === 'all') {
      return dayEvents;
    }
    return dayEvents.filter(event => event.category === activeFilter);
  };

  const filteredEvents = getFilteredEvents();

  return (
    <>
      {/* Program Header */}
      <section className="pt-32 pb-16 bg-secondary text-white">
        <div className="container">
          <SectionTitle
            title="Festival Program"
            subtitle="Explore the full schedule of events, performances, and activities for Festival Antioquia 2025"
            centered={true}
            light={true}
          />
        </div>
      </section>

      {/* Schedule Navigation */}
      <section className="py-10 bg-white border-b border-gray-200 sticky top-16 z-20">
        <div className="container">
          <div className="flex flex-col space-y-6">
            {/* Days Navigation */}
            <div className="overflow-x-auto pb-2">
              <div className="flex space-x-2 min-w-max">
                {festivalDays.map((day) => (
                  <button
                    key={day.id}
                    className={`px-4 py-2 rounded-md flex flex-col items-center transition-colors ${
                      activeDay === day.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setActiveDay(day.id)}
                  >
                    <span className="text-sm font-medium">{day.date}</span>
                    <span className="text-xs">{day.day}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filters */}
            <div className="overflow-x-auto pb-2">
              <div className="flex space-x-2 min-w-max">
                {eventCategories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-4 py-2 rounded-md text-sm transition-colors ${
                      activeFilter === category.id
                        ? 'bg-secondary text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => setActiveFilter(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Events */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          {filteredEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden border-l-4 ${
                    event.highlight ? 'border-primary' : 'border-gray-200'
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{event.title}</h3>
                        {event.highlight && (
                          <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded mt-1">
                            Featured Event
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock size={16} className="mr-1" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin size={16} className="mr-1" />
                          {event.location}
                        </div>
                        <div className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded capitalize">
                          {event.category}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm" data-aos="fade-up">
              <p className="text-gray-600 mb-4">No events found for the selected filter.</p>
              <Button variant="primary" onClick={() => setActiveFilter('all')}>
                View All Events
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Download Program */}
      {/* <section className="py-12 bg-primary text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-display font-bold mb-2">Take the Program With You</h2>
              <p className="text-white/80">
                Download the full festival program to access offline or print for your convenience.
              </p>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Download PDF
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Add to Calendar
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default ProgramPage;