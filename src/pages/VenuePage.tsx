import { MapPin, Phone, Mail, Calendar, Clock } from 'lucide-react';
import SectionTitle from '../components/UI/SectionTitle';

const VenuePage = () => {
  // Venue data
  const mainVenues = [
    {
      id: 1,
      name: 'Salão Principal',
      address: 'Igreja Baptista Antiquia, Porto',
      description: 'Local onde irá acontecer a primeira edição do Festival de Música Antioquia.',
      capacity: '120 pessoas',
      image: '/assets/img/faixadaiba.jpg'
    }
  ];


  // Accommodation options
  const accommodations = [
    {
      name: 'Hotel Antioquia',
      type: 'Hotel',
      distance: '500m from Festival Plaza',
      priceRange: '€€€',
      website: 'www.hotelantioquia.pt'
    },
    {
      name: 'Cultural Hostel',
      type: 'Hostel',
      distance: '300m from Festival Plaza',
      priceRange: '€',
      website: 'www.culturalhostel.pt'
    },
    {
      name: 'Plaza Apartments',
      type: 'Apartments',
      distance: '400m from Festival Plaza',
      priceRange: '€€',
      website: 'www.plazaapartments.pt'
    },
    {
      name: 'Heritage Guesthouse',
      type: 'B&B',
      distance: '1km from Festival Plaza',
      priceRange: '€€',
      website: 'www.heritageguesthouse.pt'
    },
  ];

  return (
    <>
      {/* Venue Header */}
      <section className="pt-32 pb-16 bg-secondary text-white">
        <div className="container">
          <SectionTitle
            title="Local do Festival"
            subtitle="Explore o local onde acontecerá o Festival de Música Antioquia"
            centered={true}
            light={true}
          />
        </div>
      </section>

      {/* Map Overview */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-display font-bold mb-4" data-aos="fade-up">
              Localização do Festival
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              O Festival de Música de Antioquia acontecerá em São Mamede de Infesta, de fácil acesso por Autocarro e com localização conveniente para todos os participantes.
            </p>
          </div>
          
          {/* Map (placeholder for an actual map integration) */}
          <div 
            className="bg-gray-200 rounded-lg overflow-hidden shadow-md h-96 mb-8 relative"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <iframe
                    title="Mapa do Festival Antioquia"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2982.7603667740535!2d-8.615204784229792!3d41.18801167928396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24650fa7e511cf%3A0x4b43c59fa775e7cd!2sRua%20Godinho%20de%20Faria%20552%2C%204465-150%20S.%20Mamede%20de%20Infesta!5e0!3m2!1spt-PT!2spt!4v1716136530077!5m2!1spt-PT!2spt"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
            </div>
          </div>
          
          {/* Contact Info */}
          <div 
            className="bg-gray-50 rounded-lg p-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="text-primary mt-1">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Morada</h3>
                  <p className="text-gray-600">Rua Godinho de Faria, 552
                      4465-150 S. Mamede de Infesta</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-primary mt-1">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Contacto</h3>
                  <p className="text-gray-600">+351 912 467 696</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-primary mt-1">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">festivalantioquia@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Venues */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <SectionTitle
            title="Localização do Festival"
            subtitle="Descubra o local onde acontecerá o Festival de Música Antioquia"
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainVenues.map((venue, index) => (
              <div 
                key={venue.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={venue.image} 
                    alt={venue.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
                  <p className="text-gray-600 text-sm flex items-center mb-4">
                    <MapPin size={16} className="mr-1 text-primary" /> {venue.address}
                  </p>
                  <p className="text-gray-700 mb-4">{venue.description}</p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Capacity:</span> {venue.capacity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6" data-aos="fade-up">
              Horários de funcionamento
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Horários de abertura dos portões</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex justify-between">
                    <span>Primeiro dia:</span>
                    <span>20:30 - 22:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Segundo dia:</span>
                    <span>08:45 - 22:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Terceiro dia:</span>
                    <span>08:45 - 22:30</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Ultimo dia:</span>
                    <span>08:45 - 19:00</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Serviço de Informação</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex justify-between">
                    <span>Balcão de Informações:</span>
                    <span>09:00 - 21:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>First Aid:</span>
                    <span>Available 24/7</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Achados e Perdidos:</span>
                    <span>10:00 - 20:00</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-white/90" data-aos="fade-up" data-aos-delay="200">
              Observação: os horários podem variar dependendo do evento. Consulte a programação detalhada para saber o horário exato das apresentações e atividades.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default VenuePage;