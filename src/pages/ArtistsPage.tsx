import SectionTitle from '../components/UI/SectionTitle';

const ArtistsPage = () => {
  // Artists data
  const artists = [
    {
      id: 1,
      name: 'Carmen Alvarez',
      role: 'Classical Guitarist',
      image: 'https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Carmen Alvarez is an internationally acclaimed classical guitarist known for her virtuosic interpretations of traditional Portuguese music and contemporary compositions. With a career spanning over 15 years, she has performed at prestigious concert halls worldwide.',
    },
    {
      id: 2,
      name: 'Grupo Folclórico',
      role: 'Traditional Dance Ensemble',
      image: 'https://images.pexels.com/photos/2831794/pexels-photo-2831794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Founded in 1975, Grupo Folclórico preserves and celebrates the traditional dances of the Antioquia region. The ensemble features 12 dancers and 6 musicians, all dedicated to authentic performances that honor their cultural heritage.',
    },
    {
      id: 3,
      name: 'Miguel Santos',
      role: 'Contemporary Composer',
      image: 'https://images.pexels.com/photos/4571219/pexels-photo-4571219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Miguel Santos blends traditional Portuguese musical elements with modern electronic sounds to create innovative compositions that bridge the gap between past and present. His work has been featured in film soundtracks and international music festivals.',
    },
    {
      id: 4,
      name: 'Ana Faria',
      role: 'Fado Singer',
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Ana Faria is one of the most respected contemporary Fado singers in Portugal. Her powerful voice and emotional performances capture the essence of this traditional Portuguese musical style, bringing both authenticity and innovation to the art form.',
    },
    {
      id: 5,
      name: 'José Martins',
      role: 'Master Percussionist',
      image: 'https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'José Martins is renowned for his expertise in traditional Portuguese percussion instruments. With over 30 years of experience, he has dedicated his life to preserving and teaching the rhythmic traditions of Portugal\'s diverse regional musical styles.',
    },
    {
      id: 6,
      name: 'Maria Coelho',
      role: 'Visual Artist',
      image: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      bio: 'Maria Coelho creates stunning visual installations inspired by the cultural history of Antioquia. Her work combines traditional crafts with contemporary artistic approaches, resulting in immersive experiences that tell the stories of the region.',
    },
  ];

  return (
    <>
      {/* Artists Header */}
      <section className="pt-32 pb-16 bg-secondary text-white">
        <div className="container">
          <SectionTitle
            title="Featured Artists"
            subtitle="Meet the talented performers and artists who will bring Festival Antioquia to life"
            centered={true}
            light={true}
          />
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist, index) => (
              <div 
                key={artist.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
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
                  <p className="text-primary font-medium mb-4">{artist.role}</p>
                  <p className="text-gray-600">{artist.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call for Artists */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h2 className="text-3xl font-display font-bold mb-4">Interested in Performing?</h2>
            <p className="text-gray-600 mb-8">
              Festival Antioquia welcomes submissions from artists working in all disciplines who are 
              interested in showcasing their talent at next year's festival. Applications for the 2026 
              edition will open in September 2025.
            </p>
            <a 
              href="mailto:artists@festivalantioquia.pt" 
              className="btn btn-outline"
            >
              Contact Artistic Director
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtistsPage;