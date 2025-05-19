import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/UI/SectionTitle';
import Button from '../components/UI/Button';

const NewsPage = () => {
  // News articles data
  const newsArticles = [
    {
      id: 1,
      title: 'Festival Antioquia 2025 Announces Dates and Initial Lineup',
      excerpt: 'We are excited to announce that Festival Antioquia will return for its 15th edition from July 15-20, 2025. This year\'s festival promises to be our most diverse and exciting yet, with a stellar lineup of artists from around the world.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl vel ultricies. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl vel ultricies.',
      author: 'Festival Team',
      date: 'October 15, 2024',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: true,
    },
    {
      id: 2,
      title: 'New Workshop Series Added to Festival Program',
      excerpt: 'In response to popular demand, we\'ve expanded our workshop offerings for the 2025 festival. New additions include traditional instrument making, culinary experiences, and expanded dance programs for all skill levels.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl vel ultricies. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl vel ultricies.',
      author: 'Maria Santos',
      date: 'November 3, 2024',
      image: 'https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      title: 'Early Bird Tickets Now Available',
      excerpt: 'Secure your spot at Festival Antioquia 2025 with our early bird ticket options. Available for a limited time, these discounted passes provide access to all festival venues and performances.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl vel ultricies. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl vel ultricies.',
      author: 'Ticket Office',
      date: 'November 10, 2024',
      image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 4,
      title: 'Call for Volunteers Now Open',
      excerpt: 'Be part of the Festival Antioquia team! We\'re looking for enthusiastic volunteers to help make the 2025 festival a success. Various roles available with benefits including festival passes and exclusive experiences.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl vel ultricies. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl vel ultricies.',
      author: 'Volunteer Coordinator',
      date: 'December 5, 2024',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 5,
      title: 'New Partnership with Local Businesses Announced',
      excerpt: 'Festival Antioquia is proud to announce partnerships with local businesses to enhance the festival experience. Special offers will be available for festival attendees at restaurants, shops, and accommodations throughout Antioquia.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl vel ultricies. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel ultricies nisl nisl vel ultricies.',
      author: 'Partnerships Team',
      date: 'January 15, 2025',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <>
      {/* News Header */}
      <section className="pt-32 pb-16 bg-secondary text-white">
        <div className="container">
          <SectionTitle
            title="Festival News"
            subtitle="Stay updated with the latest announcements and information about Festival Antioquia"
            centered={true}
            light={true}
          />
        </div>
      </section>

      {/* Featured News */}
      {newsArticles.find(article => article.featured) && (
        <section className="py-16 bg-white">
          <div className="container">
            {newsArticles
              .filter(article => article.featured)
              .map(article => (
                <div 
                  key={article.id}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                  data-aos="fade-up"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div>
                    <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                      Featured News
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-4">{article.title}</h2>
                    <div className="flex items-center text-gray-500 text-sm mb-6 space-x-4">
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {article.date}
                      </span>
                      <span className="flex items-center">
                        <User size={16} className="mr-1" />
                        {article.author}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-6 text-lg">{article.excerpt}</p>
                    <Link to={`/news/${article.id}`}>
                      <Button variant="primary" icon={<ArrowRight size={18} />} iconPosition="right">
                        Read Full Article
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* News List */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8" data-aos="fade-up">Latest Updates</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles
              .filter(article => !article.featured)
              .map((article, index) => (
                <div 
                  key={article.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <Link 
                      to={`/news/${article.id}`}
                      className="text-primary font-medium hover:text-primary-700 inline-flex items-center"
                    >
                      Read More
                      <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-4" data-aos="fade-up">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/90 mb-8" data-aos="fade-up" data-aos-delay="100">
              Get the latest Festival Antioquia news, updates, and special offers delivered directly to your inbox.
            </p>
            <form className="max-w-md mx-auto" data-aos="fade-up" data-aos-delay="200">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 rounded-md focus:outline-none text-gray-900"
                  required
                />
                <Button type="submit" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Subscribe
                </Button>
              </div>
              <p className="text-white/70 text-sm mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsPage;