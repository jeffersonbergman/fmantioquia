import { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import SectionTitle from '../components/UI/SectionTitle';
import Button from '../components/UI/Button';

const ProgramPage = () => {
  const [activeDay, setActiveDay] = useState('day1');
  const [activeFilter, setActiveFilter] = useState('all');

  // Festival dates
  const festivalDays = [
    { id: 'day1', date: 'July 15', day: 'Tuesday' },
    { id: 'day2', date: 'July 16', day: 'Wednesday' },
    { id: 'day3', date: 'July 17', day: 'Thursday' },
    { id: 'day4', date: 'July 18', day: 'Friday' },
    { id: 'day5', date: 'July 19', day: 'Saturday' },
    { id: 'day6', date: 'July 20', day: 'Sunday' },
  ];

  // Event categories
  const eventCategories = [
    { id: 'all', name: 'All Events' },
    { id: 'music', name: 'Music' },
    { id: 'dance', name: 'Dance' },
    { id: 'workshop', name: 'Workshops' },
    { id: 'exhibition', name: 'Exhibitions' },
    { id: 'food', name: 'Food & Drink' },
  ];

  // Program data structure - organized by days
  const programData = {
    day1: [
      {
        id: 1,
        title: 'Opening Ceremony',
        time: '19:00 - 21:00',
        location: 'Main Stage',
        category: 'music',
        description: 'The official opening of Festival Antioquia 2025 featuring performances by local musicians and dignitaries.',
        highlight: true,
      },
      {
        id: 2,
        title: 'Welcome Reception',
        time: '21:30 - 23:00',
        location: 'Festival Plaza',
        category: 'food',
        description: 'Join us for food, drinks, and mingling at the official welcome reception for festival attendees.',
      },
      {
        id: 3,
        title: 'Traditional Crafts Exhibition Opening',
        time: '12:00 - 18:00',
        location: 'Cultural Center',
        category: 'exhibition',
        description: 'Exhibition showcasing traditional crafts from the Antioquia region, featuring works by local artisans.',
      },
    ],
    day2: [
      {
        id: 4,
        title: 'Classical Guitar Workshop',
        time: '10:00 - 12:00',
        location: 'Workshop Hall A',
        category: 'workshop',
        description: 'Learn classical guitar techniques with master guitarist Carmen Alvarez.',
      },
      {
        id: 5,
        title: 'Traditional Portuguese Dance',
        time: '14:00 - 15:30',
        location: 'Dance Pavilion',
        category: 'dance',
        description: 'Performance by Grupo Folclórico showcasing traditional dances from different regions of Portugal.',
        highlight: true,
      },
      {
        id: 6,
        title: 'Evening Concert: Fado Voices',
        time: '20:00 - 22:00',
        location: 'Concert Hall',
        category: 'music',
        description: 'An evening of beautiful Fado music featuring acclaimed singers including Ana Faria.',
        highlight: true,
      },
    ],
    day3: [
      {
        id: 7,
        title: 'Percussion Masterclass',
        time: '11:00 - 13:00',
        location: 'Workshop Hall B',
        category: 'workshop',
        description: 'Join master percussionist José Martins to learn traditional rhythms and techniques.',
      },
      {
        id: 8,
        title: 'Culinary Demonstration: Regional Cuisine',
        time: '13:30 - 15:00',
        location: 'Culinary Pavilion',
        category: 'food',
        description: 'Learn to prepare traditional dishes from the Antioquia region with local chefs.',
      },
      {
        id: 9,
        title: 'Contemporary Music Fusion',
        time: '19:30 - 21:30',
        location: 'Main Stage',
        category: 'music',
        description: 'Miguel Santos presents innovative compositions blending traditional and contemporary sounds.',
        highlight: true,
      },
    ],
    day4: [
      {
        id: 10,
        title: 'Traditional Craft Workshop',
        time: '10:00 - 12:30',
        location: 'Workshop Hall A',
        category: 'workshop',
        description: 'Learn traditional craft techniques with master artisans.',
      },
      {
        id: 11,
        title: 'Poetry Reading & Literary Discussion',
        time: '14:00 - 15:30',
        location: 'Library Auditorium',
        category: 'exhibition',
        description: 'Readings and discussion of Portuguese literature with renowned authors.',
      },
      {
        id: 12,
        title: 'Wine Tasting: Regional Varieties',
        time: '16:00 - 18:00',
        location: 'Culinary Pavilion',
        category: 'food',
        description: 'Sample and learn about wines from the region with expert sommeliers.',
      },
      {
        id: 13,
        title: 'Folk Dance Performance',
        time: '20:00 - 22:00',
        location: 'Dance Pavilion',
        category: 'dance',
        description: 'Energetic performances of traditional folk dances by multiple regional ensembles.',
        highlight: true,
      },
    ],
    day5: [
      {
        id: 14,
        title: 'Children\'s Music Workshop',
        time: '10:00 - 11:30',
        location: 'Workshop Hall B',
        category: 'workshop',
        description: 'A fun, interactive music workshop designed for children ages 6-12.',
      },
      {
        id: 15,
        title: 'Art Installation Tour',
        time: '12:00 - 13:30',
        location: 'Festival Grounds',
        category: 'exhibition',
        description: 'Guided tour of the art installations throughout the festival grounds with the artists.',
      },
      {
        id: 16,
        title: 'Street Food Festival',
        time: '13:00 - 19:00',
        location: 'Festival Plaza',
        category: 'food',
        description: 'Sample delicious street food from various regions of Portugal.',
        highlight: true,
      },
      {
        id: 17,
        title: 'Grand Concert',
        time: '20:00 - 23:00',
        location: 'Main Stage',
        category: 'music',
        description: 'A spectacular concert featuring multiple performers and special collaborative performances.',
        highlight: true,
      },
    ],
    day6: [
      {
        id: 18,
        title: 'Community Dance Workshop',
        time: '10:00 - 12:00',
        location: 'Dance Pavilion',
        category: 'workshop',
        description: 'Learn traditional dances with members of Grupo Folclórico. All skill levels welcome!',
      },
      {
        id: 19,
        title: 'Artisan Market',
        time: '11:00 - 17:00',
        location: 'Festival Plaza',
        category: 'exhibition',
        description: 'Browse and purchase crafts, art, and products from local artisans.',
        highlight: true,
      },
      {
        id: 20,
        title: 'Closing Performance',
        time: '18:00 - 20:00',
        location: 'Main Stage',
        category: 'music',
        description: 'The official closing performance featuring highlights from throughout the festival.',
        highlight: true,
      },
      {
        id: 21,
        title: 'Farewell Party',
        time: '20:30 - 23:00',
        location: 'Festival Plaza',
        category: 'food',
        description: 'Join us for the final celebration of Festival Antioquia 2025 with food, drinks, and dancing.',
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
      <section className="py-12 bg-primary text-white">
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
      </section>
    </>
  );
};

export default ProgramPage;