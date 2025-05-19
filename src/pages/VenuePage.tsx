import { MapPin, Phone, Mail, Calendar, Clock } from 'lucide-react';
import SectionTitle from '../components/UI/SectionTitle';

const VenuePage = () => {
  // Venue data
  const mainVenues = [
    {
      id: 1,
      name: 'Main Stage',
      address: 'Festival Plaza, Antioquia',
      description: 'Our largest performance area, hosting the opening and closing ceremonies as well as headline performances.',
      capacity: '1,500 people',
      image: 'https://images.pexels.com/photos/1916819/pexels-photo-1916819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      name: 'Concert Hall',
      address: '123 Musical Avenue, Antioquia',
      description: 'An intimate indoor venue with exceptional acoustics, perfect for classical performances and Fado concerts.',
      capacity: '500 people',
      image: 'https://images.pexels.com/photos/200604/pexels-photo-200604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      name: 'Cultural Center',
      address: '45 Heritage Road, Antioquia',
      description: 'A multi-purpose venue hosting exhibitions, workshops, and smaller performances throughout the festival.',
      capacity: '300 people per section',
      image: 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      name: 'Dance Pavilion',
      address: 'Festival Plaza, Antioquia',
      description: 'An open-air space dedicated to dance performances and participatory dance workshops.',
      capacity: '400 people',
      image: 'https://images.pexels.com/photos/348517/pexels-photo-348517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ];

  // Practical information
  const practicalInfo = [
    {
      title: 'Transportation',
      details: [
        'Public Buses: Routes 10, 15, and 22 stop at Festival Plaza',
        'Free shuttle service from downtown Antioquia (runs every 30 minutes)',
        'Bicycle parking available at all venues',
        'Limited car parking near Cultural Center (€5 per day)'
      ]
    },
    {
      title: 'Accessibility',
      details: [
        'All venues are wheelchair accessible',
        'Accessible restrooms at all locations',
        'Assisted listening devices available at Concert Hall',
        'Reserved seating for visitors with disabilities (request in advance)'
      ]
    },
    {
      title: 'Food & Drink',
      details: [
        'Food vendors throughout Festival Plaza',
        'Café at Cultural Center (8:00 - 20:00)',
        'Water fountains at all venues',
        'Outside food and non-alcoholic beverages allowed'
      ]
    },
    {
      title: 'Facilities',
      details: [
        'Restrooms at all venues',
        'First aid stations at Main Stage and Cultural Center',
        'Lost & Found at Information Booth',
        'Free Wi-Fi throughout Festival Plaza'
      ]
    },
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
            title="Festival Venues"
            subtitle="Explore the locations where Festival Antioquia will take place"
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
              Festival Location
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Festival Antioquia takes place in the heart of the historic district of Antioquia, Portugal. 
              All venues are within walking distance of each other, making it easy to experience the full range of festival offerings.
            </p>
          </div>
          
          {/* Map (placeholder for an actual map integration) */}
          <div 
            className="bg-gray-200 rounded-lg overflow-hidden shadow-md h-96 mb-8 relative"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500 text-sm">Interactive map will be displayed here</p>
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
                  <h3 className="font-semibold mb-1">Main Address</h3>
                  <p className="text-gray-600">Festival Plaza, Antioquia, Portugal</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-primary mt-1">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Contact Phone</h3>
                  <p className="text-gray-600">+351 123 456 789</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-primary mt-1">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">info@festivalantioquia.pt</p>
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
            title="Festival Venues"
            subtitle="Discover the various locations where performances and activities will take place"
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

      {/* Practical Information */}
      <section className="py-16 bg-white">
        <div className="container">
          <SectionTitle
            title="Practical Information"
            subtitle="Everything you need to know to make the most of your festival experience"
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
                  {info.title === 'Transportation' && <MapPin size={18} className="mr-2 text-primary" />}
                  {info.title === 'Accessibility' && <Calendar size={18} className="mr-2 text-primary" />}
                  {info.title === 'Food & Drink' && <Clock size={18} className="mr-2 text-primary" />}
                  {info.title === 'Facilities' && <Mail size={18} className="mr-2 text-primary" />}
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

      {/* Opening Hours */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6" data-aos="fade-up">
              Festival Hours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Venue Opening Hours</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex justify-between">
                    <span>Festival Plaza:</span>
                    <span>10:00 - 23:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Main Stage:</span>
                    <span>12:00 - 23:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Concert Hall:</span>
                    <span>14:00 - 22:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Cultural Center:</span>
                    <span>10:00 - 20:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Workshop Spaces:</span>
                    <span>09:00 - 18:00</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Information Services</h3>
                <ul className="space-y-2 text-left">
                  <li className="flex justify-between">
                    <span>Information Booth:</span>
                    <span>09:00 - 21:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Ticket Office:</span>
                    <span>10:00 - 20:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>First Aid:</span>
                    <span>Available 24/7</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Lost & Found:</span>
                    <span>10:00 - 22:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Security:</span>
                    <span>Available 24/7</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-white/90" data-aos="fade-up" data-aos-delay="200">
              Note: Hours may vary for specific events. Please check the detailed program for exact timing of performances and activities.
            </p>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="py-16 bg-white">
        <div className="container">
          <SectionTitle
            title="Nearby Accommodations"
            subtitle="Places to stay during your visit to Festival Antioquia"
            centered={true}
          />
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden border-collapse" data-aos="fade-up">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Distance</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price Range</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Website</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {accommodations.map((acc, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4 text-sm text-gray-700">{acc.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{acc.type}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{acc.distance}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{acc.priceRange}</td>
                    <td className="py-3 px-4 text-sm text-primary">
                      <a href={`https://${acc.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {acc.website}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="100">
            <p className="text-gray-600 mb-4">
              For more accommodation options or special rates for festival attendees, please contact us.
            </p>
            <a href="mailto:info@festivalantioquia.pt" className="btn btn-outline">
              Contact for Accommodation Help
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default VenuePage;